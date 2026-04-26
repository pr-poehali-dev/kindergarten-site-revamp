"""
Управление статьями: получение списка, создание и удаление.
Создание и удаление требует заголовка X-Admin-Password.
"""
import json
import os
import psycopg2


CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
}

CATEGORY_META = {
    'razvitie':    {'tag': 'Развитие',          'emoji': '🌱', 'color': 'from-emerald-50 to-teal-50',  'accent': 'bg-emerald-100 text-emerald-700', 'border': 'border-emerald-100'},
    'tvorchestvo': {'tag': 'Творчество',         'emoji': '🎨', 'color': 'from-orange-50 to-amber-50',  'accent': 'bg-orange-100 text-orange-700',   'border': 'border-orange-100'},
    'igry':        {'tag': 'Игры',               'emoji': '🎮', 'color': 'from-sky-50 to-blue-50',      'accent': 'bg-sky-100 text-sky-700',         'border': 'border-sky-100'},
    'sovety':      {'tag': 'Советы родителям',   'emoji': '💛', 'color': 'from-yellow-50 to-lime-50',   'accent': 'bg-yellow-100 text-yellow-700',   'border': 'border-yellow-100'},
    'zdorovye':    {'tag': 'Здоровье',           'emoji': '🍎', 'color': 'from-red-50 to-rose-50',      'accent': 'bg-red-100 text-red-700',         'border': 'border-red-100'},
    'adaptaciya':  {'tag': 'Адаптация',          'emoji': '🤝', 'color': 'from-teal-50 to-cyan-50',     'accent': 'bg-teal-100 text-teal-700',       'border': 'border-teal-100'},
    'prazdniki':   {'tag': 'Праздники',          'emoji': '🎉', 'color': 'from-purple-50 to-pink-50',   'accent': 'bg-purple-100 text-purple-700',   'border': 'border-purple-100'},
}


def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def check_admin(event):
    headers = event.get('headers') or {}
    pwd = headers.get('X-Admin-Password') or headers.get('x-admin-password', '')
    return pwd == os.environ.get('ADMIN_PASSWORD', '')


def fmt_date(dt):
    months = ['января','февраля','марта','апреля','мая','июня',
              'июля','августа','сентября','октября','ноября','декабря']
    return f"{dt.day} {months[dt.month - 1]} {dt.year}"


def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    schema = os.environ.get('MAIN_DB_SCHEMA', 't_p60067382_kindergarten_site_re')
    method = event.get('httpMethod', 'GET')

    # GET — список статей
    if method == 'GET':
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"SELECT id, category, tag, emoji, title, excerpt, full_text, read_time, created_at "
            f"FROM {schema}.articles ORDER BY created_at DESC"
        )
        rows = cur.fetchall()
        cur.close()
        conn.close()

        articles = []
        for row in rows:
            aid, category, tag, emoji, title, excerpt, full_text, read_time, created_at = row
            meta = CATEGORY_META.get(category, {
                'tag': tag, 'emoji': emoji,
                'color': 'from-gray-50 to-slate-50',
                'accent': 'bg-gray-100 text-gray-700',
                'border': 'border-gray-100',
            })
            articles.append({
                'id': aid,
                'category': category,
                'tag': meta['tag'],
                'emoji': meta['emoji'],
                'title': title,
                'excerpt': excerpt,
                'fullText': full_text or '',
                'readTime': read_time,
                'date': fmt_date(created_at),
                'color': meta['color'],
                'accent': meta['accent'],
                'border': meta['border'],
            })

        return {
            'statusCode': 200,
            'headers': {**CORS_HEADERS, 'Content-Type': 'application/json'},
            'body': json.dumps({'articles': articles}, ensure_ascii=False),
        }

    # POST — создать статью
    if method == 'POST':
        if not check_admin(event):
            return {'statusCode': 403, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Неверный пароль'})}

        body = json.loads(event.get('body') or '{}')
        category = body.get('category', 'razvitie')
        title = body.get('title', '').strip()
        excerpt = body.get('excerpt', '').strip()
        full_text = body.get('fullText', '').strip()
        read_time = body.get('readTime', '5 мин').strip()

        if not title or not excerpt:
            return {'statusCode': 400, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Заголовок и краткое описание обязательны'})}

        meta = CATEGORY_META.get(category, CATEGORY_META['razvitie'])

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"INSERT INTO {schema}.articles (category, tag, emoji, title, excerpt, full_text, read_time) "
            f"VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id",
            (category, meta['tag'], meta['emoji'], title, excerpt, full_text or None, read_time)
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()

        return {
            'statusCode': 201,
            'headers': {**CORS_HEADERS, 'Content-Type': 'application/json'},
            'body': json.dumps({'id': new_id, 'ok': True}, ensure_ascii=False),
        }

    # DELETE — удалить статью
    if method == 'DELETE':
        if not check_admin(event):
            return {'statusCode': 403, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Неверный пароль'})}

        params = event.get('queryStringParameters') or {}
        article_id = params.get('id')
        if not article_id:
            return {'statusCode': 400, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Не указан id'})}

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"DELETE FROM {schema}.articles WHERE id = %s", (article_id,))
        conn.commit()
        cur.close()
        conn.close()

        return {
            'statusCode': 200,
            'headers': {**CORS_HEADERS, 'Content-Type': 'application/json'},
            'body': json.dumps({'ok': True}, ensure_ascii=False),
        }

    return {'statusCode': 405, 'headers': CORS_HEADERS, 'body': ''}
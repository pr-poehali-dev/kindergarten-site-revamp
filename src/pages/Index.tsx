import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const API_URL = "https://functions.poehali.dev/37ebd32c-4851-436c-9717-a97cf2f6f2b6";

const ACTIVITIES = [
  { emoji: "🎨", title: "Рисование и творчество", desc: "Развиваем фантазию и мелкую моторику через рисование, лепку и аппликацию" },
  { emoji: "📖", title: "Обучение грамоте", desc: "Готовим детей к школе: буквы, слоги, первые слова и простые тексты" },
  { emoji: "🔢", title: "Математика и логика", desc: "Счёт, формы, цвета и логические задачки в игровой форме" },
  { emoji: "🌿", title: "Природа и экология", desc: "Наблюдения за природой, опыты, уход за растениями в группе" },
  { emoji: "🎭", title: "Театр и ролевые игры", desc: "Сказки, кукольный театр, инсценировки — развиваем речь и уверенность" },
  { emoji: "🏃", title: "Физическое развитие", desc: "Утренняя гимнастика, подвижные игры, закаливание и спортивные праздники" },
];

const ACHIEVEMENTS = [
  { year: "2024", title: "Лучший воспитатель района", org: "Управление образования" },
  { year: "2023", title: "Победитель конкурса «Педагог года»", org: "Городской этап" },
  { year: "2022", title: "Авторская методика раннего развития", org: "Опубликована в сборнике ФИРО" },
  { year: "2021", title: "Грамота за высокий профессионализм", org: "Министерство просвещения" },
  { year: "2019", title: "Первая квалификационная категория", org: "Аттестационная комиссия" },
];

const GALLERY = [
  { emoji: "🖼️", label: "Утренник", bg: "from-pink-100 to-rose-100" },
  { emoji: "🎨", label: "Творческое занятие", bg: "from-orange-100 to-amber-100" },
  { emoji: "🌱", label: "Наш огород", bg: "from-emerald-100 to-teal-100" },
  { emoji: "🎭", label: "Кукольный театр", bg: "from-purple-100 to-violet-100" },
  { emoji: "⚽", label: "Спортивный праздник", bg: "from-sky-100 to-blue-100" },
  { emoji: "🎂", label: "День рождения в группе", bg: "from-yellow-100 to-lime-100" },
];

const CATEGORIES = [
  { id: "all", label: "Все статьи", emoji: "📚" },
  { id: "razvitie", label: "Развитие", emoji: "🌱" },
  { id: "tvorchestvo", label: "Творчество", emoji: "🎨" },
  { id: "igry", label: "Игры", emoji: "🎮" },
  { id: "sovety", label: "Советы родителям", emoji: "💛" },
  { id: "zdorovye", label: "Здоровье", emoji: "🍎" },
  { id: "adaptaciya", label: "Адаптация", emoji: "🤝" },
  { id: "prazdniki", label: "Праздники", emoji: "🎉" },
];

type Article = {
  id: number;
  category: string;
  tag: string;
  emoji: string;
  title: string;
  excerpt: string;
  fullText: string;
  readTime: string;
  date: string;
  color: string;
  accent: string;
  border: string;
};

const NAV = [
  { id: "about", label: "О себе" },
  { id: "activities", label: "Занятия" },
  { id: "gallery", label: "Галерея" },
  { id: "achievements", label: "Достижения" },
  { id: "articles", label: "Статьи" },
  { id: "contacts", label: "Контакты" },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [openArticle, setOpenArticle] = useState<Article | null>(null);

  useEffect(() => {
    fetch(API_URL)
      .then((r) => r.json())
      .then((d) => setArticles(d.articles || []))
      .catch(() => setArticles([]))
      .finally(() => setLoadingArticles(false));
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const filtered =
    activeCategory === "all"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  const renderText = (text: string) =>
    text.split("\n\n").map((para, pi) => (
      <p key={pi}>
        {para.split(/(\*\*[^*]+\*\*)/).map((part, idx) =>
          part.startsWith("**") && part.endsWith("**")
            ? <strong key={idx} className="text-gray-800 font-semibold">{part.slice(2, -2)}</strong>
            : part
        )}
      </p>
    ));

  return (
    <div className="min-h-screen font-nunito bg-white">

      {/* Article Modal */}
      {openArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
          onClick={() => setOpenArticle(null)}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`h-2 w-full rounded-t-3xl bg-gradient-to-r ${openArticle.color}`} />
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between gap-4 mb-5">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${openArticle.accent}`}>
                  {openArticle.emoji} {openArticle.tag}
                </span>
                <button onClick={() => setOpenArticle(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Icon name="X" size={22} />
                </button>
              </div>
              <h2 className="font-bold text-gray-800 text-2xl leading-snug mb-3">{openArticle.title}</h2>
              <div className="flex items-center gap-4 text-xs text-gray-400 mb-6">
                <span className="flex items-center gap-1"><Icon name="Clock" size={12} />{openArticle.readTime}</span>
                <span>{openArticle.date}</span>
              </div>
              <hr className="border-gray-100 mb-6" />
              {openArticle.fullText ? (
                <div className="text-gray-600 text-[15px] leading-relaxed space-y-4">
                  {renderText(openArticle.fullText)}
                </div>
              ) : (
                <p className="text-gray-500 text-sm leading-relaxed">{openArticle.excerpt}</p>
              )}
              <button
                onClick={() => setOpenArticle(null)}
                className="mt-8 w-full py-3 rounded-2xl bg-pink-400 text-white font-bold text-sm hover:bg-pink-500 transition-colors"
              >
                Закрыть статью
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-pink-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-orange-300 flex items-center justify-center text-white font-bold text-lg shadow">М</div>
            <div>
              <div className="font-pacifico text-pink-500 text-sm leading-tight">Мария Михайловна</div>
              <div className="text-xs text-gray-400">Воспитатель детского сада</div>
            </div>
          </div>
          <nav className="hidden md:flex gap-5">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className={`text-sm font-semibold transition-colors ${
                  activeSection === n.id ? "text-pink-500 border-b-2 border-pink-400 pb-0.5" : "text-gray-500 hover:text-pink-400"
                }`}
              >
                {n.label}
              </button>
            ))}
          </nav>
          <button className="md:hidden text-gray-400" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-pink-50 px-4 py-3 flex flex-col gap-3">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="text-left text-sm font-semibold text-gray-600 hover:text-pink-500 py-1">
                {n.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #fff0f6 0%, #fff8f0 50%, #f0f8ff 100%)" }}>
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-semibold" style={{ background: "rgba(255,182,193,0.3)", color: "#d46b7e" }}>
              👋 Добро пожаловать на мой сайт!
            </div>
            <h1 className="font-pacifico text-4xl md:text-5xl text-gray-800 mb-5 leading-tight">
              Мария Михайловна<br />
              <span className="text-pink-400">Говорова</span>
            </h1>
            <p className="text-gray-500 text-lg mb-3 font-semibold">Воспитатель высшей категории</p>
            <p className="text-gray-400 text-base mb-8 max-w-md">
              Работаю с детьми дошкольного возраста уже более 15 лет. Мой принцип — каждый ребёнок уникален и заслуживает внимания и любви.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <button
                onClick={() => scrollTo("about")}
                className="px-6 py-3 rounded-2xl bg-pink-400 text-white font-bold hover:bg-pink-500 transition-colors shadow-md"
              >
                Узнать обо мне
              </button>
              <button
                onClick={() => scrollTo("contacts")}
                className="px-6 py-3 rounded-2xl bg-white text-pink-500 font-bold border border-pink-200 hover:border-pink-400 transition-colors"
              >
                Связаться
              </button>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="w-56 h-56 md:w-72 md:h-72 rounded-full bg-gradient-to-br from-pink-200 via-orange-100 to-yellow-100 flex items-center justify-center shadow-xl text-8xl">
              👩‍🏫
            </div>
          </div>
        </div>
        <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-pink-100 opacity-50" />
        <div className="absolute bottom-10 left-10 w-14 h-14 rounded-full bg-yellow-100 opacity-60" />
      </section>

      {/* ── О себе ── */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="font-pacifico text-pink-400 text-lg mb-2">Немного обо мне</div>
            <h2 className="text-3xl font-bold text-gray-800">О себе</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-5 text-gray-600 leading-relaxed">
              <p>
                Меня зовут <strong className="text-gray-800">Мария Михайловна Говорова</strong>. Я воспитатель детского сада с 15-летним стажем работы с детьми от 3 до 7 лет.
              </p>
              <p>
                Окончила Педагогический институт по специальности «Дошкольная педагогика и психология». За эти годы я разработала авторские методики раннего развития, которые помогают детям раскрыть свой потенциал в игровой форме.
              </p>
              <p>
                Я убеждена, что детство — это самое важное время в жизни человека. Моя задача — создать тёплую, безопасную и творческую среду, в которой каждый ребёнок будет расти счастливым и любознательным.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                {["15+ лет опыта", "Высшая категория", "Авторские методики", "200+ выпускников"].map((badge) => (
                  <span key={badge} className="px-4 py-2 rounded-full bg-pink-50 text-pink-600 text-sm font-semibold border border-pink-100">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { emoji: "❤️", title: "Любовь к детям", desc: "Главный принцип моей работы" },
                { emoji: "🎓", title: "Образование", desc: "Высшее педагогическое, 2008 г." },
                { emoji: "🏅", title: "Достижения", desc: "Победитель конкурсов педмастерства" },
                { emoji: "📚", title: "Развитие", desc: "Постоянно обучаюсь новым методикам" },
              ].map((item) => (
                <div key={item.title} className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-2xl p-5 border border-pink-100">
                  <div className="text-3xl mb-2">{item.emoji}</div>
                  <div className="font-bold text-gray-800 text-sm mb-1">{item.title}</div>
                  <div className="text-gray-500 text-xs">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Занятия ── */}
      <section id="activities" className="py-20" style={{ background: "linear-gradient(135deg, #fff8f0 0%, #fef3f8 100%)" }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="font-pacifico text-pink-400 text-lg mb-2">Чем мы занимаемся</div>
            <h2 className="text-3xl font-bold text-gray-800">Занятия в группе</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">Разнообразные активности, которые развивают ребёнка всесторонне — ум, тело и душу</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ACTIVITIES.map((act) => (
              <div key={act.title} className="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{act.emoji}</div>
                <h3 className="font-bold text-gray-800 mb-2">{act.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{act.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Галерея ── */}
      <section id="gallery" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="font-pacifico text-pink-400 text-lg mb-2">Наша жизнь в группе</div>
            <h2 className="text-3xl font-bold text-gray-800">Галерея</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">Моменты, которые мы бережно сохраняем — праздники, занятия и повседневные радости</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY.map((item) => (
              <div
                key={item.label}
                className={`rounded-3xl bg-gradient-to-br ${item.bg} flex flex-col items-center justify-center aspect-square border border-white shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
              >
                <div className="text-5xl mb-3">{item.emoji}</div>
                <div className="text-sm font-semibold text-gray-600">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Достижения ── */}
      <section id="achievements" className="py-20" style={{ background: "linear-gradient(135deg, #f0f8ff 0%, #fef3f8 100%)" }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="font-pacifico text-pink-400 text-lg mb-2">Профессиональный путь</div>
            <h2 className="text-3xl font-bold text-gray-800">Достижения</h2>
          </div>
          <div className="max-w-2xl mx-auto space-y-4">
            {ACHIEVEMENTS.map((ach, i) => (
              <div key={i} className="flex gap-5 items-start bg-white rounded-2xl p-5 border border-blue-100 shadow-sm">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-400 to-orange-300 flex items-center justify-center text-white font-bold text-sm">
                  {ach.year}
                </div>
                <div>
                  <div className="font-bold text-gray-800 mb-1">{ach.title}</div>
                  <div className="text-gray-400 text-sm">{ach.org}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Статьи ── */}
      <section id="articles" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="font-pacifico text-pink-400 text-lg mb-2">Полезные материалы</div>
            <h2 className="text-3xl font-bold text-gray-800">Статьи о детях</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">Делюсь опытом, методиками и идеями для воспитания счастливых и любознательных детей</p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                  activeCategory === cat.id
                    ? "bg-pink-400 text-white border-pink-400 shadow-md scale-105"
                    : "bg-white text-gray-600 border-gray-200 hover:border-pink-300 hover:text-pink-500"
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
                {activeCategory === cat.id && cat.id !== "all" && (
                  <span className="bg-white/30 text-white text-xs rounded-full px-1.5 py-0.5 ml-1">
                    {articles.filter((a) => a.category === cat.id).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {loadingArticles ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-50 rounded-3xl h-52 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <div className="text-5xl mb-4">🔍</div>
              <div className="text-lg font-semibold">Статей пока нет</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((article, i) => (
                <article
                  key={article.id}
                  className={`bg-white rounded-3xl border ${article.border} shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer animate-fade-in`}
                  style={{ animationDelay: `${i * 60}ms` }}
                  onClick={() => setOpenArticle(article)}
                >
                  <div className={`h-1.5 bg-gradient-to-r ${article.color}`} />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${article.accent}`}>
                        {article.emoji} {article.tag}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Icon name="Clock" size={12} />
                        {article.readTime}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-800 text-lg leading-snug mb-3 group-hover:text-pink-500 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{article.date}</span>
                      <span className="flex items-center gap-1 text-xs font-semibold text-pink-400">
                        Читать <Icon name="ChevronRight" size={14} />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Контакты ── */}
      <section id="contacts" className="py-20" style={{ background: "linear-gradient(135deg, #fff0f6 0%, #fff8f0 100%)" }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="font-pacifico text-pink-400 text-lg mb-2">Напишите мне</div>
            <h2 className="text-3xl font-bold text-gray-800">Контакты</h2>
            <p className="text-gray-500 mt-3 max-w-md mx-auto">Есть вопрос или хотите обсудить развитие вашего ребёнка? Всегда рада общению!</p>
          </div>
          <div className="max-w-xl mx-auto grid gap-4">
            {[
              { icon: "Mail", label: "Email", value: "m.govorova@detsad.ru", color: "text-pink-500" },
              { icon: "Phone", label: "Телефон", value: "+7 (900) 123-45-67", color: "text-orange-500" },
              { icon: "MapPin", label: "Детский сад", value: "МБДОУ №12 «Радуга», г. Москва", color: "text-emerald-500" },
              { icon: "Clock", label: "Рабочее время", value: "Пн–Пт, 7:30 — 18:00", color: "text-sky-500" },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-4 bg-white rounded-2xl px-6 py-4 border border-pink-100 shadow-sm">
                <div className={c.color}>
                  <Icon name={c.icon as "Mail"} size={22} />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-semibold">{c.label}</div>
                  <div className="text-gray-700 font-semibold">{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-white border-t border-pink-100 py-8 text-center text-gray-400 text-sm">
        <div className="font-pacifico text-pink-400 text-lg mb-1">Мария Михайловна Говорова</div>
        <div>Воспитатель с любовью к детям 💛</div>
      </footer>
    </div>
  );
};

export default Index;

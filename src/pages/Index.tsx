import { useState } from "react";
import Icon from "@/components/ui/icon";

const CATEGORIES = [
  { id: "all", label: "Все статьи", emoji: "📚" },
  { id: "razvitie", label: "Развитие", emoji: "🌱" },
  { id: "tvorchestvo", label: "Творчество", emoji: "🎨" },
  { id: "igry", label: "Игры", emoji: "🎮" },
  { id: "sovety", label: "Советы родителям", emoji: "💛" },
  { id: "zdorovye", label: "Здоровье", emoji: "🍎" },
  { id: "prazdniki", label: "Праздники", emoji: "🎉" },
];

const ARTICLES = [
  {
    id: 1,
    category: "razvitie",
    tag: "Развитие",
    emoji: "🌱",
    title: "Как развить речь ребёнка в 4–5 лет",
    excerpt: "Простые упражнения и игры, которые помогут малышу научиться говорить чисто и красиво. Проверенные методики для домашних занятий.",
    readTime: "5 мин",
    date: "18 апреля 2026",
    color: "from-emerald-50 to-teal-50",
    accent: "bg-emerald-100 text-emerald-700",
    border: "border-emerald-100",
  },
  {
    id: 2,
    category: "tvorchestvo",
    tag: "Творчество",
    emoji: "🎨",
    title: "10 поделок из природных материалов",
    excerpt: "Листья, шишки, желуди — всё это превращается в чудесные поделки. Идеи для занятий на осенние прогулки и дома.",
    readTime: "7 мин",
    date: "12 апреля 2026",
    color: "from-orange-50 to-amber-50",
    accent: "bg-orange-100 text-orange-700",
    border: "border-orange-100",
  },
  {
    id: 3,
    category: "sovety",
    tag: "Советы родителям",
    emoji: "💛",
    title: "Как подготовить ребёнка к детскому саду",
    excerpt: "Адаптация к садику — важный период. Рассказываю, что сделать заранее, чтобы малыш привык легко и без слёз.",
    readTime: "8 мин",
    date: "5 апреля 2026",
    color: "from-yellow-50 to-lime-50",
    accent: "bg-yellow-100 text-yellow-700",
    border: "border-yellow-100",
  },
  {
    id: 4,
    category: "igry",
    tag: "Игры",
    emoji: "🎮",
    title: "Подвижные игры для группы: 15 идей",
    excerpt: "Весёлые игры, которые развивают координацию, внимание и командный дух. Можно играть и на улице, и в помещении.",
    readTime: "6 мин",
    date: "28 марта 2026",
    color: "from-sky-50 to-blue-50",
    accent: "bg-sky-100 text-sky-700",
    border: "border-sky-100",
  },
  {
    id: 5,
    category: "zdorovye",
    tag: "Здоровье",
    emoji: "🍎",
    title: "Правильное питание дошкольника",
    excerpt: "Что должно быть в рационе ребёнка 3–6 лет, каких продуктов избегать и как сделать еду вкусной и полезной.",
    readTime: "9 мин",
    date: "20 марта 2026",
    color: "from-red-50 to-rose-50",
    accent: "bg-red-100 text-red-700",
    border: "border-red-100",
  },
  {
    id: 6,
    category: "razvitie",
    tag: "Развитие",
    emoji: "🌱",
    title: "Мелкая моторика: зачем и как развивать",
    excerpt: "Пластилин, пазлы, шнуровки — объясняю, почему мелкая моторика напрямую связана с умственным развитием ребёнка.",
    readTime: "5 мин",
    date: "14 марта 2026",
    color: "from-emerald-50 to-teal-50",
    accent: "bg-emerald-100 text-emerald-700",
    border: "border-emerald-100",
  },
  {
    id: 7,
    category: "prazdniki",
    tag: "Праздники",
    emoji: "🎉",
    title: "Сценарий утренника ко Дню защиты детей",
    excerpt: "Стихи, песни, конкурсы и игры для весёлого праздника. Сценарий рассчитан на детей 4–6 лет и 40 минут.",
    readTime: "12 мин",
    date: "7 марта 2026",
    color: "from-purple-50 to-pink-50",
    accent: "bg-purple-100 text-purple-700",
    border: "border-purple-100",
  },
  {
    id: 8,
    category: "tvorchestvo",
    tag: "Творчество",
    emoji: "🎨",
    title: "Рисование пальчиками: техники для малышей",
    excerpt: "Нетрадиционные техники рисования помогают раскрыть творческий потенциал и развить фантазию с самого раннего возраста.",
    readTime: "6 мин",
    date: "1 марта 2026",
    color: "from-orange-50 to-amber-50",
    accent: "bg-orange-100 text-orange-700",
    border: "border-orange-100",
  },
  {
    id: 9,
    category: "sovety",
    tag: "Советы родителям",
    emoji: "💛",
    title: "Как говорить с детьми о сложных темах",
    excerpt: "Смерть, развод, болезнь — дети задают неудобные вопросы. Делюсь советами, как отвечать честно и бережно.",
    readTime: "10 мин",
    date: "22 февраля 2026",
    color: "from-yellow-50 to-lime-50",
    accent: "bg-yellow-100 text-yellow-700",
    border: "border-yellow-100",
  },
];

const NAV_LINKS = ["О себе", "Занятия", "Галерея", "Достижения", "Статьи", "Контакты"];

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered =
    activeCategory === "all"
      ? ARTICLES
      : ARTICLES.filter((a) => a.category === activeCategory);

  return (
    <div className="min-h-screen font-nunito" style={{ background: "linear-gradient(135deg, #fff8f0 0%, #fef3f8 50%, #f0f8ff 100%)" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-pink-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-orange-300 flex items-center justify-center text-white font-bold text-lg shadow">
              М
            </div>
            <div>
              <div className="font-pacifico text-pink-500 text-sm leading-tight">Мария Михайловна</div>
              <div className="text-xs text-gray-400 font-nunito">Воспитатель детского сада</div>
            </div>
          </div>
          <nav className="hidden md:flex gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className={`text-sm font-semibold transition-colors ${
                  link === "Статьи"
                    ? "text-pink-500 border-b-2 border-pink-400 pb-0.5"
                    : "text-gray-500 hover:text-pink-400"
                }`}
              >
                {link}
              </a>
            ))}
          </nav>
          <button className="md:hidden text-gray-400">
            <Icon name="Menu" size={22} />
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-14 pb-6 text-center">
        <div
          className="inline-block mb-3 px-4 py-1.5 rounded-full text-sm font-semibold"
          style={{ background: "rgba(255,182,193,0.3)", color: "#d46b7e" }}
        >
          📖 Полезные материалы для родителей и коллег
        </div>
        <h1 className="font-pacifico text-4xl md:text-5xl text-gray-800 mb-4 leading-tight">
          Статьи о детях
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto font-nunito">
          Делюсь опытом, методиками и идеями для воспитания счастливых и любознательных детей
        </p>
      </section>

      {/* Category Filter */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <div className="flex flex-wrap gap-2 justify-center">
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
                  {ARTICLES.filter((a) => a.category === cat.id).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
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
                onClick={() => setExpandedId(expandedId === article.id ? null : article.id)}
              >
                {/* Card top gradient */}
                <div className={`h-2 w-full bg-gradient-to-r ${article.color.replace("from-", "from-").replace("to-", "to-")}`}
                  style={{ background: `linear-gradient(90deg, var(--tw-gradient-stops))` }}
                />
                <div className={`h-1.5 bg-gradient-to-r ${article.color}`} />

                <div className="p-6">
                  {/* Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${article.accent}`}>
                      {article.emoji} {article.tag}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Icon name="Clock" size={12} />
                      {article.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-bold text-gray-800 text-lg leading-snug mb-3 group-hover:text-pink-500 transition-colors">
                    {article.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {article.excerpt}
                  </p>

                  {/* Expanded content */}
                  {expandedId === article.id && (
                    <div className="mt-2 pt-4 border-t border-dashed border-gray-100 animate-fade-in">
                      <p className="text-gray-500 text-sm leading-relaxed">
                        Полный текст статьи появится здесь. Вы можете добавить содержимое для каждой статьи, написав мне.
                      </p>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-400">{article.date}</span>
                    <button className="flex items-center gap-1 text-xs font-semibold text-pink-400 hover:text-pink-600 transition-colors">
                      {expandedId === article.id ? "Свернуть" : "Читать"}
                      <Icon name={expandedId === article.id ? "ChevronUp" : "ChevronRight"} size={14} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Stats bar */}
        <div className="mt-12 flex flex-wrap gap-6 justify-center">
          {[
            { label: "статей", value: ARTICLES.length, emoji: "📝" },
            { label: "категорий", value: CATEGORIES.length - 1, emoji: "🗂️" },
            { label: "минут чтения", value: "50+", emoji: "⏱️" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-2 bg-white rounded-2xl px-5 py-3 shadow-sm border border-gray-100">
              <span className="text-xl">{stat.emoji}</span>
              <span className="font-bold text-gray-800 text-lg">{stat.value}</span>
              <span className="text-gray-400 text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-pink-100 py-8 text-center text-gray-400 text-sm font-nunito">
        <div className="font-pacifico text-pink-400 text-lg mb-1">Мария Михайловна Говорова</div>
        <div>Воспитатель с любовью к детям 💛</div>
      </footer>
    </div>
  );
};

export default Index;

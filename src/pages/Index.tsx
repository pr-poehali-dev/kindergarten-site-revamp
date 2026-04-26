import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const API_URL = "https://functions.poehali.dev/37ebd32c-4851-436c-9717-a97cf2f6f2b6";

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

const NAV_LINKS = ["О себе", "Занятия", "Галерея", "Достижения", "Статьи", "Контакты"];

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

const Index = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [openArticle, setOpenArticle] = useState<Article | null>(null);

  useEffect(() => {
    fetch(API_URL)
      .then((r) => r.json())
      .then((d) => setArticles(d.articles || []))
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, []);

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
    <div className="min-h-screen font-nunito" style={{ background: "linear-gradient(135deg, #fff8f0 0%, #fef3f8 50%, #f0f8ff 100%)" }}>

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

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md shadow-sm border-b border-pink-100">
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
                  {articles.filter((a) => a.category === cat.id).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl border border-gray-100 h-52 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
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
                  <h2 className="font-bold text-gray-800 text-lg leading-snug mb-3 group-hover:text-pink-500 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
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

        {!loading && (
          <div className="mt-12 flex flex-wrap gap-6 justify-center">
            {[
              { label: "статей", value: articles.length, emoji: "📝" },
              { label: "категорий", value: CATEGORIES.length - 1, emoji: "🗂️" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2 bg-white rounded-2xl px-5 py-3 shadow-sm border border-gray-100">
                <span className="text-xl">{stat.emoji}</span>
                <span className="font-bold text-gray-800 text-lg">{stat.value}</span>
                <span className="text-gray-400 text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        )}
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

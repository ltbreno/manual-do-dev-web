import { articles, getFeaturedArticle, getMostRead, ALL_CATEGORIES, CATEGORY_COLORS } from "@/lib/blog";
import FeaturedHero from "@/components/blog/FeaturedHero";
import ArticleCard from "@/components/blog/ArticleCard";
import { TrendingUp } from "lucide-react";


export const metadata = {
  title: "Blog — Manual do Brasileiro",
  description: "Artigos, guias e dicas para brasileiros que vivem ou planejam se mudar para os Estados Unidos.",
};

export default function BlogPage() {
  const featured = getFeaturedArticle();
  const mostRead = getMostRead(4);
  const otherArticles = articles.filter((a) => !a.featured);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header band */}
      <div className="bg-[var(--brand-verde-escuro)] text-white pt-28 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold">Manual do Brasileiro</h1>
          <p className="mt-2 text-white/70 text-base max-w-xl">
            Guias, artigos e dicas para brasileiros que vivem ou planejam se mudar para os Estados Unidos.
          </p>

          {/* Category pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="bg-white text-[var(--brand-verde-escuro)] text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wide cursor-pointer">
              Todos
            </span>
            {ALL_CATEGORIES.map((cat) => {
              const colors = CATEGORY_COLORS[cat];
              return (
                <span
                  key={cat}
                  className={`${colors.bg} ${colors.text} text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wide opacity-80 hover:opacity-100 cursor-pointer transition-opacity`}
                >
                  {cat}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Featured + Mais Lidas lado a lado */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-14">
          {/* Featured hero — ocupa 2/3 */}
          <div className="lg:col-span-2">
            <FeaturedHero article={featured} />
          </div>

          {/* Mais Lidas — ocupa 1/3 */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="w-4 h-4 text-[var(--brand-verde)]" />
              <h2 className="font-bold text-base text-[var(--foreground)] uppercase tracking-wide">Mais Lidas</h2>
            </div>
            <div className="flex flex-col gap-5">
              {mostRead.map((article, i) => (
                <div key={article.slug} className="flex gap-3 items-start">
                  <span className="text-3xl font-black text-[var(--neutral-200)] dark:text-[var(--neutral-700)] leading-none mt-1 w-8 flex-shrink-0">
                    {i + 1}
                  </span>
                  <ArticleCard article={article} variant="horizontal" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-[var(--card-border)]" />
          <span className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-widest">Todos os Artigos</span>
          <div className="flex-1 h-px bg-[var(--card-border)]" />
        </div>

        {/* Article grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-20 bg-[var(--brand-verde-escuro)] rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--brand-verde)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[var(--brand-bege)]/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
          <div className="relative">
            <span className="bg-[var(--brand-verde)]/20 text-[var(--brand-verde)] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-4">
              Novidades semanais
            </span>
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Não perca nenhum artigo
            </h3>
            <p className="text-white/70 mb-6 max-w-md mx-auto">
              Receba os melhores guias sobre imigração, negócios e vida nos EUA diretamente no seu e-mail.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="seu@email.com"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--brand-verde)] transition-colors"
              />
              <button className="px-6 py-3 bg-[var(--brand-verde)] hover:bg-[var(--brand-verde-dark)] text-white font-semibold rounded-xl transition-colors whitespace-nowrap">
                Quero receber
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Eye, Calendar, User } from "lucide-react";
import { getArticleBySlug, articles, formatDate } from "@/lib/blog";
import CategoryBadge from "@/components/blog/CategoryBadge";
import ArticleCard from "@/components/blog/ArticleCard";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Artigo não encontrado" };
  return {
    title: `${article.title} — Manual do Brasileiro`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = articles
    .filter((a) => a.slug !== slug && a.category === article.category)
    .slice(0, 3);

  const fallbackRelated = articles
    .filter((a) => a.slug !== slug)
    .slice(0, 3 - related.length);

  const relatedArticles = [...related, ...fallbackRelated].slice(0, 3);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero image */}
      <div className="relative h-[320px] md:h-[480px] bg-[var(--neutral-900)]">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Back link */}
        <div className="absolute top-0 left-0 right-0 pt-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para o Blog
            </Link>
          </div>
        </div>

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 pb-8 md:pb-12">
          <div className="max-w-4xl mx-auto">
            <CategoryBadge category={article.category} />
            <h1 className="mt-3 text-2xl md:text-4xl font-bold text-white leading-tight">
              {article.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Article body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-4 pb-8 border-b border-[var(--card-border)] text-sm text-[var(--muted-foreground)]">
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            {article.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {formatDate(article.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {article.readTime} min de leitura
          </span>
          {article.views && (
            <span className="flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              {article.views.toLocaleString("pt-BR")} visualizações
            </span>
          )}
        </div>

        {/* Excerpt */}
        <p className="mt-8 text-lg text-[var(--muted-foreground)] leading-relaxed font-medium border-l-4 border-[var(--brand-verde)] pl-5">
          {article.excerpt}
        </p>

        {/* Content */}
        <div
          className="mt-8 prose-blog"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* CTA Raio-X */}
        <div className="mt-12 bg-gradient-to-br from-[var(--brand-verde-escuro)] to-[var(--brand-verde-escuro-dark)] rounded-2xl p-6 md:p-8 text-white">
          <h3 className="text-xl font-bold mb-2">Quer saber se sua empresa está pronta para os EUA?</h3>
          <p className="text-white/70 mb-5">
            Faça o diagnóstico gratuito e receba um relatório personalizado sobre o potencial de expansão do seu negócio.
          </p>
          <Link
            href="/raio-x"
            className="inline-flex items-center gap-2 bg-[var(--brand-verde)] hover:bg-[var(--brand-verde-dark)] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Fazer Diagnóstico Grátis
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </div>

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <div className="bg-[var(--neutral-50)] dark:bg-[var(--neutral-900)] py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-8">Artigos Relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

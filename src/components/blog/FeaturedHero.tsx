import Link from "next/link";
import { Clock, Eye, ArrowRight } from "lucide-react";
import { Article, formatDate } from "@/lib/blog";
import CategoryBadge from "./CategoryBadge";

interface FeaturedHeroProps {
  article: Article;
}

export default function FeaturedHero({ article }: FeaturedHeroProps) {
  return (
    <Link href={`/blog/${article.slug}`} className="group block relative rounded-3xl overflow-hidden h-[480px] md:h-[540px]">
      {/* Background image */}
      <img
        src={article.imageUrl}
        alt={article.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
        <div className="flex items-center gap-3 mb-3">
          <CategoryBadge category={article.category} />
          <span className="text-white/70 text-sm flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime} min de leitura
          </span>
          {article.views && (
            <span className="text-white/70 text-sm hidden sm:flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {article.views.toLocaleString("pt-BR")} visualizações
            </span>
          )}
        </div>

        <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight max-w-3xl group-hover:text-[var(--brand-bege)] transition-colors">
          {article.title}
        </h1>

        <p className="mt-3 text-white/80 text-sm md:text-base max-w-2xl line-clamp-2 hidden sm:block">
          {article.excerpt}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-white/60 text-sm">{formatDate(article.date)}</span>
          <span className="flex items-center gap-2 text-[var(--brand-verde)] font-semibold text-sm group-hover:gap-3 transition-all">
            Ler artigo <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

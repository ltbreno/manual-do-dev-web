import Link from "next/link";
import { Clock, Eye } from "lucide-react";
import { Article, formatDate } from "@/lib/blog";
import CategoryBadge from "./CategoryBadge";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "horizontal";
}

export default function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  if (variant === "horizontal") {
    return (
      <Link href={`/blog/${article.slug}`} className="group flex gap-4 items-start">
        <div className="relative w-24 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-[var(--neutral-200)]">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex-1 min-w-0">
          <CategoryBadge category={article.category} size="sm" />
          <h3 className="mt-1 text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--brand-verde)] transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h3>
          <p className="mt-1 text-xs text-[var(--muted-foreground)]">{formatDate(article.date)}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${article.slug}`} className="group block">
      <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:border-[var(--brand-verde)]/30 h-full flex flex-col">
        {/* Image */}
        <div className="relative h-52 overflow-hidden bg-[var(--neutral-200)]">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <CategoryBadge category={article.category} />
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h2 className="font-bold text-[var(--foreground)] text-lg leading-snug group-hover:text-[var(--brand-verde-escuro)] transition-colors line-clamp-2">
            {article.title}
          </h2>
          <p className="mt-2 text-sm text-[var(--muted-foreground)] line-clamp-3 flex-1">
            {article.excerpt}
          </p>

          {/* Meta */}
          <div className="mt-4 pt-4 border-t border-[var(--card-border)] flex items-center justify-between text-xs text-[var(--muted-foreground)]">
            {/* Author */}
            <div className="flex items-center gap-1.5">
              {article.authorAvatar ? (
                <img
                  src={article.authorAvatar}
                  alt={article.author}
                  className="w-5 h-5 rounded-full object-cover ring-1 ring-[var(--brand-verde)]/30"
                />
              ) : (
                <div className="w-5 h-5 rounded-full bg-[var(--brand-verde)] flex items-center justify-center text-white text-[9px] font-bold">
                  {article.author.charAt(0)}
                </div>
              )}
              <span className="font-medium text-[var(--foreground)]">{article.author}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.readTime} min
              </span>
              {article.views && (
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {article.views.toLocaleString("pt-BR")}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

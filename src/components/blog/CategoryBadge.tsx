import { CATEGORY_COLORS } from "@/lib/blog";

interface CategoryBadgeProps {
  category: string;
  size?: "sm" | "md";
}

export default function CategoryBadge({ category, size = "md" }: CategoryBadgeProps) {
  const colors = CATEGORY_COLORS[category] ?? { bg: "bg-[var(--neutral-700)]", text: "text-white", border: "" };
  const sizeClass = size === "sm" ? "text-xs px-2 py-0.5" : "text-xs px-3 py-1";

  return (
    <span className={`${colors.bg} ${colors.text} ${sizeClass} rounded-full font-semibold tracking-wide uppercase inline-block`}>
      {category}
    </span>
  );
}

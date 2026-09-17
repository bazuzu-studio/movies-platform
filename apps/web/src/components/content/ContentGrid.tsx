import type { ContentItem } from "@/lib/types";
import { MovieCard } from "./MovieCard";
import { SkeletonCard } from "@/components/ui/States";

interface ContentGridProps {
items: ContentItem[];
loading?: boolean;
}

export function ContentGrid({
items,
loading = false,
}: ContentGridProps) {
if (loading) {
return ( <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 xl:grid-cols-5">
{Array.from({ length: 10 }).map((_, index) => ( <SkeletonCard key={index} />
))} </div>
);
}

if (items.length === 0) {
return null;
}

return ( <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 xl:grid-cols-5">
{items.map((item) => ( <MovieCard key={item.id} item={item} />
))} </div>
);
}

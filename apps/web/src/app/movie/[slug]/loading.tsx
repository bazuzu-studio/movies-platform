import { HeroSkeleton } from "@/components/ui/Skeletons";

export default function Loading() {
  return (
    <div className="bg-[#08080A] text-white">
      <HeroSkeleton />
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Скелетон похожих фильмов */}
        <div className="mt-14">
          <div className="h-7 w-48 rounded-lg bg-[#121214] animate-pulse mb-5" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <div className="aspect-[2/3] rounded-xl bg-[#121214] animate-pulse" />
                <div className="h-3 w-3/4 rounded bg-[#121214] animate-pulse mt-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

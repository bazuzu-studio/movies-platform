import { HeroSkeleton } from "@/components/ui/Skeletons";

export default function Loading() {
  return (
    <div className="bg-[#08080A] text-white">
      <HeroSkeleton />
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Скелетон плеера */}
        <div className="mt-14">
          <div className="aspect-video w-full rounded-xl bg-[#121214] animate-pulse" />
        </div>

        {/* Скелетон списка эпизодов */}
        <div className="mt-8">
          <div className="h-7 w-56 rounded-lg bg-[#121214] animate-pulse mb-5" />
          <div className="grid gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 rounded-xl bg-white/3 border border-white/6"
              >
                <div className="w-12 h-12 rounded-lg bg-[#121214] animate-pulse shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-1/3 rounded bg-[#121214] animate-pulse" />
                  <div className="h-3 w-2/3 rounded bg-[#121214] animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

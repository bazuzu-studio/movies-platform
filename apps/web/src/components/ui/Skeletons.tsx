// Переиспользуемые скелетоны для loading.tsx.
// SkeletonCard уже есть в States.tsx — здесь то, чего не хватает.

export function HeroSkeleton() {
  return (
    <div className="bg-[#08080A] text-white">
      {/* Backdrop */}
      <div className="relative h-[300px] sm:h-[420px] overflow-hidden">
        <div className="absolute inset-0 bg-[#121214] animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-[#08080A]/60 to-transparent" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10 pb-12">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Poster */}
          <div className="shrink-0 w-48 sm:w-56 lg:w-64 mx-auto md:mx-0">
            <div className="aspect-[2/3] rounded-2xl bg-[#121214] animate-pulse ring-1 ring-white/10" />
          </div>

          {/* Info */}
          <div className="flex-1 space-y-4">
            <div className="flex gap-2">
              <div className="h-6 w-20 rounded-full bg-[#121214] animate-pulse" />
              <div className="h-6 w-16 rounded-full bg-[#121214] animate-pulse" />
              <div className="h-6 w-14 rounded-full bg-[#121214] animate-pulse" />
            </div>

            <div className="h-9 sm:h-12 w-3/4 rounded-lg bg-[#121214] animate-pulse" />
            <div className="h-4 w-1/2 rounded bg-[#121214] animate-pulse" />

            <div className="flex gap-5">
              <div className="h-4 w-16 rounded bg-[#121214] animate-pulse" />
              <div className="h-4 w-12 rounded bg-[#121214] animate-pulse" />
              <div className="h-4 w-20 rounded bg-[#121214] animate-pulse" />
            </div>

            <div className="space-y-2 max-w-2xl">
              <div className="h-3 w-full rounded bg-[#121214] animate-pulse" />
              <div className="h-3 w-5/6 rounded bg-[#121214] animate-pulse" />
              <div className="h-3 w-2/3 rounded bg-[#121214] animate-pulse" />
            </div>

            <div className="h-11 w-48 rounded-xl bg-[#121214] animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContentRowSkeleton() {
  return (
    <div className="mt-14">
      <div className="h-7 w-56 rounded-lg bg-[#121214] animate-pulse mb-5" />
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="shrink-0 w-[160px] sm:w-[200px]"
          >
            <div className="aspect-[2/3] rounded-xl bg-[#121214] animate-pulse" />
            <div className="h-3 w-3/4 rounded bg-[#121214] animate-pulse mt-2" />
            <div className="h-2 w-1/2 rounded bg-[#121214] animate-pulse mt-1.5" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CatalogGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="bg-[#08080A] min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Заголовок + фильтры */}
        <div className="mb-8">
          <div className="h-8 w-48 rounded-lg bg-[#121214] animate-pulse mb-4" />
          <div className="flex gap-2 flex-wrap">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-8 w-24 rounded-lg bg-[#121214] animate-pulse" />
            ))}
          </div>
        </div>

        {/* Сетка карточек */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i}>
              <div className="aspect-[2/3] rounded-xl bg-[#121214] animate-pulse" />
              <div className="h-3 w-3/4 rounded bg-[#121214] animate-pulse mt-2" />
              <div className="h-2 w-1/2 rounded bg-[#121214] animate-pulse mt-1.5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="bg-[#08080A] min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Шапка профиля */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-20 h-20 rounded-full bg-[#121214] animate-pulse" />
          <div className="space-y-2">
            <div className="h-6 w-40 rounded bg-[#121214] animate-pulse" />
            <div className="h-4 w-28 rounded bg-[#121214] animate-pulse" />
          </div>
        </div>

        {/* Сетка */}
        <div className="h-7 w-48 rounded-lg bg-[#121214] animate-pulse mb-5" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i}>
              <div className="aspect-[2/3] rounded-xl bg-[#121214] animate-pulse" />
              <div className="h-3 w-3/4 rounded bg-[#121214] animate-pulse mt-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

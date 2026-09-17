import { HeroSkeleton, ContentRowSkeleton } from "@/components/ui/Skeletons";

export default function Loading() {
  return (
    <div className="bg-[#08080A] text-white">
      <HeroSkeleton />
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <ContentRowSkeleton />
        <ContentRowSkeleton />
      </div>
    </div>
  );
}

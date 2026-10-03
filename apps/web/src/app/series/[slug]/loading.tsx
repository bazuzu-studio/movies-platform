import { cn } from "@/lib/utils";

export default function Loading() {
  return (
    <div className="bg-[#08080A] text-white" aria-busy="true">
      <div className="h-[220px] sm:h-[420px] animate-pulse bg-[#121214]" />
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          <div className="mx-auto md:mx-0 w-36 sm:w-56 lg:w-64 aspect-[2/3] rounded-2xl bg-[#1a1a1d] animate-pulse" />
          <div className="flex-1 space-y-3 pt-2 md:pt-16">
            <div className={cn("mx-auto md:mx-0 h-8 w-2/3 rounded-lg bg-[#1a1a1d] animate-pulse")} />
            <div className="mx-auto md:mx-0 h-4 w-1/3 rounded bg-[#121214] animate-pulse" />
            <div className="h-3 w-full max-w-2xl rounded bg-[#121214] animate-pulse" />
            <div className="h-3 w-5/6 max-w-2xl rounded bg-[#121214] animate-pulse" />
            <div className="h-12 w-full sm:w-44 rounded-xl bg-[#1a1a1d] animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

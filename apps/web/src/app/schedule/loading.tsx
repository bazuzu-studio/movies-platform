export default function Loading() {
  return (
    <div className="mx-auto max-w-[900px] animate-pulse space-y-3 px-4 pt-8 sm:px-6 lg:px-8">
      <div className="mb-8 h-9 w-64 rounded bg-white/6" />
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-[96px] rounded-xl bg-white/[0.04]" />
      ))}
    </div>
  );
}

export default function Loading() {
  return (
    <div className="container mx-auto px-4 pt-40 pb-32">
      <div className="mb-20 space-y-4 text-center">
        <div className="mx-auto h-4 w-32 animate-pulse rounded-full bg-[#E2E2E2]" />
        <div className="mx-auto h-12 w-96 max-w-full animate-pulse rounded bg-[#E2E2E2]" />
        <div className="mx-auto h-5 w-2/3 max-w-2xl animate-pulse rounded bg-[#E2E2E2]" />
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-[2.5rem] border border-[#E2E2E2] bg-white/80 p-6 shadow-sm backdrop-blur-xl"
          >
            <div className="aspect-[4/5] animate-pulse rounded-[2rem] bg-[#E2E2E2]" />
            <div className="mt-6 space-y-3">
              <div className="h-6 w-40 animate-pulse rounded bg-[#E2E2E2]" />
              <div className="h-4 w-28 animate-pulse rounded bg-[#E2E2E2]" />
              <div className="h-4 w-full animate-pulse rounded bg-[#E2E2E2]" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-[#E2E2E2]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default function Loading() {
  return (
    <div className="container mx-auto px-4 pt-40 pb-24">
      {/* Header */}
      <div className="text-center mb-16 space-y-4">
        <div className="h-4 w-32 mx-auto rounded-full bg-[#E2E2E2] animate-pulse" />
        <div className="h-10 w-96 max-w-full mx-auto rounded bg-[#E2E2E2] animate-pulse" />
        <div className="h-5 w-2/3 max-w-xl mx-auto rounded bg-[#E2E2E2] animate-pulse" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="rounded-[2rem] border border-[#E2E2E2] bg-white/80 p-8 backdrop-blur-xl"
          >
            <div className="space-y-6">
              {/* Icon */}
              <div className="h-14 w-14 rounded-2xl bg-[#E2E2E2] animate-pulse" />

              {/* Title */}
              <div className="h-6 w-2/3 rounded bg-[#E2E2E2] animate-pulse" />

              {/* Text */}
              <div className="space-y-2">
                <div className="h-4 rounded bg-[#E2E2E2] animate-pulse" />
                <div className="h-4 w-5/6 rounded bg-[#E2E2E2] animate-pulse" />
              </div>

              {/* CTA */}
              <div className="h-4 w-24 rounded bg-[#E2E2E2] animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
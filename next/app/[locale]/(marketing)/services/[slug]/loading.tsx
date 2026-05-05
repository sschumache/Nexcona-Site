export default function Loading() {
  return (
    <div className="container mx-auto px-4 pt-36 pb-24">
      {/* Back link */}
      <div className="h-4 w-40 mb-10 rounded bg-[#E2E2E2] animate-pulse" />

      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div className="space-y-6">
          <div className="h-4 w-24 rounded-full bg-[#E2E2E2] animate-pulse" />
          <div className="h-10 w-3/4 rounded bg-[#E2E2E2] animate-pulse" />
          <div className="h-5 w-full rounded bg-[#E2E2E2] animate-pulse" />
          <div className="h-5 w-5/6 rounded bg-[#E2E2E2] animate-pulse" />
          <div className="h-12 w-40 rounded-full bg-[#E2E2E2] animate-pulse" />
        </div>

        {/* Image */}
        <div className="h-[420px] rounded-[2.5rem] bg-[#E2E2E2] animate-pulse" />
      </div>

      {/* Content */}
      <div className="mt-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-10">
        <div className="rounded-[2rem] border border-[#E2E2E2] p-8 space-y-4">
          <div className="h-6 w-48 rounded bg-[#E2E2E2] animate-pulse" />
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-4 rounded bg-[#E2E2E2] animate-pulse" />
          ))}
        </div>

        <div className="rounded-[2rem] border border-[#E2E2E2] p-8 space-y-4">
          <div className="h-6 w-40 rounded bg-[#E2E2E2] animate-pulse" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-4 rounded bg-[#E2E2E2] animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
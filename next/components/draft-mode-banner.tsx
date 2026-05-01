'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function DraftModeBanner() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  const [isIframe, setIsIframe] = useState(true);

  useEffect(() => {
    setIsIframe(window !== window.top);
  }, []);

  const handleExitDraft = async () => {
    setIsExiting(true);

    try {
      await fetch('/api/exit-preview');
      router.refresh();
    } catch (error) {
      console.error('Failed to exit draft mode:', error);
      setIsExiting(false);
    }
  };

  if (isIframe) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-4 rounded-lg border border-[#E2E2E2] bg-[#F8F9FA] px-6 py-3 text-[#2B2B2B] shadow-lg">
      <div className="flex items-center gap-2">
        <span className="inline-block h-4 w-4 animate-pulse rounded-full bg-[#003F6B]" />
        <span className="font-semibold">Draft Mode</span>
      </div>

      <button
        onClick={handleExitDraft}
        disabled={isExiting}
        className="rounded bg-[#E2E2E2] px-4 py-1 text-sm font-medium text-[#2B2B2B] transition-colors hover:bg-[#2B2B2B] hover:text-white disabled:opacity-50"
      >
        {isExiting ? 'Exiting...' : 'Exit Draft'}
      </button>
    </div>
  );
}
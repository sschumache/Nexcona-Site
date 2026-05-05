'use client';

import { motion, useAnimate } from 'framer-motion';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';

type GraphItem = {
  number?: string | number;
  text?: string;
};

export const SkeletonThree = ({
  items = [],
  highlightedText,
}: {
  items?: GraphItem[];
  highlightedText?: string;
}) => {
  const [scope, animate] = useAnimate();
  const [animating, setAnimating] = useState(false);

  const enterAnimation = async () => {
    if (animating) return;

    setAnimating(true);
    await animate(
      '.message',
      { scale: [0, 1] },
      { duration: 0.4 }
    );
    setAnimating(false);
  };

  const displayItems = items.length
    ? items
    : [
        { number: '6,092', text: 'Last Month' },
        { number: '72K', text: 'Modules delivered' },
      ];

  return (
    <div
      ref={scope}
      className="overflow-hidden h-full relative"
      onMouseEnter={enterAnimation}
    >
      {/* 🔢 Top Stats */}
      <div className="flex justify-between gap-4">
        {displayItems.slice(0, 2).map((item, index) => (
          <div key={index} className="flex flex-col gap-1">
            <span className="font-medium">{item.number}</span>
            <span className="text-xs text-neutral-500">{item.text}</span>
          </div>
        ))}
      </div>

      {/* 📊 Graph + Bubble */}
      <div className="flex flex-col gap-4 items-center justify-center h-full relative">
        <div className="message z-40 absolute left-10 top-10 rounded-full px-4 py-2 shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)_inset]">
          <p className="text-xs">
            <Cover>{highlightedText || '+8,008'}</Cover> launched
          </p>
        </div>

        {/* 🎨 Graph SVG bleibt wie gehabt */}
        <div className="p-8 relative">
          <div className="absolute inset-y-0 h-full w-20 right-16 z-30 bg-gradient-to-r from-transparent via-[#121213] via-[70%] to-[#121213]" />
          <div className="absolute inset-y-0 h-full w-20 left-16 z-30 bg-gradient-to-l from-transparent via-[#121213] via-[70%] to-[#121213]" />

          {/* dein bestehendes SVG unverändert */}
          <svg
            width="335"
            height="163"
            viewBox="0 0 335 163"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-neutral-600"
          >
            {/* ... unverändert lassen ... */}
          </svg>
        </div>
      </div>
    </div>
  );
};

const Cover = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        'border rounded-md px-1 py-0.5 mr-1 border-indigo-500 bg-indigo-500/10 text-white',
        className
      )}
    >
      {children}
    </span>
  );
};
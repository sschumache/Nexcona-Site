'use client';

import React from 'react';

type RayItems = {
  item_1?: string;
  item_2?: string;
  item_3?: string;
};

export const SkeletonTwo = ({
  beforeItems,
  afterItems,
}: {
  beforeItems?: RayItems;
  afterItems?: RayItems;
}) => {
  const before = [
    beforeItems?.item_1,
    beforeItems?.item_2,
    beforeItems?.item_3,
  ].filter(Boolean) as string[];

  const after = [
    afterItems?.item_1,
    afterItems?.item_2,
    afterItems?.item_3,
  ].filter(Boolean) as string[];

  const left = before.length ? before : ['Analyse', 'Architektur', 'Umsetzung'];

  const right = after.length ? after : ['Cloud', 'Security', 'Automation'];

  return (
    <div className="relative flex items-center justify-center h-full w-full">
      {/* Left side */}
      <div className="absolute left-0 flex flex-col gap-2 text-xs text-gray-500">
        {left.map((item, index) => (
          <div key={index} className="px-2 py-1 bg-white rounded shadow-sm">
            {item}
          </div>
        ))}
      </div>

      {/* Center Ray */}
      <div className="w-[2px] h-32 bg-gradient-to-b from-[#003F6B] to-[#00AEEF]" />

      {/* Right side */}
      <div className="absolute right-0 flex flex-col gap-2 text-xs text-gray-500">
        {right.map((item, index) => (
          <div key={index} className="px-2 py-1 bg-white rounded shadow-sm">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

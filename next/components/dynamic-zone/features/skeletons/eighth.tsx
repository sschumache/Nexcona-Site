'use client';

import React from 'react';

export const SkeletonEight = ({ items }: { items?: any[] }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full gap-4 p-6">
      {items?.map((item, index) => (
        <div key={index} className="text-center">
          <div className="text-2xl font-bold text-[#003F6B]">{item?.value}</div>
          <div className="text-xs text-gray-500">{item?.label}</div>
        </div>
      ))}
    </div>
  );
};

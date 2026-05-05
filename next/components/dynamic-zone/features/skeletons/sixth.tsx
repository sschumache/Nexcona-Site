'use client';
import React from 'react';

export const SkeletonSix = ({ items }: { items?: any[] }) => {
  return (
    <div className="flex gap-4 overflow-x-auto h-full p-4">
      {items?.map((item, index) => (
        <div
          key={index}
          className="min-w-[250px] rounded-xl bg-white shadow p-4 flex-shrink-0"
        >
          <h4 className="font-semibold text-sm mb-2">{item?.title}</h4>
          <p className="text-xs text-gray-500">{item?.description}</p>
        </div>
      ))}
    </div>
  );
};
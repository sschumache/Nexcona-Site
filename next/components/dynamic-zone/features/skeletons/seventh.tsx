'use client';
import React, { useState } from 'react';

export const SkeletonSeven = ({ items }: { items?: any[] }) => {
  const [active, setActive] = useState<number | null>(0);

  return (
    <div className="w-full flex flex-col gap-2 p-4">
      {items?.map((item, index) => {
        const isOpen = active === index;

        return (
          <div
            key={index}
            className="border rounded-xl p-4 cursor-pointer bg-white"
            onClick={() => setActive(isOpen ? null : index)}
          >
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-sm">{item?.title}</h4>
              <span>{isOpen ? '-' : '+'}</span>
            </div>

            {isOpen && (
              <p className="text-xs text-gray-500 mt-2">
                {item?.description}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};
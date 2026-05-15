'use client';

import React, { useEffect, useRef, useState } from 'react';

type Item = {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: {
    url?: string;
  };
};

export const SkeletonSix = ({ items = [] }: { items?: Item[] }) => {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const children = Array.from(container.children) as HTMLElement[];

      let closestIndex = 0;
      let closestDistance = Infinity;

      children.forEach((child, index) => {
        const rect = child.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        const viewportCenter = window.innerWidth / 2;
        const distance = Math.abs(viewportCenter - center);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex gap-6 overflow-x-auto h-full px-10 py-6 snap-x snap-mandatory scroll-smooth"
    >
      {items.map((item, index) => {
        const imageUrl = item?.image?.url
          ? `${baseUrl}${item.image.url}`
          : null;

        const isActive = index === activeIndex;

        return (
          <div
            key={index}
            className={`
              relative min-w-[320px] h-[440px] rounded-3xl overflow-hidden snap-center flex-shrink-0
              transition-all duration-500
              ${isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-60 blur-[1px]'}
            `}
          >
            {/* Background */}
            {imageUrl && (
              <img
                src={imageUrl}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 p-6 text-white">
              <p className="text-xs opacity-70">{item.subtitle}</p>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-sm opacity-80 mt-2 max-w-xs">
                {item.description}
              </p>
            </div>

            {/* Button */}
            <div className="absolute bottom-4 right-4 h-10 w-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white text-lg">
              +
            </div>
          </div>
        );
      })}
    </div>
  );
};

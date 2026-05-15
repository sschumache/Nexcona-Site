'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useMemo, useState } from 'react';

import { IconContainer } from '../icon-container';
import ShootingStars from '@/components/decorations/shooting-star';
import StarBackground from '@/components/decorations/star-background';
import { cn } from '@/lib/utils';

type CmsLogo = {
  id?: number;
  title?: string;
  name?: string;
  url?: string;
  image?: {
    url?: string;
    alternativeText?: string;
  };
  logo?: {
    url?: string;
    alternativeText?: string;
  };
};

type PositionedLogo = {
  title: string;
  imageUrl: string;
  alt: string;
  className: string;
};

const positions = [
  'left-2 top-2',
  'left-32 top-32',
  'left-1/2 top-1/2',
  'left-1/2 top-20',
  'right-20 top-20',
  'right-20 bottom-0',
  'left-52 bottom-10',
  'left-32 bottom-60',
  'right-96 top-24',
  'left-10 bottom-0',
  'right-40 top-0',
  'right-40 top-40',
  'right-0 bottom-60',
  'right-10 bottom-80',
];

let loopInterval: NodeJS.Timeout;

export const SkeletonFour = ({ logos = [] }: { logos?: CmsLogo[] }) => {
  const icons = useMemo<PositionedLogo[]>(() => {
    return logos
      .map((logo, index) => {
        const imageUrl = logo?.image?.url || logo?.logo?.url || logo?.url;

        if (!imageUrl) return null;

        return {
          title: logo?.title || logo?.name || `Logo ${index + 1}`,
          imageUrl,
          alt:
            logo?.image?.alternativeText ||
            logo?.logo?.alternativeText ||
            logo?.title ||
            logo?.name ||
            'Logo',
          className: positions[index % positions.length],
        };
      })
      .filter(Boolean) as PositionedLogo[];
  }, [logos]);

  const [active, setActive] = useState<PositionedLogo | null>(null);

  useEffect(() => {
    if (!icons.length) return;

    setActive(icons[0]);

    loopInterval = setInterval(() => {
      setActive(icons[Math.floor(Math.random() * icons.length)]);
    }, 3000);

    return () => clearInterval(loopInterval);
  }, [icons]);

  return (
    <div className="p-8 overflow-hidden h-full relative flex flex-col group [perspective:8000px] [transform-style:preserve-3d]">
      <StarBackground />
      <ShootingStars />

      {icons.map((icon) => (
        <IconContainer
          className={cn(
            'rounded-full opacity-20 mx-2 absolute bg-white',
            icon.className,
            active?.title === icon.title && 'opacity-100'
          )}
          key={icon.title}
        >
          <img
            src={icon.imageUrl}
            alt={icon.alt}
            className="h-8 w-8 object-contain"
          />

          {active?.title === icon.title && (
            <motion.div
              layoutId="bubble"
              className="absolute h-16 w-16 inset-0 rounded-full border-2 -ml-0.5 -mt-0.5 border-indigo-500"
            />
          )}
        </IconContainer>
      ))}
    </div>
  );
};

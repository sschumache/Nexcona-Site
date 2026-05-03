import { Link } from 'next-view-transitions';
import React from 'react';

import { BlurImage } from './blur-image';
import { strapiImage } from '@/lib/strapi/strapiImage';
import { Image } from '@/types/types';

export const Logo = ({ image, locale }: { image?: Image; locale?: string }) => {
  if (!image?.url) return null;

  return (
    <Link
      href={`/${locale || 'en'}`}
      className="relative z-20 mr-4 flex items-center"
    >
      <BlurImage
        src={strapiImage(image.url)}
        alt={image.alternativeText || 'Nexcona Logo'}
        width={120}
        height={40}
        priority
        className="h-8 w-auto object-contain"
      />
    </Link>
  );
};

import { Link } from 'next-view-transitions';
import React from 'react';

import { BlurImage } from './blur-image';
import { strapiImage } from '@/lib/strapi/strapiImage';
import { Image } from '@/types/types';

export const Logo = ({
  image,
  locale,
}: {
  image?: Image;
  locale?: string;
}) => {
  if (!image) return null;

  return (
    <Link
      href={`/${locale || 'en'}`}
      className="relative z-20 mr-4 flex items-center space-x-2 text-sm font-normal"
    >
      <BlurImage
        src={strapiImage(image.url)}
        alt={image.alternativeText}
        width={200}
        height={200}
        className="h-10 w-10 rounded-xl"
      />

      <span className="font-bold text-[#2B2B2B] transition group-hover:text-[#003F6B]">
        Nexcona IT GmbH
      </span>
    </Link>
  );
};
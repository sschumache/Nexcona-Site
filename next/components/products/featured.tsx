import { Link } from 'next-view-transitions';
import React from 'react';

import { StrapiImage } from '@/components/ui/strapi-image';
import { formatNumber } from '@/lib/utils';
import { Product } from '@/types/types';

export const Featured = ({
  heading,
  sub_heading,
  products,
  locale,
}: {
  heading?: string | null;
  sub_heading?: string | null;
  products: Product[];
  locale: string;
}) => {
  const [firstProduct, secondProduct, thirdProduct] = products;

  return (
    <div className="py-20">
      <h2 className="mb-2 text-2xl font-semibold text-[#2B2B2B] md:text-4xl">
        {heading || 'Featured'}
      </h2>

      <p className="mb-10 mt-4 text-lg text-[#666666]">
        {sub_heading || 'Pick from our most popular collection'}
      </p>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        <div className="md:col-span-2">
          {firstProduct && (
            <FeaturedItem product={firstProduct} locale={locale} />
          )}
        </div>

        <div className="grid gap-10">
          {secondProduct && (
            <FeaturedItem product={secondProduct} locale={locale} />
          )}
          {thirdProduct && (
            <FeaturedItem product={thirdProduct} locale={locale} />
          )}
        </div>
      </div>
    </div>
  );
};

const FeaturedItem = ({
  product,
  locale,
}: {
  product: Product;
  locale: string;
}) => {
  return (
    <Link
      href={`/${locale}/products/${product.slug}` as never}
      className="group relative block overflow-hidden rounded-2xl border border-[#E2E2E2] bg-white transition duration-200 hover:shadow-md hover:border-[#003F6B]/30"
    >
      {/* dezentes Overlay statt schwarz */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-transparent to-white/40 opacity-0 transition duration-200 group-hover:opacity-100" />

      {/* Product Info */}
      <div className="absolute right-4 top-4 z-20 flex items-center gap-3 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-[#2B2B2B] shadow-sm backdrop-blur">
        <span>{product.name}</span>

        <span className="rounded-full bg-[#003F6B]/10 px-2 py-1 text-[#003F6B]">
          {locale === 'fr' ? '€' : '$'}
          {formatNumber(product.price, locale)}
        </span>
      </div>

      <StrapiImage
        src={product.images?.[0]?.url}
        alt={product.name}
        width={1000}
        height={1000}
        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
      />
    </Link>
  );
};
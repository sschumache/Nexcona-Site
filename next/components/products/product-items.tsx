import { Link } from 'next-view-transitions';
import React from 'react';

import { StrapiImage } from '@/components/ui/strapi-image';
import { formatNumber, truncate } from '@/lib/utils';
import { Product } from '@/types/types';

export const ProductItems = ({
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
  return (
    <div className="py-20">
      <h2 className="mb-2 text-2xl font-semibold text-[#2B2B2B] md:text-4xl">
        {heading || 'Popular'}
      </h2>

      <p className="mb-10 mt-4 text-lg text-[#666666]">
        {sub_heading || 'Recently rose to popularity'}
      </p>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
        {products.map((product) => (
          <ProductItem
            key={`regular-product-item-${product.id}`}
            product={product}
            locale={locale}
          />
        ))}
      </div>
    </div>
  );
};

const ProductItem = ({
  product,
  locale,
}: {
  product: Product;
  locale: string;
}) => {
  return (
    <Link
      href={`/${locale}/products/${product.slug}` as never}
      className="group block rounded-2xl border border-[#E2E2E2] bg-white p-3 transition duration-200 hover:border-[#003F6B]/30 hover:shadow-md"
    >
      <div className="relative overflow-hidden rounded-xl bg-[#F8F9FA]">
        <StrapiImage
          src={product?.images?.[0]?.url}
          alt={product.name}
          width={600}
          height={600}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-5">
        <div className="flex items-start justify-between gap-4">
          <span className="text-base font-medium text-[#2B2B2B] transition group-hover:text-[#003F6B]">
            {product.name}
          </span>

          <span className="shrink-0 rounded-full bg-[#003F6B]/10 px-2 py-1 text-xs font-semibold text-[#003F6B]">
            {locale === 'fr' ? '€' : '$'}
            {formatNumber(product.price, locale)}
          </span>
        </div>

        <p className="mt-4 text-sm text-[#666666]">
          {truncate(product.description, 100)}
        </p>
      </div>
    </Link>
  );
};
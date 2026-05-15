import { format } from 'date-fns';
import { Link } from 'next-view-transitions';
import React from 'react';
import Balancer from 'react-wrap-balancer';

import { BlurImage } from '@/components/blur-image';
import { strapiImage } from '@/lib/strapi/strapiImage';
import { truncate } from '@/lib/utils';
import { Article } from '@/types/types';

export const BlogCard = ({
  article,
  locale,
}: {
  article: Article;
  locale: string;
}) => {
  return (
    <Link
      className="group grid w-full grid-cols-1 overflow-hidden rounded-3xl border border-[#E2E2E2] bg-white shadow-derek transition duration-200 hover:scale-[1.02] hover:border-[#003F6B]/40 hover:shadow-md md:grid-cols-2"
      href={`/${locale}/blog/${article.slug}`}
    >
      <div>
        {article.image ? (
          <BlurImage
            src={strapiImage(article.image.url)}
            alt={article.title}
            height="1200"
            width="1200"
            className="h-full w-full rounded-3xl object-cover object-top"
          />
        ) : (
          <div className="flex h-full min-h-64 items-center justify-center bg-[#F8F9FA]" />
        )}
      </div>

      <div className="flex flex-col justify-between p-4 md:p-8">
        <div>
          <div className="mb-4 flex flex-wrap gap-4">
            {article.categories?.map((category, idx) => (
              <p
                key={`category-${idx}`}
                className="rounded-full bg-[#003F6B]/10 px-4 py-2 text-xs font-semibold capitalize text-[#003F6B]"
              >
                {category.name}
              </p>
            ))}
          </div>

          <p className="mb-4 text-lg font-bold text-[#2B2B2B] transition duration-200 group-hover:text-[#003F6B] md:text-4xl">
            <Balancer>{article.title}</Balancer>
          </p>

          <p className="mt-2 text-left text-base text-[#666666] md:text-xl">
            {truncate(article.description, 500)}
          </p>
        </div>

        <div className="mt-6 flex items-center space-x-2">
          <div className="h-1 w-1 rounded-full bg-[#306B8C]" />
          <p className="max-w-xl text-sm text-[#666666] transition duration-200 group-hover:text-[#003F6B]">
            {format(new Date(article.publishedAt), 'MMMM dd, yyyy')}
          </p>
        </div>
      </div>
    </Link>
  );
};

export const BlogCardVertical = ({
  article,
  locale,
}: {
  article: Article;
  locale: string;
}) => {
  return (
    <Link
      className="group w-full overflow-hidden rounded-3xl border border-[#E2E2E2] bg-white shadow-derek transition duration-200 hover:scale-[1.02] hover:border-[#003F6B]/40 hover:shadow-md"
      href={`/${locale}/blog/${article.slug}`}
    >
      <div>
        {article.image ? (
          <BlurImage
            src={strapiImage(article.image.url || '')}
            alt={article.title}
            height="800"
            width="800"
            className="h-64 w-full rounded-3xl object-cover object-top md:h-96"
          />
        ) : (
          <div className="flex h-64 items-center justify-center bg-[#F8F9FA] md:h-96" />
        )}
      </div>

      <div className="flex flex-col justify-between p-4 md:p-8">
        <div>
          <div className="mb-4 flex flex-wrap gap-4">
            {article.categories?.map((category, idx) => (
              <p
                key={`category-${idx}`}
                className="rounded-full bg-[#003F6B]/10 px-4 py-2 text-xs font-semibold capitalize text-[#003F6B]"
              >
                {category.name}
              </p>
            ))}
          </div>

          <p className="mb-4 text-lg font-bold text-[#2B2B2B] transition duration-200 group-hover:text-[#003F6B] md:text-xl">
            <Balancer>{article.title}</Balancer>
          </p>

          <p className="mt-2 text-left text-sm text-[#666666] md:text-base">
            {truncate(article.description, 500)}
          </p>
        </div>

        <div className="mt-6 flex items-center space-x-2">
          <div className="h-1 w-1 rounded-full bg-[#306B8C]" />
          <p className="max-w-xl text-sm text-[#666666] transition duration-200 group-hover:text-[#003F6B]">
            {format(new Date(article.publishedAt), 'MMMM dd, yyyy')}
          </p>
        </div>
      </div>
    </Link>
  );
};

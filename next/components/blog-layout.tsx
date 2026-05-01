import { IconArrowLeft } from '@tabler/icons-react';
import { format } from 'date-fns';
import { Link } from 'next-view-transitions';

import { Container } from './container';
import { AmbientColor } from './decorations/ambient-color';
import DynamicZoneManager from './dynamic-zone/manager';
import { StrapiImage } from '@/components/ui/strapi-image';
import { Article } from '@/types/types';

export async function BlogLayout({
  article,
  locale,
  children,
}: Readonly<{
  article: Article;
  locale: string;
  children: React.ReactNode;
}>) {
  return (
    <div className="relative overflow-hidden bg-white text-[#2B2B2B]">
      <Container className="mt-16 lg:mt-32">
        <div className="flex items-center justify-between px-2 py-8">
          <Link
            href={`/${locale}/blog`}
            className="flex items-center space-x-2 text-[#666666] transition hover:text-[#003F6B]"
          >
            <IconArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back</span>
          </Link>
        </div>

        <div className="mx-auto w-full">
          {article?.image ? (
            <StrapiImage
              src={article.image.url}
              height={800}
              width={800}
              className="h-40 w-full rounded-3xl object-cover md:h-96"
              alt={article.title}
            />
          ) : (
            <div className="flex h-40 w-full items-center justify-center rounded-3xl border border-[#E2E2E2] bg-[#F8F9FA] shadow-derek md:h-96" />
          )}
        </div>

        <div className="xl:relative">
          <div className="mx-auto max-w-2xl">
            <article className="pb-8 pt-8">
              <div className="flex flex-wrap gap-4">
                {article.categories?.map((category, idx) => (
                  <p
                    key={`category-${idx}`}
                    className="rounded-full bg-[#003F6B]/10 px-3 py-1 text-xs font-semibold capitalize text-[#003F6B]"
                  >
                    {category.name}
                  </p>
                ))}
              </div>

              <header className="flex flex-col">
                <h1 className="mt-8 text-4xl font-bold tracking-tight text-[#2B2B2B] sm:text-5xl">
                  {article.title}
                </h1>
              </header>

              <div className="prose prose-sm mt-8 max-w-none prose-headings:text-[#2B2B2B] prose-p:text-[#666666] prose-a:text-[#003F6B] prose-strong:text-[#2B2B2B] prose-code:text-[#003F6B] prose-blockquote:border-l-[#003F6B] prose-blockquote:text-[#666666]">
                {children}
              </div>

              <div className="mt-12 flex items-center space-x-2 border-t border-[#E2E2E2] pt-12">
                <div className="h-5 w-0.5 rounded-lg bg-[#306B8C]" />

                <time
                  dateTime={article.publishedAt}
                  className="flex items-center text-base"
                >
                  <span className="text-sm text-[#666666]">
                    {format(new Date(article.publishedAt), 'MMMM dd, yyyy')}
                  </span>
                </time>
              </div>
            </article>
          </div>
        </div>

        {article?.dynamic_zone && (
          <DynamicZoneManager
            dynamicZone={article.dynamic_zone}
            locale={locale}
          />
        )}
      </Container>
    </div>
  );
}
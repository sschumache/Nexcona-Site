import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import React from 'react';

import ClientSlugHandler from '../../ClientSlugHandler';
import { BlogLayout } from '@/components/blog-layout';
import { fetchCollectionType } from '@/lib/strapi';
import type { Article, LocaleSlugParamsProps } from '@/types/types';

export default async function SingleArticlePage({
  params,
}: LocaleSlugParamsProps) {
  const { slug, locale } = await params;
  const [article] = await fetchCollectionType<Article[]>('articles', {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    locale,
  });

  if (!article) {
    return <div>Blog not found</div>;
  }

  const localizedSlugs: Record<string, string> = { [locale]: slug };

  try {
    const [deArticle] = await fetchCollectionType<Article[]>('articles', {
      filters: { slug: { $eq: slug } },
      locale: 'de',
    });
    if (deArticle) localizedSlugs['de'] = (deArticle as any).slug ?? slug;
  } catch {}

  try {
    const [enArticle] = await fetchCollectionType<Article[]>('articles', {
      filters: { slug: { $eq: slug } },
      locale: 'en',
    });
    if (enArticle) localizedSlugs['en'] = (enArticle as any).slug ?? slug;
  } catch {}

  return (
    <BlogLayout article={article} locale={locale}>
      <ClientSlugHandler localizedSlugs={localizedSlugs} />
      <BlocksRenderer content={article.content} />
    </BlogLayout>
  );
}
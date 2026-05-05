import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ClientSlugHandler from '../ClientSlugHandler';
import PageContent from '@/lib/shared/PageContent';
import { generateMetadataObject } from '@/lib/shared/metadata';
import { fetchCollectionType } from '@/lib/strapi';
import type { LocaleSlugParamsProps } from '@/types/types';

export async function generateMetadata({
  params,
}: LocaleSlugParamsProps): Promise<Metadata> {
  const { slug, locale } = await params;

  let [pageData] = await fetchCollectionType('pages', {
    filters: { slug: { $eq: slug }, locale },
  });

  if (!pageData) {
    [pageData] = await fetchCollectionType('pages', {
      filters: { slug: { $eq: slug }, locale: 'en' },
    });
  }

  if (!pageData) return {};

  const seo = pageData.seo;
  const metadata = generateMetadataObject(seo);
  return metadata;
}

export default async function Page({ params }: LocaleSlugParamsProps) {
  const { slug, locale } = await params;

  let [pageData] = await fetchCollectionType('pages', {
    filters: { slug: { $eq: slug }, locale },
  });

  if (!pageData) {
    [pageData] = await fetchCollectionType('pages', {
      filters: { slug: { $eq: slug }, locale: 'en' },
    });
  }

  if (!pageData) return notFound();

  const localizedSlugs: Record<string, string> = { [locale]: slug };

  try {
    const [dePageData] = await fetchCollectionType('pages', {
      filters: { slug: { $eq: slug }, locale: 'de' },
    });
    if (dePageData) localizedSlugs['de'] = (dePageData as any).slug ?? slug;
  } catch {}

  try {
    const [enPageData] = await fetchCollectionType('pages', {
      filters: { slug: { $eq: slug }, locale: 'en' },
    });
    if (enPageData) localizedSlugs['en'] = (enPageData as any).slug ?? slug;
  } catch {}

  return (
    <>
      <ClientSlugHandler localizedSlugs={localizedSlugs} />
      <PageContent pageData={pageData} />
    </>
  );
}
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ClientSlugHandler from './ClientSlugHandler';
import PageContent from '@/lib/shared/PageContent';
import { generateMetadataObject } from '@/lib/shared/metadata';
import { fetchCollectionType } from '@/lib/strapi';
import type { LocaleParamsProps } from '@/types/types';

export async function generateMetadata({
  params,
}: LocaleParamsProps): Promise<Metadata> {
  const { locale } = await params;

  const [pageData] = await fetchCollectionType('pages', {
    filters: { slug: { $eq: 'homepage' }, locale },
  });

  if (!pageData) return {};

  const seo = pageData.seo;
  const metadata = generateMetadataObject(seo);
  return metadata;
}

export default async function HomePage({ params }: LocaleParamsProps) {
  const { locale } = await params;

  const [pageData] = await fetchCollectionType('pages', {
    filters: { slug: { $eq: 'homepage' }, locale },
  });

  if (!pageData) return notFound();

  const [dePageData] = await fetchCollectionType('pages', {
    filters: { slug: { $eq: 'homepage' }, locale: 'de' },
  });

  const [enPageData] = await fetchCollectionType('pages', {
    filters: { slug: { $eq: 'homepage' }, locale: 'en' },
  });

  const localizedSlugs: Record<string, string> = {};
  if (enPageData) localizedSlugs['en'] = '';
  if (dePageData) localizedSlugs['de'] = '';

  return (
    <>
      <ClientSlugHandler localizedSlugs={localizedSlugs} />
      <PageContent pageData={pageData} />
    </>
  );
}
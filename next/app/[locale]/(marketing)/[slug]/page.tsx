import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ClientSlugHandler from '../ClientSlugHandler';
import PageContent from '@/lib/shared/PageContent';
import { generateMetadataObject } from '@/lib/shared/metadata';
import { fetchCollectionType } from '@/lib/strapi';
import type { LocaleSlugParamsProps } from '@/types/types';

const pagePopulate = {
  seo: true,
  dynamic_zone: {
    populate: '*',
  },
};

export async function generateMetadata({
  params,
}: LocaleSlugParamsProps): Promise<Metadata> {
  const { slug, locale } = await params;

  const [pageData] = await fetchCollectionType('pages', {
    filters: { slug: { $eq: slug }, locale },
    populate: pagePopulate,
  });

  if (!pageData) return {};

  return generateMetadataObject(pageData.seo);
}

export default async function Page({ params }: LocaleSlugParamsProps) {
  const { slug, locale } = await params;

  const [pageData] = await fetchCollectionType('pages', {
    filters: { slug: { $eq: slug }, locale },
    populate: pagePopulate,
  });

  if (!pageData) return notFound();

  return (
    <>
      <ClientSlugHandler localizedSlugs={{ [locale]: slug }} />
      <PageContent pageData={pageData} locale={locale} />
    </>
  );
}

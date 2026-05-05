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
    on: {
      'dynamic-zone.hero': { populate: '*' },
      'dynamic-zone.features': {
        populate: {
          globe_card: true,
          ray_card: {
            populate: ['before_ray_items', 'after_ray_items'],
          },
          graph_card: {
            populate: ['top_items'],
          },
          social_media_card: {
            populate: {
              logos: {
                populate: '*',
              },
            },
          },
          tech_stack_card: {
            populate: {
              logos: {
                populate: '*',
              },
            },
          },
          slider_card: {
            populate: {
              items: {
                populate: ['image'],
              },
            },
          },
          accordion_card: {
            populate: ['items'],
          },
          business_value_card: {
            populate: ['items'],
          },
        },
      },
      'dynamic-zone.team-grid': { populate: '*' },
      'dynamic-zone.service-grid': { populate: '*' },
      'dynamic-zone.testimonials': { populate: '*' },
      'dynamic-zone.how-it-works': { populate: '*' },
      'dynamic-zone.brands': { populate: '*' },
      'dynamic-zone.pricing': { populate: '*' },
      'dynamic-zone.launches': { populate: '*' },
      'dynamic-zone.cta': { populate: '*' },
      'dynamic-zone.form-next-to-section': { populate: '*' },
      'dynamic-zone.faq': { populate: '*' },
      'dynamic-zone.related-products': { populate: '*' },
      'dynamic-zone.related-articles': { populate: '*' },
      'dynamic-zone.solution': { populate: '*' },
    },
  },
};

export async function generateMetadata({
  params,
}: LocaleSlugParamsProps): Promise<Metadata> {
  const { slug, locale } = await params;

  let [pageData] = await fetchCollectionType('pages', {
    filters: { slug: { $eq: slug }, locale },
    populate: pagePopulate,
  });

  if (!pageData) {
    [pageData] = await fetchCollectionType('pages', {
      filters: { slug: { $eq: slug }, locale: 'en' },
      populate: pagePopulate,
    });
  }

  if (!pageData) return {};

  return generateMetadataObject(pageData.seo);
}

export default async function Page({ params }: LocaleSlugParamsProps) {
  const { slug, locale } = await params;

  let [pageData] = await fetchCollectionType('pages', {
    filters: { slug: { $eq: slug }, locale },
    populate: pagePopulate,
  });

  if (!pageData) {
    [pageData] = await fetchCollectionType('pages', {
      filters: { slug: { $eq: slug }, locale: 'en' },
      populate: pagePopulate,
    });
  }

  if (!pageData) return notFound();

  const localizedSlugs: Record<string, string> = { [locale]: slug };

  try {
    const [dePageData] = await fetchCollectionType('pages', {
      filters: { slug: { $eq: slug }, locale: 'de' },
    });
    if (dePageData) localizedSlugs.de = (dePageData as any).slug ?? slug;
  } catch {}

  try {
    const [enPageData] = await fetchCollectionType('pages', {
      filters: { slug: { $eq: slug }, locale: 'en' },
    });
    if (enPageData) localizedSlugs.en = (enPageData as any).slug ?? slug;
  } catch {}

  return (
    <>
      <ClientSlugHandler localizedSlugs={localizedSlugs} />
      <PageContent pageData={pageData} />
    </>
  );
}
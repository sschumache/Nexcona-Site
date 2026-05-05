import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ClientSlugHandler from './ClientSlugHandler';
import PageContent from '@/lib/shared/PageContent';
import { generateMetadataObject } from '@/lib/shared/metadata';
import { fetchCollectionType } from '@/lib/strapi';
import type { LocaleParamsProps } from '@/types/types';

const pagePopulate = {
  seo: true,
  dynamic_zone: {
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
};

export async function generateMetadata({
  params,
}: LocaleParamsProps): Promise<Metadata> {
  const { locale } = await params;

  const [pageData] = await fetchCollectionType('pages', {
    filters: { slug: { $eq: 'homepage' }, locale },
    populate: pagePopulate,
  });

  if (!pageData) return {};

  return generateMetadataObject(pageData.seo);
}

export default async function HomePage({ params }: LocaleParamsProps) {
  const { locale } = await params;

  const [pageData] = await fetchCollectionType('pages', {
    filters: { slug: { $eq: 'homepage' }, locale },
    populate: pagePopulate,
  });

  if (!pageData) return notFound();

  return (
    <>
      <ClientSlugHandler localizedSlugs={{ [locale]: '' }} />
      <PageContent pageData={{ ...pageData, locale }} />
    </>
  );
}
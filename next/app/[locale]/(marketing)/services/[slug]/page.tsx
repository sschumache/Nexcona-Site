import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import ClientSlugHandler from '../../ClientSlugHandler';
import { Container } from '@/components/container';
import { AmbientColor } from '@/components/decorations/ambient-color';
import { Heading } from '@/components/elements/heading';
import { Subheading } from '@/components/elements/subheading';
import { fetchCollectionType } from '@/lib/strapi';
import type { LocaleSlugParamsProps } from '@/types/types';

export async function generateMetadata({
  params,
}: LocaleSlugParamsProps): Promise<Metadata> {
  const { slug, locale } = await params;

  const [service] = await fetchCollectionType('services', {
    locale,
    filters: {
      slug: {
        $eq: slug,
      },
    },
  });

  if (!service) return {};

  return {
    title: `${(service as any).name} | Nexcona`,
    description: (service as any).short_description || '',
  };
}

export default async function ServiceDetailPage({
  params,
}: LocaleSlugParamsProps) {
  const { slug, locale } = await params;

  const [service] = await fetchCollectionType('services', {
    locale,
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: ['icon', 'image'],
  });

  if (!service) return notFound();

  const item = service as any;

  const imageUrl = item.image?.url?.startsWith('http')
    ? item.image.url
    : item.image?.url
      ? `${process.env.NEXT_PUBLIC_API_URL}${item.image.url}`
      : undefined;

  const iconUrl = item.icon?.url?.startsWith('http')
    ? item.icon.url
    : item.icon?.url
      ? `${process.env.NEXT_PUBLIC_API_URL}${item.icon.url}`
      : undefined;

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <ClientSlugHandler localizedSlugs={{ [locale]: `services/${slug}` }} />
      <AmbientColor />

      <Container className="pt-40 pb-24">
        <div className="mx-auto max-w-4xl text-center">
          {iconUrl && (
            <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F4F7F9]">
              <Image
                src={iconUrl}
                alt={item.icon?.alternativeText || item.name}
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
                unoptimized
              />
            </div>
          )}

          <Heading as="h1" size="xl">
            {item.name}
          </Heading>

          {item.short_description && (
            <Subheading className="mx-auto mt-6 max-w-2xl">
              {item.short_description}
            </Subheading>
          )}
        </div>

        {imageUrl && (
          <div className="relative mx-auto mt-16 aspect-[16/9] max-w-5xl overflow-hidden rounded-[2rem] border border-[#E2E2E2] bg-[#F4F7F9]">
            <Image
              src={imageUrl}
              alt={item.image?.alternativeText || item.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}

        {item.description && (
          <div className="prose prose-neutral mx-auto mt-16 max-w-3xl">
            <p>{item.description}</p>
          </div>
        )}
      </Container>
    </div>
  );
}

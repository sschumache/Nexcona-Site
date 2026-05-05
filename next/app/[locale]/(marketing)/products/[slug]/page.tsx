import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { Container } from '@/components/container';
import ClientSlugHandler from '../../ClientSlugHandler';
import { AmbientColor } from '@/components/decorations/ambient-color';
import DynamicZoneManager from '@/components/dynamic-zone/manager';
import { SingleProduct } from '@/components/products/single-product';
import { generateMetadataObject } from '@/lib/shared/metadata';
import { fetchCollectionType, fetchSingleType } from '@/lib/strapi';
import type { LocaleSlugParamsProps, Product } from '@/types/types';

export async function generateMetadata({
  params,
}: LocaleSlugParamsProps): Promise<Metadata> {
  const { slug, locale } = await params;

  try {
    const [pageData] = await fetchCollectionType<Product[]>('products', {
      filters: { slug: { $eq: slug } },
      locale,
    });
    const seo = pageData;
    const metadata = generateMetadataObject(seo);
    return metadata;
  } catch {
    return {};
  }
}

export default async function SingleProductPage({
  params,
}: LocaleSlugParamsProps) {
  const { slug, locale } = await params;

  const [pageData] = await fetchCollectionType<Product[]>('products', {
    filters: { slug: { $eq: slug } },
    locale,
  });

  const globalData = await fetchSingleType('global', { locale });

  if (!pageData) {
    redirect('/products');
  }

  const localizedSlugs: Record<string, string> = { [locale]: slug };

  try {
    const [deProduct] = await fetchCollectionType<Product[]>('products', {
      filters: { slug: { $eq: slug } },
      locale: 'de',
    });
    if (deProduct) localizedSlugs['de'] = (deProduct as any).slug ?? slug;
  } catch {}

  try {
    const [enProduct] = await fetchCollectionType<Product[]>('products', {
      filters: { slug: { $eq: slug } },
      locale: 'en',
    });
    if (enProduct) localizedSlugs['en'] = (enProduct as any).slug ?? slug;
  } catch {}

  return (
    <div className="relative overflow-hidden w-full">
      <ClientSlugHandler localizedSlugs={localizedSlugs} />
      <AmbientColor />
      <Container className="py-20 md:py-40">
        <SingleProduct
          product={pageData}
          locale={locale}
          addToCartText={globalData.add_to_cart}
          buyNowText={globalData.buy_now}
        />
        {pageData?.dynamic_zone && (
          <DynamicZoneManager
            dynamicZone={pageData?.dynamic_zone}
            locale={locale}
          />
        )}
      </Container>
    </div>
  );
}
import { IconShoppingCartUp } from '@tabler/icons-react';
import { Metadata } from 'next';

import ClientSlugHandler from '../ClientSlugHandler';
import { Container } from '@/components/container';
import { AmbientColor } from '@/components/decorations/ambient-color';
import { FeatureIconContainer } from '@/components/dynamic-zone/features/feature-icon-container';
import { Heading } from '@/components/elements/heading';
import { Subheading } from '@/components/elements/subheading';
import { Featured } from '@/components/products/featured';
import { ProductItems } from '@/components/products/product-items';
import { generateMetadataObject } from '@/lib/shared/metadata';
import { fetchCollectionType, fetchSingleType } from '@/lib/strapi';
import { LocaleParamsProps, Product } from '@/types/types';

export async function generateMetadata({
  params,
}: LocaleParamsProps): Promise<Metadata> {
  const { locale } = await params;

  try {
    const pageData = await fetchSingleType('product-page', { locale });
    const seo = pageData?.seo;
    const metadata = generateMetadataObject(seo);
    return metadata;
  } catch {
    return {};
  }
}

export default async function Products({ params }: LocaleParamsProps) {
  const { locale } = await params;

  const pageData = await fetchSingleType('product-page', { locale });
  const products = await fetchCollectionType<Product[]>('products', { locale });

  const localizedSlugs: Record<string, string> = { [locale]: 'products' };

  try {
    const dePageData = await fetchSingleType('product-page', { locale: 'de' });
    if (dePageData) localizedSlugs['de'] = 'products';
  } catch {}

  try {
    const enPageData = await fetchSingleType('product-page', { locale: 'en' });
    if (enPageData) localizedSlugs['en'] = 'products';
  } catch {}

  const featured = products.filter(
    (product: { featured?: boolean }) => product.featured
  );

  return (
    <div className="relative overflow-hidden w-full">
      <ClientSlugHandler localizedSlugs={localizedSlugs} />
      <AmbientColor />
      <Container className="pt-40 pb-40">
        <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
          <IconShoppingCartUp className="h-6 w-6 text-white" />
        </FeatureIconContainer>
        <Heading as="h1" className="pt-4">
          {pageData.heading}
        </Heading>
        <Subheading className="max-w-3xl mx-auto">
          {pageData.sub_heading}
        </Subheading>
        <Featured
          products={featured}
          locale={locale}
          heading={pageData.featured_heading}
          sub_heading={pageData.featured_sub_heading}
        />
        <ProductItems
          products={products}
          locale={locale}
          heading={pageData.popular_heading}
          sub_heading={pageData.popular_sub_heading}
        />
      </Container>
    </div>
  );
}
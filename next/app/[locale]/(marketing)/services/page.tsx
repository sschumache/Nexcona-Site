import { Metadata } from 'next';

import ClientSlugHandler from '../ClientSlugHandler';
import { ServiceCard } from '@/components/services/service-card';
import { Container } from '@/components/container';
import { AmbientColor } from '@/components/decorations/ambient-color';
import { Heading } from '@/components/elements/heading';
import { Subheading } from '@/components/elements/subheading';
import { fetchCollectionType } from '@/lib/strapi';
import type { LocaleParamsProps } from '@/types/types';

export async function generateMetadata({
  params,
}: LocaleParamsProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === 'de' ? 'Services | Nexcona' : 'Services | Nexcona',
    description:
      locale === 'de'
        ? 'Entdecken Sie die IT-Services von Nexcona.'
        : 'Discover Nexcona’s IT services.',
  };
}

export default async function ServicesPage({ params }: LocaleParamsProps) {
  const { locale } = await params;

  const services = await fetchCollectionType('services', {
    locale,
    sort: ['order:asc'],
    populate: ['icon', 'image', 'CTA', 'features', 'category'],
  });

  const localizedSlugs: Record<string, string> = { [locale]: '' };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <ClientSlugHandler localizedSlugs={localizedSlugs} />
      <AmbientColor />

      <Container className="pt-40 pb-20 text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#E2E2E2] bg-white/80 px-4 py-1.5 backdrop-blur-sm">
          <div className="h-1.5 w-1.5 rounded-full bg-[#00AEEF]" />
          <span className="text-xs font-medium uppercase tracking-wide text-[#666666]">
            {locale === 'de' ? 'Unsere Services' : 'Our Services'}
          </span>
        </div>

        <Heading as="h1" size="xl">
          {locale === 'de'
            ? 'IT-Lösungen, die einfach funktionieren'
            : 'IT solutions that simply work'}
        </Heading>

        <Subheading className="mx-auto mt-6 max-w-2xl">
          {locale === 'de'
            ? 'Wir unterstützen Unternehmen mit modernen, sicheren und skalierbaren IT-Services – klar strukturiert, pragmatisch umgesetzt und langfristig gedacht.'
            : 'We support companies with modern, secure and scalable IT services — clearly structured, pragmatically implemented and built for the long term.'}
        </Subheading>
      </Container>

      <Container className="pb-40">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {(services as any[]).map((service: any) => (
            <ServiceCard key={service.id} service={service} locale={locale} />
          ))}
        </div>

        {(services as any[]).length === 0 && (
          <div className="py-20 text-center">
            <p className="text-[#666666]">
              {locale === 'de'
                ? 'Keine Services gefunden.'
                : 'No services found.'}
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}
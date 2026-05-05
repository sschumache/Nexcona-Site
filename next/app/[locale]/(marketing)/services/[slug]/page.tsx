import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

import { Container } from '@/components/container';
import { AmbientColor } from '@/components/decorations/ambient-color';
import { Heading } from '@/components/elements/heading';
import { Subheading } from '@/components/elements/subheading';
import { fetchCollectionType } from '@/lib/strapi';

type ServiceDetailPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

async function getService(locale: string, slug: string) {
  const services = await fetchCollectionType('services', {
    locale,
    filters: {
      slug: {
        $eq: slug,
      },
      is_active: {
        $eq: true,
      },
    },
    populate: ['image', 'icon', 'CTA', 'features', 'category'],
  });

  return (services as any[])?.[0] || null;
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = await getService(locale, slug);

  if (!service) {
    return {
      title: 'Service | Nexcona',
    };
  }

  return {
    title: `${service.name} | Nexcona`,
    description: service.short_description || service.name,
  };
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { locale, slug } = await params;
  const service = await getService(locale, slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <AmbientColor />

      <Container className="pt-36 pb-16">
        <Link
          href={`/${locale}/services`}
          className="mb-10 inline-flex text-sm font-medium text-[#306B8C] transition-colors hover:text-[#003F6B]"
        >
          ← {locale === 'de' ? 'Zurück zu Services' : 'Back to services'}
        </Link>

        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#E2E2E2] bg-white/80 px-4 py-1.5 backdrop-blur-sm">
              <div className="h-1.5 w-1.5 rounded-full bg-[#00AEEF]" />
              <span className="text-xs font-medium uppercase tracking-wide text-[#666666]">
                {locale === 'de' ? 'Service' : 'Service'}
              </span>
            </div>

            <Heading as="h1" size="xl">
              {service.name}
            </Heading>

            {service.short_description && (
              <Subheading className="mt-6 max-w-xl">
                {service.short_description}
              </Subheading>
            )}

            {service.CTA?.href && service.CTA?.label && (
              <Link
                href={service.CTA.href}
                className="mt-10 inline-flex rounded-full bg-[#003F6B] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#002F50] hover:shadow-lg"
              >
                {service.CTA.label}
              </Link>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-[2.5rem] bg-[#00AEEF]/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2.5rem] border border-[#E2E2E2] bg-white/80 shadow-xl backdrop-blur-xl">
              {service.image?.url ? (
                <Image
                  src={service.image.url}
                  alt={service.image.alternativeText || service.name}
                  width={900}
                  height={700}
                  className="h-[420px] w-full object-cover"
                  priority
                />
              ) : (
                <div className="flex h-[420px] items-center justify-center bg-[#F4F7F9]">
                  <div className="h-20 w-20 rounded-3xl bg-[#00AEEF]/20" />
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>

      <Container className="pb-32">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-[#E2E2E2] bg-white/80 p-8 shadow-sm backdrop-blur-xl md:p-10">
            <h2 className="mb-6 text-2xl font-medium tracking-tight text-[#2B2B2B]">
              {locale === 'de' ? 'Über diesen Service' : 'About this service'}
            </h2>

            {service.description ? (
              <div className="prose prose-neutral max-w-none text-[#666666]">
                {service.description}
              </div>
            ) : (
              <p className="text-[#666666]">
                {locale === 'de'
                  ? 'Für diesen Service ist noch keine Beschreibung hinterlegt.'
                  : 'No description has been added for this service yet.'}
              </p>
            )}
          </div>

          <div className="rounded-[2rem] border border-[#E2E2E2] bg-[#F8F9FA]/90 p-8 shadow-sm backdrop-blur-xl md:p-10">
            <h2 className="mb-6 text-2xl font-medium tracking-tight text-[#2B2B2B]">
              {locale === 'de' ? 'Leistungen' : 'Features'}
            </h2>

            {service.features?.length > 0 ? (
              <div className="space-y-4">
                {service.features.map((feature: any) => (
                  <div key={feature.id} className="flex gap-3">
                    <div className="mt-1 h-5 w-5 shrink-0 rounded-full bg-[#00AEEF]/15">
                      <div className="m-1.5 h-2 w-2 rounded-full bg-[#00AEEF]" />
                    </div>

                    <div>
                      {feature.title && (
                        <h3 className="text-sm font-medium text-[#2B2B2B]">
                          {feature.title}
                        </h3>
                      )}

                      {feature.text && (
                        <p className="mt-1 text-sm leading-relaxed text-[#666666]">
                          {feature.text}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#666666]">
                {locale === 'de'
                  ? 'Keine Leistungen hinterlegt.'
                  : 'No features added.'}
              </p>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
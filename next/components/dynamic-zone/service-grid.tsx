import { Container } from '@/components/container';
import { Heading } from '@/components/elements/heading';
import { Subheading } from '@/components/elements/subheading';
import { ServiceCard } from '@/components/services/service-card';
import { fetchCollectionType } from '@/lib/strapi';

type Props = {
  title?: string;
  subtitle?: string;
  limit?: number;
  locale: string;
};

export const ServiceGrid = async ({
  title,
  subtitle,
  limit,
  locale,
}: Props) => {
  const services = await fetchCollectionType('services', {
    locale,
    sort: ['order:asc'],
    filters: {
      is_active: {
        $eq: true,
      },
    },
    pagination: {
      pageSize: limit || 6,
    },
    populate: ['icon', 'image', 'CTA', 'features'],
  });

  return (
    <Container className="py-24">
      {(title || subtitle) && (
        <div className="mb-12 text-center">
          {title && (
            <Heading as="h2" size="xl">
              {title}
            </Heading>
          )}
          {subtitle && (
            <Subheading className="mx-auto mt-4 max-w-2xl">
              {subtitle}
            </Subheading>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {(services as any[]).map((service) => (
          <ServiceCard key={service.id} service={service} locale={locale} />
        ))}
      </div>
    </Container>
  );
};
'use client';

import { Container } from '@/components/container';
import { Heading } from '@/components/elements/heading';
import { Subheading } from '@/components/elements/subheading';
import { ServiceCard } from '@/components/services/service-card';

type Props = {
  title?: string;
  subtitle?: string;
  services?: any[];
  locale: string;
};

export const ServiceGrid = ({ title, subtitle, services = [], locale }: Props) => {
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
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} locale={locale} />
        ))}
      </div>
    </Container>
  );
};
'use client';

import { Container } from '@/components/container';
import { Heading } from '@/components/elements/heading';
import { Subheading } from '@/components/elements/subheading';

export const Solution = ({ title, subtitle, items }: any) => {
  return (
    <Container className="py-24">
      <div className="text-center mb-16">
        <Heading as="h2" size="xl">
          {title}
        </Heading>
        {subtitle && (
          <Subheading className="mt-6 max-w-2xl mx-auto">
            {subtitle}
          </Subheading>
        )}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {items?.map((item: any, i: number) => (
          <div key={i}>
            <h3 className="text-lg font-medium text-[#2B2B2B]">
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-[#666666]">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
};
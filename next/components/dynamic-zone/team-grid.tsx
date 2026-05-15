'use client';

import { Container } from '@/components/container';
import { Heading } from '@/components/elements/heading';
import { Subheading } from '@/components/elements/subheading';
import { TeamCard } from '@/components/team/team-card';

type Props = {
  title?: string;
  subtitle?: string;
  members?: any[];
  locale: string;
};

export const TeamGrid = ({ title, subtitle, members = [], locale }: Props) => {
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
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </div>
    </Container>
  );
};

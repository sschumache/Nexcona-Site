import { Container } from '@/components/container';
import { Heading } from '@/components/elements/heading';
import { Subheading } from '@/components/elements/subheading';
import { TeamCard } from '@/components/team/team-card';
import { fetchCollectionType } from '@/lib/strapi';

type Props = {
  title?: string;
  subtitle?: string;
  limit?: number;
  locale: string;
};

export const TeamGrid = async ({
  title,
  subtitle,
  limit,
  locale,
}: Props) => {
  const members = await fetchCollectionType('team-members', {
    locale,
    sort: ['order:asc'],
    pagination: {
      pageSize: limit || 6,
    },
    populate: ['image'],
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
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {(members as any[]).map((member) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </div>
    </Container>
  );
};
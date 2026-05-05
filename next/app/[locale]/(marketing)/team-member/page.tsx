import { Metadata } from 'next';

import ClientSlugHandler from '../ClientSlugHandler';
import { TeamCard } from '@/components/team/team-card';
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
    title: locale === 'de' ? 'Über Uns | Nexcona' : 'About Us | Nexcona',
    description:
      locale === 'de'
        ? 'Lernen Sie das Nexcona Team kennen'
        : 'Meet the Nexcona Team',
  };
}

export default async function TeamMemberPage({ params }: LocaleParamsProps) {
  const { locale } = await params;

  const members = await fetchCollectionType('team-members', {
    locale,
    sort: ['order:asc'],
    populate: ['image'],
  });

  const normalizedMembers = (members as any[]).map((member) => ({
    id: member.id,
    name: member.name,
    role: member.role,
    description: member.description,
    linkedin: member.linkedin,
    order: member.order,
    image: member.image
      ? {
          url: member.image.url,
          alternativeText: member.image.alternativeText,
        }
      : undefined,
  }));

  const localizedSlugs: Record<string, string> = { [locale]: '' };

  try {
    const deMembers = await fetchCollectionType('team-members', {
      locale: 'de',
    });

    if (deMembers) localizedSlugs.de = '';
  } catch {}

  try {
    const enMembers = await fetchCollectionType('team-members', {
      locale: 'en',
    });

    if (enMembers) localizedSlugs.en = '';
  } catch {}

  return (
    <div className="relative overflow-hidden w-full min-h-screen">
      <ClientSlugHandler localizedSlugs={localizedSlugs} />
      <AmbientColor />

      <Container className="pt-40 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E2E2E2] bg-white/80 backdrop-blur-sm mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00AEEF]" />
          <span className="text-xs font-medium text-[#666666] tracking-wide uppercase">
            {locale === 'de' ? 'Unser Team' : 'Our Team'}
          </span>
        </div>

        <Heading as="h1" size="xl">
          {locale === 'de' ? 'Menschen hinter Nexcona' : 'People behind Nexcona'}
        </Heading>

        <Subheading className="mt-6 max-w-2xl mx-auto">
          {locale === 'de'
            ? 'Wir verbinden Fachkompetenz, Erfahrung und Pragmatismus, um unseren Kunden in jeder Phase ihrer IT-Transformation verlässlich zur Seite zu stehen.'
            : 'We combine expertise, experience and pragmatism to reliably support our clients at every stage of their IT transformation.'}
        </Subheading>
      </Container>

      <Container className="pb-40">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 md:gap-16">
            {normalizedMembers.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>

        {normalizedMembers.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#666666]">
              {locale === 'de'
                ? 'Keine Teammitglieder gefunden.'
                : 'No team members found.'}
            </p>
          </div>
        )}
      </Container>

      <div className="border-t border-[#E2E2E2] bg-[#F8F9FA]">
        <Container className="py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: locale === 'de' ? 'Innovation' : 'Innovation',
                description:
                  locale === 'de'
                    ? 'Wir entwickeln zukunftsorientierte IT-Lösungen.'
                    : 'We develop future-oriented IT solutions.',
              },
              {
                title: locale === 'de' ? 'Vertrauen' : 'Trust',
                description:
                  locale === 'de'
                    ? 'Langfristige Partnerschaften auf Augenhöhe.'
                    : 'Long-term partnerships at eye level.',
              },
              {
                title: locale === 'de' ? 'Exzellenz' : 'Excellence',
                description:
                  locale === 'de'
                    ? 'Höchste Qualität in jedem Projekt.'
                    : 'Highest quality in every project.',
              },
            ].map((value) => (
              <div key={value.title} className="text-center">
                <div className="w-10 h-0.5 bg-[#00AEEF] mx-auto mb-6" />
                <h3 className="text-lg font-medium text-[#2B2B2B] mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-[#666666] leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}
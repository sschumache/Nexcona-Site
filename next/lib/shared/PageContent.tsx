import { AmbientColor } from '@/components/decorations/ambient-color';
import DynamicZoneManager from '@/components/dynamic-zone/manager';
import { fetchCollectionType } from '@/lib/strapi';

export default async function PageContent({ pageData }: { pageData: any }) {
  const dynamicZone = pageData?.dynamic_zone || [];
  const locale = pageData?.locale;

  console.log(
    'Dynamic Zone Components:',
    dynamicZone.map((component: any) => component.__component)
  );

  const hasTeamGrid = dynamicZone.some(
    (component: any) => component.__component === 'dynamic-zone.team-grid'
  );

  const hasServiceGrid = dynamicZone.some(
    (component: any) => component.__component === 'dynamic-zone.service-grid'
  );

  const members = hasTeamGrid
    ? await fetchCollectionType('team-members', {
        locale,
        sort: ['order:asc'],
        populate: {
          image: true,
        },
      })
    : [];

  const services = hasServiceGrid
    ? await fetchCollectionType('services', {
        locale,
        sort: ['order:asc'],
        populate: {
          icon: true,
          image: true,
          CTA: true,
          category: true,
          features: true,
        },
      })
    : [];

  const enrichedDynamicZone = dynamicZone.map((component: any) => {
    if (component.__component === 'dynamic-zone.team-grid') {
      return {
        ...component,
        members,
      };
    }

    if (component.__component === 'dynamic-zone.service-grid') {
      return {
        ...component,
        services,
      };
    }

    return component;
  });

  return (
    <div className="relative overflow-hidden w-full">
      <AmbientColor />
      <DynamicZoneManager dynamicZone={enrichedDynamicZone} locale={locale} />
    </div>
  );
}
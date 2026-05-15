import { AmbientColor } from '@/components/decorations/ambient-color';
import DynamicZoneManager from '@/components/dynamic-zone/manager';
import { fetchCollectionType } from '@/lib/strapi';

export default async function PageContent({
  pageData,
  locale,
}: {
  pageData: any;
  locale: string;
}) {
  const dynamicZone = pageData?.dynamic_zone || [];

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
      }).catch(() => [])
    : [];

  const services = hasServiceGrid
    ? await fetchCollectionType('services', {
        locale,
        sort: ['order:asc'],
      }).catch(() => [])
    : [];

  const enrichedDynamicZone = dynamicZone.map((component: any) => {
    if (component.__component === 'dynamic-zone.team-grid') {
      return { ...component, members };
    }
    if (component.__component === 'dynamic-zone.service-grid') {
      return { ...component, services };
    }
    return component;
  });

  // Debug logs
  console.log(
    'Dynamic Zone Components:',
    dynamicZone.map((c: any) => c.__component)
  );
  console.log('Has TeamGrid:', hasTeamGrid);
  console.log('Has ServiceGrid:', hasServiceGrid);
  console.log('Members count:', (members as any[]).length);
  console.log('Services count:', (services as any[]).length);

  return (
    <div className="relative overflow-hidden w-full">
      <AmbientColor />
      <DynamicZoneManager dynamicZone={enrichedDynamicZone} locale={locale} />
    </div>
  );
}

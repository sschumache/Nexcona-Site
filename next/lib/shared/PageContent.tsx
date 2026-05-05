import { AmbientColor } from '@/components/decorations/ambient-color';
import DynamicZoneManager from '@/components/dynamic-zone/manager';
import { fetchCollectionType } from '@/lib/strapi';

export default async function PageContent({ pageData }: { pageData: any }) {
  const dynamicZone = pageData?.dynamic_zone;
  const locale = pageData?.locale;

  // Prüfen ob team-grid oder service-grid in der dynamic zone ist
  const hasTeamGrid = dynamicZone?.some(
    (c: any) => c.__component === 'dynamic-zone.team-grid'
  );
  const hasServiceGrid = dynamicZone?.some(
    (c: any) => c.__component === 'dynamic-zone.service-grid'
  );

  // Daten fetchen wenn nötig
  const members = hasTeamGrid
    ? await fetchCollectionType('team-members', {
        locale,
        sort: ['order:asc'],
        populate: ['image'],
      })
    : [];

  const services = hasServiceGrid
    ? await fetchCollectionType('services', {
        locale,
        sort: ['order:asc'],
        populate: ['icon', 'image', 'CTA', 'features'],
      })
    : [];

  // Daten in die dynamic zone einfügen
  const enrichedDynamicZone = dynamicZone?.map((component: any) => {
    if (component.__component === 'dynamic-zone.team-grid') {
      return { ...component, members };
    }
    if (component.__component === 'dynamic-zone.service-grid') {
      return { ...component, services };
    }
    return component;
  });

  return (
    <div className="relative overflow-hidden w-full">
      <AmbientColor />
      {enrichedDynamicZone && (
        <DynamicZoneManager
          dynamicZone={enrichedDynamicZone}
          locale={locale}
        />
      )}
    </div>
  );
}
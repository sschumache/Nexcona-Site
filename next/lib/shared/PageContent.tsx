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

  // Locale als top-level Parameter, nicht verschachtelt
  const members = hasTeamGrid
    ? await fetchCollectionType('team-members', {
        locale, // ← direkt, nicht in filters
        sort: ['order:asc'],
        populate: {
          image: true, // ← explizit statt Array
        },
      }).catch(() => []) // ← kein Crash wenn leer/Fehler
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

  return (
    <div className="relative overflow-hidden w-full">
      <AmbientColor />
      <DynamicZoneManager dynamicZone={enrichedDynamicZone} locale={locale} />
    </div>
  );
}

'use client';

import { AmbientColor } from '@/components/decorations/ambient-color';
import DynamicZoneManager from '@/components/dynamic-zone/manager';
import { fetchCollectionType } from '@/lib/strapi';

export default async function PageContent({ pageData }: { pageData: any }) {
  const dynamicZone = pageData?.dynamic_zone || [];
  const locale = pageData?.locale;

  //DEBUG
  console.log(
    'DYNAMIC ZONE COMPONENTS:',
    dynamicZone.map((component: any) => component.__component)
  );

  console.log(
    'FULL DYNAMIC ZONE:',
    JSON.stringify(dynamicZone, null, 2)
  );

  const hasTeamGrid = dynamicZone.some(
    (component: any) => component.__component === 'dynamic-zone.team-grid'
  );

  const hasServiceGrid = dynamicZone.some(
    (component: any) => component.__component === 'dynamic-zone.service-grid'
  );

  console.log('HAS TEAM GRID:', hasTeamGrid);

  const members = hasTeamGrid
    ? await fetchCollectionType('team-members', {
        locale,
        sort: ['order:asc'],
        populate: {
          image: true,
        },
      })
    : [];

  console.log('TEAM MEMBERS COUNT:', members.length);

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
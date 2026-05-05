'use client';

import dynamic from 'next/dynamic';

const componentMap: Record<string, any> = {
  'dynamic-zone.hero': dynamic(() =>
    import('./hero').then((mod) => mod.Hero)
  ),
  'dynamic-zone.features': dynamic(() =>
    import('./features').then((mod) => mod.Features)
  ),
  'dynamic-zone.team-grid': dynamic(() =>
    import('./team-grid').then((mod) => mod.TeamGrid)
  ),
  'dynamic-zone.service-grid': dynamic(() =>
    import('./service-grid').then((mod) => mod.ServiceGrid)
  ),
};

type Props = {
  dynamicZone?: any[];
  locale: string;
};

export default function DynamicZoneManager({
  dynamicZone = [],
  locale,
}: Props) {
  if (!dynamicZone.length) return null;

  return (
    <>
      {dynamicZone.map((component, index) => {
        const Component = componentMap[component.__component];

        if (!Component) {
          console.warn('Unknown dynamic zone component:', component.__component);
          return null;
        }

        return (
          <Component
            key={`${component.__component}-${component.id || index}`}
            {...component}
            locale={locale}
          />
        );
      })}
    </>
  );
}
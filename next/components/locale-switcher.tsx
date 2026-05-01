'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { useSlugContext } from '@/app/context/SlugContext';
import { cn } from '@/lib/utils';

export function LocaleSwitcher({ currentLocale }: { currentLocale: string }) {
  const { state } = useSlugContext();
  const { localizedSlugs } = state;

  const pathname = usePathname();

  const generateLocalizedPath = (locale: string): string => {
    if (!pathname) return `/${locale}`;

    const segments = pathname.split('/');

    if (segments.length <= 2) {
      return `/${locale}`;
    }

    segments[1] = locale;

    if (localizedSlugs[locale]) {
      segments[segments.length - 1] = localizedSlugs[locale];
    }

    return segments.join('/');
  };

  return (
    <div className="flex gap-1 rounded-md border border-[#E2E2E2] bg-[#F8F9FA] p-1">
      {Object.keys(localizedSlugs).map((locale) => {
        const isActive = locale === currentLocale;

        return (
          <Link key={locale} href={generateLocalizedPath(locale)}>
            <div
              className={cn(
                'flex h-7 w-8 cursor-pointer items-center justify-center rounded-md text-sm font-medium uppercase transition duration-200',
                isActive
                  ? 'bg-white text-[#2B2B2B] shadow-sm'
                  : 'text-[#666666] hover:bg-[#E2E2E2] hover:text-[#2B2B2B]'
              )}
            >
              {locale}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
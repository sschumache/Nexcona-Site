'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { useSlugContext } from '@/app/context/SlugContext';
import { cn } from '@/lib/utils';

const localeLabels: Record<string, string> = {
  'en': 'EN',
  'de-CH': 'DE',
};

export function LocaleSwitcher({ currentLocale, locales = [] }: { 
  currentLocale: string;
  locales?: string[];
}) {  
  const { state } = useSlugContext();
  const { localizedSlugs } = state;

  const pathname = usePathname();
  const segments = pathname.split('/');

  // Use localizedSlugs keys if available, otherwise fall back to locales prop
  const availableLocales = Object.keys(localizedSlugs).length > 0 
    ? Object.keys(localizedSlugs) 
    : locales;

  const generateLocalizedPath = (locale: string): string => {
    if (!pathname) return `/${locale}`;

    if (segments.length <= 2) {
      return `/${locale}`;
    }

    if (localizedSlugs[locale]) {
      segments[1] = locale;
      segments[segments.length - 1] = localizedSlugs[locale];
      return segments.join('/');
    }

    segments[1] = locale;
    return segments.join('/');
  };

  return (
    <div className="flex gap-2 p-1 rounded-md">
      {availableLocales.map((locale) => (
        <Link key={locale} href={generateLocalizedPath(locale)}>
          <div
            className={cn(
              'flex cursor-pointer items-center justify-center text-sm leading-[110%] w-8 py-1 rounded-md hover:bg-neutral-800 hover:text-white/80 text-white hover:shadow-[0px_1px_0px_0px_var(--neutral-600)_inset] transition duration-200',
              locale === currentLocale
                ? 'bg-neutral-800 text-white shadow-[0px_1px_0px_0px_var(--neutral-600)_inset]'
                : ''
            )}
          >
            {localeLabels[locale] ?? locale.toUpperCase()}
          </div>
        </Link>
      ))}
    </div>
  );
}
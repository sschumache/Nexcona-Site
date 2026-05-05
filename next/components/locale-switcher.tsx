'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { useSlugContext } from '@/app/context/SlugContext';
import { cn } from '@/lib/utils';

const localeLabels: Record<string, string> = {
  'en': 'EN',
  'de': 'DE',
};

export function LocaleSwitcher({ currentLocale, locales = [] }: { 
  currentLocale: string;
  locales?: string[];
}) {  
  const { state } = useSlugContext();
  const { localizedSlugs } = state;

  const pathname = usePathname();

  const availableLocales = Object.keys(localizedSlugs).length > 0 
    ? Object.keys(localizedSlugs) 
    : locales;

  const generateLocalizedPath = (locale: string): string => {
    if (!pathname) return `/${locale}`;

    const cleanPath = pathname.replace(/\/$/, '');
    const cleanSegments = cleanPath.split('/');

    if (cleanSegments.length <= 2) {
      return `/${locale}`;
    }

    if (localizedSlugs[locale]) {
      const newSegments = [...cleanSegments];
      newSegments[1] = locale;
      newSegments[newSegments.length - 1] = localizedSlugs[locale];
      return newSegments.join('/');
    }

    const newSegments = [...cleanSegments];
    newSegments[1] = locale;
    return newSegments.join('/');
  };

  return (
    <div className="flex gap-2 p-1 rounded-md">
      {availableLocales.map((locale) => (
        <Link key={locale} href={generateLocalizedPath(locale)}>
          <div
            className={cn(
              'flex cursor-pointer items-center justify-center text-sm leading-[110%] w-8 py-1 rounded-md transition duration-200',
              locale === currentLocale
                ? 'text-white'
                : 'text-[#2B2B2B] hover:text-white'
            )}
            style={
              locale === currentLocale
                ? { backgroundColor: '#00AEEF' }
                : undefined
            }
            onMouseEnter={(e) => {
              if (locale !== currentLocale) {
                e.currentTarget.style.backgroundColor = '#00AEEF';
              }
            }}
            onMouseLeave={(e) => {
              if (locale !== currentLocale) {
                e.currentTarget.style.backgroundColor = '';
              }
            }}
          >
            {localeLabels[locale] ?? locale.toUpperCase()}
          </div>
        </Link>
      ))}
    </div>
  );
}
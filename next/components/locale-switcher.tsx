'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import { useSlugContext } from '@/app/context/SlugContext';
import { cn } from '@/lib/utils';

type LocaleItem = string | {
  code?: string;
  locale?: string;
  name?: string;
  isDefault?: boolean;
};

const getLocaleCode = (item: LocaleItem) =>
  typeof item === 'string' ? item : item.code || item.locale || '';

const getLocaleName = (item: LocaleItem) =>
  typeof item === 'string' ? item.toUpperCase() : item.name || getLocaleCode(item).toUpperCase();

const getFlag = (locale: string) => {
  const normalized = locale.toLowerCase();

  const flags: Record<string, string> = {
    ch: '🇨🇭',
    de: '🇩🇪',
    en: '🇬🇧',
    fr: '🇫🇷',
    it: '🇮🇹',
  };

  return flags[normalized] || '🌐';
};

export function LocaleSwitcher({
  currentLocale,
  locales = [],
}: {
  currentLocale: string;
  locales?: LocaleItem[];
}) {
  const router = useRouter();
  const pathname = usePathname();

  const { state } = useSlugContext();
  const { localizedSlugs } = state;

  const normalizedLocales = locales
    .map((item) => ({
      code: getLocaleCode(item),
      name: getLocaleName(item),
    }))
    .filter((item) => item.code);

  if (!normalizedLocales.length) return null;

  const generateLocalizedPath = (nextLocale: string): string => {
    if (!pathname) return `/${nextLocale}`;

    const segments = pathname.split('/').filter(Boolean);
    const firstSegment = segments[0];
    const localeCodes = normalizedLocales.map((item) => item.code);

    if (localeCodes.includes(firstSegment)) {
      segments[0] = nextLocale;
    } else {
      segments.unshift(nextLocale);
    }

    if (localizedSlugs?.[nextLocale] && segments.length > 1) {
      segments[segments.length - 1] = localizedSlugs[nextLocale];
    }

    return `/${segments.join('/')}`;
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-[#E2E2E2] bg-[#F8F9FA] p-1">
      {normalizedLocales.map((locale) => {
        const isActive = locale.code === currentLocale;

        return (
          <button
            key={locale.code}
            type="button"
            onClick={() => router.push(generateLocalizedPath(locale.code))}
            className={cn(
              'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition',
              isActive
                ? 'bg-white text-[#2B2B2B] shadow-sm'
                : 'text-[#666666] hover:bg-[#E2E2E2] hover:text-[#2B2B2B]'
            )}
            aria-current={isActive ? 'true' : undefined}
          >
            <span>{getFlag(locale.code)}</span>
            <span className="uppercase">{locale.code}</span>
          </button>
        );
      })}
    </div>
  );
}
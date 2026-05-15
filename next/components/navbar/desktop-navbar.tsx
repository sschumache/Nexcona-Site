'use client';

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import { Link } from 'next-view-transitions';
import { useState } from 'react';

import { LocaleSwitcher } from '../locale-switcher';
import { NavbarItem } from './navbar-item';
import { Button } from '@/components/elements/button';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';

type Props = {
  leftNavbarItems: {
    URL: string;
    text: string;
    target?: string;
  }[];
  rightNavbarItems: {
    URL: string;
    text: string;
    target?: string;
  }[];
  logo: any;
  locale: string;
  locales?: string[];
};

const withLocale = (url: string, locale?: string) => {
  if (!url) return locale ? `/${locale}` : '/';
  if (url.startsWith('http')) return url;

  const cleanUrl = url.startsWith('/') ? url : `/${url}`;

  if (!locale) return cleanUrl;

  return `/${locale}${cleanUrl}`;
};

export const DesktopNavbar = ({
  leftNavbarItems,
  rightNavbarItems,
  logo,
  locale,
  locales = [],
}: Props) => {
  const { scrollY } = useScroll();
  const [showBackground, setShowBackground] = useState(false);

  useMotionValueEvent(scrollY, 'change', (value) => {
    setShowBackground(value > 100);
  });

  return (
    <motion.div
      className={cn(
        'relative mx-auto flex w-full justify-between rounded-md border px-4 py-3 transition duration-200',
        showBackground
          ? 'border-[#E2E2E2] bg-[#F8F9FA]/90 shadow-sm backdrop-blur-md'
          : 'border-transparent bg-[#F8F9FA]'
      )}
      animate={{
        width: showBackground ? '80%' : '100%',
      }}
      transition={{
        duration: 0.4,
      }}
    >
      <AnimatePresence>
        {showBackground && (
          <motion.div
            key="navbar-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-none absolute inset-0 h-full w-full rounded-md bg-[#F8F9FA]/60"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-row items-center gap-2">
        <Logo locale={locale} image={logo?.image} />

        <div className="flex items-center gap-1.5">
          {leftNavbarItems.map((item) => (
            <NavbarItem
              href={withLocale(item.URL, locale) as never}
              key={item.text}
              target={item.target}
            >
              {item.text}
            </NavbarItem>
          ))}
        </div>
      </div>

      <div className="flex space-x-2 items-center">
        <LocaleSwitcher currentLocale={locale} locales={locales} />

        {rightNavbarItems.map((item, index) => (
          <Button
            key={item.text}
            variant={
              index === rightNavbarItems.length - 1 ? 'primary' : 'simple'
            }
            as={Link}
            href={`/${locale}${item.URL}`}
          >
            {item.text}
          </Button>
        ))}
      </div>
    </motion.div>
  );
};

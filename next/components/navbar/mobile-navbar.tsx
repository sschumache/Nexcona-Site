'use client';

import { useMotionValueEvent, useScroll } from 'framer-motion';
import { Link } from 'next-view-transitions';
import { Fragment, useState } from 'react';
import { IoIosMenu, IoIosClose } from 'react-icons/io';

import { LocaleSwitcher } from '../locale-switcher';
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
};

export const MobileNavbar = ({
  leftNavbarItems,
  rightNavbarItems,
  logo,
  locale,
}: Props) => {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const [showBackground, setShowBackground] = useState(false);

  useMotionValueEvent(scrollY, 'change', (value) => {
    setShowBackground(value > 100);
  });

  return (
    <div
      className={cn(
        'flex w-full items-center justify-between rounded-md border px-3 py-2 transition duration-200',
        showBackground
          ? 'border-[#E2E2E2] bg-[#F8F9FA]/90 shadow-sm backdrop-blur-md'
          : 'border-transparent bg-[#F8F9FA]'
      )}
    >
      <Logo locale={locale} image={logo?.image} />

      <button
        type="button"
        aria-label="Menü öffnen"
        onClick={() => setOpen(true)}
        className="rounded-md p-1 text-[#2B2B2B] transition hover:bg-[#E2E2E2]"
      >
        <IoIosMenu className="h-7 w-7" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col items-start justify-start bg-[#F8F9FA] pt-5 text-[#2B2B2B]">
          <div className="flex w-full items-center justify-between px-5">
            <Logo locale={locale} image={logo?.image} />

            <div className="flex items-center space-x-2">
              <LocaleSwitcher currentLocale={locale} />

              <button
                type="button"
                aria-label="Menü schliessen"
                onClick={() => setOpen(false)}
                className="rounded-md p-1 text-[#2B2B2B] transition hover:bg-[#E2E2E2]"
              >
                <IoIosClose className="h-8 w-8" />
              </button>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-start justify-start gap-4 px-8">
            {leftNavbarItems.map((navItem: any, idx: number) => (
              <Fragment key={`nav-item-${idx}`}>
                {navItem.children && navItem.children.length > 0
                  ? navItem.children.map((childNavItem: any, childIdx: number) => (
                      <Link
                        key={`child-link-${childIdx}`}
                        href={`/${locale}${childNavItem.URL}`}
                        onClick={() => setOpen(false)}
                        className="relative max-w-[15rem] text-left text-2xl font-medium text-[#2B2B2B] transition hover:text-[#003F6B]"
                        suppressHydrationWarning
                      >
                        {childNavItem.text}
                      </Link>
                    ))
                  : (
                    <Link
                      href={`/${locale}${navItem.URL}`}
                      onClick={() => setOpen(false)}
                      className="relative text-[26px] font-medium text-[#2B2B2B] transition hover:text-[#003F6B]"
                      suppressHydrationWarning
                    >
                      {navItem.text}
                    </Link>
                  )}
              </Fragment>
            ))}
          </div>

          <div className="mt-auto flex w-full flex-col items-stretch gap-2.5 px-8 pb-8">
            {rightNavbarItems.map((item, index) => (
              <Button
                key={item.text}
                variant={
                  index === rightNavbarItems.length - 1 ? 'primary' : 'simple'
                }
                as={Link}
                href={`/${locale}${item.URL}`}
                onClick={() => setOpen(false)}
                className="w-full"
              >
                {item.text}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
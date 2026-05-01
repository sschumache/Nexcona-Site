'use client';

import { motion } from 'framer-motion';

import { DesktopNavbar } from './desktop-navbar';
import { MobileNavbar } from './mobile-navbar';

export function Navbar({
  data,
  locale,
  hasBanner,
}: {
  data: any;
  locale: string;
  hasBanner?: boolean;
}) {
  return (
    <motion.nav
      className={`fixed inset-x-0 z-50 mx-auto w-[95%] max-w-7xl ${
        hasBanner ? 'top-[4.25rem]' : 'top-4'
      }`}
    >
      <div className="hidden w-full lg:block">
        {data?.left_navbar_items && (
          <DesktopNavbar
            locale={locale}
            leftNavbarItems={data.left_navbar_items}
            rightNavbarItems={data.right_navbar_items}
            logo={data.logo}
          />
        )}
      </div>

      <div className="flex h-full w-full items-center lg:hidden">
        {data?.left_navbar_items && (
          <MobileNavbar
            locale={locale}
            leftNavbarItems={data.left_navbar_items}
            rightNavbarItems={data.right_navbar_items}
            logo={data.logo}
          />
        )}
      </div>
    </motion.nav>
  );
}
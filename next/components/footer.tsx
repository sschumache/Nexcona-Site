import { Link } from 'next-view-transitions';
import React from 'react';

import { Logo } from '@/components/logo';

export const Footer = async ({
  data,
  locale,
}: {
  data: any;
  locale: string;
}) => {
  return (
    <footer className="relative border-t border-[#E2E2E2] bg-[#F8F9FA]">
      <div className="mx-auto max-w-7xl px-8 pt-20 pb-32">
        <div className="flex flex-col items-start justify-between gap-12 text-sm text-[#666666] sm:flex-row">
          <div>
            <div className="mb-4 mr-4 md:flex">
              {data?.logo?.image && <Logo image={data?.logo?.image} />}
            </div>

            <div className="max-w-xs text-[#666666]">
              {data?.description}
            </div>

            <div className="mt-4 text-[#666666]">
              {data?.copyright}
            </div>

            <div className="mt-10">
              Designed and Developed by{' '}
              <a className="text-[#2B2B2B] underline hover:text-[#003F6B]" href="https://aceternity.com">
                About us
              </a>{' '}
              &{' '}
              <a className="text-[#2B2B2B] underline hover:text-[#003F6B]" href="https://strapi.io">
                Dienstleistungen
              </a>
            </div>

            <div className="mt-2">
              built with{' '}
              <a className="text-[#2B2B2B] underline hover:text-[#003F6B]" href="https://strapi.io">
                Impressum
              </a>
              ,{' '}
              <a className="text-[#2B2B2B] underline hover:text-[#003F6B]" href="https://nextjs.org">
                Datenschutz
              </a>
              ,{' '}
              <a className="text-[#2B2B2B] underline hover:text-[#003F6B]" href="https://tailwindcss.com">
                Tailwind CSS
              </a>
              ,{' '}
              <a className="text-[#2B2B2B] underline hover:text-[#003F6B]" href="https://framer.com/motion">
                Motion Animation Lib
              </a>
              , and{' '}
              <a className="text-[#2B2B2B] underline hover:text-[#003F6B]" href="https://ui.aceternity.com">
                Aceternity UI
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-10">
            <LinkSection links={data?.internal_links ?? []} locale={locale} />
            <LinkSection links={data?.policy_links ?? []} locale={locale} />
            <LinkSection links={data?.social_media_links ?? []} locale={locale} />
          </div>
        </div>
      </div>
    </footer>
  );
};

const LinkSection = ({
  links,
  locale,
}: {
  links: { text: string; URL: never | string }[];
  locale: string;
}) => (
  <div className="mt-4 flex flex-col justify-center space-y-4">
    {links.map((link) => (
      <Link
        key={link.text}
        className="text-xs text-[#666666] transition-colors hover:text-[#2B2B2B] sm:text-sm"
        href={`${link.URL.startsWith('http') ? '' : `/${locale}`}${link.URL}`}
      >
        {link.text}
      </Link>
    ))}
  </div>
);
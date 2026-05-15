'use client';

import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type Props = {
  href: never;
  children: ReactNode;
  active?: boolean;
  className?: string;
  target?: string;
};

export function NavbarItem({
  children,
  href,
  active,
  target,
  className,
}: Props) {
  const pathname = usePathname();

  const isActive = active || pathname?.includes(href);

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center justify-center rounded-md px-4 py-2 text-sm leading-[110%] transition duration-200',
        'text-[#2B2B2B] hover:bg-[#E2E2E2] hover:text-[#2B2B2B]',
        isActive && 'bg-[#E2E2E2] text-[#2B2B2B]',
        className
      )}
      target={target}
      suppressHydrationWarning
    >
      {children}
    </Link>
  );
}

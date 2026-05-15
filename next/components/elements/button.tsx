import { LinkProps } from 'next/link';
import React from 'react';

import { cn } from '@/lib/utils';

interface ButtonProps {
  variant?: 'simple' | 'outline' | 'primary' | 'muted';
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
  href?: LinkProps['href'];
  onClick?: () => void;
  [key: string]: any;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  as: Tag = 'button',
  className,
  children,
  ...props
}) => {
  const baseClass =
    'relative z-10 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm md:text-sm font-medium transition duration-200';

  const variantClass =
    variant === 'simple'
      ? 'bg-transparent text-[#2B2B2B] hover:bg-[#E2E2E2]'
      : variant === 'outline'
        ? 'bg-white text-[#2B2B2B] border border-[#E2E2E2] hover:bg-[#2B2B2B] hover:text-white hover:border-[#2B2B2B]'
        : variant === 'primary'
          ? 'bg-[#E2E2E2] text-[#2B2B2B] border border-[#E2E2E2] hover:bg-[#2B2B2B] hover:text-white hover:border-[#2B2B2B] hover:-translate-y-1 active:translate-y-0'
          : variant === 'muted'
            ? 'bg-[#F8F9FA] text-[#666666] border border-[#E2E2E2] hover:bg-[#2B2B2B] hover:text-white hover:border-[#2B2B2B]'
            : '';

  const Element = Tag as any;

  return (
    <Element
      className={cn(baseClass, variantClass, className)}
      {...props}
      suppressHydrationWarning
    >
      {children ?? 'Get Started'}
    </Element>
  );
};

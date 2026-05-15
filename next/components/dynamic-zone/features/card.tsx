import React from 'react';

import { cn } from '@/lib/utils';

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'group rounded-3xl border border-[#E2E2E2] bg-white p-8 shadow-sm transition duration-200 hover:shadow-md hover:border-[#003F6B]/30',
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3
      className={cn(
        'py-2 text-lg font-semibold text-[#2B2B2B] transition group-hover:text-[#003F6B]',
        className
      )}
    >
      {children}
    </h3>
  );
};

export const CardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p className={cn('max-w-sm text-sm font-normal text-[#666666]', className)}>
      {children}
    </p>
  );
};

export const CardSkeletonContainer = ({
  className,
  children,
  showGradient = true,
}: {
  className?: string;
  children: React.ReactNode;
  showGradient?: boolean;
}) => {
  return (
    <div
      className={cn(
        'z-40 h-[20rem] rounded-xl bg-[#F8F9FA]',
        className,
        showGradient &&
          '[mask-image:radial-gradient(50%_50%_at_50%_50%,white_0%,transparent_100%)]'
      )}
    >
      {children}
    </div>
  );
};

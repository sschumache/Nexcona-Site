import React from 'react';

import { cn } from '@/lib/utils';

export const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn('mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-8', className)}
    >
      {children}
    </div>
  );
};

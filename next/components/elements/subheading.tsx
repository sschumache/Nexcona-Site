import { MotionProps } from 'framer-motion';
import React from 'react';
import Balancer from 'react-wrap-balancer';

import { cn } from '@/lib/utils';

export const Subheading = ({
  className,
  as: Tag = 'p',
  children,
  ...props
}: {
  className?: string;
  as?: any;
  children: any;
  props?: React.HTMLAttributes<HTMLParagraphElement>;
} & MotionProps &
  React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <Tag
      className={cn(
        'text-sm md:text-base max-w-3xl mx-auto my-4 text-center',
        'text-[#666666] leading-relaxed',
        className
      )}
      {...props}
    >
      <Balancer>{children}</Balancer>
    </Tag>
  );
};

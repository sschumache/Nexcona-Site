'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';

export const BlurImage = ({
  src,
  width,
  height,
  alt,
  priority = false,
  className,
  ...rest
}: React.ComponentProps<typeof Image>) => {
  const [isLoading, setLoading] = useState(!priority);

  return (
    <Image
      className={cn(
        'transition duration-300',
        isLoading ? 'blur-sm' : 'blur-0',
        className
      )}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      alt={alt || 'Image'}
      priority={priority}
      {...rest}
    />
  );
};

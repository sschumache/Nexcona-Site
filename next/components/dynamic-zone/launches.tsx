'use client';

import { IconRocket } from '@tabler/icons-react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import React, { useRef, useState } from 'react';

import { Heading } from '../elements/heading';
import { Subheading } from '../elements/subheading';
import { FeatureIconContainer } from './features/feature-icon-container';
import { StickyScroll } from '@/components/ui/sticky-scroll';

export const Launches = ({
  heading,
  sub_heading,
  launches,
}: {
  heading: string;
  sub_heading: string;
  launches: any[];
}) => {
  const launchesWithDecoration = launches.map((entry) => ({
    ...entry,
    icon: <IconRocket className="h-8 w-8 text-[#003F6B]" />,
    content: (
      <p className="text-4xl font-bold text-[#2B2B2B] md:text-7xl">
        {entry.mission_number}
      </p>
    ),
  }));

  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const backgrounds = ['#FFFFFF', '#F8F9FA', '#FFFFFF'];
  const [gradient, setGradient] = useState(backgrounds[0]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const cardsBreakpoints = launches.map(
      (_, index) => index / launches.length
    );

    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);

        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }

        return acc;
      },
      0
    );

    setGradient(backgrounds[closestBreakpointIndex % backgrounds.length]);
  });

  return (
    <motion.div
      animate={{
        background: gradient,
      }}
      transition={{
        duration: 0.5,
      }}
      ref={ref}
      className="relative h-full w-full pt-20 md:pt-40"
    >
      <div className="px-6">
        <FeatureIconContainer className="flex items-center justify-center overflow-hidden">
          <IconRocket className="h-6 w-6 text-[#003F6B]" />
        </FeatureIconContainer>

        <Heading className="mt-4">{heading}</Heading>
        <Subheading>{sub_heading}</Subheading>
      </div>

      <StickyScroll content={launchesWithDecoration} />
    </motion.div>
  );
};

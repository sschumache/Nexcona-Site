'use client';
import React from 'react';

export const SkeletonFive = ({ logos }: { logos?: any[] }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 h-full p-6">
      {logos?.map((logo, index) => (
        <img
          key={index}
          src={logo?.url}
          alt={logo?.alternativeText || 'logo'}
          className="h-10 w-auto object-contain grayscale hover:grayscale-0 transition duration-300"
        />
      ))}
    </div>
  );
};
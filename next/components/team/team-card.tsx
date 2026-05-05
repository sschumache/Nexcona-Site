'use client';

import Image from 'next/image';
import { useState } from 'react';

import { cn } from '@/lib/utils';

type TeamMember = {
  name: string;
  role: string;
  description?: string;
  image?: {
    url: string;
    alternativeText?: string;
  };
  linkedin?: string;
  order?: number;
};

export function TeamCard({ member }: { member: TeamMember }) {
  const [hovered, setHovered] = useState(false);

  const imageUrl = member.image?.url?.startsWith('http')
    ? member.image.url
    : member.image?.url
      ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${member.image.url}`
      : undefined;

  return (
    <article
      className="group relative overflow-hidden rounded-[2.5rem] border border-[#E2E2E2] bg-white/80 p-6 shadow-sm backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#00AEEF]/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#003F6B]/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#F4F7F9]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={member.image?.alternativeText || member.name}
              fill
              className={cn(
                'object-cover transition-transform duration-700',
                hovered ? 'scale-105' : 'scale-100'
              )}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-6xl font-medium text-[#666666]">
                {member.name.charAt(0)}
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-80" />
        </div>

        <div className="pt-6">
          <h3 className="text-xl font-medium tracking-tight text-[#2B2B2B]">
            {member.name}
          </h3>

          <p className="mt-1 text-sm font-medium text-[#00AEEF]">
            {member.role}
          </p>

          {member.description && (
            <p className="mt-4 text-sm leading-relaxed text-[#666666]">
              {member.description}
            </p>
          )}

          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center text-sm font-medium text-[#003F6B] transition-colors hover:text-[#00AEEF]"
            >
              LinkedIn
              <span className="ml-2">→</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
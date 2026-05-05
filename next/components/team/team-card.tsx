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

  return (
    <div
      className="relative flex flex-col items-center group cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden mb-6">
        {member.image?.url ? (
          <Image
            src={member.image.url}
            alt={member.image.alternativeText || member.name}
            fill
            className={cn(
              'object-cover transition-transform duration-500',
              hovered ? 'scale-110' : 'scale-100'
            )}
          />
        ) : (
          <div className="w-full h-full bg-[#E2E2E2] flex items-center justify-center">
            <span className="text-4xl font-medium text-[#666666]">
              {member.name.charAt(0)}
            </span>
          </div>
        )}

        <div
          className={cn(
            'absolute inset-0 bg-[#003F6B]/20 transition-opacity duration-300',
            hovered ? 'opacity-100' : 'opacity-0'
          )}
        />
      </div>

      <div className="text-center px-4">
        <h3 className="text-lg font-medium text-[#2B2B2B]">
          {member.name}
        </h3>

        <p className="text-sm text-[#00AEEF] font-medium mt-1">
          {member.role}
        </p>

        {member.description && (
          <p
            className={cn(
              'text-sm text-[#666666] mt-3 max-w-xs mx-auto leading-relaxed transition-all duration-300',
              hovered
                ? 'opacity-100 max-h-40'
                : 'opacity-0 max-h-0 overflow-hidden'
            )}
          >
            {member.description}
          </p>
        )}

        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center gap-1.5 mt-3 text-xs text-[#306B8C] hover:text-[#003F6B] transition-all duration-300',
              hovered ? 'opacity-100' : 'opacity-0'
            )}
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
        )}
      </div>

      <div
        className={cn(
          'absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#00AEEF] transition-all duration-300',
          hovered ? 'w-16' : 'w-0'
        )}
      />
    </div>
  );
}
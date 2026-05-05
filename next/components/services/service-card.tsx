import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

type ServiceCardProps = {
  service: {
    id: number;
    name: string;
    slug: string;
    short_description?: string;
    highlight?: boolean;
    icon?: {
      url: string;
      alternativeText?: string;
    };
  };
  locale: string;
};

export function ServiceCard({ service, locale }: ServiceCardProps) {
  return (
    <Link
      href={`/${locale}/services/${service.slug}`}
      className={cn(
        'group relative overflow-hidden rounded-[2rem] border bg-white/80 p-8',
        'border-[#E2E2E2] shadow-sm backdrop-blur-xl',
        'transition-all duration-500 hover:-translate-y-1 hover:shadow-xl',
        service.highlight && 'border-[#00AEEF]/40 bg-[#F5FCFF]'
      )}
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#00AEEF]/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#003F6B]/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4F7F9]">
          {service.icon?.url ? (
            <Image
              src={service.icon.url}
              alt={service.icon.alternativeText || service.name}
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
          ) : (
            <div className="h-6 w-6 rounded-full bg-[#00AEEF]" />
          )}
        </div>

        <h3 className="text-xl font-medium tracking-tight text-[#2B2B2B]">
          {service.name}
        </h3>

        {service.short_description && (
          <p className="mt-4 text-sm leading-relaxed text-[#666666]">
            {service.short_description}
          </p>
        )}

        <div className="mt-8 inline-flex items-center text-sm font-medium text-[#003F6B]">
          Mehr erfahren
          <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
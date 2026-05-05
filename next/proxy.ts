import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { i18n } from '@/i18n.config';

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  return NextResponse.redirect(
    new URL(
      `/${i18n.defaultLocale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
      request.url
    )
  );
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  LOCALE_HEADER,
  isLocalizablePath,
  stripLocalePrefix,
  type Locale,
} from '@/lib/i18n/config';

const ONE_YEAR = 60 * 60 * 24 * 365;

function withLocaleHeader(request: NextRequest, locale: Locale): Headers {
  const headers = new Headers(request.headers);
  headers.set(LOCALE_HEADER, locale);
  return headers;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ───────────── Admin: Vietnamese UI + auth protection ─────────────
  if (pathname.startsWith('/admin')) {
    // Allow static files in /admin (e.g. /admin/bg.png, images, icons, fonts)
    if (/\.(png|jpe?g|gif|webp|svg|ico|css|js|woff2?|map)$/i.test(pathname)) {
      return NextResponse.next();
    }

    const isLoginPage = pathname === '/admin/login';

    // Check Better Auth session cookies
    const sessionCookie =
      request.cookies.get('better-auth.session_token') ||
      request.cookies.get('__Secure-better-auth.session_token');

    const hasSession = Boolean(sessionCookie?.value);

    // If accessing protected admin route without session cookie -> redirect to login immediately
    if (!isLoginPage && !hasSession) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // If accessing login page while already authenticated -> redirect to dashboard
    if (isLoginPage && hasSession) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    // Admin is always Vietnamese (only affects <html lang>)
    return NextResponse.next({
      request: { headers: withLocaleHeader(request, 'vi') },
    });
  }

  // ───────────── Public site: EN (default, no prefix) / VI (/vi/...) ─────────────
  const { locale: prefixed, pathname: barePath } = stripLocalePrefix(pathname);

  // "/vi/..." -> render the same page as "/..." in Vietnamese
  if (prefixed) {
    // "/vi/admin", "/vi/api/..." are not real pages: send them to the real path
    if (!isLocalizablePath(barePath)) {
      const url = request.nextUrl.clone();
      url.pathname = barePath;
      return NextResponse.redirect(url);
    }

    const url = request.nextUrl.clone();
    url.pathname = barePath;
    const response = NextResponse.rewrite(url, {
      request: { headers: withLocaleHeader(request, prefixed) },
    });
    response.cookies.set(LOCALE_COOKIE, prefixed, {
      path: '/',
      maxAge: ONE_YEAR,
      sameSite: 'lax',
    });
    return response;
  }

  // Unprefixed page navigation by a visitor who chose Vietnamese -> /vi/...
  const remembered = request.cookies.get(LOCALE_COOKIE)?.value;
  if (
    remembered === 'vi' &&
    request.method === 'GET' &&
    isLocalizablePath(pathname)
  ) {
    const url = request.nextUrl.clone();
    url.pathname = pathname === '/' ? '/vi' : `/vi${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next({
    request: { headers: withLocaleHeader(request, DEFAULT_LOCALE) },
  });
}

export const config = {
  // Every page route; skip api, Next internals and any path containing a file extension.
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};

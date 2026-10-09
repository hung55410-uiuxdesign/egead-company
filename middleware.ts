import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes
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
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

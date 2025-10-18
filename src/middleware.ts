import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions, type SessionData } from '@/lib/session';

export async function middleware(request: NextRequest) {
  const session = await getIronSession<SessionData>(
    request.cookies,
    sessionOptions
  );

  const { isLoggedIn } = session;
  const { pathname } = request.nextUrl;

  // Protect all /admin routes
  if (pathname.startsWith('/admin')) {
    if (!isLoggedIn) {
      // User is not logged in, redirect to login page
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Redirect logged-in users away from /login
  if (pathname.startsWith('/login')) {
    if (isLoggedIn) {
      // User is logged in, redirect to admin dashboard
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login/:path*'],
};

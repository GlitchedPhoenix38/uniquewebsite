import { NextRequest, NextResponse } from 'next/server';

const localHosts = new Set(['localhost', '127.0.0.1', '0.0.0.0', '[::1]', '::1']);

function isLocalHost(host: string | null) {
  if (!host) return false;
  const hostname = host.startsWith('[') ? host.slice(1, host.indexOf(']')) : host.split(':')[0];
  return localHosts.has(hostname);
}

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin') && !isLocalHost(request.headers.get('host'))) {
    return new NextResponse('Not Found', { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

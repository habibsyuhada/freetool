// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';

  if (hostname.startsWith('qrcode.')) {
    url.pathname = '/qrcode';
  } else if (hostname.startsWith('pdf.')) {
    url.pathname = '/pdf';
  }

  return NextResponse.rewrite(url);
}
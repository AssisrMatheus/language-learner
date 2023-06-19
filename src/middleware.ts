import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, supportedLocales } from './dictionaries';

// Get the preferred locale, similar to above or using a library
function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language');
  const languages = new Negotiator({
    headers: { 'accept-language': acceptLanguage || undefined }
  }).languages();
  return match(languages, supportedLocales, defaultLocale);
}

export function middleware(request: NextRequest) {
  console.log('middleware', request.nextUrl.pathname);

  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = supportedLocales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(new URL(`/${locale}/${pathname}`, request.url));
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!api|_next|favicon.ico).*)'
    // Optional: only run on root (/) URL
    // '/'
  ]
};

import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const supportedLocales = ['en']; // Supported locales
const defaultLocale = 'en';

// Get the preferred locale, similar to above or using a library
function getLocale(acceptLanguage: string | undefined) {
  const languages = new Negotiator({
    headers: { 'accept-language': acceptLanguage || undefined }
  }).languages();
  return match(languages, supportedLocales, defaultLocale);
}

export default async function Profile() {
  const acceptLanguage = headers().get('accept-language');
  const locale = getLocale(acceptLanguage || undefined);
  redirect(`/${locale}`);
}

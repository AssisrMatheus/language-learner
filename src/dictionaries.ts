import 'server-only';

export type SupportedLocales = 'en';
export const supportedLocales = ['en']; // Supported locales
export const defaultLocale = 'en';

const dictionaries = {
  en: () => import('./../dictionaries/en.json').then((module) => module.default)
  //   nl: () => import("./dictionaries/nl.json").then((module) => module.default),
};

export const getDictionary = async (locale: SupportedLocales) => dictionaries[locale || defaultLocale]();

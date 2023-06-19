import '../../env';
import { SupportedLocales } from '@/dictionaries';
import './../globals.css';
import { Inter } from 'next/font/google';
import Providers from './providers';
import DarkMode from './dark-mode';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Language learner',
  description: 'Generate flashcards for language learning'
};

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { lang: SupportedLocales };
}) {
  return (
    <html lang={params.lang}>
      <body className={inter.className}>
        <DarkMode />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

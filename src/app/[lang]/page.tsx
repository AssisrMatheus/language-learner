import { SupportedLocales, getDictionary } from '@/dictionaries';
import Fetcher from './fetcher';

export default async function Home({ params: { lang } }: { params: { lang: SupportedLocales } }) {
  const dict = await getDictionary(lang);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <section>
        <Fetcher dict={dict.home} />
      </section>
    </main>
  );
}

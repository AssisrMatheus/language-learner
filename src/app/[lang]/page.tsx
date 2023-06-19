import { SupportedLocales, getDictionary } from '@/dictionaries';
import Fetcher from './fetcher';
import { H3 } from '@/components/ui/typography/h3';

export default async function Home({ params: { lang } }: { params: { lang: SupportedLocales } }) {
  const dict = await getDictionary(lang);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <section>
        <H3 className="text-center mb-8">{dict.home.title}</H3>
        <Fetcher dict={{ fetcher: dict.fetcher }} />
      </section>
    </main>
  );
}

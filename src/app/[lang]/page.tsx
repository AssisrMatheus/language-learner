import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SupportedLocales, getDictionary } from '@/dictionaries';
import Ai from './ai';

export default async function Home({ params: { lang } }: { params: { lang: SupportedLocales } }) {
  const dict = await getDictionary(lang);

  async function search(data: FormData) {
    'use server';

    console.log(data.get('search'));
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <section>
        <Ai dict={dict.home} />
      </section>
    </main>
  );
}

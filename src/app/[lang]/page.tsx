import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SupportedLocales, getDictionary } from '@/dictionaries';

export default async function Home({ params: { lang } }: { params: { lang: SupportedLocales } }) {
  const dict = await getDictionary(lang);

  async function search(data: FormData) {
    'use server';

    console.log(data.get('search'));
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <section>
        <form action={search} className="flex w-full max-w-lg items-center space-x-2">
          <Input className="" type="text" placeholder="Write your verb" name="search" />
          <Button type="submit">{dict.home.searchAction}</Button>
        </form>
      </section>
    </main>
  );
}

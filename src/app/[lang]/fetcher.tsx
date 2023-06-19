'use client';

import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import { Input } from '@/components/ui/input';
import { AvailableConjugationLanguages } from '@/lib/third-party/reverso';
import { trpc } from '@/lib/trpc';
import Cards from './cards';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export default function Fetcher({
  dict
}: {
  dict: {
    fetcher: {
      searchPlaceholder: string;
      selectorEmptyState: string;
      selectorPlaceholder: string;
      selectorSearchPlaceholder: string;
      searchAction: string;
    };
  };
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const { data, isFetching } = trpc.verbs.conjugate.useQuery(
    {
      search: searchParams.get('search') as string,
      language: searchParams.get('language') as AvailableConjugationLanguages
    },
    {
      enabled: !!searchParams.get('search') && !!searchParams.get('language')
    }
  );

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          const data = new FormData(event.target as HTMLFormElement);
          const form = {
            search: data.get('search') as string,
            language: data.get('language') as AvailableConjugationLanguages
          };

          if (form.language && form.search) {
            const searchParams = new URLSearchParams();
            searchParams.set('search', form.search);
            searchParams.set('language', form.language);
            push(`${pathname}?${searchParams.toString()}`);
          }
        }}
        className="mx-auto flex w-full max-w-lg items-center space-x-2"
      >
        <Input placeholder={dict.fetcher.searchPlaceholder} disabled={isFetching} name="search" />
        <Combobox
          name="language"
          emptyState={dict.fetcher.selectorEmptyState}
          placeholder={dict.fetcher.selectorPlaceholder}
          searchPlaceholder={dict.fetcher.selectorSearchPlaceholder}
          options={[
            { value: 'french', label: '🇫🇷' },
            { value: 'portuguese', label: '🇧🇷' }
          ]}
        />
        <Button type="submit" disabled={isFetching}>
          {dict.fetcher.searchAction}
        </Button>
      </form>
      <Cards isLoading={isFetching} data={data} />
    </>
  );
}

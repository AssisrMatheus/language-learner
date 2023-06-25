'use client';

import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import { Input } from '@/components/ui/input';
import { useSearch } from '@/lib/search';
import type { AvailableConjugationLanguages } from '@/lib/third-party/reverso';
import { trpc } from '@/lib/trpc';
import { z } from 'zod';
import Cards from './cards';

const labelForLanguage: { [key in AvailableConjugationLanguages]: React.ReactNode } = {
  arabic: '🇸🇦',
  english: '🇬🇧',
  french: '🇫🇷',
  german: '🇩🇪',
  hebrew: '🇮🇱',
  italian: '🇮🇹',
  japanese: '🇯🇵',
  portuguese: '🇧🇷',
  russian: '🇷🇺',
  spanish: '🇪🇸'
};

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
  const {
    params: { language, search },
    setSearch
  } = useSearch(
    z.object({
      search: z.string(),
      language: z.string()
    })
  );

  const { data, isFetching } = trpc.verbs.conjugate.useQuery(
    {
      search: search!,
      language: language! as AvailableConjugationLanguages
    },
    {
      enabled: !!search && !!language
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
            setSearch(form);
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
          options={Object.keys(labelForLanguage).map((language) => ({
            value: language,
            label: labelForLanguage[language as AvailableConjugationLanguages]
          }))}
        />
        <Button type="submit" disabled={isFetching}>
          {dict.fetcher.searchAction}
        </Button>
      </form>
      <Cards isLoading={isFetching} data={data} />
    </>
  );
}

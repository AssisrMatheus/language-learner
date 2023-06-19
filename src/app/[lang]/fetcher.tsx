'use client';

import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import { Input } from '@/components/ui/input';
import { AvailableConjugationLanguages } from '@/lib/third-party/reverso';
import { trpc } from '@/lib/trpc';

export default function Fetcher({ dict }: { dict: any }) {
  const { data, mutate, isLoading } = trpc.verbs.conjugate.useMutation();

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
            mutate(form);
          }
        }}
        className="flex w-full mx-auto max-w-lg items-center space-x-2"
      >
        <Input placeholder="Say something..." disabled={isLoading} name="search" />
        <Combobox
          name="language"
          emptyState="No results"
          placeholder="Language"
          searchPlaceholder="Search..."
          options={[
            { value: 'french', label: '🇫🇷' },
            { value: 'portuguese', label: '🇧🇷' }
          ]}
        />
        <Button type="submit" disabled={isLoading}>
          {dict.searchAction}
        </Button>
      </form>
      {data && <code>{JSON.stringify(data, null, 2)}</code>}
    </>
  );
}

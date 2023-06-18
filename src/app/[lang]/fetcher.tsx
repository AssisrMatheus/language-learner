'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { trpc } from '@/lib/trpc';

export default function Fetcher({ dict }: { dict: any }) {
  const { data, mutate, isLoading } = trpc.verbs.conjugate.useMutation();

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.target as HTMLFormElement);
          mutate({ verb: data.get('search') as string });
        }}
        className="flex w-full max-w-lg items-center space-x-2"
      >
        <Input placeholder="Say something..." disabled={isLoading} name="search" />
        <Button type="submit" disabled={isLoading}>
          {dict.searchAction}
        </Button>
      </form>
      {data && <p>{JSON.stringify(data, null, 2)}</p>}
    </>
  );
}

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import z from 'zod';

export const useSearch = <S extends z.AnyZodObject>(schema: S) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sch = useMemo(() => schema.partial(), []);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const params = useMemo((): z.infer<S> => {
    const result = sch.safeParse(Object.fromEntries(searchParams.entries()));
    if (result.success) {
      return result.data;
    }
    return {};
  }, [sch, searchParams]);

  const setSearch = useCallback(
    (params: Record<string, string>) => {
      const current = new URLSearchParams(params);
      const search = current.toString();
      const query = search ? `?${search}` : '';
      push(`${pathname}${query}`);
    },
    [pathname, push]
  );

  return { params, setSearch };
};

import { PropsWithChildren } from 'react';

export function Lead({ children }: PropsWithChildren) {
  return <p className="text-xl text-muted-foreground">{children}</p>;
}

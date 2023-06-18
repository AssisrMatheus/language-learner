import { PropsWithChildren } from 'react';

export function Muted({ children }: PropsWithChildren) {
  return <p className="text-sm text-muted-foreground">{children}</p>;
}

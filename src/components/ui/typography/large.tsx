import { PropsWithChildren } from 'react';

export function Large({ children }: PropsWithChildren) {
  return <div className="text-lg font-semibold">{children}</div>;
}

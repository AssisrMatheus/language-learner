import { PropsWithChildren } from 'react';

export function Small({ children }: PropsWithChildren) {
  return <small className="text-sm font-medium leading-none">{children}</small>;
}

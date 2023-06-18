import { PropsWithChildren } from 'react';

export function Blockquote({ children }: PropsWithChildren) {
  return <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>;
}

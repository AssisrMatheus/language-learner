import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

export function Lead({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <p className={cn('text-xl text-muted-foreground', className)}>{children}</p>;
}

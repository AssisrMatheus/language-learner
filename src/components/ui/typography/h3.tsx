import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

export function H3({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <h3 className={cn('scroll-m-20 text-2xl font-semibold tracking-tight', className)}>{children}</h3>;
}

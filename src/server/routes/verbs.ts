import { router, publicProcedure } from '../trpc';
import reverso from '@/lib/third-party/reverso';
import z from 'zod';

export const verbsRouter = router({
  conjugate: publicProcedure
    .input(
      z.object({
        verb: z.string()
      })
    )
    .mutation(async ({ input }) => {
      return reverso.conjugate(input.verb, 'french');
    })
});

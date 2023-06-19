import { router, publicProcedure } from '../trpc';
import reverso from '@/lib/third-party/reverso';
import z from 'zod';

export const verbsRouter = router({
  conjugate: publicProcedure
    .input(
      z.object({
        search: z.string(),
        language: z.enum([
          'english',
          'russian',
          'french',
          'spanish',
          'german',
          'italian',
          'portuguese',
          'hebrew',
          'arabic',
          'japanese'
        ])
      })
    )
    .mutation(async ({ input }) => {
      const verbs = await reverso.conjugate(input.search, input.language);

      // const promises = verbs.map(async (verb) => {
      //   const context = await reverso.context(verb.phrase.join(''), input.language, 'english');
      //   console.log(context);
      // });

      // await Promise.all(promises);

      return verbs;
    })
});

import { appRouter } from '@/server';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

// this is the server RPC API handler

const handler = (request: Request) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request,
    router: appRouter,
    createContext: function (/* opts: FetchCreateContextFnOptions */): object | Promise<object> {
      // empty context
      return {};
    },
    responseMeta: (
      {
        /* ctx, paths, type */
      }
    ) => {
      if (process.env.VERCEL_URL || process.env.NODE_ENV === 'development') {
        return {
          headers: {
            // Ref: https://vercel.com/docs/concepts/functions/serverless-functions/edge-caching
            'cache-control': `s-maxage=1, stale-while-revalidate=10`
          }
        };
      }

      return {};
    }
  });
};

export const GET = handler;
export const POST = handler;

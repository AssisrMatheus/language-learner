import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { verbsRouter } from './routes/verbs';
import { router } from './trpc';

export const appRouter = router({
  verbs: verbsRouter
});

let trpcCaller: ReturnType<AppRouter['createCaller']> | undefined = undefined;

/**
 * Creates an instance of trpc to be used
 */
export const getInternalTrpc = () => {
  // Only create on server
  if (!trpcCaller && typeof window === 'undefined') {
    trpcCaller = appRouter.createCaller({});
  }

  return trpcCaller as ReturnType<AppRouter['createCaller']>;
};

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
export type RouterOutput = inferRouterOutputs<AppRouter>;
export type RouterInput = inferRouterInputs<AppRouter>;

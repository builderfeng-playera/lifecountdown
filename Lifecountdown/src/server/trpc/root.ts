import {
  createCallerFactory,
  createTRPCRouter,
  baseProcedure,
} from "~/server/trpc/main";
import { calculateLifeMetrics } from "~/server/trpc/procedures/calculateLifeMetrics";

export const appRouter = createTRPCRouter({
  calculateLifeMetrics,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);

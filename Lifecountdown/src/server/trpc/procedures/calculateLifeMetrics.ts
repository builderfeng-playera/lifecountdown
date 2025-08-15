import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { baseProcedure } from "~/server/trpc/main";

export const calculateLifeMetrics = baseProcedure
  .input(
    z.object({
      age: z.number().min(0, "Age must be positive").max(120, "Age must be realistic"),
    })
  )
  .query(async ({ input }) => {
    const { age } = input;

    // Life expectancy and physiological constants
    const AVERAGE_LIFE_EXPECTANCY = 80; // years
    const HEART_RATE_PER_MINUTE = 70; // beats per minute
    const BREATHING_RATE_PER_MINUTE = 15; // breaths per minute

    // Check if age exceeds life expectancy
    if (age >= AVERAGE_LIFE_EXPECTANCY) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Age exceeds average life expectancy. Consider yourself living on borrowed time!",
      });
    }

    // Calculate remaining time
    const remainingYears = AVERAGE_LIFE_EXPECTANCY - age;
    const remainingDays = remainingYears * 365.25; // Account for leap years
    const remainingHours = remainingDays * 24;
    const remainingMinutes = remainingHours * 60;

    // Calculate remaining heartbeats and breaths
    const remainingHeartbeats = Math.floor(remainingMinutes * HEART_RATE_PER_MINUTE);
    const remainingBreaths = Math.floor(remainingMinutes * BREATHING_RATE_PER_MINUTE);

    return {
      age,
      remainingYears: Math.round(remainingYears * 100) / 100, // Round to 2 decimal places
      remainingDays: Math.floor(remainingDays),
      remainingHours: Math.floor(remainingHours),
      remainingMinutes: Math.floor(remainingMinutes),
      remainingHeartbeats,
      remainingBreaths,
      lifeExpectancy: AVERAGE_LIFE_EXPECTANCY,
    };
  });

import z from "zod";

export const tripSchema = z.object({
  title: z.string().min(3),
  destination: z.string().min(3),
  days: z.number().positive(),
  budget: z.number().positive(),
});

export type TripInput = z.infer<typeof tripSchema>;

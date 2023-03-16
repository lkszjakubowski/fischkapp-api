import { z } from 'zod';

export const ParamsWithTag = z.object({
  tag: z.string().trim().min(2),
});

export type ParamsWithTag = z.infer<typeof ParamsWithTag>;

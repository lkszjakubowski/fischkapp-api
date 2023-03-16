import { z } from 'zod';

export const ParamsWithAuthor = z.object({
  author: z.string().trim().min(2),
});

export type ParamsWithAuthor = z.infer<typeof ParamsWithAuthor>;

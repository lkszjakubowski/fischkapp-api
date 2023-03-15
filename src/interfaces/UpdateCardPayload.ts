import { z } from 'zod';

export const UpdateCardPayload = z
  .object({
    front: z.string().trim().min(1),
    back: z.string().trim().min(1),
    tags: z.array(z.string().trim().min(1)),
  })
  .strict();

export type UpdateCardPayload = z.infer<typeof UpdateCardPayload>;

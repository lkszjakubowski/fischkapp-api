import { z } from 'zod';
import { WithId } from 'mongodb';

export const TCard = z
  .object({
    front: z.string().trim().min(1),
    back: z.string().trim().min(1),
    tags: z.array(z.string().trim().min(1)),
    author: z.string().trim().min(2),
    createdAt: z.date().optional(),
  })
  .strict();

export type TCard = z.infer<typeof TCard>;

export const UpdateCardPayload = z
  .object({
    front: z.string().trim().min(1),
    back: z.string().trim().min(1),
    tags: z.array(z.string().trim().min(1)),
  })
  .strict();

export type UpdateCardPayload = z.infer<typeof UpdateCardPayload>;

export type CardWithId = WithId<TCard>;

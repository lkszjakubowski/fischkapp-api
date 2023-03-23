import { z } from 'zod';
import { ObjectId } from 'mongodb';

const payload = {
  body: z
    .object({
      front: z.string().trim().min(1),
      back: z.string().trim().min(1),
      tags: z.array(z.string().trim().min(1)),
      author: z.string().trim().min(2),
    })
    .strict(),
};

const params = {
  params: z.object({
    id: z
      .string()
      .min(1)
      .refine((val) => {
        return ObjectId.isValid(val);
      }, 'Invalid ID')
      .optional(),
    author: z.string().trim().min(2).optional(),
    tag: z.string().trim().min(2).optional(),
  }),
};

export const createCardSchema = z.object({
  ...payload,
});

export const updateCardSchema = z.object({
  ...payload,
  ...params,
});

export const deleteCardSchema = z.object({
  ...params,
});

export const getCardSchema = z.object({
  ...params,
});

export type CreateCardInput = z.infer<typeof createCardSchema>;
export type UpdateCardInput = z.infer<typeof updateCardSchema>;
export type ReadCardInput = z.infer<typeof getCardSchema>;
export type DeleteCardInput = z.infer<typeof deleteCardSchema>;

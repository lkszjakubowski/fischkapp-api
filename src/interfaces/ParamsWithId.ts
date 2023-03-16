import { z } from 'zod';
import { ObjectId } from 'mongodb';

export const ParamsWithId = z.object({
  id: z
    .string()
    .min(1)
    .refine((val) => {
      return ObjectId.isValid(val);
    }, 'Invalid ID'),
});

export type ParamsWithId = z.infer<typeof ParamsWithId>;

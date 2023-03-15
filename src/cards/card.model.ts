import { z } from 'zod';
import { Schema, model } from 'mongoose';

export const TCard = z.object({
  front: z.string().trim().min(1),
  back: z.string().trim().min(1),
  tags: z.array(z.string().trim().min(1)),
  author: z.string().trim().min(1),
});

export type TCard = z.infer<typeof TCard>;

const cardSchema = new Schema<TCard>(
  {
    front: {
      type: String,
      required: true,
      unique: true,
      minlength: 1,
    },
    back: {
      type: String,
      required: true,
      minlength: 1,
    },
    tags: [
      {
        type: String,
        required: true,
      },
    ],
    author: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

cardSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
  },
});

export const Card = model<TCard>('Card', cardSchema);

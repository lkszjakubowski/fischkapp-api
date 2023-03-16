import { TCard } from './card.interfaces';
import { Schema, model } from 'mongoose';

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

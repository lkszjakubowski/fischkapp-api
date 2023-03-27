import mongoose, { ObjectId } from 'mongoose';

export interface UserUpdateInput {
  front: String;
  back: String;
  tags: Array<string>;
}

export interface UserInput extends UserUpdateInput {
  author: String;
}

export interface CardDocument extends UserInput {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const cardSchema = new mongoose.Schema(
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
  transform: (_document, returnedObject) => {
    delete returnedObject.__v;
  },
});

const CardModel = mongoose.model<CardDocument>('Card', cardSchema);

export default CardModel;

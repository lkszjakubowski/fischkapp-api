import { z } from 'zod';
import { ObjectId } from 'mongodb';

/**
 * @openapi
 *
 * components:
 *  examples:
 *    flashcardExample:
 *      value:
 *        _id: 643d1430dafadc165b96049c
 *        front: No
 *        back: Nein
 *        tags: [French, German]
 *        author: John
 *        createdAt: 2023-01-19T10:51:22Z
 *        updatedAt: 2023-01-20T04:30:35Z
 *      summary: A sample flashcard
 *    flashcardInputExample:
 *      value:
 *        front: No
 *        back: Nein
 *        tags: [French, German]
 *        author: John
 *      summary: A sample flashcard input
 *    flashcardArray:
 *      value:
 *        - _id: 643d1430dafadc165b96049c
 *          front: No
 *          back: Nein
 *          tags: [French, German]
 *          author: John
 *          createdAt: 2023-01-19T10:51:22Z
 *          updatedAt: 2023-01-20T04:30:35Z
 *        - _id: 94dc013f9ac7cfbbba14b0c1
 *          front: Si
 *          back: Ja
 *          tags: [Spanish, German]
 *          author: Jane
 *          createdAt: 2023-02-10T15:20:45Z
 *          updatedAt: 2023-02-11T08:15:11Z
 *      summary: An array of flashcards
 *  schemas:
 *    ArrayOfFlashcards:
 *      type: array
 *      items:
 *        type: object
 *        properties:
 *          _id:
 *            type: string
 *          front:
 *            type: string
 *          back:
 *            type: string
 *          tags:
 *            type: array
 *            items:
 *              type: string
 *          author:
 *            type: string
 *          createdAt:
 *            type: string
 *          updatedAt:
 *            type: string
 *    FlashcardInput:
 *      type: object
 *      properties:
 *        front:
 *          type: string
 *        back:
 *          type: string
 *        tags:
 *          type: array
 *          items:
 *            type: string
 *        author:
 *          type: string
 *      required:
 *        - front
 *        - back
 *        - tags
 *        - author
 */

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

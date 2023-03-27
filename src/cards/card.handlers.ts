import { NextFunction, Request, Response } from 'express';
import {
  CreateCardInput,
  ReadCardInput,
  UpdateCardInput,
} from './card.interfaces';
import { CardDocument } from './card.model';
import {
  createCard,
  findCards,
  findCard,
  updateCard,
  deleteCard,
} from './card.services';
import { lessThanFiveMinutes } from './card.validators';

export async function createCardHandler(
  req: Request<{}, {}, CreateCardInput['body']>,
  res: Response,
  next: NextFunction
) {
  try {
    const card = await createCard({ ...req.body });
    res.status(201).json(card);
  } catch (error) {
    next(error);
  }
}

export async function findCardsHandler(
  _req: Request,
  res: Response<CardDocument[]>
) {
  const cards = await findCards({});
  res.status(200).json(cards);
}

export async function findCardByIdHandler(
  req: Request<ReadCardInput['params']>,
  res: Response<CardDocument>
) {
  const id = req.params.id;
  const card = await findCard({ _id: id });

  if (!card) {
    return res.status(404).end();
  }
  return res.status(200).json(card);
}

export async function findCardsByAuthorHandler(
  req: Request<ReadCardInput['params']>,
  res: Response<CardDocument[]>
) {
  const author = req.params.author;
  const cards = await findCards({ author });

  return res.status(200).json(cards);
}

export async function findCardsByTagHandler(
  req: Request<ReadCardInput['params']>,
  res: Response<CardDocument[]>
) {
  const tag = req.params.tag;
  const cards = await findCards({ tags: tag });

  return res.status(200).json(cards);
}

export async function updateCardHandler(
  req: Request<UpdateCardInput['params']>,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;
  const body = req.body;

  const card = await findCard({ _id: id });

  if (!card) {
    return res.status(404).end();
  }

  try {
    const updatedCard = await updateCard({ _id: id }, body, {
      new: true,
    });

    return res.status(200).json(updatedCard);
  } catch (error) {
    return next(error);
  }
}

export async function deleteCardHandler(
  req: Request<UpdateCardInput['params']>,
  res: Response
) {
  const id = req.params.id;

  const card = await findCard({ _id: id });

  if (!card) {
    return res.status(404).end();
  }

  if (lessThanFiveMinutes(card)) {
    await deleteCard({ _id: id });
    return res.status(200).end();
  }

  return res.status(403).end();
}

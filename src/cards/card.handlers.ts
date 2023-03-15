import { NextFunction, Request, Response } from 'express';
import CardWithId from '../interfaces/CardWithId';
import { Card, TCard } from './card.model';

export const createOne = async (
  req: Request<{}, CardWithId, TCard>,
  res: Response<CardWithId>,
  next: NextFunction
) => {
  try {
    const savedCard = await Card.create(req.body);
    res.status(201).json(savedCard);
  } catch (error) {
    next(error);
  }
};

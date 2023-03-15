import { NextFunction, Request, Response } from 'express';
import CardWithId from '../interfaces/CardWithId';
import { ParamsWithId } from '../interfaces/ParamsWithId';
import { Card, TCard } from './card.model';
import { ObjectId } from 'mongodb';
import { UpdateCardPayload } from '../interfaces/UpdateCardPayload';

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

export const updateOne = async (
  req: Request<ParamsWithId, CardWithId, UpdateCardPayload>,
  res: Response<CardWithId>,
  next: NextFunction
) => {
  try {
    const result = await Card.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log(result);
    if (!result) {
      res.status(404).end();
    } else {
      res.status(201).json(result);
    }
  } catch (error) {
    next(error);
  }
};

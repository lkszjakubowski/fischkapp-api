import { NextFunction, Request, Response } from 'express';
import { ParamsWithId } from '../interfaces/ParamsWithId';
import { Card } from './card.model';
import { TCard, UpdateCardPayload, CardWithId } from './card.interfaces';
import { ParamsWithAuthor } from '../interfaces/ParamsWithAuthor';
import { ParamsWithTag } from '../interfaces/ParamsWithTag';
import { lessThanFiveMinutes } from './card.validators';

export const findAll = async (
  _req: Request,
  res: Response<CardWithId[]>,
  _next: NextFunction
) => {
  const result = await Card.find().sort({ createdAt: -1 });
  res.status(200).json(result);
};

export const findByAuthor = async (
  req: Request<ParamsWithAuthor, CardWithId[], {}>,
  res: Response<CardWithId[]>,
  _next: NextFunction
) => {
  const result = await Card.find({ author: req.params.author }).sort({
    createdAt: -1,
  });
  res.status(201).json(result);
};

export const findByTag = async (
  req: Request<ParamsWithTag, CardWithId[], {}>,
  res: Response<CardWithId[]>,
  _next: NextFunction
) => {
  const result = await Card.find({ tags: req.params.tag }).sort({
    createdAt: -1,
  });
  res.status(201).json(result);
};

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

    if (!result) {
      res.status(404).end();
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteOne = async (
  req: Request<ParamsWithId, {}, {}>,
  res: Response<{}>,
  next: NextFunction
) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      res.status(404).end();
    } else {
      if (lessThanFiveMinutes(card)) {
        await Card.findByIdAndDelete(req.params.id);
        res.status(204).end();
      }
      res.status(403).end();
    }
  } catch (error) {
    next(error);
  }
};

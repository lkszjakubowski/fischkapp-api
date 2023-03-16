import { Router } from 'express';
import middleware from '../middleware';
import { TCard, UpdateCardPayload } from './card.interfaces';
import {
  createOne,
  findAll,
  findByAuthor,
  findByTag,
  updateOne,
} from './card.handlers';
import { ParamsWithId } from '../interfaces/ParamsWithId';
import { ParamsWithAuthor } from '../interfaces/ParamsWithAuthor';
import { ParamsWithTag } from '../interfaces/ParamsWithTag';

const router = Router();

router.get('/', findAll);
router.get(
  '/author/:author',
  middleware.validateRequest({ params: ParamsWithAuthor }),
  findByAuthor
);
router.get(
  '/tags/:tag',
  middleware.validateRequest({ params: ParamsWithTag }),
  findByTag
);
router.post('/', middleware.validateRequest({ body: TCard }), createOne);
router.put(
  '/:id',
  middleware.validateRequest({ params: ParamsWithId, body: UpdateCardPayload }),
  updateOne
);

export default router;

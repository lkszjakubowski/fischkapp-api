import { Router } from 'express';
import { validateRequest } from '../middleware';
import {
  createCardHandler,
  findCardsHandler,
  findCardsByAuthorHandler,
  findCardByIdHandler,
  findCardsByTagHandler,
  updateCardHandler,
  deleteCardHandler,
} from './card.handlers';
import {
  createCardSchema,
  deleteCardSchema,
  getCardSchema,
  updateCardSchema,
} from './card.interfaces';

const router = Router();

router.get('/', findCardsHandler);
router.get(
  '/author/:author',
  validateRequest(getCardSchema),
  findCardsByAuthorHandler
);
router.get('/tags/:tag', validateRequest(getCardSchema), findCardsByTagHandler);
router.get('/:id', validateRequest(getCardSchema), findCardByIdHandler);
router.post('/', validateRequest(createCardSchema), createCardHandler);
router.put('/:id', validateRequest(updateCardSchema), updateCardHandler);
router.delete('/:id', validateRequest(deleteCardSchema), deleteCardHandler);

export default router;

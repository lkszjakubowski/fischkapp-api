import { Request, Response, Router } from 'express';
import middleware from '../middleware';
import { TCard } from './card.model';
import { createOne, updateOne } from './card.handlers';
import { ParamsWithId } from '../interfaces/ParamsWithId';
import { UpdateCardPayload } from '../interfaces/UpdateCardPayload';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.json({ success: true });
});

router.post('/', middleware.validateRequest({ body: TCard }), createOne);
router.put(
  '/:id',
  middleware.validateRequest({ params: ParamsWithId, body: UpdateCardPayload }),
  updateOne
);

export default router;

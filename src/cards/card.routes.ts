import { Request, Response, Router } from 'express';
import middleware from '../middleware';
import { TCard } from './card.model';
import { createOne } from './card.handlers';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ success: true });
});

router.post('/', middleware.validateRequest({ body: TCard }), createOne);

export default router;

import { CardDocument } from './card.model';

export const lessThanFiveMinutes = (card: CardDocument): boolean => {
  const date = new Date();
  const fiveMinutes = 50 * 60 * 1000;

  const diffTime = date.getTime() - card.createdAt.getTime();

  return diffTime < fiveMinutes;
};

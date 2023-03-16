import { TCard } from '../cards/card.interfaces';

export const lessThanFiveMinutes = (card: TCard): boolean => {
  const date = new Date();
  const fiveMinutes = 50 * 60 * 1000;
  if (card.createdAt) {
    const diffTime = date.getTime() - card.createdAt.getTime();
    if (diffTime < fiveMinutes) return true;
  }
  return false;
};

import { CardDocument, UserInput } from 'src/cards/card.model';
import config from '../utils/config';

export const supertestConfig: { [key: string]: string } = {
  // @ts-ignore
  Authorization: config.HTTP_AUTHORIZATION,
};

export const initialCards: Array<UserInput> = [
  {
    front: 'Yes',
    back: 'Tak',
    tags: ['English', 'Polish'],
    author: 'Bob',
  },
  {
    front: 'Tak',
    back: 'Oui',
    tags: ['Polish', 'French'],
    author: 'Bob',
  },
  {
    front: 'Oui',
    back: 'Yes',
    tags: ['French', 'English'],
    author: 'Tom',
  },
];

export const card = {
  front: 'Si',
  back: 'Yes',
  tags: ['English', 'Spanish'],
  author: 'Rob',
};

export function isSorted(cards: CardDocument[]) {
  for (let i = 0; i < cards.length - 1; i++) {
    if (cards[i]!.createdAt < cards[i + 1]!.createdAt) {
      return false;
    }
  }
  return true;
}

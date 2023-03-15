import { WithId } from 'mongodb';
import { TCard } from '../cards/card.model';

type CardWithId = WithId<TCard>;

export default CardWithId;

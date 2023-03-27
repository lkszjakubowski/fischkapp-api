import { FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';
import CardModel, { CardDocument, UserInput } from './card.model';

export async function createCard(input: UserInput) {
  return CardModel.create(input);
}

export async function findCards(query: FilterQuery<CardDocument>) {
  return CardModel.find(query).sort({ createdAt: -1 });
}

export async function findCard(query: FilterQuery<CardDocument>) {
  return CardModel.findOne(query);
}

export async function updateCard(
  query: FilterQuery<CardDocument>,
  update: UpdateQuery<CardDocument>,
  options: QueryOptions
) {
  return CardModel.findOneAndUpdate(query, update, options);
}

export async function deleteCard(query: FilterQuery<CardDocument>) {
  return CardModel.deleteOne(query);
}

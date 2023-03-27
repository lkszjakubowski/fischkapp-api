import supertest from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import {
  supertestConfig,
  initialCards,
  card,
  isSorted,
} from './card.test.helpers';
import CardModel from './card.model';
import { createCard } from './card.services';

const api = supertest(app);

describe('card', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await CardModel.deleteMany({});
    await CardModel.insertMany(initialCards);
  });

  describe('GET /cards/ route', () => {
    describe('given the request is authorized', () => {
      it('should return with a 200 status code', async () => {
        await api.get('/cards/').set(supertestConfig).expect(200);
      });

      it('should return flashcards in correct order', async () => {
        await createCard(card);

        const response = await api.get('/cards/').set(supertestConfig);
        const cards = response.body;

        expect(isSorted(cards)).toBe(true);
      });

      it('should return the correct amount of flashcards', async () => {
        const response = await api.get('/cards/').set(supertestConfig);

        expect(response.body).toHaveLength(initialCards.length);
      });
    });
  });

  describe('GET /cards/author:author route', () => {
    describe('given the author exists', () => {
      it('should return flashcards by author in correct order', async () => {
        const author = initialCards[0]?.author;

        const response = await api
          .get(`/cards/author/${author}`)
          .set(supertestConfig);

        expect(isSorted(response.body)).toBe(true);
      });

      it('should return correct number of flashcards', async () => {
        const author = initialCards[0]?.author;

        const response = await api
          .get(`/cards/author/${author}`)
          .set(supertestConfig);

        const cardsByAuthor = initialCards.filter(
          (card) => card.author === author
        );

        expect(response.body).toHaveLength(cardsByAuthor.length);
      });
    });
  });

  describe('GET /cards/tags:tag route', () => {
    describe('given the tag exists', () => {
      it('should return correct number of flashcards', async () => {
        const tag = initialCards[0]?.tags[0];

        const cardsByTag = initialCards.filter((card) =>
          card.tags.includes(tag!)
        );

        const response = await api
          .get(`/cards/tags/${tag}`)
          .set(supertestConfig);

        expect(response.body).toHaveLength(cardsByTag.length);
      });
    });
  });
});

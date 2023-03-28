import supertest from 'supertest';
import app from '../app';
import mongoose, { Types } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import {
  supertestConfig,
  initialCards,
  card,
  isSorted,
} from './card.test.helpers';
import CardModel from './card.model';
import { createCard, findCards } from './card.services';
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

  describe('DELETE /cards/:id route', () => {
    describe('given that card was deleted correctly', () => {
      it('should return with a 204 status code and delete the requested flashcard if created less than 5 minutes ago', async () => {
        const flashcards = await findCards({});
        const flashcardToDelete = flashcards[0];

        await api
          .delete(`/cards/${flashcardToDelete?._id}`)
          .set(supertestConfig)
          .expect(204);

        const flashcardsAtEnd = await findCards({});

        expect(flashcardsAtEnd).toHaveLength(flashcards.length - 1);

        const fronts = flashcardsAtEnd.map((flashcard) => flashcard.front);

        expect(fronts).not.toContain(flashcardToDelete?.front);
      });
    });

    describe('given that requested flashcard does not exist', () => {
      it('should return with a 404 status code', async () => {
        const flashcards = await findCards({});

        const id = new Types.ObjectId();
        const flashcardsIds = flashcards.map((flashcard) => flashcard._id);

        expect(flashcardsIds).not.toContain(id);

        await api.delete(`/cards/${id}`).set(supertestConfig).expect(404);
      });
    });

    describe('given that flashcard was created more than 5 minutes ago', () => {
      it('should return with a 403 status code', async () => {
        const newFlashcard = await createCard(card);
        const flashcardToDelete = await CardModel.findOneAndUpdate(
          { _id: newFlashcard._id },
          { createdAt: new Date(0) },
          {
            new: true,
            timestamps: false,
            strict: false,
          }
        );

        await api
          .delete(`/cards/${flashcardToDelete?._id}`)
          .set(supertestConfig)
          .expect(403);
      });
    });
  });

  describe('PUT /cards/:id route', () => {
    describe('given the request is authorized and data is correct', () => {
      it('should return with a 200 status code and newly updated flashcard', async () => {
        const flashcards = await findCards({});
        const flashcardToUpdate = flashcards[0];

        const response = await api
          .put(`/cards/${flashcardToUpdate?._id}`)
          .send(card)
          .set(supertestConfig);

        const { _id, createdAt, updatedAt, ...flashcardStripped } =
          response.body;

        expect(response.statusCode).toBe(200);
        expect(card).toEqual(flashcardStripped);
      });
    });
  });

  describe('POST /cards/ route', () => {
    describe('given the request is authorized and data is correct', () => {
      it('should return with a 200 status code and newly created flashcard', async () => {
        const response = await api
          .post('/cards/')
          .send(card)
          .set(supertestConfig);

        expect(response.statusCode).toBe(201);
        expect(response.body.author).toEqual(response.body.author);
      });

      it('should return with a 400 status code if flashcard with a specific front value already exixts', async () => {
        await api
          .post('/cards/')
          .send(initialCards[0])
          .set(supertestConfig)
          .expect(400);
      });
    });
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

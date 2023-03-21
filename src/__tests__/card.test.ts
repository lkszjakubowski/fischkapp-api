import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

describe('card', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  test('testing environment', () => {
    expect(true).toBe(true);
  });
});

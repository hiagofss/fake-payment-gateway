import mongoose from 'mongoose';
import { PaymentMethodModel } from './models/payment-method.model.js';
export class MongoDbService {
  constructor(app, mongoDbConnectionString = process.env.MONGO_DB_URL) {
    this.app = app;
    this.mongoDbConnectionString = mongoDbConnectionString;
    console.log('mongoDbConnectionString', mongoDbConnectionString);
  }

  connectionMongoDb() {
    mongoose
      .connect(this.mongoDbConnectionString, {})
      .then(() => {
        console.log('MongoDB connected…');
      })
      .catch((err) => console.log(err));
  }

  async getCollection(collectionName) {
    const db = await this.app.mongo.db;
    return db.collection(collectionName);
  }

  async insert(collectionName, data) {
    const collection = await PaymentMethodModel.insertMany(data);
    await collection.insertOne(data);
  }

  async update(collectionName, data) {
    const collection = await this.getCollection(collectionName);
    await collection.updateOne({ id: data.id }, { $set: data });
  }
}

import mongoose from 'mongoose';
import { PaymentMethodModel } from './models/payment-method.model.js';
export class MongoDbService {
  constructor(app, mongoDbConnectionString = process.env.MONGO_DB_URL) {
    this.app = app;
    this.mongoDbConnectionString = mongoDbConnectionString;
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

  async insert(data) {
    const paymentMethod = await new PaymentMethodModel(data);

    try {
      await paymentMethod.save();
    } catch (error) {
      console.log('error', error);
    }
    return paymentMethod;
  }

  async updateStatus(id, status) {
    const paymentMethod = await PaymentMethodModel.findOneAndUpdate(
      {
        orderId: id,
      },
      {
        status: status,
      },
      {
        new: true,
      },
    );

    return paymentMethod;
  }

  async getById(id) {
    const paymentMethod = await PaymentMethodModel.findOne({
      orderId: id,
    });
    return paymentMethod;
  }
}

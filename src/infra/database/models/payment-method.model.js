import mongoose from 'mongoose';

const paymentMethodSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  status: String,
  createdAt: Date,
  updatedAt: Date,
});

export const PaymentMethodModel = mongoose.model(
  'PaymentMethod',
  paymentMethodSchema,
);

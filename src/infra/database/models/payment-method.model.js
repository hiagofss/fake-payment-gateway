import mongoose, { Schema } from 'mongoose';

const cardSchema = mongoose.Schema({
  band: {
    type: String,
    enum: ['VISA', 'MASTERCARD'],
  },
  number: {
    type: String,
  },
  cvv: {
    type: String,
  },
});

const pixSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
});

const paymentSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ['CREDIT_CARD', 'PIX'],
    required: true,
  },
  card: cardSchema,
  pix: pixSchema,
});

const paymentMethodSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'processed', 'failed'],
      default: 'pending',
    },
    paymentMethod: paymentSchema,
  },
  { timestamps: true },
);

export const PaymentMethodModel = mongoose.model(
  'PaymentMethod',
  paymentMethodSchema,
);

import { PaymentService } from '../services/payment.service.js';

export class PaymentController {
  constructor(app) {
    this.app = app;
  }

  async addBill(request, reply) {
    const data = request.body;
    const bill = await new PaymentService(this.app).addBill(data);

    reply.send(bill);
  }

  async getBill(request, reply) {
    const { orderId } = request.params;

    const bill = await new PaymentService(this.app).getBill(orderId);

    reply.send(bill);
  }

  async processBill(request, reply) {
    const bill = await new PaymentService(this.app).processBill();

    reply.send(bill);
  }
}

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
    const { billId } = request.params;

    const bill = await new PaymentService(this.app).getBill(billId);

    reply.send(bill);
  }
}

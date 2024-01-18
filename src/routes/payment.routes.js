import { PaymentController } from '../controller/payment.controller.js';
import { PaymentService } from '../services/payment.service.js';
export class PaymentRouter {
  static async router(app) {
    app.route({
      method: 'POST',
      url: '/bill',
      handler: new PaymentController(app).addBill,
    });
    app.route({
      method: 'GET',
      url: '/bill/:billId',
      handler: new PaymentController(app).getBill,
    });
  }
}

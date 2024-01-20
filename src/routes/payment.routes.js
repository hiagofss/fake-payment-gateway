import { PaymentController } from '../controller/payment.controller.js';
export class PaymentRouter {
  static async router(app) {
    app.route({
      method: 'POST',
      url: '/bill',
      handler: new PaymentController(app).addBill,
    });
    app.route({
      method: 'GET',
      url: '/bill/:orderId',
      handler: new PaymentController(app).getBill,
    });
    app.route({
      method: 'POST',
      url: '/bill/process',
      handler: new PaymentController(app).processBill,
    });
  }
}

export class QueueDto {
  orderId;
  paymentMethod = {
    type: '',
    card: {
      band: '',
      number: '',
      cvv: '',
    },
    pix: {
      code: '',
    },
  };

  constructor(data) {
    this.orderId = data.orderId;
    this.paymentMethod = data.paymentMethod;
  }
}

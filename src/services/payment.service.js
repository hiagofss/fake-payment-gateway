import { QueueDto } from '../dtos/queue.dto.js';
import { MongoDbService } from '../infra/database/mongodb.database.service.js';
import { RabbitMqQueueService } from '../infra/queue/rabbit-mq.queue.service.js';

export class PaymentService {
  constructor(app) {
    this.app = app;
  }
  queueService = new RabbitMqQueueService();
  databaseService = new MongoDbService();

  async addBill(data) {
    const queueDtoObj = new QueueDto(data);
    await this.queueService.addJob(queueDtoObj);

    const recordCreated = await this.databaseService.insert(queueDtoObj);

    return {
      status: 'ok',
      message: 'Bill added and ready to process.',
      data: recordCreated,
    };
  }

  async processBill() {
    const awaitQueue = await this.queueService.hasJob();
    if (awaitQueue.messageCount < 1) {
      return {
        status: 'ok',
        message: 'No bills to process.',
      };
    }

    const bill = await this.queueService.processJob();

    const billUpdate = await this.databaseService.updateStatus(
      bill.orderId,
      'processed',
    );

    return {
      status: 'ok',
      message: 'Bill processed.',
      data: billUpdate,
    };
  }

  async getBill(id) {
    const bill = await this.databaseService.getById(id);
    return bill;
  }
}

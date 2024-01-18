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
    console.log(data);
    const queueDto = new QueueDto();
    queueDto.key = data.key;
    queueDto.value = data.value;

    const response = await this.queueService.addJob(data);
    return {
      status: 'ok',
      message: 'Bill added and ready to process.',
      data: response,
    };
  }

  async processBill() {
    this.queueService.processJob();
  }

  async getBill(id) {
    return { idReceived: id };
  }
}

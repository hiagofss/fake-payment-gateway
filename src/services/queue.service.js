import { QueueDto } from '../dtos/queue.dto.js';
import { RabbitMqQueueService } from '../infra/queue/rabbit-mq.queue.service.js';

export class QueueService {
  static queueService = new RabbitMqQueueService();
   static async getStatus(request, reply) {
    return { status: 'Ok' };
  }

   static async addJob(data) {
    const queueDto = new QueueDto();
    queueDto.id = data.id;
    await this.queueService.addJob(data);
  }

   static async processJob() {
    this.queueService.processJob();
  }

   static async getJob(id) {
    return await this.queueService.getJob(id);
  }

   static async getJobs() {
    return await this.queueService.getJobs();
  }
}

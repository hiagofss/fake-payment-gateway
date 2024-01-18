import amqplib from 'amqplib';
export class RabbitMqQueueService {
  constructor(
    queueName = process.env.RABBITMQ_QUEUE_NAME,
    queueUrl = process.env.RABBITMQ_QUEUE_URL,
  ) {
    console.log('queueName', queueName);
    console.log('queueUrl', queueUrl);
    this.queueName = queueName;
    this.queueUrl = queueUrl;
  }

  async addJob(data) {
    const connection = await this.connectRabbit();
    const channel = await connection.createChannel();
    await channel.assertQueue(this.queueName);
    await channel.sendToQueue(
      this.queueName,
      Buffer.from(JSON.stringify(data)),
    );
    await channel.close();
    await connection.close();
  }

  processJob() {
    throw new Error('Method not implemented.');
  }
  getJob(id) {
    throw new Error('Method not implemented.');
  }
  getJobs() {
    throw new Error('Method not implemented.');
  }

  async connectRabbit() {
    return await amqplib.connect(this.queueUrl);
  }
}

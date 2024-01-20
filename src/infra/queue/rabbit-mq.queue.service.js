import amqplib from 'amqplib';
export class RabbitMqQueueService {
  constructor(
    queueName = process.env.RABBITMQ_QUEUE_NAME,
    queueUrl = process.env.RABBITMQ_QUEUE_URL,
  ) {
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

  async processJob() {
    const connection = await this.connectRabbit();
    const channel = await connection.createChannel();
    await channel.assertQueue(this.queueName);
    const job = await channel.get(this.queueName);
    await channel.ack(job);
    await channel.close();
    await connection.close();

    return JSON.parse(job.content.toString());
  }

  async hasJob() {
    const connection = await this.connectRabbit();
    const channel = await connection.createChannel();
    await channel.assertQueue(this.queueName);
    const queue = await channel.checkQueue(this.queueName);
    await channel.close();
    await connection.close();

    return queue;
  }

  async connectRabbit() {
    return await amqplib.connect(this.queueUrl);
  }
}

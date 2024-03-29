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
    const { connection, channel } = await this.connectRabbit();
    await channel.sendToQueue(
      this.queueName,
      Buffer.from(JSON.stringify(data)),
    );
    this.closeRabbit(connection, channel);
  }

  async publishJobWithConfirmChannel(data) {
    const { connection, channel } = await this.connectRabbit();
    await channel.publish(
      '',
      this.queueName,
      Buffer.from(JSON.stringify(data)),
      { persistent: true },
    );
    await channel.waitForConfirms();
    this.closeRabbit(connection, channel);
  }

  async processJob() {
    const { connection, channel } = await this.connectRabbit();

    const job = await channel.get(this.queueName);
    await channel.ack(job);
    this.closeRabbit(connection, channel);

    return JSON.parse(job.content.toString());
  }

  async consumeJob(callback) {
    const { connection, channel } = await this.connectRabbit();
    channel.prefetch(3);
    await channel.consume(
      this.queueName,
      async (job) => {
        await channel.ack(job);
        callback(JSON.parse(job.content.toString()));
      },
      { consumerTag: 'payment-gateway-consumer' },
    );
    this.closeRabbit(connection, channel);
  }

  async hasJob() {
    const { connection, channel } = await this.connectRabbit();
    const queue = await channel.checkQueue(this.queueName);
    this.closeRabbit(connection, channel);

    return queue;
  }

  async connectRabbit() {
    const connection = await amqplib.connect(this.queueUrl);
    const channel = await connection.createChannel();
    await channel.assertQueue(this.queueName);

    return { connection, channel };
  }

  async closeRabbit(connection, channel) {
    await channel.close();
    await connection.close();
  }
}

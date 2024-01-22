import { fastifySchedulePlugin } from '@fastify/schedule';
import { SimpleIntervalJob, AsyncTask } from 'toad-scheduler';
import { PaymentService } from '../services/payment.service.js';

export class SchedulerJobs {
  constructor(app) {
    this.app = app;
  }

  async run() {
    this.app.log.info('SchedulerJobs.run()');
    // Run job 5 times with 2 seconds between each execution

    const task = new AsyncTask(
      'Process payments',
      async () => {
        await this.consumesPayments();
      },
      (error) => {
        this.app.log.error(
          `SchedulerJobs.run() - task error: ${JSON.stringify(error)}`,
        );
      },
    );

    const job = new SimpleIntervalJob(
      { seconds: 15, runImmediately: true },
      task,
    );

    this.app.register(fastifySchedulePlugin);

    this.app.ready().then(() => {
      this.app.log.info('SchedulerJobs.run() - ready');
      this.app.scheduler.addSimpleIntervalJob(job);
    });
    return { status: 'Ok' };
  }

  async processPayments() {
    const paymentService = new PaymentService(this.app);
    const bill = await paymentService.processBill();
    this.app.log.info(
      `SchedulerJobs.processPayments() - payments: ${JSON.stringify(bill)}`,
    );
  }

  async consumesPayments() {
    const paymentService = new PaymentService(this.app);
    await paymentService.consumeMessages();
  }
}

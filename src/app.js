import Fastify from 'fastify';
import { router } from './routes/index.js';
import { PaymentRouter } from './routes/payment.routes.js';
import { MongoDbService } from './infra/database/mongodb.database.service.js';
import { RequestHooks } from './hooks/requests.hooks.js';
import { SchedulerJobs } from './utils/scheduler-jobs.js';

const app = Fastify({ logger: true });

new MongoDbService(app).connectionMongoDb();

const requestHooks = new RequestHooks(app);
// requestHooks.onRequest();
// requestHooks.onResponse();

app.register(router, { prefix: '/api' });
app.register(PaymentRouter.router, { prefix: '/api/payment' });

new SchedulerJobs(app).run();

app.setErrorHandler((error, request, reply) => {
  app.log.error(error);
});

export default app;

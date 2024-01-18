import Fastify from 'fastify';
import router from './routes/index.js';
import MongoDbService from './infra/database/mongodb.database.service.js';

const app = Fastify({ logger: true });

new MongoDbService().connectionMongoDb(app);

app.addHook('onRequest', (request, reply, done) => {
  request.log.info(
    {
      url: request.url,
      method: request.method,
      ip: request.ip,
    },
    'request received.',
  );
  done();
});

app.addHook('onResponse', (request, reply, done) => {
  request.log.info(
    {
      url: request.raw.originalUrl,
      statusCode: reply.raw.statusCode,
    },
    'request completed.',
  );
  done();
});

app.register(router, { prefix: '/api' });

app.setErrorHandler((error, request, reply) => {
  app.log.error(error);
});

export default app;

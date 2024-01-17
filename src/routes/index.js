import { QueueService } from '../services/queue.service.js';

async function router(app) {
  app.get('/', async function handler(request, reply) {
    return { message: 'Hello World!!!' };
  });

  app.get('/health', await QueueService.getStatus);

  app.route({
    method: 'GET',
    url: '/hello',
    handler: await QueueService.getStatus,
  });
}

export default router;

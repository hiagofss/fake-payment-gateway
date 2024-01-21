import { HealthCheckService } from '../services/healthcheck.service.js';

async function router(app) {
  app.get('/healthcheck', HealthCheckService.getStatus);
}

export { router };

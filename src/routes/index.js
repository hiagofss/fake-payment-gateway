import { HealthCheckService } from '../services/healthcheck.servive.js';

async function router(app) {
  app.get('/healthcheck', HealthCheckService.getStatus);
}

export default router;

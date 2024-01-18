export class HealthCheckService {
  constructor(app) {
    this.app = app;
  }

  static async getStatus(request, reply) {
    return { status: 'Ok' };
  }
}

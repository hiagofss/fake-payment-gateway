export class RequestHooks {
  constructor(app) {
    this.app = app;
  }

  onRequest() {
    this.app.addHook('onRequest', (request, reply, done) => {
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
  }

  onResponse() {
    this.app.addHook('onResponse', (request, reply, done) => {
      request.log.info(
        {
          url: request.raw.originalUrl,
          statusCode: reply.raw.statusCode,
        },
        'request finished.',
      );
      done();
    });
  }
}

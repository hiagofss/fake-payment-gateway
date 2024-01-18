import mongodb from '@fastify/mongodb';
export default class MongoDbService {
  constructor(mongoDbConnectionString = process.env.MONGO_DB_URL) {
    this.mongoDbConnectionString = mongoDbConnectionString;
    console.log('mongoDbConnectionString', mongoDbConnectionString);
  }

  connectionMongoDb(app) {
    app.register(mongodb, {
      url: this.mongoDbConnectionString,
      useNewUrlParser: true,
      forceClose: true,
      database: 'app',
    });
  }
}

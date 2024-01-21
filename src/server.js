import app from './app.js';
const PORT = parseInt(process.env.PORT);

const startServer = async () => {
  try {
    await app.ready();
    await app.listen({ port: PORT, host: '0.0.0.0' });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

startServer();

import app from './app';
// const PORT = parseInt(process.env.PORT as string, 3333);
const PORT = 3333;

const startServer = async () => {
  try {
    await app.ready();
    await app.listen({ port: PORT });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

startServer();

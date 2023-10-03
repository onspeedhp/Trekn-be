const DropRouter = require('./DropRouter');

const routes = (app) => {
  app.use('/api/drop', DropRouter);
};

module.exports = routes;

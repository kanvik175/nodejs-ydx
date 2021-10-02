const express = require('express');
const { PORT } = require('./config');
const { imageRouter, mainRouter } = require('./routers');
const errorHandler = require('./middlewares/errorHandler');
const endpointNotFound = require('./middlewares/endpointNotFound');

const app = express();

app.use('/', mainRouter);
app.use('/image', imageRouter);

app.use(endpointNotFound);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
})
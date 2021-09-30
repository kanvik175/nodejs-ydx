const express = require('express');
const { PORT } = require('./config');
const { imageRouter, mainRouter } = require('./routers');

const app = express();

app.use('/', mainRouter);
app.use('/image', imageRouter);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
})
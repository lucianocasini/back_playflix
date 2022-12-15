const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./config/db');
const routes = require('./routes');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

app.use('/api', routes);

app.use((err, req, res, next) => {
  console.log('Error');
  console.log(err);
  res.status(500).send('Ha ocurrido un error');
});

db.sync({ force: false }).then(() => {
  app.listen(3001, () => console.log('Server listening on port 3001'));
});

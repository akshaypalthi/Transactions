const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/router');
const dotenv = require('dotenv');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/transactions' ,routes);
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`server is at http://localhost:3000`);
});

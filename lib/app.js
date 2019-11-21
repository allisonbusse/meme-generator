const express = require('express');
const app = express();
const cors = require('cors');

app.use(require('cookie-parser')());
app.use(cors({ 
  origin: true
}));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

app.use(express.static('public'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;

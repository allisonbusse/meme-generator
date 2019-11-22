const express = require('express');
const app = express();
const cors = require('cors');
const ensureAuth = require('./middleware/ensure-auth');


app.use(require('cookie-parser')());
app.use(cors({ 
  origin: true,
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/memes', ensureAuth, require('./routes/memes'));

app.use(express.static('public'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;

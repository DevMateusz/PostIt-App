require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const auth = require('./middleware/auth')
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 5000;

connectDB();

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());

app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/api/post', auth, require('./routes/api/post'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/user', auth, require('./routes/api/user'));

app.all('*', (req ,res) => {
  res.status(404);
  res.json({ error: "404 Not Found" });
})

app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
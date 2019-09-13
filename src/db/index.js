import mongoose from 'mongoose';

require('dotenv').config();

const {
  MONGODB_HOST,
  MONGODB_DB,
  MONGODB_USER,
  MONGODB_PORT,
  MONGODB_PASSWORD,
} = process.env;

mongoose.set('debug', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(
  `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DB}`
);

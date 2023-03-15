const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const recipesRouter = require('./routes/recipes');
require('dotenv').config();

const app = express();

// mongoose.set('strictQuery', false);
mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@testcluster.k8qjdgd.mongodb.net/?retryWrites=true&w=majority`,
  () => console.log('Connected to DB')
);

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/', recipesRouter);
app.use('/images', express.static('images'));
app.use('/profile-images', express.static('profile_pictures'));

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.PORT || 5005;
app.listen(port, () => console.log(`Listening on port ${port}`));

const dotenv = require('dotenv');

dotenv.config();
const express = require('express');

const app = express();
app.use(express.static('public'));

const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require("connect-mongo");
const isSignedIn = require("./middleware/is-signed-in.js");
const passUserToView = require("./middleware/pass-user-to-view.js");

// Controllers

const authController = require('./controllers/auth.js');
const divesController = require('./controllers/dives.js');
const usersController = require('./controllers/users.js');
const User = require('./models/user.js');

// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : '3000';

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// MIDDLEWARE
//
// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride('_method'));
// Morgan for logging HTTP requests
app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);
app.use(passUserToView);

// PUBLIC
app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/community', async (req, res) => {
  try {
    const users = await User.find({})
    res.render('community.ejs', { users });
  } catch (error) {
    console.error(error);
    res.render('community.ejs', { users: [] });
  }
});

app.use('/auth', authController);
app.use('/users', usersController);
app.use(isSignedIn);
app.use('/dives', divesController);

// PROTECTED


app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});

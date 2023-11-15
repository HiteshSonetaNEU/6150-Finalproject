const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const uri = "mongodb+srv://sonetah:Welcome123@cluster0.uv0cee1.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const User = mongoose.model('User', {
  fullName: String,
  email: String,
  password: String,
});

const initializePassport = require('./passport-config');
initializePassport(
  passport,
  email => User.findOne({ email }),
  id => User.findById(id)
);

app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(bodyParser.json());
app.use(session({
  secret: "Secret",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.fullName });
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local'));

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({ fullName: req.body.name, email: req.body.email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error("Error: ", err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.status(201).json({ message: 'Logged out Successfully' });
  });
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(400).json({ message: 'Login first' });
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.status(400).json({ message: 'Logout first' });
  }
  next();
}

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

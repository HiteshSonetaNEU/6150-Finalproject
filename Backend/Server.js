const express = require('express');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const User =require('./models/userModel')
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes');

const uri = "mongodb+srv://sonetah:Welcome123@cluster0.uv0cee1.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const initializePassport = require('./passport-config');
initializePassport(
  passport,
  email => User.findOne({ email }),
  id => User.findById(id)
);


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

app.use('/', routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

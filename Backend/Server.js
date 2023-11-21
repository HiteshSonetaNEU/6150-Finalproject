// const express = require('express');
// const app = express();
// const bcrypt = require('bcrypt');
// const passport = require('passport');
// const flash = require('express-flash');
// const session = require('express-session');
// const methodOverride = require('method-override');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');

// const uri = "mongodb+srv://sonetah:Welcome123@cluster0.uv0cee1.mongodb.net/?retryWrites=true&w=majority";
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// const User = mongoose.model('User', {
//   fullName: String,
//   email: String,
//   password: String,
//   role:String
// });

// const initializePassport = require('./passport-config');
// initializePassport(
//   passport,
//   email => User.findOne({ email }),
//   id => User.findById(id)
// );

// app.use(express.urlencoded({ extended: false }));
// app.use(flash());
// app.use(bodyParser.json());
// app.use(session({
//   secret: "Secret",
//   resave: false,
//   saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(methodOverride('_method'));

// app.get('/', checkAuthenticated, (req, res) => {
//   res.json({ name: req.user.fullName });
// });

// // app.post('/login', checkNotAuthenticated, passport.authenticate('local'));

// app.post('/login', checkNotAuthenticated, (req, res, next) => {
//   passport.authenticate('local', (err, user, info) => {
//     if (err) {
//       return res.status(500).json({ message: 'Internal Server Error' });
//     }
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
//     req.logIn(user, (err) => {
//       if (err) {
//         return res.status(500).json({ message: 'Internal Server Error' });
//       }
//       return res.status(200).json({ message: 'Logged in successfully', user: req.user.fullName });
//     });
//   })(req, res, next);
// });



// app.post('/register', checkNotAuthenticated, async (req, res) => {
//   try {
//     const { fullName, email, password,role } = req.body;
      
//         if (!checkFullName(fullName)){
//           return res.status(400).json({ message: 'Special Characters in full name are not allowed' });
//         }
      
//         if (!checkEmail(email) ) {
//           return res.status(400).json({ message: 'Invalid email, use Northeastern Mail' });
//         }
      
//         if (!checkPassword(password)) {
//           return res.status(400).json({ message: 'Invalid password, password length should be greater than 8' });
//         }
//         var check = await User.findOne({ email });
//         if (check){
//           return res.status(400).json({ message: 'User with same email already exists' });
//         }    
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ fullName, email, password: hashedPassword,role });
//     await user.save();
//     res.status(201).json({ message: 'User created successfully' });
//   } catch (err) {
//     console.error("Error: ", err);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });


// app.get('/logout', function(req, res, next) {
//   req.logout(function(err) {
//     if (err) { return next(err); }
//     res.status(201).json({ message: 'Logged out Successfully' });
//   });
// });

// function checkAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   return res.status(400).json({ message: 'Login first' });
// }

// function checkNotAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return res.status(400).json({ message: 'Logout first' });
//   }
//   next();
// }

// function checkPassword(password) {
//   return password.length >= 8;
// }

// function checkEmail(email) {
//   return /^[a-zA-Z0-9._-]+@northeastern\.edu$/.test(email);
// }
// function checkFullName(fullName){
//   return  /^[a-zA-Z_]+$/.test(fullName);
// }

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });


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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

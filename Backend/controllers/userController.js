const passport = require('passport');
const userService = require('../services/userService');

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      return res.status(200).json({ message: 'Logged in successfully', user: req.user.fullName });
    });
  })(req, res, next);
};

exports.register = async (req, res) => {
    try {
        const { fullName, email, password, role } = req.body;
    
        if (!userService.checkFullName(fullName)) {
          return res.status(400).json({ message: 'Special Characters in full name are not allowed' });
        }
    
        if (!userService.checkEmail(email)) {
          return res.status(400).json({ message: 'Invalid email, use Northeastern Mail' });
        }
    
        if (!userService.checkPassword(password)) {
          return res.status(400).json({ message: 'Invalid password, password length should be greater than 8' });
        }
    
        const check = await userService.findUserByEmail(email);
        if (check) {
          return res.status(400).json({ message: 'User with the same email already exists' });
        }
    
        await userService.registerUser({ fullName, email, password, role });
        res.status(201).json({ message: 'User created successfully' });
      } catch (err) {
        console.error('Error: ', err);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    };


exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(201).json({ message: 'Logged out Successfully' });
  });
};

exports.getUser = (req, res) => {
  res.json({ name: req.user.fullName ,id:req.user._id});
};

exports.checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(400).json({ message: 'Login first' });
};

exports.checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.status(400).json({ message: 'Logout first' });
  }
  next();
};

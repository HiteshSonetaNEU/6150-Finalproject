const passport = require("passport");
const userService = require("../services/userService");
const recepieService = require("../services/recepieService");

function login(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
      return res
        .status(200)
        .json({ message: "Logged in successfully", user: req.user.fullName });
    });
  })(req, res, next);
}

async function register(req, res) {
  try {
    const { fullName, email, password, role, profileDes, specialities } =
      req.body;

    if (!userService.checkFullName(fullName)) {
      return res
        .status(400)
        .json({ message: "Special Characters in full name are not allowed" });
    }

    if (!userService.checkEmail(email)) {
      return res
        .status(400)
        .json({ message: "Invalid email, use Northeastern Mail" });
    }

    if (!userService.checkPassword(password)) {
      return res.status(400).json({
        message: "Invalid password, password length should be greater than 8",
      });
    }

    const check = await userService.findUserByEmail(email);
    if (check) {
      return res
        .status(400)
        .json({ message: "User with the same email already exists" });
    }

    await userService.registerUser({
      fullName,
      email,
      password,
      role,
      profileDes,
      specialities,
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

function logout(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(201).json({ message: "Logged out Successfully" });
  });
}

function getUser(req, res) {
  res.json({
    name: req.user.fullName,
    email: req.user.email,
    id: req.user._id,
    role: req.user.role,
    following: req.user.following,
    profileDes: req.user.profileDes,
    specialities: req.user.specialities,
  });
}

async function updateUser(req, res) {
  try {
    const userId = req.user._id;
    const data = req.body;
    console.log("UPDATE USER");
    console.log(data);

    if (data.role || data.following) {
      return res
        .status(400)
        .json({ message: "Cannot set the specified attribute(s)" });
    }

    const updatedUser = await userService.updateUser(userId, data);

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

async function getUserById(req, res) {
  try {
    const userId = req.params.id;
    const user = await userService.findUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getChefs(req, res) {
  try {
    const chefs = await getAllChefs();
    res.status(200).json(chefs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function followChef(req, res) {
  try {
    const chefId = req.params.id;
    const chef = await checkChef(chefId);

    if (!chef) {
      return res.status(500).json({ error: "Chef does not exist" });
    }
    const user = req.user;
    if (user.following.includes(chefId)) {
      return res
        .status(500)
        .json({ error: "User is already following the Chef" });
    }
    user.following.push(chefId);
    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function unFollowChef(req, res) {
  try {
    const chefId = req.params.id;
    const chef = await checkChef(chefId);

    if (!chef) {
      return res.status(500).json({ error: "Chef does not exist" });
    }

    const user = req.user;
    if (!user.following.includes(chefId)) {
      return res.status(500).json({ error: "User is not following the Chef" });
    }
    user.following.splice(user.following.indexOf(chefId), 1);
    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function search(req, res) {
  try {
    let { query, filter } = req.body;
    query = query.toLowerCase();
    const chefs = await getAllChefs();
    const recipes = await recepieService.getAllRecepies();
    const searchResult = {
      Chefs: [],
      Recipes: [],
    };

    chefs.forEach((chef) => {
      if (chef.toSearchableString().includes(query))
        searchResult.Chefs.push(chef);
    });

    recipes.forEach((recipe) => {
      if (recipe.toSearchableString().includes(query))
        searchResult.Recipes.push(recipe);
    });

    return res.status(200).json(searchResult);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllChefs() {
  const users = await userService.getUsers();
  const chefs = users.filter((user) => user.role == "Chef");
  return chefs;
}

async function checkUser(userId) {
  const user = await userService.findUserById(userId);
  return user;
}

async function checkChef(chefId) {
  const user = await checkUser(chefId);

  if (!user || user.role != "Chef") return undefined;

  return user;
}

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(400).json({ message: "Login first" });
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.status(400).json({ message: "Logout first" });
  }
  next();
}

module.exports = {
  checkNotAuthenticated,
  checkAuthenticated,
  search,
  unFollowChef,
  followChef,
  getChefs,
  getUserById,
  getUser,
  login,
  register,
  logout,
  updateUser,
};

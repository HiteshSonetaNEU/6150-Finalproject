const express = require("express");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const { User } = require("./models/userModel");
const app = express();
const path = require('path');
const cors = require("cors");
require('dotenv').config();


const mongoose = require("mongoose");
const routes = require("./routes/routes");
const commentRoutes = require("./routes/commentRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const recepieRoutes = require("./routes/recepieRoutes");

const corsOptions = {
  origin: "http://localhost:3000", // replace with the actual origin of your frontend
  credentials: true,
};

mongoose.connect(process.env.mongourl, { useNewUrlParser: true, useUnifiedTopology: true });

const initializePassport = require("./passport-config");
initializePassport(
  passport,
  (email) => User.findOne({ email }),
  (id) => User.findById(id)
);

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(bodyParser.json());
app.use(
  session({
    secret: "Secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

app.use("/", routes);
app.use("/comment", commentRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/recepie", recepieRoutes);
app.use('/api/images', express.static(path.join(__dirname, 'uploads')));


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

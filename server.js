const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors =require("cors");
const flash =require("connect-flash");
const session = require("express-session");
const passport = require('passport');

const app = express();

// passport config
require('./configs/passport')(passport);

// DB config
const db = require("./configs/keys").MongoURI;

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cors row
app.use(cors());

// Connect to mongoose
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connection..."))
  .catch((err) => console.log(err));

// BodyParser
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}))

// password middleware
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash())

// global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  next()
})

// Router
app.use("/api/v1/auth/", require("./api_auth"))
app.use("/api/v1/product/", require("./api_product"))
// Port
const PORT3 = process.env.PORT || 5000;


app.listen(PORT3, 
  console.log(`server is running.. ${PORT3}`)
);

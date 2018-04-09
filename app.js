const express = require("express");
const passport_setup = require("./config/passport");
const mongoose = require("./DB/mongoose");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const exhbs = require("express-handlebars");
const methodOverride = require("method-override");

//requiring the Routes
const index = require("./routes/index");
const auth = require("./routes/auth");
const user = require("./routes/user");
const adds = require("./routes/adds");

let port = process.env.PORT || 5000;
const app = express();

app.engine(
  "handlebars",
  exhbs({
    defaultLayout: "main"
  })
);

app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));
//body parser middleware
// create application/json parser
app.use(bodyParser.json());

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

//create Session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//creating global variables for using at every request
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.use("/", index);
app.use("/auth", auth);
app.use("/user", user);
app.use("/adds", adds);

app.listen(port, () => {
  console.log(`connected at port ${port}`);
});

const passport = require("passport");
const router = require("express").Router();
const User = require("../models/users");
const { ensureAuthenticated } = require("../helpers/authenticate");

//Related info for a new User
router.get("/info", ensureAuthenticated, (req, res) => {
  console.log("Yes");
  res.render("user/info");
});

//Add user Info to the databse
router.post("/info", ensureAuthenticated, (req, res) => {
  let body = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    College: req.body.College,
    Course: req.body.Course,
    Branch: req.body.Branch,
    Year: req.body.Year,
    count: true
  };
  User.findOneAndUpdate(
    { googleID: req.user.googleID },
    { $set: body },
    { new: true }
  ).then(user => {
    if (!user) {
      res.status(400).send("Unable to save the data");
    }
    console.log(user);
  });
});

module.exports = router;

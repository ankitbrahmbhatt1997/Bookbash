const passport = require("passport");
const router = require("express").Router();
const Adds = require("../models/Adds");
const { ensureAuthenticated } = require("../helpers/authenticate");

//get the adds form
router.get("/add", ensureAuthenticated, (req, res) => {
  res.render("adds/add");
});

//post an add
router.post("/add", (req, res) => {
  console.log(req.user);
  const newAdd = {
    title: req.body.title,
    price: req.body.price,
    details: req.body.details,
    user: req.user
  };

  new Adds(newAdd)
    .save()
    .then(add => {
      res.redirect("/user/profile");
    })
    .then();
});

//Get all adds
router.get("/all", (req, res) => {
  Adds.find()
    .populate("user")
    .then(Adds => {
      console.log(Adds);
      res.render("adds/Alladds", { Adds });
    });
});

module.exports = router;

const router = require("express").Router();
const { ensureAuthenticated } = require("../helpers/authenticate");
const User = require("../models/users");

router.get("/", (req, res) => {
  res.render("index/home");
});
module.exports = router;

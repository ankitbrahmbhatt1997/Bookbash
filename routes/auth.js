const passport = require("passport");
const router = require("express").Router();
const User = require("../models/users");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  if (req.user.count) {
    res.redirect("/user/profile");
  } else {
    res.redirect("/user/info");
  }
});

module.exports = router;

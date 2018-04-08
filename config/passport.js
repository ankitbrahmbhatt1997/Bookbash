const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../models/users");

passport.use(
  new Strategy(
    {
      clientID: keys.google_client_id,
      clientSecret: keys.google_client_secret,
      callbackURL: "/auth/google/redirect"
    },
    (access, refresh, profile, done) => {
      const image = profile.photos[0].value.substring(
        0,
        profile.photos[0].value.indexOf("?")
      );

      const newUser = {
        googleID: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        image: image
      };
      User.findOne({ googleID: profile.id })
        .then(user => {
          //check for existing user
          if (user) {
            done(null, user);
          } else {
            new User(newUser)
              .save()
              .then(newuser => {
                done(null, newuser);
              })
              .catch(e => {
                done(e, null);
              });
          }
        })
        .catch(e => {
          done(e, null);
        });
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/user");
const JWT_SECRET = process.env.JWT_SECRET;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      User.findOne({ email })
        .then((user) => {
          if (!user) {
            return done(null, false);
          }

          user.comparePassword(password, function (err, isMatch) {
            if (err) {
              return done(err);
            }
            if (!isMatch) {
              return done(null, false);
            }

            return done(null, user);
          });
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

passport.use(
  new JwtStrategy(jwtOptions, function (payload, done) {
    // User.findById(payload.id, function (err, user) {
    //   if (err) {
    //     return done(err, false);
    //   }
    //   if (user) {
    //     done(null, user);
    //   } else {
    //     done(null, false);
    //   }
    // });
    User.findById(payload.id)
      .then((user) => {
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      })
      .catch((err) => {
        return done(err, false);
      });
  })
);

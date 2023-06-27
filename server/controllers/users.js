const User = require("../models/user");
const passport = require("passport");

exports.getUsers = async function (req, res) {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.log(err);
  }
};

exports.getCurrentUser = function (req, res) {
  const user = req.user;
    console.log('user', user)
  if (!user) {
    return res.status(422);
  }

  return res.json(user.toAuthJSON());
};

exports.register = async function (req, res) {
  try {
    const registerData = req.body;

    if (!registerData.email || undefined) {
      return res.status(422).json({
        errors: {
          email: "is required",
          message: "Email is required!",
        },
      });
    }

    if (!registerData.password) {
      return res.status(422).json({
        errors: {
          email: "is required",
          message: "Password is required!",
        },
      });
    }

    if (registerData.password !== registerData.passwordConfirmation) {
      return res.status(422).json({
        errors: {
          password: "is not the same as confirmation password",
          message: "Password is not the same as confirmation password",
        },
      });
    }
    const user = new User(registerData);
    const savedUser = await user.save();
    return res.json(savedUser);
  } catch (err) {
    console.log(err);
  }
};

exports.login = function (req, res, next) {
  const { email, password } = req.body;
  if (!email) {
    return res.status(422).json({
      errors: {
        email: "is not the same as confirmation password",
        message: "Email is not the same as confirmation password",
      },
    });
  }
  if (!password) {
    return res.status(422).json({
      errors: {
        password: "is not the same as confirmation password",
        message: "Password is not the same as confirmation password",
      },
    });
  }
  return passport.authenticate("local", (err, passportUser) => {
    if (err) {
      next(err);
    }
    if (passportUser) {
      return res.json(passportUser.toAuthJSON());
    } else {
      return res.status(422).send({
        errors: {
          message: "Invalid email or password!",
        },
      });
    }
  })(req, res, next);
};

exports.logout = function (req, res) {
  req.logout();
  return res.json({ status: "Session destroyed." });
};

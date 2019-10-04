var bCrypt = require("bcrypt-nodejs");
module.exports = function(passport, user) {
  var User = user;
  var LocalStrategy = require("passport-local").Strategy;
  //serialize
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // deserialize user
  passport.deserializeUser(function(id, done) {
    console.log("user id: " + id);
    User.findOne({
      where: {
        id: id
      }
    }).then(function(user) {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });
  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, email, password, done) {
        var User = user;
        var isValidPassword = function(email, password) {
          return bCrypt.compareSync(password, email);
        };
        User.findOne({
          where: {
            email: email
          }
        })
          .then(function(user) {
            if (!user) {
              return done(null, false, {
                message: "Email does not exist"
              });
            }
            if (!isValidPassword(user.password, password)) {
              return done(null, false, {
                message: "Incorrect password."
              });
            }
            var userinfo = user.get();
            return done(null, userinfo);
          })
          .catch(function(err) {
            console.log("Error:", err);
            return done(null, false, {
              message: "Something went wrong with your login"
            });
          });
      }
    )
  );
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        emailField: "email",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, email, password, done) {
        var generateHash = function(password) {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };
        User.findOne({
          where: {
            email: email
          }
        }).then(function(user) {
          if (user) {
            return done(null, false, {
              message: "That email is already taken"
            });
          } else {
            var userPassword = generateHash(password);
            var data = {
              email: email,
              password: userPassword,
              compnayname: req.body.companyname,
              companyaddress: req.body.companyaddress,
              street: req.body.street,
              state: req.body.state,
              zip: req.body.zip,
              telnumber: req.body.telnumber,
              size: req.body.size,
              service: req.body.service,
              area: req.body.area
            };
            User.create(data).then(function(newUser, created) {
              if (!newUser) {
                return done(null, false);
              }
              if (newUser) {
                return done(null, newUser);
              }
            });
          }
        });
      }
    )
  );
};
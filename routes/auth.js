var authController = require("../controllers/authcontroller.js");

module.exports = function (app, passport) {
    app.get("/signup", authController.signup);
    app.get("/login", authController.login);
    app.get("/dashboard", isLoggedIn, authController.dashboard);
    app.get("/logout", authController.logout);
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect("/login");
    }
    app.post(
        "/login",
        passport.authenticate("local-login", {
            successRedirect: "/dashboard",
            failureRedirect: "/login"
        })
    );
    app.post(
        "/signup",
        passport.authenticate("local-signup", {
            successRedirect: "/login",
            failureRedirect: "/signup"
        }
        ));
    function isLoggedIn(req, res, next) {

        if (req.isAuthenticated())
            return next();
        res.redirect("/login");
    }
};

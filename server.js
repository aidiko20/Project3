var express = require("express");
var app = express();
var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");
var env = require("dotenv");
var exphbs = require("express-handlebars");
var PORT = process.env.PORT || 5000;

// For Habdlebars
app.set("views", "./views")
app.engine("hbs", exphbs({
    extname: ".hbs"
}));
app.set("view engine", ".hbs");


// For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport
app.use(session({ secret: "crazy rabbit", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport/passport")(passport);

//Routes
require('./routes/auth.js')(app, passport);
//Models
var models = require("./models");
 
//Sync Database
models.sequelize.sync().then(function() {
 
    console.log('Nice! Database looks fine')
 
}).catch(function(err) {
 
    console.log(err, "Something went wrong with the Database Update!")
 
});


app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
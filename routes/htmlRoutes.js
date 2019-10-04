var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("home");
  });
  app.get("/search", function(req, res) {
    res.render("search");
  });
  app.get("*", function(req, res) {
    res.render("404");
  });
}
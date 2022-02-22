// file will contain all of the user-facing routes, such as homepage and login
const router = require("express").Router();
const sequelize = require("../config/connection");

router.get("/", (req, res) => {
  res.render("homepage");
  // we are rendering homepage.handlebars, the .handlebars is implied as we've already set handlebars as our template engine.
});

router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/signup", (req, res) => {
  res.render("signup");
});
router.get("/post", (req, res) => {
  res.render("post");
});

module.exports = router;

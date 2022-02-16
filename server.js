const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});
const app = express();
const PORT = process.env.PORT || 3001;

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});

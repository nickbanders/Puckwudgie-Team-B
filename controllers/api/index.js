const router = require("express").Router();

const userRoutes = require("./user-routes.js");
const issueRoutes = require("./issue-routes");
const commentRoutes = require("./comment-routes");

router.use("/users", userRoutes);
router.use("/issue", issueRoutes);
router.use("/comments", commentRoutes);

module.exports = router;

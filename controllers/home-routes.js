const router = require("express").Router();
const sequelize = require("../config/connection");
const { Issue, User, Comment, Vote } = require("../models");

// get all posts for homepage
router.get("/", (req, res) => {
  console.log("======================");
  Issue.findAll({
    attributes: [
      "id",
      //"post_url",
      //"title",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE post.id = vote.issue_id)"
        ),
        "vote_count",
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "issue_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbIssueData) => {
      const posts = dbIssueData.map((post) => issue.get({ plain: true }));

      res.render("homepage", {
        posts,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get single post
router.get("/post/:id", (req, res) => {
  Issue.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      //"post_url",
      //"title",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE issue.id = vote.issue_id)"
        ),
        "vote_count",
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "issue_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbIssueData) => {
      if (!dbIssueData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }

      const post = dbIssueData.get({ plain: true });

      res.render("single-post", {
        post,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;

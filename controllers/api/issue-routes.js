const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Issue, User, Comment, Vote } = require("../../models");
const withAuth = require("../../utils/auth");

// get all users
router.get("/", (req, res) => {
  console.log("======================");
  Issue.findAll({
    attributes: ["id", "title", "created_at"],
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
    .then((dbIssueData) => res.json(dbIssueData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Issue.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      //"post_url",
      "title",
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
      res.json(dbIssueData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", withAuth, (req, res) => {
  Issue.create({
    title: req.body.title,
    //post_url: req.body.post_url,
    user_id: req.session.user_id,
  })
    .then((dbIssueData) => res.json(dbIssueData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/upvote", withAuth, (req, res) => {
  // custom static method created in models/Post.js
  Issue.upvote(
    { ...req.body, user_id: req.session.user_id },
    { Vote, Comment, User }
  )
    .then((updatedVoteData) => res.json(updatedVoteData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", withAuth, (req, res) => {
  Issue.update(
    {
      title: req.body.title,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbIssueData) => {
      if (!dbIssueData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbIssueData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", withAuth, (req, res) => {
  console.log("id", req.params.id);
  Issue.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbIssueData) => {
      if (!dbIssueData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbIssueData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

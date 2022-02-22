const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create our Issue model
class Issue extends Model {
  static upvote(body, models) {
    return models.Vote.create({
      user_id: body.user_id,
      issue_id: body.issue_id,
    }).then(() => {
      return Issue.findOne({
        where: {
          id: body.issue_id,
        },
        attributes: [
          "id",
          "title",
          "created_at",
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM vote WHERE issue.id = vote.issue_id)"
            ),
            "vote_count",
          ],
        ],
      });
    });
  }
}

// create fields/columns for Post model
Issue.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    issue_title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    // subcomment: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: "subcomment",
    //     key: "id",
    //   },
    // },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "issue",
  }
);

module.exports = Issue;

const Comment = require('./comment');
const Vote = require('./vote');
const User = require('./user');
const Issue = require("./issue");
const Subcomment = require("./subcomment");


// create associations
User.hasMany(Issue, {
    foreignKey: 'user_id'
  });
  
Issue.belongsTo(User, {
foreignKey: 'user_id',
});

User.belongsToMany(Issue, {
    through: Vote,
    as: 'voted_issue',
    foreignKey: 'user_id'
});
  
Issue.belongsToMany(User, {
    through: Vote,
    as: 'voted_issue',
    foreignKey: 'issue_id'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});
  
Vote.belongsTo(Issue, {
    foreignKey: 'issue_id'
});
  
User.hasMany(Vote, {
    foreignKey: 'user_id'
});
  
Issue.hasMany(Vote, {
    foreignKey: 'issue_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});
  
Comment.belongsTo(Issue, {
    foreignKey: 'issue_id'
});
  
User.hasMany(Comment, {
    foreignKey: 'user_id'
});
  
Issue.hasMany(Comment, {
    foreignKey: 'issue_id'
});

Subcomment.belongsTo(Comment,{
    foreignKey: 'user_id'
});
Subcomment.belongsTo(User, {
    foreignKey: 'user_id'
});
User.hasMany(Subcomment, {
    foreignKey: 'user_id'
});
Comment.hasMany(Subcomment,{
    foreignKey: 'subcomment_id'
});
  
  
module.exports = { User, Issue, Vote, Comment, Subcomment };
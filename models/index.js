const Blog = require("./blog");
const User = require('./user')
const readingList = require('./readingList')
const Session = require("./session");

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: readingList })
Blog.belongsToMany(User, { through: readingList })


User.hasMany(Session);
Session.belongsTo(User);

module.exports = {
  Blog,
  User,
  readingList,
  Session,
};
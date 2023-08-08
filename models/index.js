const User = require('./User');
const Feed = require('./Feed');
const Comment = require('./Comment');

// Feed has many comments

Feed.hasMany(Comment, {
    foreignKey: 'feed_id'
})

// Comments belongs to Feed
Comment.belongsTo(Feed, {
    foreignKey: 'feed_id',
    as: 'comments',
})

module.exports = { User, Feed, Comment};

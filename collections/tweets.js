Tweets = new Mongo.Collection('tweets');

var processTweet = function(text) {
  if (Meteor.isServer) {
    var ids = [];
    if (_.contains(text, '@')) {
      mentions = _.select(text.split(" "), function(word) {
        return _.contains(word, '@');
      });
      usernames = _.map(mentions, function(mention) {
        return mention.substring(1);
      });
      users = Users.find({username: {$in: usernames}}).fetch();
      ids = _.pluck(users, "_id");
    }
    return ids;
  }
};


Tweets.before.insert(function(userId, doc) {
  doc.tweetedAt = new Date();
  doc.userId = userId;
  doc.mentionIds = processTweet(doc.text);
});

Tweets.helpers({
  user: function() {
    return Meteor.users.findOne({_id: this.userId});
  },
  fullName: function() {
    if (this.user() && this.user().profile) {
      return this.user().profile.name;
    }
  },
  username: function() {
    if (this.user()) {
      return this.user().username;
    }
  },
  tweetedTime: function() {
    return moment(this.tweetedAt).fromNow();
  }
});

Tweets.allow({
  insert: function(userId, doc) {
    return userId;
  },
  update: function(userId, doc, fields, modifier) {
    return false;
  },
  remove: function(userId, doc) {
    return doc.userId === userId;
  }
});

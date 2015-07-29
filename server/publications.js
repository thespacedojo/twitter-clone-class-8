Meteor.publish('myTweets', function() {
  var cursors = [];
  var user = Users.findOne(this.userId);
  var followingIds = [];
  followingIds.push(user.profile.followingIds);
  followingIds.push(this.userId);
  followingIds = _(followingIds).flatten();
  users = Users.find({_id: {$in: followingIds}}, {fields: {profile: 1, username: 1}});
  tweets = Tweets.find({userId: {$in: followingIds}});
  cursors.push(tweets);
  cursors.push(users);
  return cursors;
});

Meteor.publish('profile', function(username) {
  return Users.find({username: username}, {fields: {profile: 1, username: 1}});
});

Meteor.publish('profileTweets', function(username) {
  var user = Users.findOne({username: username});
  return Tweets.find({userId: user._id});
});

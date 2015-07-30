Meteor.publish('myTweets', function() {
  if (this.userId) {
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
  } else {
    this.ready();
  }
});

Meteor.publish('profile', function(username) {
  return Users.find({username: username}, {fields: {profile: 1, username: 1}});
});

Meteor.publish('profileTweets', function(username) {
  var user = Users.findOne({username: username});
  return Tweets.find({userId: user._id});
});

Meteor.publish('followChanges', function() {

  if (this.userId) {
    var self = this;
    var initializing = true;

    var user = Users.find(this.userId);
    var handle = user.observeChanges({
      changed: function (id, fields) {
        if (!initializing) {
          self.changed("followerCount", id, {count: fields.profile.followingIds.length});
        }
      }
    });

    initializing = false;
    var tUser = user.fetch();
    if (tUser) tUser = tUser[0];

    self.added("followerCount", this.userId, {count: (!! tUser.profile.followingIds ? tUser.profile.followingIds.length: 0)});
    self.ready();

    self.onStop(function () {
      handle.stop();
    });
  } else {
    this.ready();
  }
});
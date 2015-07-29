Users = Meteor.users;

Users.helpers();

Meteor.methods({
  follow: function(followId) {
    Users.update(this.userId, {$push: {"profile.followingIds": followId}});
  }
});

Template.profile.helpers({
  following: function() {
    return _(Meteor.user().profile.followingIds).contains(this.user._id);
  },
  notMe: function() {
    return this.user._id != Meteor.userId();
  }
});

Template.profile.events({
  'click .follow': function(e, t) {
    Meteor.call('follow', t.data.user._id);
  },
  'click .unfollow': function(e, t) {
    Meteor.call('unfollow', t.data.user._id);
  }
});

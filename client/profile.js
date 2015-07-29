Template.profile.helpers({
  following: function() {
    return _(Meteor.user().profile.followingIds).contains(this.user._id);
  }
});

Template.profile.events({
  'click .follow': function(e, t) {
    Meteor.call('follow', t.data.user._id);
  }
});

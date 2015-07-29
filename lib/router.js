Router.configure({
  layoutTemplate: 'base',
  loadingTemplate: 'loading'
});

Router.map(function() {
  this.route('tweetStream', {
    path: '/',
    waitOn: function() {
      return Meteor.subscribe('tweets');
    }
  });
  this.route('notifications', {path: '/notifications'});
  this.route('profile', {
    path: '/u/:username',
    waitOn: function() {
      return [
        Meteor.subscribe('profile', this.params.username),
        Meteor.subscribe('profileTweets', this.params.username)
      ];
    },
    data: function() {
      return {
        user: Users.findOne({username: this.params.username})
      };
    }
  });
});

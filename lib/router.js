Router.configure({
  layoutTemplate: 'base',
  loadingTemplate: 'loading'
});

Router.map(function() {
  this.route('tweetStream', {
    path: '/',
    waitOn: function() {
      return Meteor.subscribe('myTweets');
    }
  });
  this.route('notifications', {
    path: '/notifications',
    waitOn: function() {
      return Meteor.subscribe('mentions');
    }
  });
  this.route('profile', {
    path: '/u/:username',
    waitOn: function() {
      return [
        Meteor.subscribe('profile', this.params.username),
        Meteor.subscribe('profileTweets', this.params.username),
        Meteor.subscribe('images')
      ];
    },
    data: function() {
      return {
        user: Users.findOne({username: this.params.username})
      };
    }
  });
  this.route('profileEdit', {
    path: '/profile/edit',
    waitOn: function() {
      return Meteor.subscribe('images');
    }
  });
});

Router.plugin('ensureSignedIn', {
  only: ['tweetStream', 'notifications']
});

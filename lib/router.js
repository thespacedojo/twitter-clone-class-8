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
  this.route('profile', {path: '/profile'});
});

Template.tweetStream.helpers({
  settings: function() {
    return {
      position: "bottom",
      limit: 5,
      rules: [
        {
          token: "@",
          collection: "Users",
          field: "username",
          subscription: "username",
          matchAll: true,
          template: Template.userPill
        }
      ]
    };
  }
});

Template.tweetStream.events({
  "submit #tweetForm": function(event, template) {
    event.preventDefault();
    var text = template.$('.tweet-text').val();
    var loc = {};
    if (Session.get('location'))
      loc = {lat: Session.get('location').latitude, long: Session.get('location').longitude}
    Tweets.insert({text: text, location: loc}, function (err, res) {
      if (result) {
        CoffeeAlerts.success('Your tweet has been added.');
        template.$('.tweet-text').val(null);
      } else {
        CoffeeAlerts.warning('There was a problem adding your tweet, try again later.');
        console.log(error);
      }
    });
  }
});

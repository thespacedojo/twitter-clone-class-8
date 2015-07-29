Template.tweetStream.events({
  "submit #tweetForm": function(event, template) {
    event.preventDefault();
    var text = template.$('.tweet-text').val();
    Tweets.insert({text: text}, function(error, result) {
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

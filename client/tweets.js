Template.tweets.helpers({
  tweets: function() {
    return Tweets.find({}, {sort: {tweetedAt: -1}});
  }
});

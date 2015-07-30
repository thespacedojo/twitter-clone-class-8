Users = Meteor.users;

UserSchema = new SimpleSchema({
  username: {
    type: 'String',
    label: 'Username',
    max: 200
  },
  "profile.description": {
    type: 'String',
    label: 'Description',
    optional: true
  },
  "profile.location": {
    type: 'String',
    label: 'Location',
    optional: true
  },
  "profile.image": {
    type: 'String',
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Images'
      }
    },
    label: 'Choose Profile Image',
    optional: true
  }
});

Users.attachSchema(UserSchema);

Users.helpers({
  profileImage: function() {
    return '/cfs/files/images/' + this.profile.image;
  }
});

Users.allow({
  update: function(userId, doc, fieldNames, modifier) {
    return userId === doc._id;
  }
});

Meteor.methods({
  follow: function(followId) {
    Users.update(this.userId, {$push: {"profile.followingIds": followId}});
  },
  unfollow: function(followId) {
    Users.update(this.userId, {$pull: {"profile.followingIds": followId}});
  }
});

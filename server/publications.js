import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

/* Publish users collection to see them on CTRL + M */
Meteor.publish('users', function() {
    return Meteor.users.find({});
});

Meteor.methods({
  'users.updateEmail': function(email) {
    if(email != Meteor.user().emails[0].address) {
      Accounts.addEmail(Meteor.userId(), email);
      Accounts.removeEmail(Meteor.userId(), Meteor.user().emails[0].address);
    }
  },

  'users.changePassword': function(newPassword) {
    Accounts.setPassword(Meteor.userId(), newPassword);
  }
}); //end Meteor.methods()

import { Meteor } from 'meteor/meteor';
import { Accounts } from "meteor/accounts-base";
import "../imports/database/devicedata.js";
import "../imports/database/userData.js";

Accounts.onCreateUser(function(options, user) {
    user.profile = options.profile;
    user.registeredDevices = [];
    user.isAdmin = options.admin;

    return user;
});

Meteor.startup(() => {

});

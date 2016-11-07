import { Meteor } from 'meteor/meteor';
import "../imports/database/userData.js";
import "../imports/database/devicedata.js";

Accounts.onCreateUser(function(options, user) {
    user.profile = options.profile;
    if(!options.admin){
        user.registeredDevices = [];
        user.allowedLocations = options.selectedLocs;
        user.parent = options.parent;
    }else{
        user.registeredDevices = [];
    }
    user.isAdmin = options.admin;

    //user.particle = particleCreateCustomer(user.emails);

    return user;
});

Meteor.startup(() => {
  // code to run on server at startup
});

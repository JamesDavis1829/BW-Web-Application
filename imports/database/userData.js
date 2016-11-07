import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Accounts } from "meteor/accounts-base";
if(Meteor.isServer){
    Meteor.publish("userData", function () {
        if (this.userId) {
            return Meteor.users.find({_id: this.userId},
                {fields: {"registeredDevices" : 1}});
        } else {
            this.ready();
        }
    });
}

Meteor.users.deny({update: function () { return true; }});

Meteor.methods({
    "userData.updateName"(name, id){
        check(name, String);

        Meteor.users.update({ _id : id } , { $set : { profile : { name : name} } });
    },
    "userData.createNewUser"(options){
        return Accounts.createUser({
            username : options.username,
            email : options.email,
            password : options.pass1,
            admin : false,
            profile : {
                name : "Name not set. Go to the profile page to enter a display name."
            },
            selectedLocs : options.selectedLocs,
            parent : Meteor.userId()
        });
    }
});
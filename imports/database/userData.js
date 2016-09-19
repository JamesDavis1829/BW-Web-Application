import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
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
    }
});
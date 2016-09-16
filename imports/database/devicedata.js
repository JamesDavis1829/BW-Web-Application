import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

export const DeviceData = new Mongo.Collection("devicedata");

if(Meteor.isServer){
    Meteor.publish("devicedata", function () {
        if (this.userId) {
            return DeviceData.find({ owner : {$eq : this.userId} });
        } else {
            this.ready();
        }
    });
}

Meteor.methods({

});

import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const DeviceData = new Mongo.Collection("devicedata");

if(Meteor.isServer){
    Meteor.publish("devicedata", function publishDeviceData(deviceIds) {
        if (this.userId && (deviceIds.registeredDevices !== undefined)) {
            let date = new Date();
            date.setMonth( date.getMonth() - 1);
            date = date.getTime() / 1000;
            return DeviceData.find( {$and : [{ DeviceID : {$in : deviceIds.registeredDevices} }, {TimeStamp : { $gte : date}}]});
        } else {
            this.ready();
        }
    });
}

Meteor.methods({
    "getAdminStatus"(){
        return Meteor.users.find({ _id : { $eq : this.userId}}).isAdmin;
    },
    "DeviceData.register"(id, location){
        check(id, String);
        check(location, String);
        let devId = parseInt(id, 16);
        let query = String("deviceLocations." + devId);
        Meteor.users.update({_id: this.userId}, {$addToSet: {registeredDevices: devId}});
        Meteor.users.update({_id: this.userId}, {$set: { query : location}});
    },
    "DeviceData.getRegisteredDevices"(){
        return Meteor.users.findOne({ _id : this.userId}).registeredDevices;
    },
    "DeviceData.getLocations"(){
        return Meteor.users.findOne({ _id : this.userId}).deviceLocations;
    }
});

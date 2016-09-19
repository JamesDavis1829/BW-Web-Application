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
    "DeviceData.register"(id){
        check(id, String);
        Meteor.users.update({_id : this.userId},{ $addToSet : { registeredDevices : parseInt(id, 16) }});
    },
    "DeviceData.getRegisteredDevices"(){
        return Meteor.users.findOne({ _id : this.userId}).registeredDevices;
    }
});

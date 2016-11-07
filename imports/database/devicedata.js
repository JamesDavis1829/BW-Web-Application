import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const DeviceData = new Mongo.Collection("devicedata");

if(Meteor.isServer){
    Meteor.publish("devicedata", function publishDeviceData() {
        if (this.userId) {
            let date = new Date();
            date.setMonth( date.getMonth() - 3);
            date = date.getTime() / 1000;
            let user = Meteor.users.findOne({_id : this.userId})
            if(user.isAdmin){
                let devs = Meteor.users.findOne({_id : this.userId}).registeredDevices;
                let devDevices = [];
                for(x in devs) {
                    for (y in devs[x]) {
                        devDevices.push(y);
                    }
                }
                return DeviceData.find( {$and : [{ DeviceID : {$in : devDevices} }, {TimeStamp : { $gte : date}}]});
            } else {
                let devs = Meteor.users.findOne({_id : user.parent}).registeredDevices;
                let regDevs = [];
                let ids = [];
                for(x in devs){
                    for(y in devs[x]){
                        if(user.allowedLocations.includes(devs[x][y])){
                            regDevs.push(devs[x]);
                            ids.push(y);
                        }
                    }
                }
                Meteor.users.update({_id : this.userId}, {$set : { registeredDevices : regDevs}});
                return DeviceData.find({$and : [{DeviceID : {$in : ids}},{TimeStamp : {$gte : date}}]});
            }

        } else {
            this.ready();
        }
    });
}

Meteor.methods({
    "getAdminStatus"(){
        return Meteor.users.findOne({ _id : { $eq : this.userId}}).isAdmin;
    },
    "DeviceData.register"(id, location){
        check(id, String);
        check(location, String);
        if(id !== null) {
            Meteor.users.update({_id: this.userId}, {$addToSet: {registeredDevices: {[id]: location}}});
        }
    }
});

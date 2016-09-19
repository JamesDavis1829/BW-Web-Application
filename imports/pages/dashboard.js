import { Template } from "meteor/templating";
import { Meteor } from "meteor/meteor";
import { DeviceData } from "../../imports/database/devicedata.js";
import { getDistinct } from "../../imports/database/dbcommands.js";
import "./pageparts/toolbar.js";
import "./dashboard.html";

var limit = 20;

function lastMonth(){
    let date = new Date();
    date.setMonth(date.getMonth() - 1);
    date = date.getTime()/1000;
    return date;
}

Template.dashboard.helpers({
    user(){
       return Meteor.user().profile.name;
    },
    getData(){
        return DeviceData.find({});
    },
    getLocations(){
        let array = DeviceData.find().fetch();
        return getDistinct(array, "Location");
    },
    getDevicesFromLocation(location){
        let array = DeviceData.find({Location : {$eq : location}}).fetch();
        return getDistinct(array, "DeviceID");
    }
});
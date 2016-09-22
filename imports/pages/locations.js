import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import { DeviceData } from "../../imports/database/devicedata.js";
import { getDistinct } from "../../imports/database/dbcommands.js";
import { Session } from "meteor/session";
import "./locations.html";
import "./pageparts/dashboardRow.html";
import "./pageparts/deviceRow.js";

Template.locations.onCreated(function locCreated(){
    window.scrollTo(0,0);
});

Template.locations.helpers({
    getCurrentLocation(){
        return Session.get("location");
    },
    getDevicesFromLocation(location){
        let array = DeviceData.find({Location : {$eq : location}}).fetch();
        return getDistinct(array, "DeviceID");
    }
});

Template.locations.events({
   "click .setLocation"(event, instance){
       let loc = event.target.id;
       Session.set("location",loc);
   }
});
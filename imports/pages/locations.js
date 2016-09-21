import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import { DeviceData } from "../../imports/database/devicedata.js";
import { getDistinct } from "../../imports/database/dbcommands.js";
import "./locations.html";
import "./pageparts/dashboardRow.html";

Template.locations.onCreated(function locCreated(){
    this.currentLocation = ReactiveVar(null);
});

Template.locations.helpers({
    getCurrentLocation(){
        return Template.instance().currentLocation.get();
    },
    getDevicesFromLocation(location){
        let array = DeviceData.find({Location : {$eq : location}}).fetch();
        return getDistinct(array, "DeviceID");
    }
});

Template.locations.events({
   "click .setLocation"(event, instance){
       let loc = event.target.id;
       Template.instance().currentLocation.set(loc);
   }
});
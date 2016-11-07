import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import { DeviceData } from "../../imports/database/devicedata.js";
import { getDistinct } from "../../imports/database/dbcommands.js";
import "./locations.html";
import "./pageparts/dashboardRow.html";
import "./pageparts/deviceRow.js";

Template.locations.onCreated(function locCreated(){
    window.scrollTo(0,0);
    this.currentLocations = ReactiveVar(this.data.loc);
});

Template.locations.helpers({
    getCurrentLocation(){
        return Template.instance().currentLocations.get();
    },
    getDevicesFromLocation(location){
        let array = Meteor.user().registeredDevices;
        let locs = [];
        for(x in array){
            for(y in array[x]){
                if(array[x][y] === location){
                    locs.push(y);
                }
            }
        }

        return locs;
    }
});

Template.locations.events({
   "click .setLocation"(event, instance){
       let loc = event.target.id;
       Template.instance().currentLocations.set(loc);
   }
});
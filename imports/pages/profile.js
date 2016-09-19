import { Template } from "meteor/templating";
import { Meteor }  from "meteor/meteor";

import "./profile.html";

Template.profile.helpers({
    getname(){
        return Meteor.user().profile.name;
    }
});

Template.profile.events({
    "submit .username-form"(event){
        event.preventDefault();

        const target = event.target;
        const text = target.name.value;

        Meteor.call("userData.updateName", text, Meteor.userId());

        target.name.value = "";
    },
    "submit .addDeviceToProfile"(event, instance){
        event.preventDefault();

        const target = event.target;
        let text = target.devid.value;

        Meteor.call("DeviceData.register",text);

        target.devid.value = "";
    }
});
import { Template } from "meteor/templating";
import { ReactiveDict } from "meteor/reactive-dict";
import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";
import { DeviceData }  from "../../imports/database/devicedata.js";

import "./body.html";
import "./pageparts/toolbar.js";
import "./loginPage.js";
import "./dashboard.js";
import "./locations.js";
import "./profile.js";

Tracker.autorun(function trackerRun(){
    if(Meteor.user() !== null && Meteor.user() !== undefined){
        Meteor.subscribe("devicedata", Meteor.user());
    }
});

Template.body.onCreated(function bodyCreation(){
    this.state = new ReactiveDict();
    this.state.set("current","dashboard");
    Meteor.subscribe("userData");
});

Template.body.helpers({
    currentPage(){
      return Template.instance().state.get("current");
    },
    pages : [
        "Dashboard",
        "Locations",
        "Profile"
    ]
});

Template.body.events({
    "click .page"(event, instance){
        instance.state.set("current", $(event.target).context.className.split(" ")[1].toLowerCase() );
    }


});
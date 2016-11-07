import { Template } from "meteor/templating";
import { ReactiveDict } from "meteor/reactive-dict";
import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";
import { ReactiveVar } from "meteor/reactive-var";
import { Session }  from "meteor/session";

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
    this.location = new ReactiveVar(null);
    this.state.set("current","dashboard");
    Meteor.subscribe("userData");
    Session.set("location", null);
});

Template.body.helpers({
    currentPage(){
      return Template.instance().state.get("current");
    }
});

Template.body.events({
    "click .page"(event, instance){
        instance.state.set("current", $(event.target).context.className.split(" ")[1].toLowerCase() );
    },
    "click .locationLink"(event, instance){
        let text = event.target.id;
        Session.set("location",text);
        instance.state.set("current", "locations");
    }
});
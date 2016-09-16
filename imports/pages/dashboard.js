import { Template } from "meteor/templating";
import { Meteor } from "meteor/meteor";
import "./pageparts/toolbar.js";
import "./dashboard.html";


Template.dashboard.helpers({
   user(){
       return Meteor.users.findOne({}).profile.name;
   }
});
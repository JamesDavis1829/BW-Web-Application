import { Template } from "meteor/templating";
import { Meteor } from "meteor/meteor";
import "./pageparts/toolbar.js";
import "./dashboard.html";
import { profile } from "../database/userProfiles";

Template.dashboard.helpers({
   user(){
       return profile.find({}).count();
   }
});
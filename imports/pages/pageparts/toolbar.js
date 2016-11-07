import { Template } from "meteor/templating";
import { Meteor }  from "meteor/meteor";

import "./toolbar.html";

Template.toolbar.helpers({
    userName(){
        if(Meteor.userId() !== null) {
            return Meteor.user().username;
        }
    },
    getLocationName(name){
        name = name.replace(/\s+/g, '');
        return name.toLowerCase();
    }
});

Template.toolbar.events({
    "click .logout-user"(event){
       Meteor.logout();
    }
});
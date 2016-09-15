import { Template } from "meteor/templating";
import { Meteor }  from "meteor/meteor";

import "./toolbar.html";

Template.toolbar.helpers({
    userName(){
        if(Meteor.user().emails !== undefined){
            return Meteor.user().emails[0].address;
        }else{
            return "";
        }

    }
});

Template.toolbar.events({
    "click .logout-user"(event){
        Meteor.logout();
    }
});
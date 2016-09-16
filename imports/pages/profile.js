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

        const id = Meteor.userId();
        Meteor.users.update({ _id : id },{ $set : { profile : { name : text} } });

        target.name.value = "";
    }
});
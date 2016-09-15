import { Tempalte } from "meteor/templating";
import { Account } from "meteor/accounts-base";
import { Meteor }  from "meteor/meteor";

import "./profile.html";

Template.profile.helpers({
    getName(){

    }
});

Template.profile.events({
    "submit .username"(event){
        event.preventDefault();

        const target = event.target;
        const text = target.name.value;
    }
});
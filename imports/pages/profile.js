import { Template } from "meteor/templating";
import { Meteor }  from "meteor/meteor";
import { ReactiveVar } from "meteor/reactive-var";
import { Session } from "meteor/session";

import "./profile.html";

Template.profile.onCreated(function profileCreated(){
    this.newLocation = new ReactiveVar(false);
    Session.set("admin", false);
    Meteor.call("getAdminStatus", function(err, data){
        Session.set("admin",data);
    });
});

Template.profile.helpers({
    getAdmin(){
        return Session.get("admin");
    }
    ,
    getname(){
        return Meteor.user().profile.name;
    },
    newLocation(){
        return Template.instance().newLocation.get();
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
        let devID = target.devid.value;
        let devLoc = null;
        if(!instance.newLocation.get()) {
            let radios = $("[name=registerRadio]:radio:checked");
            if(radios[0] !== undefined){
                devLoc = radios[0].id.substring(5);
            }
        }else {
            devLoc = target.devLoc.value;
        }

        if(devLoc !== null && devLoc !== ""){
            Meteor.call("DeviceData.register",devID,devLoc);
        }else{
            console.log("error: " + devLoc + " not an accepted value");
        }

        target.devid.value = "";
    },
    "submit .createSubUser"(event, instance){
        event.preventDefault();

        const target = event.target;

        let selectedLocs = [];

        let checks = $("[name=userCheck]:checkbox:checked");
        checks.each(function () {
            selectedLocs.push(this.id);
        });

        let username = target.suser.value;
        let pass1 = target.spass1.value;
        let pass2 = target.spass2.value;
        let email = target.semail.value;

        if(selectedLocs.length <= 0){
            console.log("Error not enough selected");
        }else if(username === ""){
            console.log("username not valid")
        }else if(pass1 !== pass2 || pass1 === "" || pass2 === ""){
            console.log("passwords do not match or passwords not filled in")
        }else{
            let options = {
                username,
                pass1,
                selectedLocs,
                email
            };
            Meteor.call("userData.createNewUser",options,function(err, data){
                console.log(err);
                console.log(data);
            });
        }
    }
    ,
    "click .toggleNewLocation"(event, instance){
        instance.newLocation.set(!instance.newLocation.get());
    }
});
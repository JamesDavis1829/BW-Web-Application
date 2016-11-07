import { Template } from "meteor/templating";
import { Meteor }  from "meteor/meteor";
import { ReactiveVar } from "meteor/reactive-var";
import { Session } from "meteor/session";

import "./profile.html";

Template.profile.onCreated(function profileCreated(){
    this.newLocation = new ReactiveVar(false);
    this.useSetup = new ReactiveVar(false);
    this.error = new ReactiveVar("");
    this.subError = new ReactiveVar("");
    Session.set("admin", false);
    Meteor.call("getAdminStatus", function(err, data){
        Session.set("admin",data);
    });
});

Template.profile.helpers({
    getAdmin(){
        return Session.get("admin");
    },
    getname(){
        return Meteor.user().profile.name;
    },
    newLocation(){
        return Template.instance().newLocation.get();
    },
    getUseSetup(){
      return Template.instance().useSetup.get();
    },
    getError(){
      return Template.instance().error.get();
    },
    getPastDevices(){
        if(Session.get("devices") === undefined){
            return ["No Devices Previously Setup"]
        }else{
            return Session.get("devices");
        }
    },
    getSubError(){
      return Temaplate.instance().subError.get();
    },
    isPastDevices(){
        return Session.get("devices") === undefined;
    },
    isError(){
        return Template.instance().error.get() === "";
    },
    isSubError(){
        return Template.instance().subError.get() === "";
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
        let devID = null;
        if(instance.useSetup.get()){
            let radios = $("[name=registerDev]:radio:checked");
            if(radios[0] !== undefined){
                devID = radios[0].id.substring(5);
            }
        }else{
            devID = target.devid.value;
        }
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
            if(devID === "No Devices Previously Setup"){
                instance.error.set("error: " + devID + " not an acceptable value")
            }else{
                Meteor.call("DeviceData.register",devID,devLoc);
                location.reload();
            }
        }else{
            instance.error.set("error: " + devLoc + " not an accepted value");
        }
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
            instance.subError.set("Error not enough selected");
        }else if(username === ""){
            instance.subError.set("username not valid");
        }else if(pass1 !== pass2 || pass1 === "" || pass2 === ""){
            instance.subError.set("passwords do not match or passwords not filled in");
        }else{
            let options = {
                username,
                pass1,
                selectedLocs,
                email
            };
            Meteor.call("userData.createNewUser",options,function(err, data){
                username = "";
                pass1 = "";
                pass2 = "";
                email = "";
                if(err){
                    $("#subUser").append("<p>Unable to create SubUser</p>");
                } else {
                    $("#subUser").append("<p>Creates SubUser successfully</p>");
                }
            });
        }
    },
    "click .toggleNewLocation"(event, instance){
        instance.newLocation.set(!instance.newLocation.get());
    },
    "click .toggleUseSetup"(event, instance){
        instance.useSetup.set(!instance.useSetup.get());
    }

});

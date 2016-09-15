import { Meteor } from "meteor/meteor";

function addProfile(){
    console.log("Here");
    Meteor.user().profile.name = "name not set";
}

AccountsTemplates.configure({
    confirmPassword : true,
    enablePasswordChange : true,
    postSignUpHook: addProfile
});
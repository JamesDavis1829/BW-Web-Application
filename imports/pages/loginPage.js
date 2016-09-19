import { Template } from "meteor/templating";
import { Meteor } from "meteor/meteor";
import { ReactiveDict } from "meteor/reactive-dict";
import { Accounts } from "meteor/accounts-base";
import "./loginPage.html";

function generateLoginErrors(errorCode){

}


Template.loginpage.onCreated(function loginPageCreation(){
    this.state = new ReactiveDict();
    this.state.set("login",true);
});

Template.loginpage.helpers({
    getState(){
        return Template.instance().state.get("login");
    }
});

Template.loginpage.events({
    "click .toggle"(event, instance){
        instance.state.set("login", !instance.state.get("login"));
    },
    "submit .loginForm"(event, instance){
        event.preventDefault();

        const user = $('[name=logUser]').val();
        const pass = $('[name=logPass]').val();

        Meteor.loginWithPassword(user,pass);

        return;
    },
    "submit .registerForm"(event, instance){
        event.preventDefault();
        const user = $("[name=regUser]").val();
        const email = $("[name=regEmail]").val();
        const pass1 = $("[name=regPass1]").val();
        const pass2 = $("[name=regPass2]").val();
        const name = $("[name=name]").val();

        if(pass1 !== pass2){
            generateLoginErrors(1);
        }else{
            Accounts.createUser({
                username : user,
                email : email,
                password : pass1,
                profile : {
                    name : name,
                    devices : []
                },
                admin : true
            });
        }
    }
});
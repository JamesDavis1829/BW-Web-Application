import "../pages/pageparts/toolbar.js";
import "../pages/pageparts/loading.html";
import "../pages/loginPage.js";
import "../pages/dashboard.js";
import "../pages/locations.js";
import "../pages/profile.js";
import "./layout.html";
import "../pages/deviceSetup.js"

Router.configure({
    layoutTemplate : "layout"
});

Router.onBeforeAction(function(){
   if(!Meteor.userId()){
       this.render("loginpage");
   } else {
       this.next();
   }
});

Router.route("/", function(){
    this.wait(Meteor.subscribe("userData"), Meteor.subscribe("devicedata"));
    if(this.ready()){
        this.render("dashboard");
    } else {
        this.render("loading");
    }
});

Router.route("/dashboard", function(){
    this.wait(Meteor.subscribe("userData"),Meteor.subscribe("devicedata"));
    if(this.ready()){
        this.render("dashboard");
    }else {
        this.render("loading");
    }
});

Router.route("/locations/:loc", function(){
    this.wait(Meteor.subscribe("userData"),Meteor.subscribe("devicedata"));
    if(this.ready()){
        this.render("locations",{
            data : {
                loc : this.params.loc
            }
        });
    } else {
        this.render("loading");
    }

});

Router.route("/locations", function(){
    this.wait(Meteor.subscribe("userData"),Meteor.subscribe("devicedata"));
    if(this.ready()){
        this.render("locations",{
            data : {
                loc : null
            }
        });
    } else {
        this.render("loading");
    }

});

Router.route("/profile", function(){
    this.wait(Meteor.subscribe("userData"), Meteor.subscribe("devicedata"));
    if(this.ready()){
        this.render("profile");
    } else {
        this.render("loading");
    }
});

Router.route("/devicesetup", function(){
    this.wait(Meteor.subscribe("userData"), Meteor.subscribe("devicedata"));
    if(this.ready()){
        this.render("deviceSetup");
    } else {
        this.render("loading");
    }
});

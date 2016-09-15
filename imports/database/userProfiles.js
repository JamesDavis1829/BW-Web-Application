import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from 'meteor/check';

export const profile = new Mongo.Collection("profile");

if(Meteor.isServer){
    Meteor.publish("profile", function publishProfile(){
        return profile.find({ email : { $eq : Meteor.user().emails[0].address } });
    });
}

Meteor.methods({
    "profile.updateName"(text, id){
        check(text, String);
        profile.update(id, { $set : { name : text } });
    },
    "profile.createProfile"(){
        const email = Meteor.user().emails[0].address;
        profile.insert({
            email,
            name : "no name set"
        });
    }
});
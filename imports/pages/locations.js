import { Template } from "meteor/templating";
import "./locations.html";


Template.locations.helpers({
   test(){
       return "the test worked";
   }
});
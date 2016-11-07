import { Template } from "meteor/templating";

import "./dashboardRow.html";


Template.dashboardRow.helpers({
   encode(str){
       return encodeURI(str);
   },
   isWide(){
     return $(window).width() >= 375;
   }
});

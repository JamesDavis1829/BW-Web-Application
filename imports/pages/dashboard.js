import { Template } from "meteor/templating";
import { Meteor } from "meteor/meteor";
import "./pageparts/toolbar.js";
import "./pageparts/dashboardRow.js";
import "./pageparts/doughnutChart.js";
import "./pageparts/dashTable.js";
import "./dashboard.html";


function lastMonth(){
    let date = new Date();
    date.setMonth(date.getMonth() - 1);
    date = date.getTime()/1000;
    return date;
}


Template.dashboard.helpers({
    user(){
       return Meteor.user().profile.name;
    }
});


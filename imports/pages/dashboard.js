import { Template } from "meteor/templating";
import { Meteor } from "meteor/meteor";
import { DeviceData } from "../../imports/database/devicedata.js";
import { getDistinct, getFullGasAmount } from "../../imports/database/dbcommands.js";
import "./pageparts/toolbar.js";
import "./pageparts/dashboardRow.html";
import "./pageparts/doughnutChart.js";
import "./pageparts/dashTable.js";
import "./dashboard.html";


function getDevicesFromLocation(location){
    let array = DeviceData.find({Location : {$eq : location}}).fetch();
    return getDistinct(array, "DeviceID");
}

function getTotals(location){
    let devices = getDevicesFromLocation(location);
    let full = 0;
    let empty = 0;
    for(x in devices){
        let d = DeviceData.findOne({DeviceID : { $eq : devices[x] }}, { sort : {TimeStamp : -1}});
        let t = getFullGasAmount(d.TankSize);
        if(d.AmountRemaining/t >= threshold){
            full++;
        }else{
            empty++;
        }
    }
    return [full, empty];
}

function lastMonth(){
    let date = new Date();
    date.setMonth(date.getMonth() - 1);
    date = date.getTime()/1000;
    return date;
}


Template.dashboard.helpers({
    user(){
       return Meteor.user().profile.name;
    },
    getData(){
        return DeviceData.find({});
    },
    getChartName(location){
        return "chart"+location;
    },
    getDivName(location){
        return "div" + location;
    }
});


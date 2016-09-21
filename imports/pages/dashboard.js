import { Template } from "meteor/templating";
import { Meteor } from "meteor/meteor";
import { DeviceData } from "../../imports/database/devicedata.js";
import { getDistinct, getFullGasAmount } from "../../imports/database/dbcommands.js";
import { Tracker } from "meteor/tracker";
import { ReactiveVar } from "meteor/reactive-var";
import "./pageparts/toolbar.js";
import "./pageparts/doughnutChart.js";
import "./pageparts/dashTable.js";
import "./dashboard.html";

var limit = 20;
var threshold = 0.2;

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
    getLocations(){
        let array = DeviceData.find().fetch();
        array = getDistinct(array, "Location");
        return array;
    },
    getChartName(location){
        return "chart"+location;
    },
    getDivName(location){
        return "div" + location;
    },
    getTanksTotals(location){
        let array = DeviceData.find({Location : {$eq : location}}).fetch();
        array = getDistinct(array, "DeviceID");
        let full = 0;
        let empty = 0;
        for(x in array){
            let d = DeviceData.findOne({DeviceID : { $eq : array[x] }}, { sort : {TimeStamp : -1}});
            let t = getFullGasAmount(d.TankSize);
            if(d.AmountRemaining/t >= threshold){
                full++;
            }else{
                empty++;
            }
        }
        return {"full" : full, "empty" : empty, "both" : full+empty};
    }

});


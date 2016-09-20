import { Template } from "meteor/templating";
import { Meteor } from "meteor/meteor";
import { DeviceData } from "../../imports/database/devicedata.js";
import { getDistinct, getFullGasAmount } from "../../imports/database/dbcommands.js";
import { Tracker } from "meteor/tracker";
import { ReactiveVar } from "meteor/reactive-var";
import "./pageparts/toolbar.js";
import "./dashboard.html";

var limit = 20;
var threshold = 0.2;
var chartRenders = {};

//suppresses debug from chartjs
//console.log = function() {};

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


Template.dashboard.onCreated(function dashCreated(){
    this.locations = new ReactiveVar([]);

    this.autorun(function(){
        let locs = Template.instance().locations.get();
        for(let x in locs){
            if(chartRenders[locs[x]] !== true){
                let ctx = document.getElementById("chart"+locs[x]);
                if(ctx !== null || ctx !== undefined) {
                    //sets width and height of the canvas
                    let $canvas = $("#chart" + locs[x]);
                    let $parent = $canvas.parent();
                    $canvas.height($parent.height());

                    let data = {
                        labels: [
                            "Full",
                            "Empty"
                        ],
                        datasets: [
                            {
                                data: getTotals(locs[x]),
                                backgroundColor: [
                                    "#36A2EB",
                                    "#FF6384"
                                ],
                                hoverBackgroundColor: [
                                    "#36A2EB",
                                    "#FF6384"
                                ]
                            }],
                    };
                    let myChart = new Chart(ctx, {
                        type: 'doughnut',
                        data: data,
                        options: {
                            maintainAspectRatio: false,
                            legend: {
                                display: false
                            }
                        }
                    });
                    chartRenders[locs[x]] = true;
                }
            }
        }
    });

});

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
        Template.instance().locations.set(array);
        return array;
    },
    getChartName(location){
        return "chart"+location;
    },
    getDivName(location){
        return "div" + location;
    },
    getTanksTotals(){
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
        return [full, empty, full+empty];
    }

});

Template.dashboard.onDestroyed(function dashDestroyed(){
    chartRenders = [];
});

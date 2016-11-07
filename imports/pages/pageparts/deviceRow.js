import { Template } from "meteor/templating";
import { DeviceData } from "../../database/devicedata.js";

import "./deviceRow.html";

Template.deviceRow.helpers({
    getDataFromDevice(){
        let id = Template.instance().data.devId;
        let arr = DeviceData.find({DeviceID : { $eq : id}},{sort : {TimeStamp : -1}, limit : 20}).fetch();
        arr.reverse();
        return arr;
    },
    renderCanvas(dev, location, data){
        setTimeout(function (){
            let $div = $("[id='"+location+dev + "']");
            $div.empty();
            var canvas = $("<canvas id='" + dev + "'/>").height($div.height);
            $div.append(canvas);
            let ctx = document.getElementById(dev);
            let d = [];
            let l = [];
            for(x in data){
                d.push(data[x].AmountRemaining);
                let temp = new Date(parseInt(data[x].TimeStamp) * 1000);
                temp = temp.toString();
                temp = temp.substring(4,10) + " " + temp.substring(13,21);
                l.push(temp);
            }
            var chartData = {
                labels: l,
                datasets: [
                    {
                        label: "Data for Device " + dev,
                        fill: true,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: d,
                        spanGaps: false,
                    }
                ]
            };

            new Chart(ctx, {
                type : "line",
                data : chartData,
                options: {
                     maintainAspectRatio: false,
                     legend: {
                        display: false,
                     },
                     scales : {
                         yAxes : [{
                             display : true,
                             ticks : {
                                 beginAtZero : true
                             }
                         }]
                     }
                }
            });
        },100)
    },
    readingPressure(arr){
        if(arr[arr.length-1].Pressure === null || arr[arr.length-1].Pressure === undefined){
            return "no recent pressure reading";
        }else{
            return String(Math.round(arr[arr.length-1].Pressure)) + " psi";
        }
    },
    readingLiters(arr){
        if(arr[arr.length - 1].AmountRemaining === null || arr[arr.length - 1].AmountRemaining === undefined){
            return "no recent liter reading";
        }else{
            return String(Math.round(arr[arr.length - 1].AmountRemaining)) + " L"
        }
    },
    readingGasType(arr){
        if(arr[arr.length - 1].GasType === null || arr[arr.length - 1].GasType === undefined){
            return "no recent gas type";
        }else{
            return String(arr[arr.length - 1].GasType);
        }
    },
    checkGasType(arr){
        return arr[arr.length - 1].GasType !== "CO2";
    }
});

Template.deviceRow.events({

});
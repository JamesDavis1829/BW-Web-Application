import { Template } from "meteor/templating";
import { DeviceData } from "../../database/devicedata.js";

import "./deviceRow.html";

Template.deviceRow.onCreated(function drowCreated(){
});

Template.deviceRow.helpers({
    getDataFromDevice(){
        let id = Template.instance().data.devId;
        let arr = DeviceData.find({DeviceID : { $eq : id}},{sort : {TimeStamp : 1}, limit : 20}).fetch();
        console.log(arr);
        return arr;
    },
    renderCanvas(dev, location, data){
        setTimeout(function (){
            let ctx = document.getElementById(String(location+dev));
            let $canvas = $("#"+location+dev);
            let $parent = $canvas.parent();
            $canvas.height($parent.height());
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
                     }
                }
            });
        },100)
    }
});

Template.deviceRow.events({

});
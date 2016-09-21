import { ReactiveVar } from "meteor/reactive-var";
import { Meteor } from "meteor/meteor";
import "./doughnutChart.html";

Template.doughnutChart.helpers({
    renderChart(location, full, empty){
        setTimeout(function() {
            let ctx = document.getElementById("chart"+location);
            let $canvas = $("#chart"+location);
            let $parent = $canvas.parent();
            $canvas.height($parent.height());

            let data = {
                labels: [
                    "Full",
                    "Empty"
                ],
                datasets: [
                    {
                        data: [full,empty],
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
            new Chart(ctx, {
                type: 'doughnut',
                data: data,
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
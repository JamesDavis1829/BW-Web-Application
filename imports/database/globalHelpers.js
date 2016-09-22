import { Template } from "meteor/templating";
import { DeviceData } from "./devicedata.js";
import { getDistinct,getFullGasAmount } from "./dbcommands.js";

export const pages = [
    "Dashboard",
    "Locations",
    "Profile"
];

Template.registerHelper("getLocations",() => {
    let array = DeviceData.find().fetch();
    array = getDistinct(array, "Location");
    return array;
});

Template.registerHelper("getTanksTotals", (location) => {
    let array = DeviceData.find({Location : {$eq : location}}).fetch();
    array = getDistinct(array, "DeviceID");
    let full = 0;
    let empty = 0;
    for(x in array){
        let d = DeviceData.findOne({DeviceID : { $eq : array[x] }}, { sort : {TimeStamp : -1}});
        let t = getFullGasAmount(d.TankSize);
        if(d.AmountRemaining/t >= 0.2){
            full++;
        }else{
            empty++;
        }
    }
    return {"full" : full, "empty" : empty, "both" : full+empty};
});

Template.registerHelper("pages",() => {
    return pages;
});
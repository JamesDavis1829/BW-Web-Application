import { Template } from "meteor/templating";
import { DeviceData } from "./devicedata.js";
import { userData } from "./userData.js";
import { getDistinct,getFullGasAmount } from "./dbcommands.js";

export const pages = [
    "Dashboard",
    "Locations",
    "Profile",
    "Device Setup"
];

Template.registerHelper("getLocations",() => {
    let arr = Meteor.user().registeredDevices;
    let locations = [];
    for(x in arr){
        for(y in arr[x]){
            locations.push(arr[x][y]);
        }
    }
    locations = _.unique(locations);
    return locations;
});

Template.registerHelper("getTanksTotals", (location) => {
    let ids = [];
    let registered = Meteor.user().registeredDevices;
    for(x in registered){
        for(y in registered[x]){
            if(registered[x][y] === location){
                ids.push(y);
            }
        }
    }
    let full = 0;
    let empty = 0;
    for(x in ids){
        var id  = ids[x];
        let d = DeviceData.findOne({DeviceID : { $eq : id}}, { sort : {TimeStamp : -1}});
        if(d.GasType !== "CO2"){
            let t = getFullGasAmount(d.TankSize);
            if(d.AmountRemaining/t >= 0.2){
                full++;
            }else{
                empty++;
            }
        }else if(d.GasType === "CO2"){
            if(d.AmountRemaining >= 20){
                full++;
            } else {
                empty++;
            }
        }

    }
    return {"full" : full, "empty" : empty, "both" : full+empty};
});

Template.registerHelper("pages",() => {
    return pages;
});
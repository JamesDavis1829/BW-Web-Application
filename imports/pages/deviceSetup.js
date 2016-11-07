import {Template} from "meteor/templating"
import { ReactiveVar } from "meteor/reactive-var";
import { SoftAPSetup } from "../particle/ParticleFunctions.js"
import { Session } from "meteor/session";
import "./deviceSetup.html"

let sap = new SoftAPSetup({
    timeout : 10000
});

let maxPage = 1;
let minPage = 0;

Template.deviceSetup.onCreated(function(){
    this.pageState = new ReactiveVar(0);
    this.deviceID = new ReactiveVar("");
    this.owned = new ReactiveVar("");
    this.stat = new ReactiveVar("Device Setup Not Started");
    this.key = new ReactiveVar("");
    this.networks = new ReactiveVar("");
    this.selectedNetwork = new ReactiveVar("");
});

Template.deviceSetup.helpers({
    isDeviceID(){
      return "" === Template.instance().deviceID.get();
    },
    isOwned(){
      return "" === Template.instance().owned.get();
    },
    isKeyObtained(){
      return "" === Template.instance().key.get();
    },
    isNetworks(){
      return "" === Template.instance().networks.get();
    },
    getDeviceID(){
        return Template.instance().deviceID.get();
    },
    getOwned(){
        return Template.instance().owned.get();
    },
    getStatus(){
        return Template.instance().stat.get();
    },
    getKey(){
        return Template.instance().key.get();
    },
    getNetworks(){
        return Template.instance().networks.get();
    },
    getSelectedNetwork(){
        return Template.instance().selectedNetwork.get();
    },
    getPageState(number){
        return Template.instance().pageState.get() === number;
    },
});

Template.deviceSetup.events({
    "click #next"(event, instance){
        let page = instance.pageState.get();
        page = page + 1;
        instance.pageState.set(page);
    },
    "click #previous"(event, instance){
        let page = instance.pageState.get();
        page = page - 1;
        instance.pageState.set(page);
    },
    "click #getDeviceID"(event, instance){
        sap.publicKey(function(err,data){
            if(err){
                instance.stat.set(err);
            }else{
                sap.deviceInfo(function(err, data){
                    if(err){
                        instance.stat.set(err);
                    }else{
                        instance.stat.set("Connected To Device!")
                        instance.deviceID.set(data.id);
                        let devs = Session.get("devices");
                        if(devs === undefined){
                            Session.set("devices",[data.id]);
                        }else{
                            devs.push(data.id);
                            Session.set("devices",devs);
                        }

                    }
                });
            }
        });

    },
    "click #getNetworks"(event, instance){
        instance.stat.set("<img src='/images/ajax-loader.gif'>")
        sap.scan(function(err, data){
            if(err){
                instance.stat.set(err);
            }else{
                instance.stat.set("Networks Found");
                instance.networks.set(data);
            }
        })
    },
    "click #networks"(event, instance){
        let s = event.target.networks;
        instance.selectedNetwork.set(networks.options[networks.selectedIndex].value);
    },
    "submit .sendNetworkCreds"(event, instance){
        event.preventDefault();
        const target = event.target;
        let password = target.pass.value;
        let netData = instance.networks.get()[target.networks.selectedIndex];
        let security = target.security.options[target.security.selectedIndex].value;
        sap.configure({
            ssid : netData.ssid,
            security : security,
            password : password,
            channel : netData.ch
        }, function(err, data){
            if(err){
                instance.stat.set(err);
            }else{
                sap.connect(function(err,data){
                    if(err){
                        instance.stat.set(err);
                    }else{
                        instance.stat.set("Device Attempting to Connect Look for Blue Flashing");
                    }
                })
            }
        })
    }
});


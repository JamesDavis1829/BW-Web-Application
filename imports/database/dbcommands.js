
export function getDistinct(collectionArray, column){
    let disctinctArray = _.uniq(collectionArray, false, function(d){
        return d[column];
    });
    return _.pluck(disctinctArray,column);
}

export function getFullGasAmount(tankSize){
    var pressure = 2100;

    //gas constant and temperatures should stay the same
    //convert psi to Pa and liters to m^3
    var ret = (pressure*6895 * tankSize/1000)/(293.15 * 8.314);

    //convery moles to liters
    ret *= 22.4;

    return ret;
}
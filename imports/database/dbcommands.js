
export function getDistinct(collectionArray, column){
    let disctinctArray = _.uniq(collectionArray, false, function(d){
        return d[column];
    });
    return _.pluck(disctinctArray,column);
}
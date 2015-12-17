var fs = require('fs');
var csv = require('fast-csv');

var lowerhouse = require('./data/lowerhouse.geo.json');

var users_by_township = {};
csv
 .fromPath("data/mVoter_Usersbytownship.csv")
 .on("data", function(data){
    users_by_township[data[3]] = data[4] * 1;
 })
 .on("end", function(){
   for (var f = 0; f < lowerhouse.features.length; f++) {
     lowerhouse.features[f].properties.users = (users_by_township[ lowerhouse.features[f].properties.TS_PCODE ] || 0) * 1;
     lowerhouse.features[f].properties.color = '#f00';
   }

   fs.writeFile('./data/lowerhouse-users.geojson', JSON.stringify(lowerhouse), function (err) {
     if (err) {
       throw err;
     }
     console.log('done');
   });
 });

const geoJson = require("@tmcw/togeojson");
const fs = require("fs");
const DOMParser = require("xmldom").DOMParser;
let Promise = require('bluebird');



class DeliveryService {
    constructor(){

    }

    getDeliveryOutlet(locationName){
        return new Promise((resolve,reject)=>{
            const kml = new DOMParser().parseFromString(fs.readFileSync("FullStackTest_DeliveryAreas.kml", "utf8"));

            const converted = geoJson.kml(kml);

            const convertedWithStyles = geoJson.kml(kml, { styles: true });

            var inside = require('point-in-polygon')
            const points=converted.features.filter(item=>item.geometry.type==='Point')
            const polygon=converted.features.filter(item=>item.geometry.type==='Polygon')
            // console.log(polygon)
            console.log(locationName)

            let placesArr=[]
            points.map((item)=>{
                placesArr.push(item.properties.name)
            })
            console.log(placesArr)

            // var found = placesArr.includes(locationName);
            let index= placesArr.indexOf(locationName)

if(index!=-1){
    let latLng=points[index].geometry.coordinates
    for (let i = 0; i < polygon.length; i++) {
        let isInside = inside(latLng, polygon[i].geometry.coordinates[index].map(item => [item[index], item[index+1]]))
        if (isInside) {
            resolve(`Your delivery outlet is :-${polygon[i].properties.name}`);
            return;
        }
    }
}
else {
    reject(`Sorry! currently we dont have any delivery outlet near you.`);

}


        })

    }
}

module.exports = new DeliveryService();

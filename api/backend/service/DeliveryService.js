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
            console.log(polygon)
            // console.log(polygon)

            for(let j=0;j<points.length;j++) {
                let latLng=points[j].geometry.coordinates
                for (let i = 0; i < polygon.length; i++) {
                    let isInside = inside(latLng, polygon[i].geometry.coordinates[0].map(item => [item[0], item[1]]))
                    if (isInside) {
                        resolve(`Found ${latLng} ${polygon[i].properties.name}`);
                        continue;
                    }
                }
                reject(`Not Found ${latLng}`);
            }

        })

    }
}

module.exports = new DeliveryService();

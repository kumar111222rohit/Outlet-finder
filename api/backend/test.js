const tj = require("@tmcw/togeojson");
const fs = require("fs");
// node doesn't have xml parsing or a dom. use xmldom
const DOMParser = require("xmldom").DOMParser;

const kml = new DOMParser().parseFromString(fs.readFileSync("FullStackTest_DeliveryAreas.kml", "utf8"));

const converted = tj.kml(kml);

const convertedWithStyles = tj.kml(kml, { styles: true });

var inside = require('point-in-polygon')
const points=converted.features.filter(item=>item.geometry.type==='Point')
const polygon=converted.features.filter(item=>item.geometry.type==='Polygon')
console.log(points)
for(let j=0;j<points.length;j++) {
    latLng=points[j].geometry.coordinates
    for (let i = 0; i < polygon.length; i++) {
        let isInside = inside(latLng, polygon[i].geometry.coordinates[0].map(item => [item[0], item[1]]))
        if (isInside) {
            console.log(`Found ${latLng} ${polygon[i].properties.name}`);
            continue;
        }
    }
    console.log(`Not Found ${latLng}`);
}

require("dotenv").config();

const TRESHHOLD = process.env.TRESH_HOLD || 100000000;
const TIMERANGE = process.env.TIME_RANGE || 500000;
const locations_To_Segments = function(locations) {
  let segments = [];
  let startdate = locations[0].time;
  let currentsegment = [];
  let segment = 0;
  for (let index = 0; index < locations.length; index++) {
    const element = locations[index];
    if (new Date(startdate) - new Date(element.time) <= TRESHHOLD) {
      currentsegment.push(element);
    } else {
      segments.push({ locations: currentsegment, segmentNumber: segment++ });

      currentsegment = [element];
      startdate = element.time;
    }
  }
  if (currentsegment.length > 0) {
    segments.push({ locations: currentsegment, segmentNumber: segment });
  }
  return segments;
};

const locationsInRange = function(locations, date) {
  let locationsRange = [];
  for (let index = 0; index < locations.length; index++) {
    const element = locations[index];
    if (Math.abs(new Date(date) - new Date(element.time)) <= TIMERANGE) {
      locationsRange.push(element);
    }
  }
  return locationsRange;
};
module.exports.locations_To_Segments = locations_To_Segments;
module.exports.locationsInRange = locationsInRange;

/* global fetch, L */
import React, { useEffect, useRef, useState } from "react";
import Moment from "moment";
import colors from "./colors.json";
import DatePicker from "./TimePickerComponent.js";
const getRouteSummary = locations => {
  const to = Moment(locations[0].time).format("hh:mm DD.MM");
  const from = Moment(locations[locations.length - 1].time).format(
    "hh:mm DD.MM"
  );
  return `${from} - ${to}`;
};
let polylines = [];
const MapComponent = props => {
  // const map = useRef();
  let [currentMap, setcurrentMap] = useState();

  const [locations, setLocations] = useState();
  const [link, setLink] = useState("http://localhost:3000");
  const handler = input => {
    let date = new Date();
    date.setFullYear(input.year);
    date.setMonth(parseInt(input.month) - 1);
    date.setDate(input.day);
    date.setHours(input.hour);
    date.setMinutes(input.minute);
    date.setSeconds(input.second);
    console.log(input);
    console.log(`http://localhost:3000/location/${date.toISOString()}`);
    setLink(`http://localhost:3000/location/${date.toISOString()}`);
  };
  // Request location data.
  useEffect(() => {
    fetch(link)
      .then(response => response.json())
      .then(json => {
        setLocations(json);
      });
  }, [link]);
  // TODO(Task 2): Request location closest to specified datetime from the back-end.

  // Initialize map. always fixed
  useEffect(() => {
    const map = new L.Map("mapid");
    const osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const attribution =
      'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
    const osm = new L.TileLayer(osmUrl, {
      minZoom: 8,
      maxZoom: 12,
      attribution
    });
    map.setView(new L.LatLng(52.51, 13.4), 9);
    map.addLayer(osm);
    setcurrentMap(map);
  }, []);

  // Update location data on map.
  useEffect(() => {
    if (!currentMap || !locations || locations.error) {
      return; // If map or locations not loaded yet.
    }

    polylines.forEach(pl => {
      currentMap.removeLayer(pl);
    });
    polylines = [];
    locations.forEach(segment => {
      if (segment.locations.length === 0) return;
      // TODO(Task 1): Replace the single red polyline by the different segments on the map.
      const latlons = segment.locations.map(({ lat, lon }) => [lat, lon]);
      const polyline = L.polyline(latlons, {
        color: colors[segment.segmentNumber] || "black"
      })
        .bindPopup(getRouteSummary(segment.locations))
        .addTo(currentMap);
      polylines.push(polyline);
      currentMap.fitBounds(polyline.getBounds());
    });

    return () => currentMap;
  }, [locations, currentMap, link]);

  return (
    <div>
      <DatePicker handle={handler} />
      {locations && `${locations.length} locations loaded`}
      {!locations && "Loading..."}
      <div id="mapid" />
    </div>
  );
};

export default MapComponent;

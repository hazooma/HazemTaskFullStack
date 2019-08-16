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
let Map;
let polylines = [];
const MapComponent = props => {
  // const map = useRef();
  let [map, setMap] = useState();

  const [locations, setLocations] = useState();
  const [link, setLink] = useState("http://localhost:3000");
  const handler = input => {
    setLink("http://localhost:3000/location/2019-07-23T18:25:52.148Z");
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
    Map = new L.Map("mapid");
    const osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const attribution =
      'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
    const osm = new L.TileLayer(osmUrl, {
      minZoom: 8,
      maxZoom: 12,
      attribution
    });
    Map.setView(new L.LatLng(52.51, 13.4), 9);
    Map.addLayer(osm);
    setMap(Map);
  }, []);

  // Update location data on map.
  useEffect(() => {
    if (!map || !locations) {
      return; // If map or locations not loaded yet.
    }
    if (polylines.length > 0) {
      polylines.forEach(pl => {
        map.remove(pl);
      });
      polylines = [];
    }

    locations.forEach(segment => {
      // TODO(Task 1): Replace the single red polyline by the different segments on the map.
      const latlons = segment.locations.map(({ lat, lon }) => [lat, lon]);
      const polyline = L.polyline(latlons, {
        color: colors[segment.segmentNumber] || "black"
      })
        .bindPopup(getRouteSummary(segment.locations))
        .addTo(map);

      polylines.push(polyline);
      map.fitBounds(polyline.getBounds());
    });

    return () => map;
  }, [locations, map, link]);

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

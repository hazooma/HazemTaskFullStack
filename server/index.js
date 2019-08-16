const express = require("express");
const app = express();
const locations_To_Segments = require("./Helper").locations_To_Segments;
const locationsInRange = require("./Helper").locationsInRange;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const exampleData = require("../data/tracking.json");

app.get("/", (req, res) => {
  // TODO(Task 1): Split tracking data into trip segments for example by using the time property.
  res.send(locations_To_Segments(exampleData));
  // res.send(exampleData);
});

app.get("/location/:when", (req, res) => {
  let time = req.params.when;

  if (!time) {
    res.send({ error: "must give a time in the past" });
  }
  let now = new Date();
  let date = new Date(time);
  if (date - now >= 0) {
    res.send({ error: "must give a time in the past" });
  }

  // TODO(Task 2): Return the tracking data closest to `req.params.when` from `exampleData`.
  res.send([
    {
      locations: locationsInRange(exampleData, time),
      segmentNumber: 0
    }
  ]);
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));

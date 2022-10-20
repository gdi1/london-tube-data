const mongoose = require("mongoose");

const stationSchema = mongoose.Schema({
  name: {
    type: String,
    // unique: true,
  },
  id: {
    type: String,
    unique: true,
  },
  longitude: String,
  latitude: String,
});

const Station = mongoose.model("Station", stationSchema);

module.exports = Station;

const mongoose = require("mongoose");

const lineSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  stations: [{ type: mongoose.Schema.ObjectId, ref: "Station" }],
});

const Line = mongoose.model("Line", lineSchema);

module.exports = Line;

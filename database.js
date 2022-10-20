const mongoose = require("mongoose");
const fs = require("fs");
const Station = require("./Station.js");
const Line = require("./Line.js");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let map = {};

let rawdata = fs.readFileSync("train-network.json");
let { stations, lines } = JSON.parse(rawdata);

const populateDB = async (stations, lines) => {
  for (let i = 0; i < stations.length; i++) {
    await Station.create(stations[i]);

    map[stations[i].name] = [];
  }

  for (let i = 0; i < lines.length; i++) {
    let lineStations = [];
    for (let j = 0; j < lines[i].stations.length; j++) {
      const station = await Station.find({ id: lines[i].stations[j] }).select({
        _id: 1,
        name: 1,
      });

      lineStations.push(station[0]._id);
      map[station[0].name].push(lines[i].name);
    }
    const line = { name: lines[i].name, stations: lineStations };
    await Line.create(line);
  }
};

mongoose
  .connect("mongodb://localhost:27017/", {
    useNewUrlParser: true,
  })
  .then(async () => {
    await Station.deleteMany({});
    await Line.deleteMany({});

    await populateDB(stations, lines);
    //console.log("Connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

//console.log(stations.length);

function getInput() {
  readline.question("Task: ", function (answer) {
    if (answer.toLowerCase() === "exit") {
      readline.close();
    } else {
      const parts = answer.split("*");
      if (parts[0].toLowerCase() === "line") {
        const lineName = parts[1];
        Line.find({ name: lineName })
          .populate("stations", "name")
          .then((data) => {
            console.log(data);
            console.log(data[0].stations);
          });
      } else if (parts[0].toLowerCase() === "station") {
        const linesPassingThrough = map[parts[1]];
        console.log(linesPassingThrough);
      }
      getInput();
    }
  });
}

getInput();

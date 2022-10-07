const mongoose = require("mongoose");

const rosterSchema = mongoose.Schema({
  artist: String,
  rate: Number,
  streams: Number,
});

const Roster = mongoose.model("rosters", rosterSchema);

module.exports = Roster;

const mongoose = require("mongoose");

const rosterSchema = mongoose.Schema({
  artist: { type: String, unique: true },
  rate: Number,
  streams: Number,
  isPaid: false,
});

const Roster = mongoose.model("rosters", rosterSchema);

module.exports = Roster;

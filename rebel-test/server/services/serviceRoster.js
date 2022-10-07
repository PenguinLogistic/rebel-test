const Roster = require("../models/modelRoster");

module.exports = {
  getAllRosters: async () => {
    const foundRosters = await Roster.find();
    return foundRosters;
  },
  createRoster: async (data) => {
    const createdRoster = await Roster.create(data);
    return createdRoster;
  },
};

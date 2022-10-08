const Roster = require("../service/modelRoster");

module.exports = {
  getAllRosters: async () => {
    const foundRosters = await Roster.find();
    return foundRosters;
  },
  createRoster: async (data) => {
    const createdRoster = await Roster.create(data);
    return createdRoster;
  },
  searchRoster: async (data) => {
    const searchedRoster = await Roster.find(data);
    return searchedRoster;
  },
};

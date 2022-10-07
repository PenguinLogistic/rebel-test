const Roster = require("../models/modelRoster");

module.exports = {
  getAllRosters: async () => {
    const foundRosters = await Roster.find();
    return foundRosters;
  },
};

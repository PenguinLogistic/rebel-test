const rosterServices = require("../models/modelRoster");
const express = require("express");
const router = express.Router();

// /api/roster
router.get("/", async (req, res) => {
  console.log("looking for all entries...");
  const allEntries = await rosterServices.find();
  res.send(allEntries);
  return allEntries;
});

// /api/roster/:id
router.get("/:id", (req, res) => {
  res.status(200).send("test route");
});

module.exports = router;

// endpoints or routes

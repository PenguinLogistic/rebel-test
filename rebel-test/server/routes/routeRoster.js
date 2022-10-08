const rosterServices = require("../models/modelRoster");
const express = require("express");
const router = express.Router();

// /api/roster
router.get("/", async (req, res) => {
  const allEntries = await rosterServices.find();
  res.send(allEntries);
  return allEntries;
});

router.post("/", async (req, res) => {
  const createdRoster = await rosterServices.create(req.body);
  return res.status(200).send("Successfully added an entry!");
});

// /api/roster/:id
router.get("/:id", (req, res) => {
  res.status(200).send("test route");
});

module.exports = router;

// endpoints or routes

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
  return res.status(200).send("yeay");
  // missing return/res.status code here
  // so you're not actually doing anything here after create
});

// /api/roster/:id
router.get("/:id", (req, res) => {
  res.status(200).send("test route");
});

module.exports = router;

// endpoints or routes

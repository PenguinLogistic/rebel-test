const rosterServices = require("../models/modelRoster");
const express = require("express");
const { restart } = require("nodemon");
const router = express.Router();

// /api/roster
router.get("/", async (req, res) => {
  const allEntries = await rosterServices.find();
  res.send(allEntries);
  return allEntries;
});

router.post("/", async (req, res) => {
  try {
    const createdRoster = await rosterServices.create(req.body);
    return res.status(200).send("Successfully added an entry!");
  } catch (err) {
    return res.status(500).send(err);
  }
});

// /api/roster/:id
router.get("/:id", async (req, res) => {
  try {
    const findEntries = await rosterServices.find({
      artist: {
        $regex: req.query.name,
        $options: "i",
      },
    });
    res.send(findEntries);
    res.status(200);
    return findEntries;
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;

// endpoints or routes

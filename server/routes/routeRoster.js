const rosterServices = require("../models/modelRoster");
const express = require("express");
const { restart } = require("nodemon");
const router = express.Router();

// /api/roster
router.get("/", async (req, res) => {
  //old find call for getting all documents by default
  // const allEntries = await rosterServices.find();

  const allEntries = await rosterServices.aggregate([
    {
      $addFields: {
        owedAmount: { $multiply: ["$rate", "$streams"] },
      },
    },
    {
      $sort: { owedAmount: -1 },
    },
  ]);
  res.send(allEntries);
  return allEntries;
});

// /api/roster Adding db document
router.post("/", async (req, res) => {
  try {
    const createdRoster = await rosterServices.create(req.body);
    return res.status(200).send("Successfully added an entry!");
  } catch (err) {
    return res.status(500).send(err);
  }
});

// /api/roster/:id Search db documents
router.get("/:id", async (req, res) => {
  try {
    // old find call for searching specific artists
    // const foundEntries = await rosterServices.find({
    //   artist: {
    //     $regex: req.query.name,
    //     $options: "i",
    //   },
    // });
    const foundEntries = await rosterServices.aggregate([
      {
        $match: { artist: { $regex: req.query.name, $options: "i" } },
      },
      {
        $addFields: {
          owedAmount: { $multiply: ["$rate", "$streams"] },
        },
      },
      {
        $sort: { owedAmount: -1 },
      },
    ]);
    res.send(foundEntries);
    res.status(200);
    return foundEntries;
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

// /api/roster/:id Updating a db document
router.put("/rate/:id", async (req, res) => {
  try {
    const updatedRate = await rosterServices.findByIdAndUpdate(req.params.id, {
      rate: req.body.rate,
    });
    res.status(200).send("Successfully updated an entry!");
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedEntry = await rosterServices.findByIdAndRemove(req.params.id);
    res.status(200).send("Successfully deleted an entry!");
  } catch (err) {
    res.status(500).send(err);
  }
});

// /api/roster/:id Updating a db document
router.put("/paid/:id", async (req, res) => {
  try {
    const updatedPaid = await rosterServices.findByIdAndUpdate(req.params.id, {
      isPaid: req.body.isPaid,
    });
    res.status(200).send("Successfully updated an entry!");
  } catch (err) {
    return res.status(500).send(err);
  }
});
module.exports = router;

// endpoints or routes

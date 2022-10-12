const express = require("express");
const next = require("next");
const mongoose = require("mongoose");
const rosterRoutes = require("./routes/routeRoster");

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(async () => {
    const server = express();
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));

    console.log(process.env.MONGODBI_URI);
    console.log(process.env.NODE_ENV);
    try {
      await mongoose.connect(
        "mongodb+srv://ryan:Start123@rebel-cluster.lyov7s6.mongodb.net/Rebel"
      );
      console.log("Connected to Rebel db");
    } catch (err) {
      console.log(err);
      throw err;
    }
    server.use("/api/roster", rosterRoutes);

    server.all("*", (req, res) => {
      return handle(req, res);
    });
    server.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on ${PORT}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });

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
  .then(() => {
    const server = express();
    server.use(express.json());

    mongoose.connect("mongodb://localhost:27017/Rebel");
    mongoose.connection.on("connected", () =>
      console.log("Connected to Rebel db")
    );

    server.use("/api/roster", rosterRoutes);

    server.get("*", (req, res) => {
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

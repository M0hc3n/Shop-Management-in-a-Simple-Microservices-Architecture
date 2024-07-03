const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
  })
);

const events = [];

app.post("/events", async (req, res) => {
  const payload = req.body;

  events.push(payload);

  try {
    await Promise.all([
      axios.post("http://localhost:8001/events", payload),
      axios.post("http://localhost:8002/events", payload),
      axios.post("http://localhost:8003/events", payload),
      axios.post("http://localhost:8004/events", payload),
    ]);

    return res.send({}).end();
  } catch (error) {
    console.log("ERROR: EVENTS-SRV: ", error);
    return res.send({ error }).end();
  }
});

app.get("/", (req, res) => {
  res.send(events);
});

app.listen(8005, () => {
  console.log("listening on http://localhost:8005");
});

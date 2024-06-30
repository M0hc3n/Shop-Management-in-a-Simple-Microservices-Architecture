const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const DB = {};

const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

function handleEvents(type, data) {
  switch (type) {
    case "created-client":
      const clientData = data;
      DB[clientData.id] = [];
      return;

    case "new-purchase":
      const { id, clientId, notes, items, price } = data;
      DB[clientId].push({
        id,
        notes,
        items,
        price,
        validated: false,
      });
      return;

    case "new-purchase-validated":
      for (let iterator of DB[data.clientId]) {
        if (iterator.id === data.id) {
          iterator.validated = true;
        }
      }

      return;
    default:
      return;
  }
}

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleEvents(type, data);

  console.log("EVENT REQUEST: ", req.body);
  console.log("UPDATED: ", DB);
  return res.status(201).send({});
});

// main fetching method
app.get("/", (req, res) => {
  res.status(200).json({
    data: DB,
  });
});

app.listen(8003, async () => {
  console.log("listening on http://localhost:8003");
  const { data } = await axios.get("http://event-srv:8005/events");
  data.forEach((event) => {
    handleEvents(event.type, event.data);
  });
});

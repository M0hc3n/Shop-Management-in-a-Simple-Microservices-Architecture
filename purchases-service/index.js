const app = require("express")();
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const DB = {};

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to purchases service</h1>");
});

app.post("/", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { id: clientId, notes, items, price } = req.body;

  DB[id] = { id, clientName };

  if (DB[clientId]) {
    DB[clientId].push({ id, notes, items, price, validated: false });
  } else {
    DB[clientId] = [{ id, notes, items, price, validated: false }];
  }

  try {
    await axios.post("http://event-srv:8005/events", {
      type: "new-purchase",
      data: { id, clientId, notes, items, price, validated: false },
    });
  } catch (error) {
    return res.send(e).end();
  }

  return res
    .status(201)
    .json({
      message: "new purchase created successfully",
      data: {
        id: DB[clientId].at(-1),
      },
    })
    .end();
});

app.get("/fetch", (req, res) => {
  res
    .status(200)
    .json({
      data: DB,
    })
    .end();
});

// convention among services to receive events and process them.
app.post("/events", (req, res) => {
  res.send({}).end();
});

app.listen(8001, () => {
  console.log("listening on http://localhost:8002");
});

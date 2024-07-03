const app = require("express")();
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const DB = {};

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to purchases service</h1>");
});

const getFullDate = () => {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  return `${month}-${day}-${year}`;
};

app.post("/", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { id: clientId, name: clientName, notes, items, price } = req.body;

  const date = getFullDate();

  const fullPayload = {
    id,
    notes,
    clientId,
    clientName,
    items,
    price,
    date,
    validated: false,
  };

  if (DB[clientId]) {
    DB[clientId].push(fullPayload);
  } else {
    DB[clientId] = [fullPayload];
  }

  try {
    await axios.post("http://localhost:8005/events", {
      type: "new-purchase",
      data: fullPayload,
    });
  } catch (error) {
    console.log("ERROR: PURCHASES-SRV: ", error);
    return res.send({ error }).end();
  }

  return res
    .status(201)
    .json({
      message: "new purchase created successfully",
      data: {
        ...DB[clientId].at(-1),
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

app.listen(8002, () => {
  console.log("listening on http://localhost:8002");
});

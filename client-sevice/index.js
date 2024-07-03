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
  res.send("<h1>Welcome to clients service</h1>");
});

app.post("/", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { clientName } = req.body;

  DB[id] = { id, clientName };

  try {
    await axios.post("http://localhost:8005/events", {
      type: "created-client",
      data: {
        id,
        clientName,
      },
    });
  } catch (error) {
    console.log("ERROR: EVENTS-SRV: ", error);
    return res.send({ error }).end();
  }

  return res
    .status(201)
    .json({
      message: "client created successfully",
      data: {
        id: DB[id].id,
        name: DB[id].clientName,
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
  console.log("listening on http://localhost:8001");
});

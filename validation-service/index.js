const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("<h1>Welcome to purchases validation service</h1>");
});

app.post("/events", async (req, res) => {
  const event = req.body;
  switch (event.type) {
    case "new-purchase":
      // ?possibility to change it for some advanced logic
      const validated = true;
      await axios
        .post("http://events-srv:8005/events", {
          type: "new-purchase-validated",
          data: {
            ...event.data,
            validated,
          },
        })
        .catch((e) => console.log(e.message));
      return res.send({});

    default:
      return res.send({});
  }
});


app.listen(8004, () => {
  console.log('validation service running on: http://localhost:8004');
})
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

let data = [];

app.post("/api/item", (req, res) => {
  const newItem = req.body;
  const { name, email } = newItem;

  if (!name || !email)
    return res.status(200).json({
      result: {
        error: "Name and Email are required",
      },
      status: "error",
    });

  const id = generateUUID();

  data.push({
    ...newItem,
    id,
  });

  res.status(200).json({
    result: {
      last_id: id,
    },
    status: "success",
  });
});

app.delete("/api/item/:id", (req, res) => {
  const id = req.params.id;
  const items = [...data];
  const index = items.findIndex((i) => i.id == id);

  if (!index)
    return res.status(200).json({
      result: {
        error: "Not Found",
      },
      status: "error",
    });

  items.splice(index, 1);
  data = items;

  res.status(200).json({
    result: {},
    status: "success",
  });
});

app.get("/api/items", (req, res) => {
  res.json({
    result: data,
    status: "success",
  });
});

app.get("/", (req, res) => {
  res.json({
    HI: ">)",
  });
});

app.listen(PORT, () => {
  console.log(`Mock server running on http://localhost:${PORT}`);
});

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api/data", async (req, res) => {
  try {
    const fetch = (await import("node-fetch")).default;
    const response = await fetch("https://api.jsonserve.com/Uw5CrX");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));

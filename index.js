import express from "express";
import bodyParser from "body-parser";
import sqlite3 from "sqlite3";

const app = express();

const PORT = process.env.PORT || 3000;

const dbName = "heroes.db";
const db = new sqlite3.Database(dbName);

app.use(bodyParser.json());

app.get("/heroes", (req, res) => {
  db.all("SELECT * FROM heroes", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json(rows);
  });
});

app.get("/filters", (req, res) => {
  db.all("SELECT * FROM filters", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Export the Express API
export default app;

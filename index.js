import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: [".env.local", ".env"] });

import heroRouter from "./routes/hero.router.js";
import filterRouter from "./routes/filter.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api", heroRouter);
app.use("/api", filterRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Export the Express API
export default app;

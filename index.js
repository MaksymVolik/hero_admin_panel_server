import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config({ path: [".env.local", ".env"] });

import userRouter from "./routes/user.routes.js";
import heroRouter from "./routes/hero.router.js";
import filterRouter from "./routes/filter.routes.js";
import swaggerDocs from "./config/swagger.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", userRouter);
app.use("/api", heroRouter);
app.use("/api", filterRouter);

swaggerDocs(app);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Export the Express API
export default app;

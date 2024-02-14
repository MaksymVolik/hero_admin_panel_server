import { Router } from "express";
const filterRouter = Router();

import { getAll } from "../controllers/filter.controller.js";

filterRouter.get("/filters", getAll);
// filterRouter.get("/:id", getById);
// filterRouter.post("/", create);
// filterRouter.put("/:id", updateById);
// filterRouter.delete("/:id", deleteById);

export default filterRouter;

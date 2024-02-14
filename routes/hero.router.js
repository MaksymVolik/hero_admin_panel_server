import { Router } from "express";
const heroRouter = Router();

import { getAll, create, deleteById } from "../controllers/hero.controller.js";

heroRouter.get("/heroes", getAll);
// heroRouter.get("/:id", getById);
heroRouter.post("/heroes", create);
// heroRouter.put("/:id", updateById);
heroRouter.delete("/heroes/:id", deleteById);

export default heroRouter;

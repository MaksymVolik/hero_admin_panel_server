import { Router } from "express";
import { getAll } from "../controllers/filter.controller.js";

const filterRouter = Router();

filterRouter.get("/filters", getAll);
// filterRouter.post("/filters", create);

export default filterRouter;

/**
 * @openapi
 * '/api/filters':
 *   get:
 *     tags:
 *     - Filter
 *     summary: Get filters
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Filter'
 *       500:
 *         description: Bad Request
 */

/**
 * @openapi
 * components:
 *  schemas:
 *    Filter:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        title:
 *          type: string
 *        classname:
 *          type: string
 */

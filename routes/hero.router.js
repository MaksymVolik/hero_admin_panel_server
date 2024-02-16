import { Router } from "express";
const heroRouter = Router();

import { getAll, create, deleteById } from "../controllers/hero.controller.js";

heroRouter.get("/heroes", getAll);
// heroRouter.get("/:id", getById);
heroRouter.post("/heroes", create);
// heroRouter.put("/:id", updateById);
heroRouter.delete("/heroes/:id", deleteById);

export default heroRouter;

/**
 * @openapi
 * '/api/heroes':
 *   post:
 *     tags:
 *     - Hero
 *     summary: Add a new hero
 *     description: Add a new hero
 *     requestBody:
 *       description: Create a new hero
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - name
 *               - description
 *               - element
 *             properties:
 *               name:
 *                 type: string
 *                 default: Hero
 *               description:
 *                 type: string
 *                 default: Super hero
 *               element:
 *                 type: string
 *                 default: fire
 *     responses:
 *       200:
 *         description: Successful operation
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
 *                     $ref: '#/components/schemas/Hero'
 *       400:
 *         description: Invalid input
 */

/**
 * @openapi
 * '/api/heroes':
 *   get:
 *     tags:
 *     - Hero
 *     summary: Get heroes
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
 *                     $ref: '#/components/schemas/Hero'
 *       400:
 *         description: Bad Request
 */

/**
 * @openapi
 * '/api/heroes/{id}':
 *   delete:
 *     tags:
 *     - Hero
 *     summary: Delete the hero by ID
 *     description: For valid response try integer IDs. Anything nonintegers will generate API errors.
 *     operationId: deleteOrder
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the hero that needs to be deleted
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Successful operation
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
 *                     $ref: '#/components/schemas/Hero'
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: Hero not found
 */

/**
 * @openapi
 * components:
 *  schemas:
 *    Hero:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *        name:
 *          type: string
 *        description:
 *          type: string
 *        element:
 *          type: string
 */

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pendingCancha_1 = require("../controllers/pendingCancha");
const validate_1 = require("../middleware/validate");
const router = (0, express_1.Router)();
/**
 *  @swagger
 *    components:
 *      schemas:
 *          PendingCancha:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                      description: the id of the cancha
 *                  club:
 *                      type: string
 *                      description: the name of the cancha
 *                  city:
 *                      type: string
 *                      description: the city of the cancha
 *                  state:
 *                      type: string
 *                      description: the state of the cancha
 *                  type:
 *                      type: string
 *                      description: the type of the cancha, Trinquete, Frontón or Cajón
 *                  maps_location:
 *                      type: string
 *                      description: the direction of the cancha
 *                  phone:
 *                      type: string
 *                      description: the phone of the cancha
 *                  image:
 *                      type: string
 *                      description: the image of the cancha (path ?)
 *                  pending:
 *                      type: boolean
 *                      description: if the cancha needs to be rejected or approved
 *              required:
 *                  - club
 *                  - city
 *                  - state
 *                  - type
 *                  - maps_location
 *                  - phone
 *                  - pending
 *                  - image
 *              example:
 *                  id: 1
 *                  club: Club Nahuel Huapi
 *                  city: Bariloche
 *                  state: Rio Negro
 *                  type: Trinquete
 *                  maps_location: Luelmo 38
 *                  phone: 2944112233
 *                  pending: true
 *                  image: /uploads/cancha_default.webp
 *          CanchaNotFound:
 *              type: Object
 *              properties:
 *                  message:
 *                      type: string
 *                      description: the message for the error in fetching
 *              example:
 *                  message: Error fetching pending cancha
 *      parameters:
 *          pendingCanchaId:
 *              in: path
 *              name: id
 *              required: true
 *              schema:
 *                  type: string
 *              description: the pending cancha id
 *
*/
/**
 * @swagger
 *  tags:
 *      name: Pending Canchas
 *      description: Pending Canchas endpoint
 */
/**
 * @swagger
 * /pending-canchas:
 *   get:
 *     summary: Returns all the pending canchas in an array
 *     tags: [Pending Canchas]
 *     responses:
 *       200:
 *         description: all the pending canchas list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: "#/components/schemas/PendingCancha"
 *       500:
 *         description: No hay canchas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/CanchaNotFound"
 */
router.get("/", pendingCancha_1.getAllPendingCanchas);
/**
* @swagger
*   /pending-canchas:
*     post:
*       summary: Create a new pending cancha
*       tags: [Pending Canchas]
*       requestBody:
*         required: true
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/schemas/Cancha"
*         responses:
*           201:
*             description: the task was succesfully created
*             content:
*               application/json:
*                 schema:
*                   $ref: "#/components/schemas/PendingCancha"
*           500:
*             description: some server error
*             content:
*               application/json:
*                 schema:
*                   $ref: "#/components/schemas/CanchaNotFound"
*/
router.post("/", pendingCancha_1.uploadMiddleware, validate_1.canchaValidationRules, validate_1.handleValidationErrors, pendingCancha_1.createPendingCancha);
/**
* @swagger
*   /pending-canchas/approve-cancha/{id}:
*     post:
*       summary: Approve a pending cancha and create a Cancha from it
*       tags: [Pending Canchas]
*       parameters:
*         - $ref: "#/components/parameters/pendingCanchaId"
*       responses:
*         200:
*           description: the task was succesfully created
*           content:
*             application/json:
*               schema:
*                 $ref: "#/components/schemas/PendingCancha"
*         404:
*             description: the cancha to approve was not found
*             content:
*               application/json:
*                 schema:
*                   $ref: "#/components/schemas/CanchaNotFound"
*         500:
*           description: some server error
*           content:
*             application/json:
*               schema:
*                 $ref: "#/components/schemas/CanchaNotFound"
*/
router.post("/approve-cancha/:id", pendingCancha_1.approvePendingCancha);
// TODO: not implemented on client
router.put("/:id", pendingCancha_1.updatePendingCancha);
/**
 * @swagger
 * /pending-canchas/{id}:
 *    delete:
 *      summary: Delete pending cancha by id
 *      tags: [Pending Canchas]
 *      parameters:
 *          - $ref: "#/components/parameters/pendingCanchaId"
 *      responses:
 *        204:
 *          description: deleted pending cancha
 *          content:
 *            application/json:
 *              schema:
 *                  type: Object
 *                  properties:
 *                      message:
 *                          type: string
 *                          value: "Pending cancha deleted"
 *        404:
 *          description: No se encontro la cancha
 *          content:
 *            application/json:
 *              schema:
 *                  $ref: "#/components/schemas/CanchaNotFound"
 *        500:
 *          description: No hay canchas
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/CanchaNotFound"
 */
router.delete("/:id", pendingCancha_1.deletePendingCancha);
exports.default = router;

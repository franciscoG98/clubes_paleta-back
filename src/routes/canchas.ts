import { Router } from 'express';
import {
    getAllCanchas,
    createCancha,
    getOneCancha,
    deleteCancha,
    getCanchasCount
} from '../controllers/cancha';

const router = Router();

/**
 *  @swagger
 *    components:
 *      schemas:
 *          Cancha:
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
 *                      type: number
 *                      description: the phone of the cancha
 *                  image:
 *                      type: string
 *                      description: the image of the cancha (path ?)
 *              required:
 *                  - club
 *                  - city
 *                  - state
 *                  - type
 *                  - maps_location
 *                  - phone
 *                  - image
 *              example:
 *                  id: 1
 *                  club: Club Nahuel Huapi
 *                  city: Bariloche
 *                  state: Rio Negro
 *                  type: Trinquete
 *                  maps_location: Luelmo 38
 *                  phone: 2944112233
 *                  image: /uploads/cancha_default.webp
 *          CanchaNotFound:
 *              type: Object
 *              properties:
 *                  message:
 *                      type: string
 *                      description: the message for the error in fetching
 *              example:
 *                  message: Cancha not found
 *      parameters:
 *          canchaId:
 *              in: path
 *              name: id
 *              required: true
 *              schema: 
 *                  type: string 
 *              description: the cancha id
 * 
*/

/**
 * @swagger
 *  tags:
 *      name: Canchas
 *      description: Canchas endpoint
 */

/**
 * @swagger
 * /canchas:
 *   get:
 *     summary: Returns all the canchas in an array
 *     tags: [Canchas]
 *     responses:
 *       200:
 *         description: all the canchas list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Cancha'
 *       500:
 *         description: No hay canchas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CanchaNotFound'
 */
router.get('/', getAllCanchas);

/**
 * @swagger
 * /canchas/count:
 *   get:
 *     summary: Returns the count of canchas
 *     tags: [Canchas]
 *     responses:
 *       200:
 *         description: the count of canchas
 *         content:
 *           text/plain:
 *             schema:
 *               type: integer
 *               example: 24
 *       500:
 *         description: No hay canchas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CanchaNotFound'
 */
router.get('/count', getCanchasCount);

/**
* @swagger
*   /canchas:
*     post:
*       summary: Create a new cancha
*       tags: [Canchas]
*       requestBody:
*         required: true
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Cancha'
*         responses:
*           201:
*             description: the task was succesfully created
*             content:
*               application/json:
*                 schema:
*                   $ref: '#/components/schemas/Cancha'
*           500:
*             description: some server error
*             content:
*               application/json:
*                 schema:
*                   $ref: '#/components/schemas/CanchaNotFound'
*/
router.post('/', createCancha)

/**
 * @swagger
 * /canchas/{id}:
 *    get:
 *      summary: Returns one cancha by id
 *      tags: [Canchas]
 *      parameters:
 *          - $ref: '#/components/parameters/canchaId'
 *      responses:
 *        200:
 *          description: requested cancha
 *          content:
 *            application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Cancha'
 *        404:
 *          description: No se encontro la cancha
 *          content:
 *            application/json:
 *              schema:
 *                  $ref: '#/components/schemas/CanchaNotFound'
 *        500:
 *          description: No hay canchas
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CanchaNotFound'
 */
router.get('/:id', getOneCancha);

// TODO:204 message response
/**
 * @swagger
 * /canchas/{id}:
 *    delete:
 *      summary: Delete one cancha by id
 *      tags: [Canchas]
 *      parameters:
 *          - $ref: '#/components/parameters/canchaId'
 *      responses:
 *        204:
 *          description: requested cancha
 *          content:
 *            application/json:
 *              schema:
 *                  type: Object
 *                  properties:
 *                      message:
 *                          type: string
 *                          value: 'Cancha deleted'
 *        404:
 *          description: No se encontro la cancha
 *          content:
 *            application/json:
 *              schema:
 *                  $ref: '#/components/schemas/CanchaNotFound'
 *        500:
 *          description: No hay canchas
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CanchaNotFound'
 */
router.delete('/:id', deleteCancha);

export default router;
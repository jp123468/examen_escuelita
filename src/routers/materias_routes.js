import {Router} from 'express'
import {
    registroMaterias,
    listarMaterias,
    //detalleEstudiantes,
    actualizarMaterias,
    eliminarMaterias,
} from "../controllers/materias_controllers.js";



const router = Router()
/**
 * @openapi
 * /api/materias/registro:
 *   post:
 *     tags:
 *       - Materias
 *     summary: Registro de Materia disponible
 *     description: Crea una nueva materia.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigo:
 *                 type: string
 *                 example: 001
 *               nombre:
 *                 type : string
 *                 example: Quimica 
 *               creditos:
 *                 type: string
 *                 example: 10
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object 
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Usuario registrado exitosamente.
 *                     user:
 *                       type: object
 *                       properties:
 *                         codigo:
 *                           type: string
 *                           example: 001
 *                         nombre:
 *                           type : string
 *                           example: Quimica 
 *                         creditos:
 *                           type: string
 *                           example: 10
 */

router.post('/materias/registro',registroMaterias)

/**
 * @openapi
 * /api/materias:
 *   get:
 *     tags:
 *       - Materias
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 *                     properties:
 *                       codigo:
 *                         type: string
 *                         example: 001
 *                       nombre:
 *                         type : string
 *                         example: Quimica 
 *                       creditos:
 *                         type: string
 *                         example: 10
 */

router.get('/materias',listarMaterias)

/**
 * @openapi
 * /api/materias/actulizar/{id}:
 *   put:
 *     tags:
 *       - Materias
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigo:
 *                 type: string
 *                 example: 001
 *               nombre:
 *                 type : string
 *                 example: Biologia 
 *               creditos:
 *                 type: string
 *                 example: 15
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la Materia a actualizar.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Materia actualizado exitosamente.
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     materia:
 *                       type: object
 *                       properties:
 *                         codigo:
 *                           type: string
 *                           example: 001
 *                         nombre:
 *                           type : string
 *                           example: Biologia 
 *                         creditos:
 *                           type: string
 *                           example: 15
 */


router.put('/materias/actualizar/:id',actualizarMaterias)

/**
 * @openapi
 * /api/materias/eliminar/{id}:
 *   delete:
 *     tags:
 *       - Materias
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la Materia
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               salida:
 *                 format: date
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */
router.delete("/materias/eliminar/:id",eliminarMaterias);

export default router
import {Router} from 'express'
import {
    registroMatriculas,
    listarMatriculas,
    //detalleEstudiantes,
    actualizarMatriculas,
    eliminarMatriculas,
} from "../controllers/matriculas_controllers.js";



const router = Router()
/**
 * @openapi
 * /api/matriculas/registro:
 *   post:
 *     tags:
 *       - Matriculas
 *     summary: Registro de Matricula
 *     description: Crea una nueva Matricula.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: 64ac6a89e7c83c3deae079b8
 *               materia:
 *                 type: string
 *                 example: 64ac6a89e7c83c3deae079b8
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
 *                       example: Matricula registrada exitosamente.
 *                     user:
 *                       type: object
 *                       properties:
 *                         data:
 *                           type: array 
 *                           items: 
 *                             type: object
 */
router.post('/matriculas/registro', registroMatriculas);

/**
 * @openapi
 * /api/matriculas:
 *   get:
 *     tags:
 *       - Matriculas
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                   example: 64ac6a89e7c83c3deae079b8
 *                 materia:
 *                   type: string
 *                   example: 64ac6a89e7c83c3deae079b8 
 */
router.get('/matriculas', listarMatriculas);

/**
 * @openapi
 * /api/matriculas/actulizar/{id}:
 *   put:
 *     tags:
 *       - Matriculas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: 64ac6a89e7c83c3deae079b8
 *               materia:
 *                 type: string
 *                 example: 64ac6a89e7c83c3deae079b8 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la matricula a actualizar.
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
 *                   example: Matricula actualizado exitosamente.
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         type: object
 *               nombre:
 *                 type: string
 *                 example: 64ac6a89e7c83c3deae079b8
 *               materia:
 *                 type: string
 *                 example: 64ac6a89e7c83c3deae079b8 
 */
router.put('/matriculas/actualizar/:id', actualizarMatriculas);

/**
 * @openapi
 * /api/matriculas/eliminar/{id}:
 *   delete:
 *     tags:
 *       - Matriculas
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la Matricula
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
router.delete("/matriculas/eliminar/:id", eliminarMatriculas);

export default router





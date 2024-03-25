import {Router} from 'express'
import {
    registroEstudiantes,
    listarEstudiantes,
    //detalleEstudiantes,
    actualizarEstudiantes,
    eliminarEstudiantes,
} from "../controllers/estudiantes_controllers.js";



const router = Router()

/**
 * @openapi
 * /api/estudiantes/registro:
 *   post:
 *     tags:
 *       - Estudiantes
 *     summary: Registro de Estudiante
 *     description: Crea un nuevo estudiante.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Julio
 *               apellido:
 *                 type : string
 *                 example: Julio 
 *               cedula:
 *                 type: string
 *                 example: 9999999999
 *               ciudad:
 *                 type: string
 *                 example: San Pedro Sula
 *               direccion:
 *                 type: string
 *                 example: Pueblo Nuevo
 *               email:
 *                 type: string
 *                 example: julio@hotmail.com
 *               telefono:
 *                 type: string
 *                 example: 099999999

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
 *                           properties:
 *                              nombre:
 *                                type: string
 *                                example: Julio
 *                              apellido:
 *                                type : string
 *                                example: Julio 
 *                              cedula:
 *                                type: Int32
 *                                example: 9999999999
 *                              ciudad:
 *                                type: string
 *                                example: San Pedro Sula
 *                              direccion:
 *                                type: string
 *                                example: Pueblo Nuevo
 *                              email:
 *                                type: string
 *                                example: julio@hotmail.com
 *                              telefono:
 *                                type: Init32
 *                                example: 099999999
 */

router.post('/estudiantes/registro',registroEstudiantes)

/**
 * @openapi
 * /api/estudiantes:
 *   get:
 *     tags:
 *       - Estudiantes
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
 *                       example: Usuarios.
 *                     user:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: string
 *                           example: julio@hotmail.com
 *                         nombre:
 *                           type: string
 *                           example: Julio
 *                         apellido:
 *                           type: string
 *                           example: Ríos
 *                         id:
 *                           type: string
 *                           example: s45l5oi10A
 */

router.get('/estudiantes',listarEstudiantes)
/**
 * @openapi
 * /api/estudiantes/{id}:
 *   get:
 *     tags:
 *       - Estudiantes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a obtener.
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
 *                     Usuario:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: Juan 
 *                         apellido:
 *                           type: string
 *                           example: Pérez
 *                         email:
 *                           type: string
 *                           example: juan@example.com
 */

//router.get('/estudiantes/:id',detalleEstudiantes)
/**
 * @openapi
 * /api/estudiantes/actulizar/{id}:
 *   put:
 *     tags:
 *       - Estudiantes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Julio
 *               apellido:
 *                 type: string
 *                 example: Ríos
 *               direccion:
 *                 type: string
 *                 example: Enrique Segoviano
 *               telefono:
 *                 type: string
 *                 example: 0056163585
 *               email:
 *                 type: string
 *                 example: julio@hotmail.com
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del Usuario a actualizar.
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
 *                   example: Perfil actualizado exitosamente.
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         nombre:
 *                           type: string
 *                           example: Julio
 *                         apellido:
 *                           type: string
 *                           example: Ríos
 *                         direccion:
 *                           type: string
 *                           example: Enrique Segoviano
 *                         telefono:
 *                           type: string
 *                           example: 0056163585
 *                         email:
 *                           type: string
 *                           example: julio@hotmail.com
 */



router.put('/estudiantes/actualizar/:id',actualizarEstudiantes)

/**
 * @openapi
 * /api/estudiantes/eliminar/{id}:
 *   delete:
 *     tags:
 *       - Estudiantes
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del estudiante
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
router.delete("/estudiantes/eliminar/:id",eliminarEstudiantes);

export default router





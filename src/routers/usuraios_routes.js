import {Router} from 'express'
import {
    login,

} from "../controllers/usuarios_controllers.js";


const router = Router()
/**
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - Login Usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: julio@hotmail.com
 *               password:
 *                 type: string
 *                 example: contraseña
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
 *                 nombre:
 *                   type: string
 *                   example: Julio
 *                 apellido:
 *                   type: string
 *                   example: Perez
 */
router.post('/login',login)


export default router





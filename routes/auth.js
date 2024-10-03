import { Router } from 'express';
import { check } from 'express-validator';
import { login } from '../controllers/auth.js';
import { validarCampos } from '../middlewares/validarCampos.js';


const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').notEmpty(),
    check('correo', 'El correo no tiene un formato válido').isEmail(),
    check('contrasena', 'La contraseña es obligatoria').notEmpty(),
    validarCampos
], login);

export default router;

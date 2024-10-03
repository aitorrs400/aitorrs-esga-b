import { Router } from 'express';
import { check } from 'express-validator';
import multer from 'multer';
import { eliminarFotoRecibo, eliminarFotoVehiculo, subirFotoRecibo, subirFotoVehiculo } from '../controllers/archivos.js';
import { validarCampos } from '../middlewares/validarCampos.js';
import { validarJWT } from '../middlewares/validarJWT.js';
import { existeReciboPorId, existeVehiculoPorId } from '../helpers/dbValidators.js';


const router = Router();
const upload = multer({});

router.post('/vehiculo/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeVehiculoPorId ),
    validarCampos,
    upload.single('foto')
], subirFotoVehiculo);

router.delete('/vehiculo/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeVehiculoPorId ),
    validarCampos
], eliminarFotoVehiculo);

router.post('/recibo/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeReciboPorId ),
    validarCampos,
    upload.single('recibo')
], subirFotoRecibo);

router.delete('/recibo/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeReciboPorId ),
    validarCampos
], eliminarFotoRecibo);


export default router;

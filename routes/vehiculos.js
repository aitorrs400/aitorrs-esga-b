import { Router } from 'express';
import { check } from 'express-validator';
import { vehiculosDelete, vehiculosGet, vehiculosIDGet, vehiculosPost, vehiculosPut } from '../controllers/vehiculos.js';
import { validarCampos } from '../middlewares/validarCampos.js';
import { existeVehiculoPorId } from '../helpers/dbValidators.js';
import { validarJWT } from '../middlewares/validarJWT.js';


const router = Router();

router.get('/', [validarJWT], vehiculosGet);

router.get('/:id', [validarJWT], vehiculosIDGet);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre del veículo es obligatorio').not().isEmpty(),
    check('marca', 'La marca del veículo es obligatoria').not().isEmpty(),
    check('modelo', 'El modelo del veículo es obligatorio').not().isEmpty(),
    check('matricula', 'La matrícula del veículo es obligatoria').not().isEmpty(),
    validarCampos
], vehiculosPost);

router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeVehiculoPorId ),
    check('nombre', 'El nombre del veículo es obligatorio').not().isEmpty(),
    check('marca', 'La marca del veículo es obligatoria').not().isEmpty(),
    check('modelo', 'El modelo del veículo es obligatorio').not().isEmpty(),
    check('matricula', 'La matrícula del veículo es obligatoria').not().isEmpty(),
    validarCampos
], vehiculosPut);

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeVehiculoPorId ),
    validarCampos
], vehiculosDelete);

export default router;

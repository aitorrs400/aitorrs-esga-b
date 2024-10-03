import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validarCampos.js';
import { existeGasolineraPorId, existeReciboPorId, existeVehiculoPorId } from '../helpers/dbValidators.js';
import { validarJWT } from '../middlewares/validarJWT.js';
import { recibosDelete, recibosGet, recibosIDGet, recibosPost, recibosPut } from '../controllers/recibos.js';


const router = Router();

router.get('/', [validarJWT], recibosGet);

router.get('/:id', [validarJWT], recibosIDGet);

router.post('/', [
    validarJWT,
    check('codigo', 'El código del recibo es obligatorio').not().isEmpty(),
    check('precioE', 'El precio del recibo es obligatoria').not().isEmpty(),
    check('litros', 'Los litros del recibo son obligatorios').not().isEmpty(),
    check('precioEL', 'El precio por litro del recibo es obligatorio').not().isEmpty(),
    check('carburante', 'El carburante del recibo es obligatorio').not().equals(-1),
    check('fecha', 'La fecha del recibo es obligatoria').not().isEmpty(),
    check('gasolinera', 'El identificador de gasolinera es obligatorio').not().isEmpty(),
    check('gasolinera', 'No es un ID de gasolinera válido').isMongoId(),
    check('gasolinera').custom( existeGasolineraPorId ),
    check('vehiculo', 'El identificador del vehículo es obligatorio').not().isEmpty(),
    check('vehiculo', 'No es un ID de vehículo válido').isMongoId(),
    check('vehiculo').custom( existeVehiculoPorId ),
    validarCampos
], recibosPost);

router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeReciboPorId ),
    check('codigo', 'El código del recibo es obligatorio').not().isEmpty(),
    check('precioE', 'El precio del recibo es obligatoria').not().isEmpty(),
    check('litros', 'Los litros del recibo son obligatorios').not().isEmpty(),
    check('precioEL', 'El precio por litro del recibo es obligatorio').not().isEmpty(),
    check('carburante', 'El carburante del recibo es obligatorio').not().equals(-1),
    check('fecha', 'La fecha del recibo es obligatoria').not().isEmpty(),
    check('gasolinera', 'El identificador de gasolinera es obligatorio').not().isEmpty(),
    check('gasolinera', 'No es un ID de gasolinera válido').isMongoId(),
    check('gasolinera').custom( existeGasolineraPorId ),
    check('vehiculo', 'El identificador del vehículo es obligatorio').not().isEmpty(),
    check('vehiculo', 'No es un ID de vehículo válido').isMongoId(),
    check('vehiculo').custom( existeVehiculoPorId ),
    validarCampos
], recibosPut);

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeReciboPorId ),
    validarCampos
], recibosDelete);

export default router;

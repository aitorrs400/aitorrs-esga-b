import { Router } from 'express';
import { check } from 'express-validator';
import { gasolinerasDelete, gasolinerasGet, gasolinerasIDGet, gasolinerasPost, gasolinerasPut } from '../controllers/gasolineras.js';
import { validarCampos } from '../middlewares/validarCampos.js';
import { validarJWT } from '../middlewares/validarJWT.js';
import { existeGasolineraPorId } from '../helpers/dbValidators.js';


const router = Router();

router.get('/', [validarJWT], gasolinerasGet);

router.get('/:id', [validarJWT], gasolinerasIDGet);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre de la gasolinera es obligatorio').not().isEmpty(),
    check('direccion', 'La dirección de la gasolinera es obligatoria').not().isEmpty(),
    check('numero', 'El número de la gasolinera es obligatorio').not().isEmpty(),
    check('localidad', 'La localidad de la gasolinera es obligatoria').not().isEmpty(),
    check('cp', 'El código postal de la gasolinera es obligatorio').not().isEmpty(),
    check('provincia', 'La provincia de la gasolinera es obligatoria').not().isEmpty(),
    check('pais', 'El país de la gasolinera es obligatorio').not().isEmpty(),
    check('coordenadas', 'Las coordenadas de la gasolinera son obligatorias').not().isEmpty(),
    validarCampos
], gasolinerasPost);

router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeGasolineraPorId ),
    check('nombre', 'El nombre de la gasolinera es obligatorio').not().isEmpty(),
    check('direccion', 'La dirección de la gasolinera es obligatoria').not().isEmpty(),
    check('numero', 'El número de la gasolinera es obligatorio').not().isEmpty(),
    check('localidad', 'La localidad de la gasolinera es obligatoria').not().isEmpty(),
    check('cp', 'El código postal de la gasolinera es obligatorio').not().isEmpty(),
    check('provincia', 'La provincia de la gasolinera es obligatoria').not().isEmpty(),
    check('pais', 'El país de la gasolinera es obligatorio').not().isEmpty(),
    check('coordenadas', 'Las coordenadas de la gasolinera son obligatorias').not().isEmpty(),
    validarCampos
], gasolinerasPut);

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeGasolineraPorId ),
    validarCampos
], gasolinerasDelete);

export default router;

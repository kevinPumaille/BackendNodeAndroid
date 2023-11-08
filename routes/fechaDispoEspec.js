
const { Router } = require('express');

const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole,tieneRole } = require('../middlewares/validar-roles');
const { check } = require('express-validator');
const { esRoleValido, emailExiste, existeUsuarioPorId, existeEspecialidadPorId } = require('../helpers/db-validators');
const { crearFechaDispoEspec, obtenerFechaDispoEspecList, obtenerFechaDispoEspec } = require('../controllers/fechaDispoEspec');

const router = Router();

router.get('/', obtenerFechaDispoEspecList );

router.get('/especifico', obtenerFechaDispoEspec );

router.post('/', [
    // validarJWT,
    //check('nombre','El nombre es obligatorio').not().isEmpty(),
    //check('rol').custom(esRoleValido),
    validarCampos
] ,crearFechaDispoEspec );



module.exports = router;
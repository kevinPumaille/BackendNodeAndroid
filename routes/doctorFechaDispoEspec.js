
const { Router } = require('express');

const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole,tieneRole } = require('../middlewares/validar-roles');
const { check } = require('express-validator');
const { esRoleValido, emailExiste, existeUsuarioPorId, existeEspecialidadPorId } = require('../helpers/db-validators');
const { crearDoctorFechaDispoEspec, obtenerDoctorFechaDispoEspecList, obtenerDoctorFechaDispoEspec } = require('../controllers/doctorFechaDispoEspec');


const router = Router();

router.get('/', obtenerDoctorFechaDispoEspecList );

router.post('/busqueda', obtenerDoctorFechaDispoEspec );

router.post('/', [
    // validarJWT,
    // check('nombre','El nombre es obligatorio').not().isEmpty(),
    // check('rol').custom(esRoleValido),
    validarCampos
] ,crearDoctorFechaDispoEspec );



module.exports = router;
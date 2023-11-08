
const { Router } = require('express');

const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole,tieneRole } = require('../middlewares/validar-roles');
const { check } = require('express-validator');
const { esRoleValido, emailExiste, existeUsuarioPorId, existeEspecialidadPorId } = require('../helpers/db-validators');
const { crearHoraDoctor, obtenerHoraDoctorList } = require('../controllers/HorasDoctor');


const router = Router();

router.get('/', obtenerHoraDoctorList );

//router.get('/especifico', obtenerFechaDispoEspec );

router.post('/', [
    // validarJWT,
    //check('nombre','El nombre es obligatorio').not().isEmpty(),
    //check('rol').custom(esRoleValido),
    validarCampos
] ,crearHoraDoctor);



module.exports = router;
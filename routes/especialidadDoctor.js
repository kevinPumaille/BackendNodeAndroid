
const { Router } = require('express');
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole,tieneRole } = require('../middlewares/validar-roles');
const { check } = require('express-validator');
const { esRoleValido, emailExiste, existeUsuarioPorId, existeEspecialidadPorId } = require('../helpers/db-validators');
const router = Router();

const { especialidadDoctorGet, especialidadDoctorPost, especialidadDoctorPut, especialidadDoctorDelete } = require('../controllers/especialidadDoctor');




// ---------

router.get('/', especialidadDoctorGet );

router.put('/:id', [
    // validarJWT,
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeEspecialidadPorId),
    validarCampos
] ,especialidadDoctorPut );

router.post('/', [
    // validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    //check('rol').custom(esRoleValido),
    validarCampos
] ,especialidadDoctorPost );

router.delete('/', [
    //validarJWT,
    //esAdminRole,
    //tieneRole('ADMIN_ROLE'),
    //check('id','No es un ID válido').isMongoId(),
    //check('id').custom(existeEspecialidadPorId),
    //validarCampos
] ,especialidadDoctorDelete );

//router.patch('/', usuariosPatch );





module.exports = router;

const { Router } = require('express');

const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole,tieneRole } = require('../middlewares/validar-roles');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

const { check } = require('express-validator');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const router = Router();

// ---------

router.get('/', usuariosGet );

router.put('/:id', [
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
] ,usuariosPut );

router.post('/', [
    check('correoUsuario','El correo no es valido').isEmail(),
    check('dniUsuario','Dni obligatorio'),
    check('nombreUsuario','Nombre obligatorio'),
    check('apellidoUsuario','Apellido obligatorio'),
    check('claveUsuario','Clave obligatoria'),
    //check('rol').custom(esRoleValido),
    validarCampos
] ,usuariosPost );

router.delete('/:id', [
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
] ,usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;
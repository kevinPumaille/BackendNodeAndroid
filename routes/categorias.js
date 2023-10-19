
const { Router } = require('express');


const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { esAdminRole,tieneRole } = require('../middlewares/validar-roles');

const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categoria');
const { existeCategoriaPorId } = require('../helpers/db-validators');

const router = Router();

//Obtener categorias
router.get('/', [
    validarJWT
] , obtenerCategorias);

// Obtener categoria por id
router.get('/:id', [
    check('id','No es un id de mongo').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
] ,obtenerCategoria);

// Crear categoria con TOKEN valido
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], actualizarCategoria);

router.delete('/:id',[
    validarJWT,
    tieneRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id','No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],borrarCategoria);


module.exports = router;
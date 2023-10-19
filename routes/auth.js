const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const {validarCampos} = require('../middlewares/validar-campos');

const router = Router();

router.post('/login', [
    check('dniUsuario','El DNI es obligatorio').not().isEmpty(),
    check('claveUsuario','La clave es obligatoria').not().isEmpty(),
    validarCampos
] , login);


module.exports = router;
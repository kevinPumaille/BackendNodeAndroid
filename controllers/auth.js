const { response, request } = require('express');
const Usuario = require('../models/usuario.model');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req ,res=response) => {

    const {dniUsuario,claveUsuario} = req.body;

    try{

        //Verificar si el dni existe
        const usuario  = await Usuario.findOne({dniUsuario});
        if(!usuario){
            return res.status(400).json({
                msg: 'Dni / clave no son correctos - DNI'
            });
        }

        //Si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Dni / clave no son correctos - estado:false'
            });
        }

        //Verificar la contraseña
        const validarClave = bcryptjs.compareSync(claveUsuario,usuario.claveUsuario);
        if(!validarClave){
            return res.status(400).json({
                msg: 'Dni / clave no son correctos - clave'
            });
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });

    }catch(e){

    }
}

module.exports = {
    login
}
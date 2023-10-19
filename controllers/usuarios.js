const { response, request } = require('express');
const Usuario = require('../models/usuario.model');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const usuariosGet = async (req = request, res = response) => {

    //const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;
    const {limite=5,desde=0} = req.query;
    const query = {estado:true};

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(desde)
        .limit(limite)
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async(req, res = response) => {    
    
    const {claveUsuario,correoUsuario} = req.body;
    const usuario = new Usuario(req.body);

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({correoUsuario});
    if(existeEmail){
        return res.status(400).json({
            msg:'Ese correo ya existe',
        });
    }

    //Escriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.claveUsuario = bcryptjs.hashSync(claveUsuario,salt);

    //Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const {_id,claveUsuario,correoUsuario,...resto} = req.body;

    //TODO validar contra BD
    if(claveUsuario){
        //Escriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.claveUsuario = bcryptjs.hashSync(claveUsuario,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.json({
        msg: 'put API - usuariosPut',
        usuario
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async (req, res = response) => {

    const {id} = req.params;

    //Fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndRemove(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});

    res.json({
        usuario
    });
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}
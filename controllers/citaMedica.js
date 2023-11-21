const { response, request } = require('express');
const CitaMedica = require('../models/citaMedica.model');

const obtenerCitaMedicaList = async (req, res=response) => {

    const {limite=5,desde=0} = req.query;
    const query = {estado:true};

    const [total, citaMedica] = await Promise.all([
        CitaMedica.countDocuments(query),
        CitaMedica.find(query)
//        .populate('especialidad','nombre')
        .skip(desde)
        .limit(limite)
    ]);

    res.json({
        total,
        citaMedica
    });
}

const obtenerCitaMedica = async (req, res=response) => {

    const {limite=5,desde=0,uid=""} = req.query;
    const query = {
        estado:true,
        usuario: uid
    };

    const [total, citaMedica] = await Promise.all([
        CitaMedica.countDocuments(query),
        CitaMedica.find(query)
//        .populate('especialidad','nombre')
        .skip(desde)
        .limit(limite)
    ]);

    res.json({
        total,
        citaMedica
    });
}

const crearCitaMedica = async(req, res=response) => {

    const citaMedica = new CitaMedica(req.body);

    await citaMedica.save();

    res.status(201).json({
        //usuario
        msg:'Cita Medica creado exitosamente',
        success: true
    });
}

module.exports = {
    obtenerCitaMedicaList,
    crearCitaMedica,
    obtenerCitaMedica
}
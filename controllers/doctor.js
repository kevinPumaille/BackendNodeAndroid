const { response, request } = require('express');
const FechaDispoEspec = require('../models/fechaDispoEspec.model');
const Doctor = require('../models/Doctor.model');

const obtenerDoctorList = async (req, res=response) => {

    const {limite=5,desde=0} = req.query;
    const query = {estado:true};

    const [total, categorias] = await Promise.all([
        Doctor.countDocuments(query),
        Doctor.find(query)
        .populate('especialidad','nombre')
        .skip(desde)
        .limit(limite)
    ]);

    res.json({
        total,
        categorias
    });
}

const crearDoctor = async(req, res=response) => {

    // const nombre = req.body.nombre.toUpperCase();

    // const categoriaDB = await Categoria.findOne({nombre});

    // if(categoriaDB){
    //     return res.status(400).json({
    //         msg: `La categoria ${categoriaDB.nombre}, ya existe`
    //     });
    // }

    //const fechaDispoEspec = req.body;

    // const data = {
    //     nombre,
    //     usuario: req.usuario._id
    // }

    const doctor = new Doctor(req.body);

    await doctor.save();

    res.status(201).json(doctor);
}

module.exports = {
    crearDoctor,
    obtenerDoctorList
}
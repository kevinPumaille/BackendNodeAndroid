const { response, request } = require('express');
const HorasDoctor = require('../models/HorasDoctor.model');

const obtenerHoraDoctorList = async(req, res=response) => {

    const {limite=30,desde=0} = req.query;
    const query = {estado:true};

    // const [total, categorias] = await Promise.all([
    //     DoctorFechaDispoEspec.countDocuments(query),
    //     DoctorFechaDispoEspec.find(query)
    //     .populate('doctor','nombre')
    //     .populate('fechaDispoEspec','mes dia anio especialidad')
    //     .skip(desde)
    //     .limit(limite)
    // ]);

    const [total, horasDoctor] = await Promise.all([
        HorasDoctor.countDocuments(query),
        HorasDoctor.find(query)
        // .populate('doctor','nombre')
        // .populate({
        //     path: 'fechaDispoEspec',
        //     select: 'mes dia anio',
        //     populate: {
        //     path: 'especialidad',
        //     select: 'nombre descripcion otroCampo'
        //     }
        // })
        .skip(desde)
        .limit(limite)
    ]);

    res.json({
        total,
        horasDoctor
    });
}

const crearHoraDoctor = async(req, res=response) => {

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

    const horasDoctor = new HorasDoctor(req.body);

    await horasDoctor.save();

    res.status(201).json(horasDoctor);
}

module.exports = {
    obtenerHoraDoctorList,
    crearHoraDoctor
}
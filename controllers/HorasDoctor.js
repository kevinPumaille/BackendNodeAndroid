const { response, request } = require('express');
const HorasDoctor = require('../models/HorasDoctor.model');

const obtenerHoraDoctorList = async(req, res=response) => {

    const {limite=30,desde=0} = req.query;
    const query = {estado:true};

    const [total, horasDoctor] = await Promise.all([
        HorasDoctor.countDocuments(query),
        HorasDoctor.find(query)

        .skip(desde)
        .limit(limite)
    ]);

    res.json({
        total,
        horasDoctor
    });
}

//Busqueda de hora de un doctor
const obtenerHoraDoctor = async(req, res=response) => {

    //const {doctorFechaDiEs} = req.body;

    const {limite=30,desde=0,uid=""} = req.query;
    const query = {
        estado:true,
        doctorFechaDiEs:uid
    };

    //const horasDoctor = await HorasDoctor.findOne({ nombre: especialidad });

    const [total, horasDoctor] = await Promise.all([
        HorasDoctor.countDocuments(query),
        HorasDoctor.find(query)
        .skip(desde)
        .limit(limite)
    ]);

    //const horas = horasDoctor.filter( hor => hor.doctorFechaDiEs == doctorFechaDiEs);
    //totalNuevo = horas.length;

    res.json({
        total,
        horasDoctor
    });
}

const crearHoraDoctor = async(req, res=response) => {

    const horasDoctor = new HorasDoctor(req.body);

    await horasDoctor.save();

    res.status(201).json(horasDoctor);
}

module.exports = {
    obtenerHoraDoctorList,
    crearHoraDoctor,
    obtenerHoraDoctor
}
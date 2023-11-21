const { response, request } = require('express');
const Doctor = require('../models/doctor.model');

const obtenerDoctorList = async (req, res=response) => {

    const {limite=5,desde=0} = req.query;
    const query = {estado:true};

    const [total, doctores] = await Promise.all([
        Doctor.countDocuments(query),
        Doctor.find(query)
        .populate('especialidad','nombre')
        .skip(desde)
        .limit(limite)
    ]);

    res.json({
        total,
        doctores
    });
}

const crearDoctor = async(req, res=response) => {

    const doctor = new Doctor(req.body);

    await doctor.save();

    res.status(201).json(doctor);
}

module.exports = {
    crearDoctor,
    obtenerDoctorList
}
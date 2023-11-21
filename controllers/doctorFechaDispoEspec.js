const { response, request } = require('express');
const DoctorFechaDispoEspec = require('../models/doctorFechaDispoEspec.model');
const EspecialidadDoctor = require('../models/especialidadDoctor.model');
const Doctor = require('../models/doctor.model');

const obtenerDoctorFechaDispoEspecList = async(req, res=response) => {

    const {limite=5,desde=0} = req.query;
    const query = {estado:true};

    // const [total, categorias] = await Promise.all([
    //     DoctorFechaDispoEspec.countDocuments(query),
    //     DoctorFechaDispoEspec.find(query)
    //     .populate('doctor','nombre')
    //     .populate('fechaDispoEspec','mes dia anio especialidad')
    //     .skip(desde)
    //     .limit(limite)
    // ]);

    const [total, doctorFechaDispoEspec] = await Promise.all([
        DoctorFechaDispoEspec.countDocuments(query),
        DoctorFechaDispoEspec.find(query)
        .populate({
            path: 'doctor',
            select: 'nombre',
                populate: {
                path: 'especialidad',
                select: 'nombre'
                }
        })
        .populate({
            path: 'fechaDispoEspec',
            select: 'mes dia anio',
            populate: {
            path: 'especialidad',
            select: 'nombre descripcion otroCampo'
            }
        })
        .skip(desde)
        .limit(limite)
    ]);

    res.json({
        total,
        doctorFechaDispoEspec
    });
}

/**
    Obtener doctores en la fecha X de la especialidad Y
 */
    const obtenerDoctorFechaDispoEspec = async (req, res=response) => {

        const { especialidadREQ, fechaDispoEspecREQ} = req.body;
    
    
        const especialidadQU = await EspecialidadDoctor.findOne({ nombre: especialidadREQ });
    
        if(!especialidadQU){
            return res.status(404).json({ error: 'Especialidad de medicina no encontrada.' });
        }
    
    
        const {limite=30,desde=0} = req.query;

        const query = {
            estado: true
        };

        const fechasDis = await DoctorFechaDispoEspec.find(query)
            .populate({
                path: 'doctor',
                select: 'nombre',
                    populate: {
                    path: 'especialidad',
                    select: 'nombre'
                    }
            })
            .populate({
                path: 'fechaDispoEspec',
                select: 'mes dia anio',
                populate: {
                    path: 'especialidad',
                    select: 'nombre descripcion'
                    }
            })
            .skip(desde)
            .limit(limite);

        const doctorFechaDispoEspec = fechasDis.filter( fechasDispo => fechasDispo.doctor.especialidad.nombre == especialidadREQ & fechasDispo.fechaDispoEspec._id == fechaDispoEspecREQ);
        const total = doctorFechaDispoEspec.length;

        res.json({
            total,
            doctorFechaDispoEspec,
        });
        
    }

const crearDoctorFechaDispoEspec = async(req, res=response) => {

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

    const doctorFechaDispoEspec = new DoctorFechaDispoEspec(req.body);

    await doctorFechaDispoEspec.save();

    res.status(201).json(doctorFechaDispoEspec);
}

module.exports = {
    crearDoctorFechaDispoEspec,
    obtenerDoctorFechaDispoEspecList,
    obtenerDoctorFechaDispoEspec
}
const { response, request } = require('express');
const FechaDispoEspec = require('../models/fechaDispoEspec.model');
const EspecialidadDoctor = require('../models/especialidadDoctor.model');

const obtenerFechaDispoEspecList = async (req, res=response) => {

    const {limite=30,desde=0} = req.query;
    const query = {estado:true};

    const [total, categorias] = await Promise.all([
        FechaDispoEspec.countDocuments(query),
        FechaDispoEspec.find(query)
        .populate('especialidad','nombre')
        .skip(desde)
        .limit(limite)
    ]);

    res.json({
        total,
        categorias
    });
}

//Obtener fecha disponible por especialidad:
//Parametros necesarios: mes - anio - especialidad
const obtenerFechaDispoEspec = async (req, res=response) => {

    const { mes = "", anio, especialidad = ""} = req.query;


    const especialidadMedicina = await EspecialidadDoctor.findOne({ nombre: especialidad });

    if(!especialidadMedicina){
        res.status(404).json({ error: 'Especialidad de medicina no encontrada.' });
    }


    const {limite=30,desde=0} = req.query;
    const query = {
        especialidad: especialidadMedicina._id, // Utiliza el _id de la especialidad.
        mes,
        anio
    };

    const [total, fechas] = await Promise.all([
        FechaDispoEspec.countDocuments(query),
        FechaDispoEspec.find(query)
        .populate('especialidad','nombre')
        .skip(desde)
        .limit(limite)
    ]);
  
    res.json({
        total,
        fechas
    });
    
}

const crearFechaDispoEspec = async(req, res=response) => {

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

    const fechaDispoEspec = new FechaDispoEspec(req.body);

    await fechaDispoEspec.save();

    res.status(201).json(fechaDispoEspec);
}

module.exports = {
    crearFechaDispoEspec,
    obtenerFechaDispoEspecList,
    obtenerFechaDispoEspec
}
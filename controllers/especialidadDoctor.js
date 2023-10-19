const { response, request } = require('express');
const EspecialidadDoctor = require('../models/especialidadDoctor.model');

const especialidadDoctorGet = async (req = request, res = response) => {

    //const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;
    //const {limite=5,desde=0} = req.query;
    const query = {estado:true};

    const [total, especialidadDoctor] = await Promise.all([
        EspecialidadDoctor.countDocuments(query),
        EspecialidadDoctor.find(query)
    ]);

    res.json({
        total,
        especialidadDoctor
    });
}

const especialidadDoctorPost = async(req, res = response) => {    
        
    const {nombre,dia,mes,anio} = req.body;
    

    // const especialidadDB = await EspecialidadDoctor.findOne({dia,mes});

    const [hayDia, hayMes] = await Promise.all([
        EspecialidadDoctor.findOne({mes,dia}),       
        EspecialidadDoctor.findOne({mes,dia})
    ]);

    console.log(hayDia);
    console.log(hayMes);

    if(hayDia && hayMes){
        return res.status(400).json({
            msg: `El mes y dia, ya existe`
        });
    }

    

    const data = {
        nombre,
        dia,
        mes,
        anio
    }

    const especialidadDoctor = new EspecialidadDoctor(data);

    await especialidadDoctor.save();

    res.status(201).json(especialidadDoctor);

}

const especialidadDoctorPut = async (req, res = response) => {

    const { id } = req.params;
    const {_id,estado,...resto} = req.body;

    //TODO validar contra BD
    // if(claveUsuario){
        //Escriptar la contraseña
    //     const salt = bcryptjs.genSaltSync();
    //     resto.claveUsuario = bcryptjs.hashSync(claveUsuario,salt);
    // }

    const especialidadDoctor = await EspecialidadDoctor.findByIdAndUpdate(id,resto);

    res.json({
        especialidadDoctor
    });
}

const especialidadDoctorDelete = async (req, res = response) => {

    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth() + 1;
    const anioActual = fechaActual.getFullYear();

    //?mes=04&anio=2023
    const {mes=mesActual,anio=anioActual} = req.query;

    const query = { mes, anio};
    const update = { estado: false };


    const especialidadDoctor = await EspecialidadDoctor.updateMany(query, update);

    res.json({
        especialidadDoctor
    });
}

module.exports = {
    especialidadDoctorGet,
    especialidadDoctorPost,
    especialidadDoctorPut,
    especialidadDoctorDelete
}
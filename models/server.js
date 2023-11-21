console.clear();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';
        //this.categorias = '/api/categorias';
        this.especialidadDoctor = '/api/especialidadDoctor';
        this.fechaDispoEspec = '/api/fechaDispoEspec';
        this.doctor = '/api/doctor';
        this.doctorFechaDispoEspec = '/api/doctorfechaDispoEspec';
        this.horasDoctor = '/api/horasDoctor';
        this.citaMedica = '/api/citaMedica';

        this.conectarDB();
        //Conectar a base de datos

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( this.authPath, require('../routes/auth'));
        this.app.use( this.usuariosPath, require('../routes/usuarios'));
        //this.app.use( this.categorias, require('../routes/categorias'));
        this.app.use( this.especialidadDoctor, require('../routes/especialidadDoctor'));
        this.app.use( this.fechaDispoEspec, require('../routes/fechaDispoEspec'));
        this.app.use( this.doctor, require('../routes/doctor'));
        this.app.use( this.doctorFechaDispoEspec, require('../routes/doctorFechaDispoEspec'));
        this.app.use( this.horasDoctor, require('../routes/horasDoctor'));
        this.app.use( this.citaMedica, require('../routes/citaMedica'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;

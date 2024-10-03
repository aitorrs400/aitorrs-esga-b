import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { dbConnection } from '../database/config.js';
import { archivosRoutes, authRoutes, gasolinerasRoutes, recibosRoutes, vehiculosRoutes } from '../routes/index.js';


class Server {

    constructor() {

        // Instanciamos el servidor
        this.app = express();
        this.port = process.env.PORT;
        this.authPath = '/api/auth';
        this.gasolinerasPath = '/api/gasolineras';
        this.vehiculosPath = '/api/vehiculos';
        this.recibosPath = '/api/recibos';
        this.archivosPath = '/api/archivos';

        // Nos conectamos a la base de datos
        this.conexionDB();

        // Definiciones de Middlewares
        this.middlewares();

        // Definiciones de rutas
        this.routes();

    }

    async conexionDB() {
        await dbConnection();
    }

    middlewares() {

        // Uso de CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );
        
    }

    routes() {

        // Configuramos las rutas del servidor
        this.app.use( this.authPath, authRoutes );
        this.app.use( this.gasolinerasPath, gasolinerasRoutes );
        this.app.use( this.vehiculosPath, vehiculosRoutes );
        this.app.use( this.recibosPath, recibosRoutes );
        this.app.use( this.archivosPath, archivosRoutes );

        // Preparamos variables para el directorio
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

        // Obtener el directorio padre del directorio actual
        const parentDir = join(__dirname, '..');

        // Servimos la aplicación de React
        this.app.use( express.static(parentDir + '/public') );

        // Configuramos ruta para el Front-End
        this.app.get('*', (req, res) => {
            res.sendFile( parentDir + '/public/index.html');
        });

    }

    listen() {

        // Empezamos a escuchar
        this.app.listen( this.port, () => {
            console.log( 'Servidor iniciado en el puerto: ' + this.port );
        });

    }

}

export default Server;

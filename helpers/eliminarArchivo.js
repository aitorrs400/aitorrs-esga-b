import Recibo from '../models/Recibo.js';
import Vehiculo from '../models/Vehiculo.js';
import { v2 as cloudinary } from 'cloudinary';


export const eliminarArchivoVehículo = async (id) => {

    // Configuramos cloudinary     
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET
    });

    try {

        // Buscamos el vehículo en la base de datos por el ID
        const vehiculo = await Vehiculo.findById(id);

        // Obtenemos el ID de la imagen para cloudinary
        const { fotoID } = vehiculo;

        // El el caso de tener ID de archivo, lo eliminamos
        if ( fotoID !== '' ) {

            // Llamamos a cloudinary para eliminarla
            await cloudinary.uploader.destroy(fotoID);

        }

        // Borramos los campos de la foto en BD
        await Vehiculo.findByIdAndUpdate(id, { fotoURL: '', fotoID: '' });

        // Devolvemos el resultado
        return ({ result: false, error: null });

    } catch ( error ) {
        return ({ result: true, error });
    }

}

export const eliminarArchivoRecibo = async (id) => {

    // Configuramos cloudinary     
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET
    });

    try {

        // Buscamos el vehículo en la base de datos por el ID
        const recibo = await Recibo.findById(id);

        // Obtenemos el ID de la imagen para cloudinary
        const { fotoID } = recibo;

        // El el caso de tener ID de archivo, lo eliminamos
        if ( fotoID !== '' ) {

            // Llamamos a cloudinary para eliminarla
            await cloudinary.uploader.destroy(fotoID);
            
        }

        // Borramos los campos de la foto en BD
        await Recibo.findByIdAndUpdate(id, { fotoURL: '', fotoID: '' });

        // Devolvemos el resultado
        return ({ result: false, error: null });

    } catch ( error ) {
        return ({ result: true, error });
    }

}

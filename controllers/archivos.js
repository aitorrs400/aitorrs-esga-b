import { response, request } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import Vehiculo from '../models/Vehiculo.js';
import { eliminarArchivoRecibo, eliminarArchivoVehículo } from '../helpers/eliminarArchivo.js';
import Recibo from '../models/Recibo.js';


export const subirFotoVehiculo = async (req = request, res = response) => {

    // Configuramos cloudinary     
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET
    });

    // Si no tenemos un archivo en el cuerpo, devolvemos error
    if( !req.file ) {
        return res.status(400).json({ errors: [
            {
                msg: 'Usuario y/o contraseña incorrectos'
            }
        ]});
    }

    // Obtenemos los datos necesarios del archivo
    const { mimetype, buffer } = req.file;
    const { id } = req.params;

    // Codificamos el archivo a base64
    const encoded = `data:${ mimetype };base64,${ buffer.toString('base64') }`;

    try {

        // Hacemos la subida a cloudinary
        const result = await cloudinary.uploader.upload(encoded, { folder: 'aitorrs_esga/vehiculos' });

        // Obtenemos los datos necesarios de la respuesta
        const { public_id, secure_url } = result;

        // Asignar ID y URL imagen a objeto en mongo
        const vehiculo = await Vehiculo.findByIdAndUpdate(id, { fotoURL: secure_url, fotoID: public_id });

        // Devolvemos el resultado
        return res.status(200).json({ msg: 'OK', data: vehiculo, url: secure_url, id: public_id });

    } catch ( error ) {
        return res.status(500).json({ error });
    }

}

export const eliminarFotoVehiculo = async (req = request, res = response) => {

    // Obtenemos el ID del vehiculo
    const { id } = req.params;

    // LLamamos el helper para eliminarlo
    const result = await eliminarArchivoVehículo(id);

    if ( result.result ) {
        return res.status(500).json( result.error );
    } else {
        return res.status(200).json({ msg: 'OK' });
    }

}

export const subirFotoRecibo = async (req = request, res = response) => {

    // Configuramos cloudinary     
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET
    });

    // Si no tenemos un archivo en el cuerpo, devolvemos error
    if( !req.file ) {
        return res.status(400).json({ errors: [
            {
                msg: 'Usuario y/o contraseña incorrectos'
            }
        ]});
    }

    // Obtenemos los datos necesarios del archivo
    const { mimetype, buffer } = req.file;
    const { id } = req.params;

    // Codificamos el archivo a base64
    const encoded = `data:${ mimetype };base64,${ buffer.toString('base64') }`;

    try {

        // Hacemos la subida a cloudinary
        const result = await cloudinary.uploader.upload(encoded, { folder: 'aitorrs_esga/recibos' });

        // Obtenemos los datos necesarios de la respuesta
        const { public_id, secure_url } = result;

        // Asignar ID y URL imagen a objeto en mongo
        const recibo = await Recibo.findByIdAndUpdate(id, { fotoURL: secure_url, fotoID: public_id });

        // Devolvemos el resultado
        return res.status(200).json({ msg: 'OK', data: recibo, url: secure_url, id: public_id });

    } catch ( error ) {
        return res.status(500).json({ error });
    }

}

export const eliminarFotoRecibo = async (req = request, res = response) => {

    // Obtenemos el ID del vehiculo
    const { id } = req.params;

    // LLamamos el helper para eliminarlo
    const result = await eliminarArchivoRecibo(id);

    if ( result.result ) {
        return res.status(500).json( result.error );
    } else {
        return res.status(200).json({ msg: 'OK' });
    }

}

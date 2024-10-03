import { response, request } from 'express';
import Recibo from '../models/Recibo.js';
import { eliminarArchivoRecibo } from '../helpers/eliminarArchivo.js';


export const recibosGet = async (req = request, res = response) => {

    // Obtenemos el total de recibos
    const [ total, recibos ] = await Promise.all([
        Recibo.countDocuments(),
        Recibo.find()
    ]);

    // Devolvemos el resultado
    res.json({
        uid: req.uid,
        total,
        recibos
    });

}

export const recibosIDGet = async (req = request, res = response) => {

    try {

        // Obtenemos el ID de la URL
        const id = req.params.id;
    
        // Buscamos el recibo en la base de datos por el ID
        const recibo = await Recibo.findById(id);
    
        // Si no encontramos ningún recibo con ese ID, devolvemos un mensaje de error
        if ( !recibo ) {
            return res.status(404).json({ data: [], mensaje: 'Registro no encontrado' });
        }
    
        // Si encontramos el recibo, lo devolvemos como respuesta
        res.json({ data: recibo, mensaje: 'Registro obtenido correctamente' });

    } catch (error) {

        // Si ocurre algún error, devuelve un mensaje de error y el código de estado 500 (Error del servidor)
        res.status(500).json({ data: [], mensaje: 'Error del servidor', error });

    }

}

export const recibosPost = async (req = request, res = response) => {

    // Obtenemos los datos del recibo
    const { codigo, precioE, litros, precioEL, carburante, fecha, gasolinera, vehiculo } = req.body;

    // Creamos una nueva instancia de Recibo con los datos del cuerpo de la petición
    const recibo = new Recibo({
      codigo,
      precioE,
      litros,
      precioEL,
      carburante,
      fecha,
      gasolinera,
      vehiculo,
      fotoURL: '',
      fotoID: ''
    });

    // Guardamos el nuevo recibo en la base de datos
    await recibo.save();

    // Devolvemos el vehículo conforme se ha creado
    res.status(201).json( recibo );

}

export const recibosPut = async (req = request, res = response) => {

    // Obtenemos el ID del recibo
    const { id } = req.params;

    // Obtenemos los datos del recibo
    const { codigo, precioE, litros, precioEL, carburante, fecha, gasolinera, vehiculo } = req.body;

    // Actualizamos el recibo
    const recibo = await Recibo.findByIdAndUpdate( id, { codigo, precioE, litros, precioEL, carburante, fecha, gasolinera, vehiculo });

    // Devolvemos el vehículo conforme se ha creado
    res.status(201).json({ mensaje: 'Actualizado correctamente', data: recibo });

}

export const recibosDelete = async (req = request, res = response) => {

    // Obtenemos el ID del recibo
    const { id } = req.params;

    try {

        // Llamamos el helper para borrar imagen asociada
        const result = await eliminarArchivoRecibo(id);

        if ( result.result ) {

            // Si ha habido algún error, devolvemos error 500
            res.status(500).json( result.error );

        } else {

            // Eliminamos el recibo
            const recibo = await Recibo.deleteOne({ _id: id });

            // Devolvemos el resultado
            res.status(200).json( recibo );

        }

    } catch (error) {

        // Si ha habido algún error, devolvemos error 500
        res.status(500).json( error );

    }

}

import { response, request } from 'express';
import Gasolinera from '../models/Gasolinera.js';


export const gasolinerasGet = async (req = request, res = response) => {

    // Obtenemos el total de gasolineras
    const [ total, gasolineras ] = await Promise.all([
        Gasolinera.countDocuments(),
        Gasolinera.find()
    ]);

    // Devolvemos el resultado
    res.json({
        total,
        gasolineras
    });

}

export const gasolinerasIDGet = async (req = request, res = response) => {

    try {

        // Obtenemos el ID de la URL
        const id = req.params.id;
    
        // Buscamos la gasolinera en la base de datos por el ID
        const gasolinera = await Gasolinera.findById(id);
    
        // Si no encontramos ningún registro con ese ID, devolvemos un mensaje de error
        if ( !gasolinera ) {
            return res.status(404).json({ data: [], mensaje: 'Registro no encontrado' });
        }
    
        // Si encontramos el registro, lo devolvemos como respuesta
        res.json({ data: gasolinera, mensaje: 'Registro obtenido correctamente' });

    } catch (error) {

        // Si ocurre algún error, devuelve un mensaje de error y el código de estado 500 (Error del servidor)
        res.status(500).json({ data: [], mensaje: 'Error del servidor', error });

    }

}

export const gasolinerasPost = async (req = request, res = response) => {

    // Obtenemos los datos de la gasolinera
    const { nombre, direccion, numero, localidad, cp, provincia, pais } = req.body;

    // Creamos una nueva instancia de Gasolinera con los datos del cuerpo de la petición
    const gasolinera = new Gasolinera({
      nombre,
      direccion,
      numero,
      localidad,
      cp,
      provincia,
      pais
    });

    // Guardamos la nueva gasolinera en la base de datos
    await gasolinera.save();

    // Devolvemos la gasolinera conforme se ha creado
    res.status(201).json( gasolinera );

}

export const gasolinerasPut = async (req = request, res = response) => {

    // Obtenemos el ID de la gasolinera
    const { id } = req.params;

    // Obtenemos los datos de la gasolinera
    const { nombre, direccion, numero, localidad, cp, provincia, pais } = req.body;

    // Actualizamos el registro
    const gasolinera = await Gasolinera.findByIdAndUpdate( id, { nombre, direccion, numero, localidad, cp, provincia, pais });

    // Devolvemos la gasolinera conforme se ha creado
    res.status(201).json({ mensaje: 'Actualizado correctamente', data: gasolinera });

}

export const gasolinerasDelete = async (req = request, res = response) => {

    // Obtenemos el ID de la gasolinera
    const { id } = req.params;

    // Eliminamos el registro
    const gasolinera = await Gasolinera.deleteOne({ _id: id });

    // Devolvemos el resultado
    res.status(200).json( gasolinera );

}

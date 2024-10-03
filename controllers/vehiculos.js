import { response, request } from 'express';
import Vehiculo from '../models/Vehiculo.js';
import { eliminarArchivoVehículo } from '../helpers/eliminarArchivo.js';


export const vehiculosGet = async (req = request, res = response) => {

    // Obtenemos el total de vehículos
    const [ total, vehiculos ] = await Promise.all([
        Vehiculo.countDocuments(),
        Vehiculo.find()
    ]);

    // Devolvemos el resultado
    res.json({
        uid: req.uid,
        total,
        vehiculos
    });

}

export const vehiculosIDGet = async (req = request, res = response) => {

    try {

        // Obtenemos el ID de la URL
        const id = req.params.id;
    
        // Buscamos el vehículo en la base de datos por el ID
        const vehiculo = await Vehiculo.findById(id);
    
        // Si no encontramos ningún vehículo con ese ID, devolvemos un mensaje de error
        if ( !vehiculo ) {
            return res.status(404).json({ data: [], mensaje: 'Registro no encontrado' });
        }
    
        // Si encontramos el vehículo, lo devolvemos como respuesta
        res.json({ data: vehiculo, mensaje: 'Registro obtenido correctamente' });

    } catch (error) {

        // Si ocurre algún error, devuelve un mensaje de error y el código de estado 500 (Error del servidor)
        res.status(500).json({ data: [], mensaje: 'Error del servidor', error });

    }

}

export const vehiculosPost = async (req = request, res = response) => {

    // Obtenemos los datos del vehículo
    const { nombre, marca, modelo, ano, matricula } = req.body;

    // Creamos una nueva instancia de Vehiculo con los datos del cuerpo de la petición
    const vehiculo = new Vehiculo({
      nombre,
      marca,
      modelo,
      ano,
      matricula,
      fotoURL: '',
      fotoID: ''
    });

    // Guardamos el nuevo vehículo en la base de datos
    await vehiculo.save();

    // Devolvemos el vehículo conforme se ha creado
    res.status(201).json( vehiculo );

}

export const vehiculosPut = async (req = request, res = response) => {

    // Obtenemos el ID del vehiculo
    const { id } = req.params;

    // Obtenemos los datos del vehiculo
    const { nombre, marca, modelo, ano, matricula } = req.body;

    // Actualizamos el vehículo
    const vehiculo = await Vehiculo.findByIdAndUpdate( id, { nombre, marca, modelo, ano, matricula });

    // Devolvemos el vehículo conforme se ha creado
    res.status(201).json({ mensaje: 'Actualizado correctamente', data: vehiculo });

}

export const vehiculosDelete = async (req = request, res = response) => {

    // Obtenemos el ID del vehículo
    const { id } = req.params;

    try {

        // Llamamos el helper para borrar imagen asociada
        const result = await eliminarArchivoVehículo(id);

        if ( result.result ) {

            // Si ha habido algún error, devolvemos error 500
            res.status(500).json( result.error );

        } else {

            // Eliminamos el vehículo
            const vehiculo = await Vehiculo.deleteOne({ _id: id });

            // Devolvemos el resultado
            res.status(200).json( vehiculo );

        }

    } catch (error) {

        // Si ha habido algún error, devolvemos error 500
        res.status(500).json( error );

    }

}

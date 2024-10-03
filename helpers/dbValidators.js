import Gasolinera from "../models/Gasolinera.js";
import Recibo from "../models/Recibo.js";
import Vehiculo from "../models/Vehiculo.js";


export const existeGasolineraPorId = async ( id ) => {

    // Verificamos si el correo existe
    const existeGasolinera = await Gasolinera.findById(id);

    if( !existeGasolinera ) {
        throw new Error(`El ID de gasolinera no existe: ${ id }`);
    }

}

export const existeVehiculoPorId = async ( id ) => {

    // Verificamos si el correo existe
    const existeVehiculo = await Vehiculo.findById(id);

    if( !existeVehiculo ) {
        throw new Error(`El ID de vehículo no existe: ${ id }`);
    }

}

export const existeReciboPorId = async ( id ) => {

    // Verificamos si el correo existe
    const existeRecibo = await Recibo.findById(id);

    if( !existeRecibo ) {
        throw new Error(`El ID de recibo no existe: ${ id }`);
    }

}

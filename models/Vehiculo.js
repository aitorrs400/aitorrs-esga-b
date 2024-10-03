import { Schema, model } from 'mongoose';


const VehiculoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del vehículo es obligatorio']
    },
    marca: {
        type: String,
        required: [true, 'La marca del vehículo es obligatoria']
    },
    modelo: {
        type: String,
        required: [true, 'El modelo del vehículo es obligatorio']
    },
    ano: {
        type: String
    },
    matricula: {
        type: String,
        required: [true, 'La matrícula del vehículo es obligatoria']
    },
    fotoURL: {
        type: String
    },
    fotoID: {
        type: String
    }
});

VehiculoSchema.methods.toJSON = function() {

    const { __v, _id, ...gasolinera } = this.toObject();
    return { id: _id, ...gasolinera };

}

export default model('Vehiculo', VehiculoSchema);

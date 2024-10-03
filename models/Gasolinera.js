import { Schema, model } from 'mongoose';


const GasolineraSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la gasolinera es obligatorio']
    },
    direccion: {
        type: String,
        required: [true, 'La dirección de la gasolinera es obligatoria']
    },
    numero: {
        type: String,
        required: [true, 'El número de la gasolinera es obligatorio']
    },
    localidad: {
        type: String,
        required: [true, 'La localidad de la gasolinera es obligatoria']
    },
    cp: {
        type: String,
        required: [true, 'El código postal de la gasolinera es obligatorio']
    },
    provincia: {
        type: String,
        required: [true, 'La provincia de la gasolinera es obligatoria']
    },
    pais: {
        type: String,
        required: [true, 'El país de la gasolinera es obligatorio']
    },
    coordenadas: {
        type: Schema.Types.Mixed,
        required: [true, 'Las coordenadas de la gasolinera son obligatorias']
    }
});

GasolineraSchema.methods.toJSON = function() {

    const { __v, _id, ...gasolinera } = this.toObject();
    return { id: _id, ...gasolinera };

}

export default model('Gasolinera', GasolineraSchema);

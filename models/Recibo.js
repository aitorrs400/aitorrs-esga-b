import mongoose, { Types, Schema, model } from 'mongoose';


const ReciboSchema = new Schema({
    codigo: {
        type: String,
        required: [true, 'El código del recibo es obligatorio']
    },
    precioE: {
        type: Types.Decimal128,
        required: [true, 'El precio en euros del recibo es obligatorio']
    },
    litros: {
        type: Types.Decimal128,
        required: [true, 'Los litros del recibo son obligatorios']
    },
    precioEL: {
        type: Types.Decimal128,
        required: [true, 'El precio por litro del recibo es obligatorio']
    },
    carburante: {
        type: Number,
        required: [true, 'El carburante del recibo es obligatorio']
    },
    fecha: {
        type: String,
        required: [true, 'La fecha del recibo es obligatoria']
    },
    gasolinera: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'El identificador de la gasolinera es obligatorio']
    },
    vehiculo: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'El identificador del vehículo es obligatorio']
    },
    fotoURL: {
        type: String
    },
    fotoID: {
        type: String
    }
});

ReciboSchema.methods.toJSON = function() {

    const { __v, _id, ...recibo } = this.toObject();
    return { id: _id, ...recibo };

}

export default model('Recibo', ReciboSchema);

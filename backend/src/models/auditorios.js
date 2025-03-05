import mongoose from "mongoose";


const auditorioSchema = new mongoose.Schema({

    codigo: {
        type: String,
        default: true,
        trim: true,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    capacidad: {
        type: Number,
        required: true,
    },
    ubicacion: {
        type: String,
        required: true,
        trim: true
    },
}, { timestamps: true 

});


export default mongoose.model('Auditorio', auditorioSchema);

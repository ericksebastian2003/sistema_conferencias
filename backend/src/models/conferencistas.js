import mongoose from "mongoose";

const conferencistaSchema = new mongoose.Schema({
    cedula: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    ciudad: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    telefono: {
        type: String,
        trim: true
    },
    direccion: {
        type: String,
        trim: true
    },
    fechaNacimiento: {
        type: Date,
        trim: true
    },
    genero: {
        type: String,
        trim: true
    },
    empresa: { 
        type: String,
        trim: true
    },
    

}, { timestamps: true });

export default mongoose.model('Conferencista', conferencistaSchema);
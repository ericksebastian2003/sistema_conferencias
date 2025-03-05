import mongoose from "mongoose";

const reservaSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true
    },
    descripcion: {  
        type: String,
        trim: true
    },
    conferencista: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conferencista',
        required: true
    },
    auditorio: [{
        auditorio: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Auditorio',
            required: true
        },
    }]
}, {
    timestamps: true
});

export default mongoose.model('Reserva', reservaSchema);
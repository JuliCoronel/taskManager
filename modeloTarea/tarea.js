import mongoose from 'mongoose';

const tareaEsquema = new mongoose.Schema({
    titulo: { type: String, required: true},
    descripcion: {type: String},
    completada: { type: Boolean, default: false},
    creada: {type: Date, default: Date.now}
})

export default mongoose.model('Tareas', tareaEsquema);
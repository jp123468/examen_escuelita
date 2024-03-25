import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const matriculaSchema = new Schema({
    estudiante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estudiante'
    },
    materia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Materias'
    }
});

export default model('Matricula', matriculaSchema);

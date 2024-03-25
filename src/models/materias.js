import {Schema, model} from 'mongoose'
import { response } from 'express'

const materiaSchema = new Schema({
    codigo:{
        type:String,
        require:true,
        trim:true
    },
    nombre: {
        type: String, 
        required:true,
        trim: true
    },
    creditos:{
        type:Number,
        require:true,
        trim:true,
    }   
})


export default model('Materias',materiaSchema)
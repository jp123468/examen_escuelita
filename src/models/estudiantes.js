import {Schema, model} from 'mongoose'
import bcrypt from "bcryptjs"
import { response } from 'express'

const estudianteSchema = new Schema({
    nombre:{
        type:String,
        require:true,
        trim:true
    },
    apellido: {
        type: String, 
        required:true,
        trim: true
    },
    cedula:{
        type:Number,
        require:true,
        trim:true,
    },
    fecha_de_nacimiento:{
        type:Date,
        required:true,
        trim:true,
    },
    ciudad:{
        type: String,
        require: true,
        trim: true
    },
    direccion:{
        type: String,
        require: true,
        trim: true
    },
    email:{
        type:String,
        require:true,
        trim:true,
		unique:true
    },
    telefono:{
        type:Int8Array,
        require:true
    },
    status:{
        type:Boolean,
        default:true
    },
})


export default model('Estudiante',estudianteSchema)
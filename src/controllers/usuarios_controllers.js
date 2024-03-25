import Usuario from "../models/usuarios.js"
import mongoose from "mongoose";


const login = async(req,res)=>{
    const {email,password} = req.body
    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const usuarioBDD = await Usuario.findOne({email})
    if(!usuarioBDD) return res.status(404).json({msg:"Lo sentimos, el usuario no se encuentra registrado"})
    const verificarPassword = await usuarioBDD.matchPassword(password)
    if(!verificarPassword) return res.status(404).json({msg:"Lo sentimos, el password no es el correcto"})
		const {nombre,apellido,direccion,telefono,_id} = usuarioBDD
    res.status(200).json({
        nombre,
        apellido,
        _id
    })
}

export {
    login,
}



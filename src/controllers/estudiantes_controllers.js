// IMPORTAR EL MODELO
import Estudiante from "../models/estudiantes.js"
//import Tratamiento from "../models/Tratamiento.js"
import mongoose from "mongoose"


// Método para ver el perfil 
const perfilEstudiante =(req,res)=>{
    delete req.estudianteBDD.ingreso
    delete req.estudianteBDD.sintomas
    delete req.estudianteBDD.salida
    delete req.estudianteBDD.estado
    delete req.estudianteBDD.veterinario
    delete req.estudianteBDD.createdAt
    delete req.estudianteBDD.updatedAt
    delete req.estudianteBDD.__v
    res.status(200).json(req.estudianteBDD)
}

// Método para listar todos los pacientes
const listarPacientes = async (req,res)=>{
    if (req.pacienteBDD && "propietario" in req.pacienteBDD){
        const pacientes = await Paciente.find(req.pacienteBDD._id).select("-salida -createdAt -updatedAt -__v").populate('veterinario','_id nombre apellido')
        res.status(200).json(pacientes)
    }
    else{
    // Obtener todos los pacientes que se enceuntren activos
    // Que sean solo los del paciente que inicie sesión
    // Quitar campos no necesarios 
    // Mostrar campos de documentos relacionados
    const pacientes = await Paciente.find({estado:true}).where('veterinario').equals(req.veterinarioBDD).select("-salida -createdAt -updatedAt -__v").populate('veterinario','_id nombre apellido')
    // Respuesta 
    res.status(200).json(pacientes)
    }
}



// Método para ver el detalle de un paciente en particular
const detallePaciente = async(req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe el veterinario ${id}`});
    const paciente = await Paciente.findById(id).select("-createdAt -updatedAt -__v").populate('veterinario','_id nombre apellido')
    const tratamientos = await Tratamiento.find({estado:true}).where('paciente').equals(id)
    res.status(200).json({
        paciente,
        tratamientos
    })
}






// Método para registrar un paciente
const registrarPaciente = async(req,res)=>{

    // desestructurar el email
    const {email} = req.body


    //  Validar todos los camposs
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    
    
    // Obtener el usuario en base al email
    const verificarEmailBDD = await Paciente.findOne({email})


    // Verificar si el paciente ya se encuentra registrado
    if(verificarEmailBDD) return res.status(400).json({msg:"Lo sentimos, el email ya se encuentra registrado"})



    

    // Crear una instancia del Paciente
    const nuevoPaciente = new Paciente(req.body)


    // Crear un password
    const password = Math.random().toString(36).slice(2)


    // Encriptar el password
    nuevoPaciente.password = await nuevoPaciente.encrypPassword("vet"+password)


    // Enviar el correo electrónico
    await sendMailToPaciente(email,"vet"+password)


    // Asociar el paciente con el veterinario
    nuevoPaciente.veterinario=req.veterinarioBDD._id


    // Guardar en BDD
    await nuevoPaciente.save()

    // Presentar resultados
    res.status(200).json({msg:"Registro exitoso del paciente y correo enviado"})
}




// Método para actualizar un paciente
const actualizarPaciente = async(req,res)=>{
    const {id} = req.params

    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})

    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe el veterinario ${id}`});

    await Paciente.findByIdAndUpdate(req.params.id,req.body)

    res.status(200).json({msg:"Actualización exitosa del paciente"})
}







// Método para eliminar(dar de baja) un paciente
const eliminarPaciente = async (req,res)=>{
    const {id} = req.params

    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})

    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe el veterinario ${id}`})

    const {salida} = req.body

    await Paciente.findByIdAndUpdate(req.params.id,{salida:Date.parse(salida),estado:false})
    
    res.status(200).json({msg:"Fecha de salida del paciente registrado exitosamente"})
}






export {
		loginPaciente,
		perfilPaciente,
        listarPacientes,
        detallePaciente,
        registrarPaciente,
        actualizarPaciente,
        eliminarPaciente
}
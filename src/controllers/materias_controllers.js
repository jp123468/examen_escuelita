import Materias from "../models/materias.js"
import mongoose from "mongoose"


// Método para listar todos los Materias
const listarMaterias = async (req, res) => {
    try {
        const materias = await Materias.find().select("-salida -createdAt -updatedAt -__v")
        res.status(200).json(materias);
    } catch (error) {
        console.error("Error al obtener la lista de las materias:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

const registroMaterias = async (req, res) => {
    try {
        const { codigo, nombre, credito} = req.body;
        // Verificar campos requeridos
        if (!codigo || !nombre || !credito ) {
            return res.status(400).json({ msg: "Todos los campos son obligatorios" });
        }
        // Verificar si la codigo ya existe
        const codigoExistente = await Materias.findOne({ codigo });
        if (codigoExistente) {
            return res.status(400).json({ msg: "El código de esa materia ya está registrada" });
        }
        // Verificar si el correo electrónico ya existe
        const nombreExistente = await Materias.findOne({ nombre });
        if (nombreExistente) {
            return res.status(400).json({ msg: "El nombre ya está registrado" });
        }
        // Crear un nuevo materia con los datos proporcionados
        const nuevaMateria = new Materias({
            codigo,
            nombre,
            creditos,
        });
        // Guardar el estudiante en la base de datos
        await nuevaMateria.save();
        res.status(200).json({ msg: "Registro exitoso de la materia" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al registrar la materia" });
    }
};



// Método para actualizar una Materia
const actualizarMaterias = async(req,res)=>{

    const {id} = req.params
try{
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})

    await Materias.findByIdAndUpdate(req.params.id,req.body)

    res.status(200).json({msg:"Actualización exitosa de la Materia"})
}
catch(error) {
    console.error(error);
    res.status(500).json({msg:"No se pudo actulizar los datos de la Materia"})
}

}

const eliminarMaterias = async (req, res) => {
    try {
        const materiaId = req.params.id; // Obtener el ID del estudiante de los parámetros de la URL
        // Verificar si el ID del estudiante es válido
        if (!materiaId) {
            return res.status(400).json({ msg: "ID de materia no proporcionado" });
        }
        // Verificar si el estudiante existe en la base de datos
        const materia = await Materias.findById(materiaId);
        if (!materia) {
            return res.status(404).json({ msg: "Materia no encontrado" });
        }
        // Eliminar el estudiante de la base de datos
        await materia.remove();
        res.status(200).json({ msg: "Materia eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar la Materia" });
    }
};

export {
        listarMaterias,
        registroMaterias,
        actualizarMaterias,
        eliminarMaterias
}
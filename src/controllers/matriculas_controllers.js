import Matricula from "../models/matriculas.js"
import mongoose from "mongoose"


// Método para listar todos los Matriculas
const listarMatriculas = async (req, res) => {
    try {
        const matriculas = await Matricula.find().select("-salida -createdAt -updatedAt -__v")
        res.status(200).json(matriculas);
    } catch (error) {
        console.error("Error al obtener la lista de las matriculas:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

const registroMatriculas = async (req, res) => {
    try {
        const { estudianteId, materiaId } = req.body;
        // Verificar campos requeridos
        if (!estudianteId || !materiaId) {
            return res.status(400).json({ msg: "Todos los campos son obligatorios" });
        }
        // Crear un nuevo registro de matrícula con los datos proporcionados
        const nuevaMatricula = new Matricula({
            estudiante: estudianteId,
            materia: materiaId
        });
        // Guardar el registro de matrícula en la base de datos
        await nuevaMatricula.save();
        res.status(200).json({ msg: "Registro exitoso de la matrícula" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al registrar la matrícula" });
    }
};




// Método para actualizar una Mtricula
const actualizarMatriculas = async(req,res)=>{
    const {id} = req.params
try{
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})

    await Matricula.findByIdAndUpdate(req.params.id,req.body)

    res.status(200).json({msg:"Actualización exitosa de la Matricula"})
}
catch(error) {
    console.error(error);
    res.status(500).json({msg:"No se pudo actulizar los datos de la Mtricula del estudiante"})
}

}

const eliminarMatriculas = async (req, res) => {
    try {
        const matriculaId = req.params.id; // Obtener el ID del estudiante de los parámetros de la URL
        // Verificar si el ID del estudiante es válido
        if (!matriculaId) {
            return res.status(400).json({ msg: "ID de matricula no proporcionado" });
        }
        // Verificar si el estudiante existe en la base de datos
        const matricula = await Matricula.findById(matriculaId);
        if (!matricula) {
            return res.status(404).json({ msg: "Matricula no encontrado" });
        }
        // Eliminar el estudiante de la base de datos
        await matricula.remove();
        res.status(200).json({ msg: "Matricula eliminada correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar la Matricula" });
    }
};

export {
        listarMatriculas,
        registroMatriculas,
        actualizarMatriculas,
        eliminarMatriculas
}
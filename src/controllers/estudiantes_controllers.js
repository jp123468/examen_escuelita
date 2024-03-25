// IMPORTAR EL MODELO
import Estudiante from "../models/estudiantes.js"
import mongoose from "mongoose"

// Método para listar todos los Estudiantes
const listarEstudiantes = async (req, res) => {
    try {
        const estudiantes = await Estudiante.find().select("-salida -createdAt -updatedAt -__v")
        res.status(200).json(estudiantes);
    } catch (error) {
        console.error("Error al obtener la lista de estudiantes:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

const registroEstudiantes = async (req, res) => {
    try {
        const { nombre, apellido, cedula, fecha_de_nacimiento, ciudad, direccion, email, telefono } = req.body;
        // Verificar campos requeridos
        if (!nombre || !apellido || !cedula || !fecha_de_nacimiento || !ciudad || !direccion || !email || !telefono) {
            return res.status(400).json({ msg: "Todos los campos son obligatorios" });
        }
        // Verificar si la cédula ya existe
        const cedulaExistente = await Estudiante.findOne({ cedula });
        if (cedulaExistente) {
            return res.status(400).json({ msg: "La cédula ya está registrada" });
        }
        // Verificar si el correo electrónico ya existe
        const correoExistente = await Estudiante.findOne({ email });
        if (correoExistente) {
            return res.status(400).json({ msg: "El correo electrónico ya está registrado" });
        }
        /*// Convertir la fecha de nacimiento a formato ISODate sin la parte de la hora
        const fechaNacimientoSinHora = new Date(fecha_de_nacimiento).toISOString().split('T')[0];*/
        // Crear un nuevo estudiante con los datos proporcionados
        const nuevoEstudiante = new Estudiante({
            nombre,
            apellido,
            cedula,
            ciudad,
            direccion,
            email,
            telefono
        });
        // Guardar el estudiante en la base de datos
        await nuevoEstudiante.save();
        res.status(200).json({ msg: "Registro exitoso del estudiante" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al registrar el estudiante" });
    }
};



// Método para actualizar un paciente
const actualizarEstudiantes = async(req,res)=>{

    const {id} = req.params
try{
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})

    await Estudiante.findByIdAndUpdate(req.params.id,req.body)

    res.status(200).json({msg:"Actualización exitosa del estudiante"})
}
catch(error) {
    console.error(error);
    res.status(500).json({msg:"No se pudo actulizar los datos del estudiante"})
}

}

const eliminarEstudiantes = async (req, res) => {
    try {
        const estudianteId = req.params.id; // Obtener el ID del estudiante de los parámetros de la URL
        // Verificar si el ID del estudiante es válido
        if (!estudianteId) {
            return res.status(400).json({ msg: "ID de estudiante no proporcionado" });
        }
        // Verificar si el estudiante existe en la base de datos
        const estudiante = await Estudiante.findById(estudianteId);
        if (!estudiante) {
            return res.status(404).json({ msg: "Estudiante no encontrado" });
        }
        // Eliminar el estudiante de la base de datos
        await estudiante.remove();
        res.status(200).json({ msg: "Estudiante eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar el estudiante" });
    }
};

export {
        listarEstudiantes,
        registroEstudiantes,
        actualizarEstudiantes,
        eliminarEstudiantes
}
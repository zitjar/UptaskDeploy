const Proyectos = require('../models/proyecto');
const Tareas = require('../models/Tareas');

exports.agregarTarea = async (req, res, next) => {
    //se obtiene el proyecto
    const proyecto = await Proyectos.findOne({ where: { url: req.params.url } });
    const { tarea } = req.body;
    //estado 0 es igual a incompleto
    const estado = 0;
    const poyectoId = proyecto.id;


    const resultado = await Tareas.create({ tarea, estado, poyectoId });


    if (!resultado) {
        return next();
    }

    res.redirect(`/proyectos/${req.params.url}`);

}

exports.cambiarEstadoTarea = async (req, res, next) => {
    const { id } = req.params;
    const tarea = await Tareas.findOne({ where: { id } })

    //cambiar estado estado

    let estado = 0;
    if (tarea.estado === estado) {
        estado = 1;
    }
    tarea.estado = estado;
    const resultado = await tarea.save();
    if (!resultado) return next();

    res.status(200).send('Actualizado');
}

exports.eliminarTarea = async (req, res, next) => {
    const { id } = req.params;

    const resultado = await Tareas.destroy({ where: { id } });

    if (!resultado) return next();
    res.status(200).send('Tarea Eliminada Correctamente!.');
}

import Tareas from '../modeloTarea/tarea.js';
import { body, validationResult } from 'express-validator';


const rutasTareas = (app) => {
       /**
    * @swagger
    * components:
    *   schemas:
    *     Tarea:
    *      type: object
    *      properties:
    *          id:
    *            type: string
    *            description: ID único de cada tarea
    *          titulo:
    *            type: string
    *            description: Título de la tarea
    *          descripcion:
    *            type: string
    *            description: Descripción opcional de la tarea
    *          completada:
    *             type: boolean
    *             description: Estado de la tarea (pendiente o completada)
    *          creada:
    *             type: string
    *             format: date-time
    *             description: Fecha de creación de la tarea
    */

          /**
    * @swagger
    * /tareas:
    *   post:
    *     summary: Agregar una nueva tarea
    *     requestBody:
    *       required: true
    *       content: 
    *         application/json:
    *            schema:
    *              $ref: '#/components/schemas/Tarea'
    *     responses:
    *       201:
    *         description: Tarea agregada.
    *       400:
    *         description: Error de validación
    */
    app.post('/tareas', 
        body('titulo').notEmpty().withMessage('El título debe ser completado'),
        async (req, res) => {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            try {
                const tarea = new Tareas(req.body);
                const tareaGuardada = await tarea.save();
                res.status(201).json(tareaGuardada);
            } catch (error) {
                res.status(500).json({message: error.message });
            }
    })
    
          /**
    * @swagger
    * /tareas:
    *   get:
    *     summary: Obtener todas las tareas con un filtro (uso opcional) incluido
    *     parameters:
    *       - in: query
    *         name: completada
    *         schema:
    *           type: boolean
    *         description: Filtrar tareas en base a su estado
    *     responses:
    *       200:
    *         description: Lista de tareas
    *       500: 
    *         description: Error interno del servidor. No fue posible cargar la lista de tareas
    */
    app.get('/tareas', async (req, res) => {
        try{
            const { completada } = req.query;
            const filter = completada !== undefined ? { completada: completada === 'true'} : {};
            const tareas = await Tareas.find(filter);
            res.json(tareas);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    })
    
          /**
    * @swagger
    * /tareas/{id}:
    *   get:
    *     summary: Obtener detalles de una tarea
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *            type: string
    *         required: true
    *         description: ID de la tarea
    *     responses:
    *       200:
    *         description: Detalles de la tarea
    *       404: 
    *         description: Tarea no encontrada
    */
    app.get('/tareas/:id', async (req, res) => {
        try {
            const tarea = await Tareas.findById(req.params.id)
            if (!tarea) return res.status(404).json({message: 'La tarea solicitada no se encontró'})
            res.json(tarea)
            } catch (error) {
                res.status(500).json({message: error.message})
            }
    })
    
          /**
    * @swagger
    * /tareas/{id}:
    *   put:
    *     summary: Actualizar tarea
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *            type: string
    *         required: true
    *         description: ID de la tarea
    *     requestBody:
    *        required: true
    *        content:
    *          application/json:
    *            schema:
    *              $ref: '#/components/schemas/Tarea'
    *     responses:
    *       200:
    *         description: Tarea actualizada
    *       404: 
    *         description: Tarea no encontrada
    */
    app.put('/tareas/:id', async (req, res) => {
        try {
            const tareaActualizada = await Tareas.findByIdAndUpdate(req.params.id, req.body, {new:true});
            if (!tareaActualizada) return res.status(404).json({message: 'Tarea no encontrada'});
            res.json(tareaActualizada);
        } catch(error) {
            res.status(500).json({message: error.message});
        }
    })
    
          /**
    * @swagger
    * /tareas/{id}:
    *   delete:
    *     summary: Eliminar tarea
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *            type: string
    *         required: true
    *         description: ID de la tarea
    *     responses:
    *       200:
    *         description: Tarea eliminada
    *       404: 
    *         description: Tarea no encontrada
    */
    app.delete('/tareas/:id', async (req, res) => {
        try {
            const tareaEliminada = await Tareas.findByIdAndDelete(req.params.id);
            if(!tareaEliminada) return res.status(404).json({message: "Tarea no encontrada"});
                res.json({ message: "Tarea eliminada" });
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    })
}

export default rutasTareas;

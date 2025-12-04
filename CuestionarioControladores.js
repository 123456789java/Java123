const { cuestionarioService } = require('../services');

class CuestionarioController {
    crearCuestionario(req, res) {
        try {
            const { titulo, descripcion } = req.body;
            const cuestionario = cuestionarioService.crearCuestionario(titulo, descripcion);
            
            res.json({
                success: true,
                data: cuestionario,
                message: 'Cuestionario creado exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }

    obtenerCuestionarios(req, res) {
        try {
            const { estatus } = req.query;
            const cuestionarios = estatus 
                ? cuestionarioService.obtenerPorEstatus(estatus)
                : cuestionarioService.obtenerTodos();
            
            res.json({
                success: true,
                data: cuestionarios,
                count: cuestionarios.length
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }

    obtenerCuestionario(req, res) {
        try {
            const { id } = req.params;
            const cuestionario = cuestionarioService.obtenerCuestionario(parseInt(id));
            
            if (!cuestionario) {
                return res.status(404).json({
                    success: false,
                    error: 'Cuestionario no encontrado'
                });
            }

            res.json({
                success: true,
                data: cuestionario
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }

    publicarCuestionario(req, res) {
        try {
            const { id } = req.params;
            const cuestionario = cuestionarioService.publicarCuestionario(parseInt(id));
            
            res.json({
                success: true,
                data: cuestionario,
                message: 'Cuestionario publicado exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }

    agregarCategoria(req, res) {
        try {
            const { id } = req.params;
            const { nombre, rangoEdad, descripcion } = req.body;
            
            const categoria = cuestionarioService.agregarCategoria(
                parseInt(id), 
                nombre, 
                rangoEdad, 
                descripcion
            );
            
            res.json({
                success: true,
                data: categoria,
                message: 'Categoría agregada exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }

    obtenerEstadisticas(req, res) {
        try {
            const estadisticas = cuestionarioService.obtenerEstadisticas();
            
            res.json({
                success: true,
                data: estadisticas
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
}

module.exports = new CuestionarioController();
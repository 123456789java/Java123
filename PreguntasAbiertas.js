const { Pregunta } = require('../models');
const { TIPOS_PREGUNTA } = require('../config/constants');

class PreguntaService {
    constructor(cuestionarioService) {
        this.cuestionarioService = cuestionarioService;
    }

    agregarPregunta(cuestionarioId, texto, tipo, opciones = null, categoriaId = null, esObligatoria = true) {
        const cuestionario = this.cuestionarioService.obtenerCuestionario(cuestionarioId);
        if (!cuestionario) {
            throw new Error('Cuestionario no encontrado');
        }

        if (!Object.values(TIPOS_PREGUNTA).includes(tipo)) {
            throw new Error('Tipo de pregunta no válido');
        }

        const pregunta = new Pregunta(
            Date.now(),
            texto,
            tipo,
            opciones,
            categoriaId,
            esObligatoria
        );

        cuestionario.agregarPregunta(pregunta);
        return pregunta;
    }

    eliminarPregunta(cuestionarioId, preguntaId) {
        const cuestionario = this.cuestionarioService.obtenerCuestionario(cuestionarioId);
        if (!cuestionario) {
            throw new Error('Cuestionario no encontrado');
        }

        cuestionario.eliminarPregunta(preguntaId);
        return true;
    }

    obtenerPreguntas(cuestionarioId) {
        const cuestionario = this.cuestionarioService.obtenerCuestionario(cuestionarioId);
        return cuestionario ? cuestionario.preguntas : [];
    }

    obtenerPregunta(cuestionarioId, preguntaId) {
        const cuestionario = this.cuestionarioService.obtenerCuestionario(cuestionarioId);
        if (!cuestionario) return null;
        
        return cuestionario.preguntas.find(p => p.id === preguntaId);
    }

    reordenarPreguntas(cuestionarioId, nuevoOrden) {
        const cuestionario = this.cuestionarioService.obtenerCuestionario(cuestionarioId);
        if (!cuestionario) {
            throw new Error('Cuestionario no encontrado');
        }

        // Implementar lógica de reordenamiento
        const preguntasOrdenadas = nuevoOrden.map((preguntaId, index) => {
            const pregunta = cuestionario.preguntas.find(p => p.id === preguntaId);
            if (pregunta) pregunta.orden = index + 1;
            return pregunta;
        }).filter(Boolean);

        cuestionario.preguntas = preguntasOrdenadas;
        return cuestionario.preguntas;
    }
}

module.exports = PreguntaService;

//Son preguntas con Respuestas abiertas que cada uno puede poner su respuesta bajo su compresion de la pregunta 
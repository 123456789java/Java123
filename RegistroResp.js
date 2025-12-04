const { Respuesta } = require('../models');

class RespuestaService {
    constructor(cuestionarioService) {
        this.cuestionarioService = cuestionarioService;
        this.respuestas = new Map();
    }

    registrarRespuesta(usuarioId, cuestionarioId, preguntaId, valor, metadata = {}) {
        const cuestionario = this.cuestionarioService.obtenerCuestionario(cuestionarioId);
        if (!cuestionario || !cuestionario.estaPublicado()) {
            throw new Error('Cuestionario no disponible para respuestas');
        }

        const pregunta = cuestionario.preguntas.find(p => p.id === preguntaId);
        if (!pregunta) {
            throw new Error('Pregunta no encontrada');
        }

        if (!pregunta.validarRespuesta(valor)) {
            throw new Error('Respuesta no válida para el tipo de pregunta');
        }

        const respuesta = new Respuesta(usuarioId, cuestionarioId, preguntaId, valor, metadata);
        const key = this.generarKey(usuarioId, cuestionarioId, preguntaId);
        this.respuestas.set(key, respuesta);

        return respuesta;
    }

    obtenerRespuestasUsuario(usuarioId, cuestionarioId) {
        return Array.from(this.respuestas.values())
            .filter(r => r.usuarioId === usuarioId && r.cuestionarioId === cuestionarioId);
    }

    obtenerRespuesta(usuarioId, cuestionarioId, preguntaId) {
        const key = this.generarKey(usuarioId, cuestionarioId, preguntaId);
        return this.respuestas.get(key);
    }

    eliminarRespuestasUsuario(usuarioId, cuestionarioId) {
        const keysToDelete = [];
        for (let [key, respuesta] of this.respuestas) {
            if (respuesta.usuarioId === usuarioId && respuesta.cuestionarioId === cuestionarioId) {
                keysToDelete.push(key);
            }
        }

        keysToDelete.forEach(key => this.respuestas.delete(key));
        return keysToDelete.length;
    }

    generarKey(usuarioId, cuestionarioId, preguntaId) {
        return `${usuarioId}-${cuestionarioId}-${preguntaId}`;
    }

    obtenerEstadisticasRespuestas(cuestionarioId) {
        const respuestasCuestionario = Array.from(this.respuestas.values())
            .filter(r => r.cuestionarioId === cuestionarioId);

        const porPregunta = {};
        respuestasCuestionario.forEach(respuesta => {
            if (!porPregunta[respuesta.preguntaId]) {
                porPregunta[respuesta.preguntaId] = [];
            }
            porPregunta[respuesta.preguntaId].push(respuesta);
        });

        return {
            totalRespuestas: respuestasCuestionario.length,
            porPregunta: porPregunta
        };
    }
}

module.exports = RespuestaService;
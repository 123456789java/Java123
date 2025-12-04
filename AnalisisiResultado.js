const { ResultadoPrejuridico } = require('../models');
//Valida el resultado genera la puntuacion para el cuestuionario
class AnalisisService {
    constructor(cuestionarioService, respuestaService) {
        this.cuestionarioService = cuestionarioService;
        this.respuestaService = respuestaService;
        this.resultados = new Map();
    }

    procesarResultados(usuarioId, cuestionarioId) {
        const respuestas = this.respuestaService.obtenerRespuestasUsuario(usuarioId, cuestionarioId);
        if (respuestas.length === 0) {
            throw new Error('No se encontraron respuestas para procesar');
        }

        const cuestionario = this.cuestionarioService.obtenerCuestionario(cuestionarioId);
        if (!cuestionario) {
            throw new Error('Cuestionario no encontrado');
        }

        const puntuacion = this.calcularPuntuacion(respuestas, cuestionario);
        const categoria = this.determinarCategoria(puntuacion, cuestionario.categorias);
        const recomendaciones = this.generarRecomendaciones(puntuacion, categoria);
        const analisisDetallado = this.generarAnalisisDetallado(respuestas, cuestionario);

        const resultado = new ResultadoPrejuridico(
            usuarioId,
            cuestionarioId,
            categoria ? categoria.id : null,
            puntuacion,
            recomendaciones,
            analisisDetallado
        );

        const resultadoKey = `${usuarioId}-${cuestionarioId}`;
        this.resultados.set(resultadoKey, resultado);

        return resultado;
    }

    calcularPuntuacion(respuestas, cuestionario) {
        let puntuacion = 0;
        let preguntasRespondidas = 0;

        respuestas.forEach(respuesta => {
            const pregunta = cuestionario.preguntas.find(p => p.id === respuesta.preguntaId);
            if (pregunta) {
                preguntasRespondidas++;
                switch (pregunta.tipo) {
                    case 'numerica':
                        puntuacion += respuesta.obtenerValorNumerico();
                        break;
                    case 'seleccion_multiple':
                        puntuacion += this.calcularPuntosSeleccion(respuesta.valor, pregunta.opciones);
                        break;
                    default:
                        puntuacion += 1;
                }
            }
        });

        // Normalizar puntuación basada en preguntas respondidas
        return preguntasRespondidas > 0 ? Math.round((puntuacion / preguntasRespondidas) * 100) : 0;
    }

    calcularPuntosSeleccion(valor, opciones) {
        // Asume que las opciones tienen valores numéricos o pesos
        const index = opciones.indexOf(valor);
        return index >= 0 ? (index + 1) * 10 : 0;
    }

    determinarCategoria(puntuacion, categorias) {
        // Primero por puntuación
        let categoria = categorias.find(cat => 
            puntuacion >= cat.rangoEdad.min && puntuacion <= cat.rangoEdad.max
        );

        // Si no encuentra, usar la más cercana
        if (!categoria && categorias.length > 0) {
            categoria = categorias.reduce((prev, curr) => {
                const diffPrev = Math.abs(puntuacion - (prev.rangoEdad.min + prev.rangoEdad.max) / 2);
                const diffCurr = Math.abs(puntuacion - (curr.rangoEdad.min + curr.rangoEdad.max) / 2);
                return diffCurr < diffPrev ? curr : prev;
            });
        }

        return categoria || categorias[0];
    }

    generarRecomendaciones(puntuacion, categoria) {
        const recomendaciones = [];

        if (puntuacion < 30) {
            recomendaciones.push("Situación de bajo riesgo legal");
            recomendaciones.push("Se recomienda asesoría legal preventiva");
            recomendaciones.push("Documentar situación actual para futuras referencias");
        } else if (puntuacion < 60) {
            recomendaciones.push("Situación que requiere atención legal");
            recomendaciones.push("Consultar con abogado especializado");
            recomendaciones.push("Recopilar toda la documentación relevante");
        } else if (puntuacion < 80) {
            recomendaciones.push("Situación de alto riesgo legal");
            recomendaciones.push("Acción legal recomendada en el corto plazo");
            recomendaciones.push("Contactar con departamento jurídico inmediatamente");
        } else {
            recomendaciones.push("Situación crítica que requiere acción inmediata");
            recomendaciones.push("Buscar asesoría legal urgente");
            recomendaciones.push("Considerar acciones legales formales");
        }

        if (categoria) {
            recomendaciones.push(`Categoría aplicable: ${categoria.nombre}`);
            recomendaciones.push(`Rango de evaluación: ${categoria.rangoEdad.min}-${categoria.rangoEdad.max} puntos`);
        }

        return recomendaciones;
    }

    generarAnalisisDetallado(respuestas, cuestionario) {
        const analisis = {
            totalPreguntas: cuestionario.preguntas.length,
            preguntasRespondidas: respuestas.length,
            porcentajeCompletitud: Math.round((respuestas.length / cuestionario.preguntas.length) * 100),
            tiempoPromedioRespuesta: this.calcularTiempoPromedio(respuestas),
            areasCriticas: this.identificarAreasCriticas(respuestas, cuestionario)
        };

        return analisis;
    }

    calcularTiempoPromedio(respuestas) {
        if (respuestas.length === 0) return 0;
        
        const tiempos = respuestas.map(r => r.metadata.tiempoRespuesta || 0);
        return Math.round(tiempos.reduce((a, b) => a + b, 0) / tiempos.length);
    }

    identificarAreasCriticas(respuestas, cuestionario) {
        // Implementar lógica para identificar áreas problemáticas
        return [];
    }

    obtenerResultado(usuarioId, cuestionarioId) {
        const key = `${usuarioId}-${cuestionarioId}`;
        return this.resultados.get(key);
    }

    obtenerHistorialUsuario(usuarioId) {
        return Array.from(this.resultados.values())
            .filter(r => r.usuarioId === usuarioId)
            .sort((a, b) => b.fechaAnalisis - a.fechaAnalisis);
    }
}

module.exports = AnalisisService;
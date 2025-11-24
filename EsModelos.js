// cuestionarioService.js
const { Categoria, Pregunta, Cuestionario, Respuesta, ResultadoPrejuridico } = require('./models');

class CuestionarioService {
    constructor() {
        this.cuestionarios = new Map();
        this.respuestas = new Map();
        this.resultados = new Map();
        this.contadorIds = 1;
    }

    // Crear nuevo cuestionario
    crearCuestionario(titulo, descripcion) {
        const id = this.contadorIds++;
        const cuestionario = new Cuestionario(id, titulo, descripcion);
        this.cuestionarios.set(id, cuestionario);
        return cuestionario;
    }

    // Agregar pregunta al cuestionario
    agregarPregunta(cuestionarioId, texto, tipo, opciones = null, categoriaId = null) {
        const cuestionario = this.cuestionarios.get(cuestionarioId);
        if (!cuestionario) {
            throw new Error('Cuestionario no encontrado');
        }

        const preguntaId = Date.now(); // ID único basado en timestamp
        const pregunta = new Pregunta(preguntaId, texto, tipo, opciones, categoriaId);
        cuestionario.agregarPregunta(pregunta);
        
        return pregunta;
    }

    // Agregar categoría
    agregarCategoria(cuestionarioId, nombre, rangoEdad) {
        const cuestionario = this.cuestionarios.get(cuestionarioId);
        if (!cuestionario) {
            throw new Error('Cuestionario no encontrado');
        }

        const categoriaId = Date.now();
        const categoria = new Categoria(categoriaId, nombre, rangoEdad);
        cuestionario.agregarCategoria(categoria);
        
        return categoria;
    }

    // Publicar cuestionario
    publicarCuestionario(cuestionarioId) {
        const cuestionario = this.cuestionarios.get(cuestionarioId);
        if (!cuestionario) {
            throw new Error('Cuestionario no encontrado');
        }

        cuestionario.publicar();
        return cuestionario;
    }

    // Registrar respuesta
    registrarRespuesta(usuarioId, cuestionarioId, preguntaId, valor) {
        const respuesta = new Respuesta(usuarioId, cuestionarioId, preguntaId, valor);
        const key = `${usuarioId}-${cuestionarioId}-${preguntaId}`;
        this.respuestas.set(key, respuesta);
        return respuesta;
    }

    // Procesar respuestas y generar resultado prejurídico
    procesarResultados(usuarioId, cuestionarioId) {
        const respuestasUsuario = Array.from(this.respuestas.values())
            .filter(r => r.usuarioId === usuarioId && r.cuestionarioId === cuestionarioId);

        if (respuestasUsuario.length === 0) {
            throw new Error('No se encontraron respuestas para procesar');
        }

        const cuestionario = this.cuestionarios.get(cuestionarioId);
        if (!cuestionario) {
            throw new Error('Cuestionario no encontrado');
        }

        // Lógica de análisis prejurídico (simplificada)
        const puntuacion = this.calcularPuntuacion(respuestasUsuario, cuestionario);
        const categoria = this.determinarCategoria(puntuacion, cuestionario.categorias);
        const recomendaciones = this.generarRecomendaciones(puntuacion, categoria);

        const resultado = new ResultadoPrejuridico(
            usuarioId, 
            cuestionarioId, 
            categoria ? categoria.id : null, 
            puntuacion, 
            recomendaciones
        );

        const resultadoKey = `${usuarioId}-${cuestionarioId}`;
        this.resultados.set(resultadoKey, resultado);

        return resultado;
    }

    // Métodos auxiliares para el análisis
    calcularPuntuacion(respuestas, cuestionario) {
        // Lógica simplificada de cálculo de puntuación
        let puntuacion = 0;
        
        respuestas.forEach(respuesta => {
            const pregunta = cuestionario.preguntas.find(p => p.id === respuesta.preguntaId);
            if (pregunta) {
                switch (pregunta.tipo) {
                    case 'numerica':
                        puntuacion += parseInt(respuesta.valor) || 0;
                        break;
                    case 'seleccion_multiple':
                        // Asumimos que las opciones tienen valores numéricos
                        puntuacion += parseInt(respuesta.valor) || 0;
                        break;
                    default:
                        // Para otros tipos, suma básica
                        puntuacion += 1;
                }
            }
        });

        return puntuacion;
    }

    determinarCategoria(puntuacion, categorias) {
        return categorias.find(cat => {
            return puntuacion >= cat.rangoEdad.min && puntuacion <= cat.rangoEdad.max;
        }) || categorias[0]; // Categoría por defecto
    }

    generarRecomendaciones(puntuacion, categoria) {
        const recomendaciones = [];
        
        if (puntuacion < 50) {
            recomendaciones.push("Se recomienda asesoría legal básica");
            recomendaciones.push("Considerar mediación como primera opción");
        } else if (puntuacion < 80) {
            recomendaciones.push("Se sugiere consulta con especialista");
            recomendaciones.push("Evaluar documentación necesaria");
        } else {
            recomendaciones.push("Se recomienda acción legal inmediata");
            recomendaciones.push("Contactar con departamento jurídico");
        }

        if (categoria) {
            recomendaciones.push(`Categoría aplicable: ${categoria.nombre}`);
        }

        return recomendaciones;
    }

    // Obtener cuestionarios por estatus
    obtenerCuestionariosPorEstatus(estatus) {
        return Array.from(this.cuestionarios.values())
            .filter(c => c.estatus === estatus);
    }

    // Obtener resultados por usuario
    obtenerResultadosUsuario(usuarioId) {
        return Array.from(this.resultados.values())
            .filter(r => r.usuarioId === usuarioId);
    }
}

module.exports = CuestionarioService;
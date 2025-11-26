// models.js
class Categoria {
    constructor(id, nombre, rangoEdad) {
        this.id = id;
        this.nombre = nombre;
        this.rangoEdad = rangoEdad; // {min: number, max: number}
    }
}

class Pregunta {
    constructor(id, texto, tipo, opciones = null, categoriaId = null) {
        this.id = id;
        this.texto = texto;
        this.tipo = tipo; // 'seleccion_multiple', 'respuesta_corta', 'numerica', 'dinamica'
        this.opciones = opciones; // Para selección múltiple
        this.categoriaId = categoriaId;
    }
}

class Cuestionario {
    constructor(id, titulo, descripcion, estatus = 'borrador') {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.estatus = estatus; // 'borrador', 'publicado', 'cerrado'
        this.preguntas = [];
        this.categorias = [];
        this.fechaCreacion = new Date();
    }

    agregarPregunta(pregunta) {
        this.preguntas.push(pregunta);
    }

    agregarCategoria(categoria) {
        this.categorias.push(categoria);
    }

    publicar() {
        this.estatus = 'publicado';
        this.fechaPublicacion = new Date();
    }
}

class Respuesta {
    constructor(usuarioId, cuestionarioId, preguntaId, valor) {
        this.usuarioId = usuarioId;
        this.cuestionarioId = cuestionarioId;
        this.preguntaId = preguntaId;
        this.valor = valor;
        this.fechaRespuesta = new Date();
    }
}

class ResultadoPrejuridico {
    constructor(usuarioId, cuestionarioId, categoriaId, puntuacion, recomendaciones) {
        this.usuarioId = usuarioId;
        this.cuestionarioId = cuestionarioId;
        this.categoriaId = categoriaId;
        this.puntuacion = puntuacion;
        this.recomendaciones = recomendaciones;
        this.fechaAnalisis = new Date();
    }
}

module.exports = {
    Categoria,
    Pregunta,
    Cuestionario,
    Respuesta,
    ResultadoPrejuridico
};
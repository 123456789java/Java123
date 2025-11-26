class Respuesta {
    constructor(usuarioId, cuestionarioId, preguntaId, valor, metadata = {}) {
        this.usuarioId = usuarioId;
        this.cuestionarioId = cuestionarioId;
        this.preguntaId = preguntaId;
        this.valor = valor;
        this.metadata = metadata; // { tiempoRespuesta, dispositivo, etc. }
        this.fechaRespuesta = new Date();
    }

    esValida() {
        return this.valor !== null && this.valor !== undefined;
    }

    obtenerValorNumerico() {
        return Number(this.valor) || 0;
    }
}

module.exports = Respuesta;
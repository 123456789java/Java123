// Tipos de preguntas soportados
const TIPOS_PREGUNTA = {
    SELECCION_MULTIPLE: 'seleccion_multiple',
    RESPUESTA_CORTA: 'respuesta_corta',
    NUMERICA: 'numerica',
    DINAMICA: 'dinamica'
};

// Estados del cuestionario
const ESTADOS_CUESTIONARIO = {
    BORRADOR: 'borrador',
    PUBLICADO: 'publicado',
    CERRADO: 'cerrado'
};

// Categorías predefinidas
const CATEGORIAS_PREDEFINIDAS = {
    EDAD_JOVEN: { min: 18, max: 30, nombre: 'Joven Adulto' },
    EDAD_ADULTO: { min: 31, max: 50, nombre: 'Adulto' },
    EDAD_MADURO: { min: 51, max: 70, nombre: 'Adulto Maduro' }
};

module.exports = {
    TIPOS_PREGUNTA,
    ESTADOS_CUESTIONARIO,
    CATEGORIAS_PREDEFINIDAS
};
const jwt = require("jsonwebtoken");

// MIDDLEWARE GENERAL DE AUTENTICACIÓN
// (Valida token y puede restringir por rol si se pasa un arreglo de roles)

exports.auth = (roles = []) => {
  return (req, res, next) => {
    try {
      // Verificar si viene el header Authorization
      const header = req.headers.authorization;

      if (!header)
        return res.status(401).json({ error: "Falta token de autenticación" });

      // Espera formato: "Bearer {token}"
      const token = header.split(" ")[1];

      if (!token)
        return res.status(401).json({ error: "Formato de token inválido" });

      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Guardar datos del usuario dentro del request
      req.user = decoded;

      // Validar si la ruta requiere roles específicos
      if (roles.length > 0 && !roles.includes(decoded.rol)) {
        return res.status(403).json({ error: "No autorizado" });
      }

      next();
    } catch (err) {
      return res.status(401).json({ error: "Token inválido o expirado" });
    }
  };
};


// SOLO ADMINISTRADORES

exports.esAdmin = (req, res, next) => {
  if (!req.user || req.user.rol !== "admin") {
    return res.status(403).json({ error: "Acceso denegado: solo administradores" });
  }
  next();
};

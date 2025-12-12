const jwt = require("jsonwebtoken");

exports.auth = (roles = []) => {
  return (req, res, next) => {
    try {
      const header = req.headers.authorization;

      if (!header)
        return res.status(401).json({ error: "Falta token de autenticación" });

      // Formato: Bearer TOKEN
      const token = header.split(" ")[1];
      if (!token)
        return res.status(401).json({ error: "Formato de token inválido" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ⚠️ Advertencia: token por expirar (5 minutos)
      const ahora = Math.floor(Date.now() / 1000);
      if (decoded.exp - ahora <= 300) {
        res.setHeader(
          "X-Token-Warning",
          "Tu sesión está por expirar"
        );
      }

      req.user = decoded;

      // 🔐 Validar roles
      if (roles.length > 0 && !roles.includes(decoded.rol)) {
        return res.status(403).json({ error: "No autorizado" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ error: "Token inválido o expirado" });
    }
  };
};

const fs = require("fs");
const http2 = require("http2");
const app = require("./app");

// Puerto desde .env o 3000 por defecto
const PORT = process.env.PORT || 3000;

// Leer certificados TLS desde la carpeta certs
const options = {
  key: fs.readFileSync("./certs/server.key"),
  cert: fs.readFileSync("./certs/server.cert"),
};

// Crear servidor HTTP/2 seguro
http2.createSecureServer(options, app).listen(PORT, () => {
  console.log(`🔥 Servidor HTTP/2 corriendo en puerto ${PORT}`);
});

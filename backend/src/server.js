const fs = require("fs");
const spdy = require("spdy");
const app = require("./app");

const PORT = process.env.PORT || 3000;

const options = {
  key: fs.readFileSync("./certs/server.key"),
  cert: fs.readFileSync("./certs/server.cert"),
};

spdy.createServer(options, app).listen(PORT, (err) => {
  if (err) {
    console.error("❌ Error iniciando servidor HTTP/2:", err);
    return;
  }
  console.log(`🔥 Servidor HTTP/2 + HTTPS corriendo en puerto ${PORT}`);
});

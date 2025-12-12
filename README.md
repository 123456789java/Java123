🌐 Proyecto Web — Backend + Frontend

Aplicación web desarrollada con Node.js, Express, MongoDB Atlas y un frontend independiente dentro del mismo repositorio.
El backend implementa autenticación con JWT, control de roles, HTTP/2 con HTTPS, población automática de la base de datos (seed) y una guía de instalación segura.

📁 Estructura del Proyecto

Java123/
│
├── backend/
│   ├── certs/                # Certificados HTTPS (NO se suben a GitHub)
│   ├── node_modules/
│   ├── src/
│   │   ├── config/           # Configuración de base de datos y admin por defecto
│   │   │   ├── database.js
│   │   │   └── createAdmin.js
│   │   ├── controllers/      # Controladores del sistema
│   │   ├── middlewares/      # Middleware JWT y control de roles
│   │   ├── models/           # Modelos Mongoose
│   │   ├── routes/           # Rutas REST
│   │   ├── seed/             # Script de población de datos
│   │   │   └── seed.js
│   │   ├── validators/       # Validaciones de datos
│   │   ├── app.js            # Configuración principal de Express
│   │   └── server.js         # Servidor HTTPS + HTTP/2 (SPDY)
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── .env                  # Variables de entorno (NO se sube)
│
├── frontend/                 # Frontend independiente (futuro React)
│
├── .gitignore
├── install.txt               # Guía de instalación y configuración segura
├── poblacion-ej.txt          # Guía de población manual con Postman
├── problemas_resultos_proyecto.txt
└── README.md


🔐 Certificados HTTPS (HTTP/2)

Los certificados NO se suben al repositorio.

Cada usuario debe generarlos localmente:

openssl req -x509 -newkey rsa:2048 -nodes \
-keyout server.key -out server.cert -days 365


Ubicación obligatoria:

backend/certs/server.key
backend/certs/server.cert


Estos certificados son utilizados en:

src/server.js

▶️ Ejecutar el Backend
Modo desarrollo (HTTP/2 + HTTPS)
npm run dev


Salida esperada:

🔥 Servidor HTTP/2 + HTTPS corriendo en puerto 3000
🔥 MongoDB conectado correctamente

🌱 Población Automática de la Base de Datos (SEED)

El proyecto incluye un script obligatorio de población:

src/seed/seed.js


Ejecutar:

npm run seed


Este script:

Limpia la base de datos

Crea un usuario administrador

Inserta categorías, subcategorías, niveles y rangos de edad

Usa variables de entorno

No contiene credenciales hardcodeadas

🧪 Endpoints Principales
Autenticación

POST /api/auth/register

POST /api/auth/login

Usuarios (solo admin)

GET /api/usuarios

Categorías

GET /api/categorias

POST /api/categorias

Subcategorías

GET /api/subcategorias

POST /api/subcategorias

Niveles

GET /api/niveles

POST /api/niveles

Rangos de edad

GET /api/rangos

POST /api/rangos

Las rutas protegidas requieren JWT en el header Authorization: Bearer <token>

🔧 Población Manual con Postman

La población manual está documentada paso a paso en:

poblacion-ej.txt


Incluye:

Login

Uso de JWT

Creación de categorías, subcategorías, niveles y rangos

🚀 Frontend

La carpeta /frontend está preparada para React.

Ejemplo:

cd frontend
npx create-react-app .

🧠 Notas Importantes

El archivo .env es obligatorio

MongoDB Atlas debe permitir tu IP

No subir certificados ni credenciales a GitHub

La instalación completa está documentada en install.txt

El script seed.js es obligatorio según la consigna

🧑‍🏫 Justificación Técnica (HTTP/2)

Este proyecto implementa HTTP/2 mediante SPDY, ya que Express no soporta HTTP/2 de forma nativa.
El uso de HTTP/2 mejora el rendimiento de la comunicación cliente-servidor al permitir multiplexación y conexiones persistentes sobre HTTPS.
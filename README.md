# 🌐 Proyecto Web — Backend + Frontend

Aplicación web desarrollada con **Node.js**, **Express** y **MongoDB Atlas**, con un frontend independiente dentro del mismo repositorio.

El backend implementa:

- Autenticación con **JWT**
- Control de roles
- **HTTP/2 con HTTPS**
- Población automática de la base de datos (**seed**)
- Guía de instalación segura

---

## 📁 Estructura del Proyecto

```plaintext
Java123/
│
├── backend/
│   ├── certs/                 # Certificados HTTPS (NO se suben a GitHub)
│   ├── node_modules/
│   ├── src/
│   │   ├── config/            # Configuración de BD y admin por defecto
│   │   │   ├── database.js
│   │   │   └── createAdmin.js
│   │   ├── controllers/       # Controladores del sistema
│   │   ├── middlewares/       # Middleware JWT y control de roles
│   │   ├── models/            # Modelos Mongoose
│   │   ├── routes/            # Rutas REST
│   │   ├── seed/              # Script de población de datos
│   │   │   └── seed.js
│   │   ├── validators/        # Validaciones de datos
│   │   ├── app.js             # Configuración principal de Express
│   │   └── server.js          # Servidor HTTPS + HTTP/2 (SPDY)
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── .env                   # Variables de entorno (NO se sube)
│
├── frontend/                  # Frontend independiente (futuro React)
│
├── .gitignore
├── install.txt                # Guía de instalación y configuración segura
├── poblacion-ej.txt           # Guía de población manual con Postman
├── problemas_resultos_proyecto.txt
└── README.md

🛠️ Tecnologías Utilizadas
Backend

Node.js

Express

MongoDB Atlas

Mongoose

JSON Web Tokens (JWT)

bcryptjs

dotenv

Nodemon

SPDY (HTTP/2)

HTTPS / TLS (OpenSSL)

Frontend

Preparado para React o HTML/CSS/JS

🔐 Seguridad del Proyecto

❌ No se suben certificados SSL

❌ No se suben credenciales ni archivo .env

❌ No se suben claves JWT

✔ Uso de .gitignore

✔ Configuración documentada en install.txt

🔧 Instalación del Backend
1️⃣ Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>
cd backend

2️⃣ Instalar dependencias
npm install

🔐 Variables de Entorno (OBLIGATORIO)

Crear el archivo:

backend/.env


Ejemplo de contenido (NO usar credenciales reales):

PORT=3000
MONGO_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/<nombreDB>
JWT_SECRET=claveSuperSegura
NODE_ENV=development

🔐 Certificados HTTPS (HTTP/2)

⚠️ Los certificados NO se suben al repositorio

Cada usuario debe generarlos localmente:

openssl req -x509 -newkey rsa:2048 -nodes \
-keyout server.key -out server.cert -days 365


Ubicación obligatoria:

backend/certs/server.key
backend/certs/server.cert


Estos certificados son utilizados en:

src/server.js

▶️ Ejecutar el Backend

Modo desarrollo (HTTP/2 + HTTPS):

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
🔑 Autenticación

POST /api/auth/register

POST /api/auth/login

👥 Usuarios (solo admin)

GET /api/usuarios

📚 Categorías

GET /api/categorias

POST /api/categorias

📘 Subcategorías

GET /api/subcategorias

POST /api/subcategorias

📊 Niveles

GET /api/niveles

POST /api/niveles

👶 Rangos de edad

GET /api/rangos

POST /api/rangos

🔐 Las rutas protegidas requieren el header:

Authorization: Bearer <token>

🔧 Población Manual con Postman

La población manual está documentada en:

poblacion-ej.txt


Incluye:

Login

Uso de JWT

Creación de categorías

Subcategorías

Niveles

Rangos de edad

🚀 Frontend

La carpeta /frontend está preparada para React.

Ejemplo:

cd frontend
npx create-react-app .

🧠 Notas Importantes

El archivo .env es obligatorio

MongoDB Atlas debe permitir tu IP

❌ No subir certificados ni credenciales a GitHub

La instalación completa está documentada en install.txt

El script seed.js es obligatorio según la consigna

🧑‍🏫 Justificación Técnica (HTTP/2)

Este proyecto implementa HTTP/2 mediante SPDY, ya que Express no soporta HTTP/2 de forma nativa.

El uso de HTTP/2 mejora el rendimiento de la comunicación cliente-servidor al permitir:

Multiplexación de solicitudes

Conexiones persistentes

Menor latencia sobre HTTPS


---

## ✅ Qué hacer ahora

1. Abre `README.md` en VS Code  
2. Borra todo el contenido actual  
3. Pega **exactamente** este texto  
4. Guarda el archivo  

Se verá **ordenado**, **profesional** y **listo para GitHub y revisión académica**.

Si quieres después:
- lo hago más corto
- lo adapto a una rúbrica específica
- o preparo una versión para defensa oral  

Dime y seguimos.
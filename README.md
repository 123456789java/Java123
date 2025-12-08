# 🌐 Proyecto Web — Backend + Frontend  

Aplicación web desarrollada con **Node.js**, **Express**, **MongoDB Atlas** y un frontend independiente dentro del mismo repositorio.  
Incluye autenticación, manejo de usuarios, categorías, subcategorías, niveles de dificultad y rangos de edad.

---

## 📁 Estructura del Proyecto

```plaintext
Java123/
│
├── backend/                # Servidor Node.js + Express + MongoDB
│   ├── src/
│   │   ├── config/         # Configuración de base de datos (Mongoose)
│   │   ├── controllers/    # Controladores del sistema
│   │   ├── middlewares/    # Middlewares (auth, validaciones)
│   │   ├── models/         # Modelos de Mongoose
│   │   ├── routes/         # Rutas de la API REST
│   │   ├── app.js          # Configuración principal de Express
│   │   └── server.js       # Punto de entrada del servidor
│   ├── package.json
│   ├── package-lock.json
│   └── .env                # Variables de entorno (obligatorio)
│
├── frontend/               # Carpeta para el futuro frontend
│   └── index.js
│
├── .gitignore
└── README.md

🛠️ Tecnologías utilizadas
Backend

Node.js

Express

MongoDB Atlas

Mongoose

dotenv

Nodemon

JSON Web Tokens (JWT)

Frontend

Preparado para React o HTML/CSS/JS

🔧 Instalación del Backend

1️⃣ Entrar en la carpeta backend
cd backend

2️⃣ Instalar dependencias
npm install

3️⃣ Instalar Nodemon
npm install --save-dev nodemon

🔐 Variables de Entorno (OBLIGATORIO)

Crear archivo:

backend/.env


Contenido:

PORT=3000
MONGODB_URI="mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/<nombreDB>?retryWrites=true&w=majority"
JWT_SECRET=claveSuperSegura123


⚠️ Sin este archivo el servidor NO funcionará.
⚠️ No subir claves reales en repositorios públicos.

▶️ Ejecutar el Backend
Modo desarrollo:
npm run dev

Modo producción:
npm start


Si todo funciona correctamente verás:

🔥 MongoDB conectado correctamente
Servidor escuchando en el puerto 3000

🧪 Endpoints principales
Autenticación
POST /api/auth/login
POST /api/auth/register

Categorías
GET /api/categorias
POST /api/categorias

Subcategorías
GET /api/subcategorias
POST /api/subcategorias

Niveles de dificultad
GET /api/niveles

Rangos de edad
GET /api/rangos

🚀 Frontend

La carpeta /frontend está lista para implementar React o HTML/JS.

Para crear un proyecto React:

cd frontend
npx create-react-app .

🔍 Notas importantes

El .env debe estar dentro de backend/.

MongoDB Atlas debe permitir tu IP.

Ejecuta siempre npm run dev dentro de la carpeta backend.

Backend y frontend se desarrollan por separado.
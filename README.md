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
│   │   └── server.js       # Punto de entrada del servidor (con HTTP/2 y SPDY)
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

🔧 Cómo poblar la base de datos usando Postman
1. Registrar un nuevo usuario (Profesor o Administrador)
A) Registro de usuario (Administrador o Profesor)

En Postman, configura el método POST.

La URL será:

https://localhost:3000/api/auth/register
 
En Body, selecciona raw → JSON y escribe el siguiente JSON:

Ejemplo de administrador:

{
  "nombre": "Administrador_rodolfo",
  "correo": "admin_rodolfo@system.com",
  "password": "admin123",
  "rol": "admin"
}


Ejemplo de profesor:

{
  "nombre": "Juan Perez",
  "correo": "juanperez@system.com",
  "password": "profesor123",
  "rol": "profesor"
}


Haz clic en Send.

Respuesta esperada:

{
  "mensaje": "Usuario registrado correctamente",
  "usuario": {
    "nombre": "Administrador_rodolfo",
    "correo": "admin_rodolfo@system.com",
    "rol": "admin",
    "_id": "62babcaf56c0e47f07adf3a9",
    "__v": 0
  }
}

2. Crear categorías

Configura el método POST en Postman.

La URL será:

https://localhost:3000/api/categorias


En Body, selecciona raw → JSON y escribe el siguiente JSON:

{
  "nombre": "Matemáticas"
}


Haz clic en Send.

3. Crear subcategorías

Configura el método POST en Postman.

La URL será:

https://localhost:3000/api/subcategorias


En Body, selecciona raw → JSON y escribe el siguiente JSON:

{
  "nombre": "Álgebra",
  "categoriaId": "ID_DE_LA_CATEGORIA"
}


Haz clic en Send.

4. Crear niveles de dificultad

Configura el método POST en Postman.

La URL será:

https://localhost:3000/api/niveles


En Body, selecciona raw → JSON y escribe el siguiente JSON:

{
  "nombre": "Difícil"
}


Haz clic en Send.

5. Crear rangos de edad

Configura el método POST en Postman.

La URL será:

https://localhost:3000/api/rangos


En Body, selecciona raw → JSON y escribe el siguiente JSON:

{
  "descripcion": "5-7 años",
  "edadMin": 5,
  "edadMax": 7
}


Haz clic en Send.

🧑‍💻 Tecnologías utilizadas para HTTP/2 en este proyecto

Node.js: Plataforma para JavaScript en el servidor.

Express: Framework para manejar rutas HTTP.

SPDY: Paquete que permite usar HTTP/2 en Express, actuando como un puente entre HTTP/1.1 y HTTP/2.

TLS/SSL (OpenSSL): Protocolo para conexiones seguras, usado para habilitar HTTPS.

SPDY es clave para habilitar HTTP/2, ya que Express no soporta HTTP/2 de manera nativa. Esta tecnología mejora el rendimiento de la comunicación entre el servidor y los clientes.
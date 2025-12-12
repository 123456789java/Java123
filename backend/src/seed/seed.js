require("dotenv").config();
const mongoose = require("mongoose");

// Importar modelos
const Usuario = require("../models/Usuario");
const Categoria = require("../models/Categoria");
const Subcategoria = require("../models/Subcategoria");
const Nivel = require("../models/NivelDificultad");
const RangoEdad = require("../models/RangoEdad");

// Conexión a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🟢 Conectado a MongoDB para seed");
  } catch (error) {
    console.error("🔴 Error conectando a MongoDB:", error);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    // Limpiar datos previos
    await Usuario.deleteMany();
    await Categoria.deleteMany();
    await Subcategoria.deleteMany();
    await Nivel.deleteMany();
    await RangoEdad.deleteMany();

    console.log("🧹 Base de datos limpia");

    
    // USUARIO ADMIN

    const admin = await Usuario.create({
      nombre: "Administrador",
      correo: "admin@gmail.com",
      password: "123456",
      rol: "admin"
    });

    console.log("👤 Usuario admin creado");

    // CATEGORÍAS
    
    const categoria = await Categoria.create({
      nombre: "Matemática"
    });

    console.log("📚 Categoría creada");

    // SUBCATEGORÍAS
    
    await Subcategoria.create({
      nombre: "Álgebra",
      categoriaId: categoria._id
    });

    console.log("📘 Subcategoría creada");

    
    // NIVELES
    
    await Nivel.create({ nombre: "Fácil" });
    await Nivel.create({ nombre: "Medio" });
    await Nivel.create({ nombre: "Difícil" });

    console.log("📊 Niveles creados");

    // RANGOS DE EDAD

    await RangoEdad.create({
      descripcion: "5-7 años",
      edadMin: 5,
      edadMax: 7
    });

    await RangoEdad.create({
      descripcion: "8-10 años",
      edadMin: 8,
      edadMax: 10
    });

    console.log("👶 Rangos de edad creados");

    console.log("✅ Seed ejecutado correctamente");
    process.exit(0);

  } catch (error) {
    console.error("❌ Error ejecutando seed:", error);
    process.exit(1);
  }
};

// Ejecutar
(async () => {
  await connectDB();
  await seedDatabase();
})();

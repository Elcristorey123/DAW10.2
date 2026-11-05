import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productosRoutes from './src/routes/productosRoutes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos (tu HTML)
app.use(express.static('public'));

// Rutas de la API
app.use('/api/productos', productosRoutes);

// Ruta raíz de prueba
app.get('/', (req, res) => {
    res.send('API de Productos funcionando correctamente');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
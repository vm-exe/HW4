import express from 'express';
import cors from 'cors';

const app = express();

// Middlewares
app.use(express.json()); // Middleware para manejar JSON
app.use(express.urlencoded({ extended: true })); // Middleware para manejar datos codificados en URL
app.use(cors()); // Permitir CORS

// Ruta base para pruebas
app.get('/', (_, res) => {
  return res.json({ ok: true, message: 'API is running!' });
});

// Importar y usar rutas
import productRoutes from './routes/productRoutes';
app.use('/api/products', productRoutes); // Define la ruta base para productos

// Middleware para manejar rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({
    error: true,
    message: 'Route not found',
  });
});

// Middleware para manejo de errores
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error middleware:', err.message || err);
  res.status(err.status || 500).json({
    error: true,
    message: err.message || 'Internal Server Error',
  });
});

// Iniciar el servidor
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server API running on http://localhost:${port}`);
});

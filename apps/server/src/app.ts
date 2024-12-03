import express, { Express, Request, Response, NextFunction } from 'express';
import productRoutes from './routes/productRoutes';

const app: Express = express();

// Middleware para registrar todas las solicitudes
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Middleware global para JSON
app.use(express.json());

// Rutas principales
app.use('/api/products', productRoutes);

// Depurar las rutas registradas
const listRoutes = (app: Express) => {
  console.log('Registered Routes:');
  app._router.stack.forEach((middleware: any) => {
    if (middleware.route) {
      // Rutas registradas directamente en el app
      console.log(`${Object.keys(middleware.route.methods).join(', ').toUpperCase()} ${middleware.route.path}`);
    } else if (middleware.name === 'router') {
      // Rutas registradas en routers
      middleware.handle.stack.forEach((handler: any) => {
        if (handler.route) {
          console.log(`${Object.keys(handler.route.methods).join(', ').toUpperCase()} ${handler.route.path}`);
        }
      });
    }
  });
};

listRoutes(app); // Llamar a la función para listar las rutas registradas

// Ruta de prueba
app.get('/test', (req, res) => {
  console.log('Test route hit');
  res.send('Test route is working!');
});

// Middleware para rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({
    error: true,
    message: 'Route not found',
  });
});

// Middleware para manejo de errores (500)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error middleware:', err.message || err);
  res.status(err.status || 500).json({
    error: true,
    message: err.message || 'Internal Server Error',
  });
});

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;

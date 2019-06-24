import express, { json } from 'express';
import IndexRoutes from './routes/index.routes';
import TaskRoutes from './routes/tasks.routes';

const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Mddlewares
app.use(json());

// Routes
app.use(IndexRoutes);
app.use('/tasks', TaskRoutes);

export default app;

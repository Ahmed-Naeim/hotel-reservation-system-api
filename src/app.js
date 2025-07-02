import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './middlewares/error.middleware.js';
import { ApiError } from './utils/ApiError.js';
import routes from './api/routes/index.js';

const app = express();

// Middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
    credentials: true,
}));

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());

// API Routes
app.use('/api/v1', routes);

// Handle 404 - Route not found
app.all('*', (req, res, next) => {
    next(new ApiError(404, `Can't find ${req.originalUrl} on this server!`));
});

// Global Error Handling Middleware
app.use(globalErrorHandler);

export default app;
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/authRoutes.js';
import customerSupplierRoutes from './routes/CustomerSupplier.js'; 
import currencyRoutes from './routes/currency.js';
import uomRoutes from './routes/uom.js';
import bankRoutes from './routes/bank.js';
import taxRoutes from './routes/tax.js';

import vesselRoutes from './routes/vessel.js';

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/customersuppliers', customerSupplierRoutes); 
app.use('/api/currencies', currencyRoutes);
app.use('/api/uoms', uomRoutes);
app.use('/api/banks', bankRoutes);
app.use('/api/taxes', taxRoutes);

app.use('/api/vessels', vesselRoutes); 

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => {
    console.error('DB Connection Error:', err.message);
    process.exit(1);
  });

export default app;
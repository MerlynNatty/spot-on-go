import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/users.js';
import orderRoutes from './routes/orders.js';
import slotRoutes from './routes/slots.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Example route
app.get('/', (req, res) => res.send('API running!'));

app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/slots', slotRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
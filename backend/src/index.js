import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());


import authRoutes from './routes/auth.js';
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('VampGen Backend API');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

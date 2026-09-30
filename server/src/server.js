import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, getDBStatus } from './config/db.js';
import { createRoutes } from './routes/taskRoutes.js';
import { attachDbStatus } from './middlewares/dbStatus.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(attachDbStatus(getDBStatus));
app.use('/api', createRoutes());

const healthHandler = (req, res) => {
  res.json({
    status: 'ok',
    version: 'v1',
    database: getDBStatus() ? 'MongoDB (Connected)' : 'In-Memory Fallback (Active)',
    timestamp: new Date().toISOString()
  });
};
app.get('/api/health', healthHandler);
app.get('/api/v1/health', healthHandler);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Storage mode: ${getDBStatus() ? 'MongoDB' : 'In-Memory Store (Zero configuration)'}`);
  });
};

startServer();

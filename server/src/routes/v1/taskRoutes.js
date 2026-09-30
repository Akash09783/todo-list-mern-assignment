import express from 'express';
import {
  getTasks,
  searchTasks,
  createTask,
  updateTask,
  deleteTask,
  getWeeklySummary
} from '../../controllers/taskController.js';
import { validateTaskPayload } from '../../middlewares/validateTask.js';

export const createV1Routes = () => {
  const router = express.Router();

  router.get('/tasks/search', searchTasks);
  router.get('/tasks', getTasks);
  router.post('/tasks', validateTaskPayload, createTask);
  router.put('/tasks/:id', validateTaskPayload, updateTask);
  router.delete('/tasks/:id', deleteTask);
  router.get('/weeks/summary', getWeeklySummary);

  return router;
};


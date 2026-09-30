import express from 'express';
import { createV1Routes } from './v1/taskRoutes.js';

export const createRoutes = () => {
  const router = express.Router();

  router.use('/v1', createV1Routes());
  router.use('/', createV1Routes());

  return router;
};


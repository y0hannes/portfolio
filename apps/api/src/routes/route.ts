import express from 'express';
import { 
  getProjects,
  postProject,
  updateProject,
  deleteProject
} from '../controllers/projectsController';

import {
  getMessages,
  createMessage,
  deleteMessage
} from '../controllers/messageController';

import { login, authenticateAdmin } from '../controllers/authController';
import upload from '../middlewares/upload';

const routes = express.Router();

routes.post('/login', login);
routes.get('/projects', getProjects);
routes.post('/projects', authenticateAdmin, upload.single('image'), postProject);
routes.put('/projects/:id', authenticateAdmin, upload.single('image'), updateProject);
routes.delete('/projects/:id', authenticateAdmin, deleteProject);
routes.get('/messages', authenticateAdmin, getMessages);
routes.post('/messages', createMessage);
routes.delete('/messages/:id', authenticateAdmin, deleteMessage);

export default routes;
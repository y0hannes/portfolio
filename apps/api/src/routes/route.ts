import express from 'express';
import {
  getProjects,
  postProject,
  updateProject,
  deleteProject,
} from '../controllers/projectsController';

import {
  getExperiences,
  postExperience,
  updateExperience,
  deleteExperience,
} from '../controllers/experienceController';

import {
  getCertificates,
  postCertificate,
  updateCertificate,
  deleteCertificate,
} from '../controllers/certificateController';

import {
  getMessages,
  createMessage,
  deleteMessage,
} from '../controllers/messageController';

import { login, authenticateAdmin } from '../controllers/authController';
import upload from '../middlewares/upload';

const routes = express.Router();

routes.post('/login', login);
routes.get('/projects', getProjects);
routes.post(
  '/projects',
  authenticateAdmin,
  upload.single('image'),
  postProject,
);
routes.put(
  '/projects/:id',
  authenticateAdmin,
  upload.single('image'),
  updateProject,
);
routes.delete('/projects/:id', authenticateAdmin, deleteProject);
routes.get('/messages', authenticateAdmin, getMessages);
routes.post('/messages', createMessage);
routes.delete('/messages/:id', authenticateAdmin, deleteMessage);

routes.get('/experiences', getExperiences);
routes.post('/experiences', authenticateAdmin, postExperience);
routes.put('/experiences/:id', authenticateAdmin, updateExperience);
routes.delete('/experiences/:id', authenticateAdmin, deleteExperience);

routes.get('/certificates', getCertificates);
routes.post('/certificates', authenticateAdmin, postCertificate);
routes.put('/certificates/:id', authenticateAdmin, updateCertificate);
routes.delete('/certificates/:id', authenticateAdmin, deleteCertificate);

export default routes;

const { getProjects,
  postProject,
  updateProject,
  deleteProject
} = require('../controllers/projectsController')

const {
  getMessages,
  createMessage,
  deleteMessage
} = require('../controllers/messageController')

const { login, authenticateAdmin } = require('../controllers/authController')
const upload = require('../middlewares/upload')

const express = require('express')
const routes = express.Router()

routes.post('/login', login)
routes.get('/projects', getProjects)
routes.post('/projects', authenticateAdmin, upload.single('image'), postProject)
routes.put('/projects/:id', authenticateAdmin, updateProject)
routes.delete('/projects/:id', authenticateAdmin, deleteProject)
routes.get('/messages', authenticateAdmin, getMessages)
routes.post('/messages', createMessage)
routes.delete('/messages/:id', authenticateAdmin, deleteMessage)

module.exports = routes
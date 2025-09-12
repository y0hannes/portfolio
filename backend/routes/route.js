const { getProjects,
  postProject,
  updateProject,
  deleteProject
} = require('../controllers/projectsController')

const {
  getMessages,
  createMessage
} = require('../controllers/messageController')

const { login, authenticateAdmin } = require('../controllers/authController')
const upload = require('../middlewares/upload')

const express = require('express')
const routes = express.Router()

routes.post('/login', login)
routes.get('/projects', getProjects)
routes.post('/projects', upload.single('image'), postProject)
routes.put('/projects/:id', updateProject)
routes.delete('/projects/:id', deleteProject)
routes.get('/messages', authenticateAdmin, getMessages)
routes.post('/messages', createMessage)

module.exports = routes
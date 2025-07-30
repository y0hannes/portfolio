
const { getProjects, 
  postProject, 
  updateProject,
  deleteProject
} = require('../controllers/projectsController')

const getMessages = require('../controllers/messageController')

const login = require('../controllers/authController')


const express = require('express') 
const routes = express.Router()

routes.post('/login', login)
routes.get('/projects', getProjects)
routes.post('/projects', postProject)
routes.put('/projects/:slug', updateProject)
routes.delete('/projects/:slug', deleteProject)
routes.get('/messages', getMessages)

module.exports = routes
const express = require('express')
const Project = require('../models/projetModel')

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
    res.status(200).json(projects)
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server error' })
  }
}

const postProject = async (req, res) => {
  try {
    const { title, description, tags, codeLink, demoLink, imageURL } = req.body
    if (!title || !description || !tags || !codeLink || !demoLink || imageURL) {
      return res.send({ err: 'All fields should be filled' })
    }
    const project = new Project({
      title,
      description,
      tags,
      codeLink,
      demoLink,
      imageURL
    })
    await project.save()
    res.status(201).json({ msg: 'Project added successfully', project: project })
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: 'Server error' })
  }
}

const updateProject = async (req, res) => {
  try {
    const { slug } = req.params
    const { title, description, tags, codeLink, demoLink, imageURL } = req.body

    const updatedProject = await Project.findOneAndUpdate(
      { slug },
      { title, description, tags, codeLink, demoLink, imageURL },
      { new: true, runValidators: true }
    )

    if (!updatedProject) {
      return res.status(404).json({ err: 'Project not found' })
    }

    res.status(200).json({ msg: 'Project updated successfully', project: updatedProject })
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: 'Server error' })
  }
}

const deleteProject = async (req, res) => {
  try {
    const { slug } = req.params
    const project = await Project.findOne({ slug })
    if (!project) {
      return res.status(400).json({ err: 'Project not found' })
    }
    await project.delete()
    res.status(200).json({ msg: 'Project deleted successfully' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ err: 'Server error' })
  }
}


module.exports = getProjects, postProject, updateProject, deleteProject
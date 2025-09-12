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
    const { title, description, tags, codeLink, isFinished, link } = req.body
    const imageUrl = req.file ? req.file.path : null;
    if (!title || !description || !tags || !codeLink) {
      return res.status(400).json({ err: 'All fields should be filled' })
    }
    const parsedTags = tags.split(',').map(tag => tag.trim())

    const project = new Project({
      title,
      description,
      tags: parsedTags,
      codeLink,
      isFinished,
      link,
      imageUrl
    })
    await project.save()
    res.status(201).json({ msg: 'Project added successfully' })
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ err: messages });
    }
    console.error(err)
    res.status(500).json({ err: 'Server error' })
  }
}

const updateProject = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, tags, codeLink, imageUrl } = req.body

    const updatedProject = await Project.findOneAndUpdate(
      { id },
      { title, description, tags, codeLink, imageUrl },
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
    const { id } = req.params.id
    const project = await Project.findById(id)
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

module.exports = { getProjects, postProject, updateProject, deleteProject }
const express = require('express')
const Project = require('../models/projectModel')

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
    res.status(200).json(projects)
  }
  catch (err) {
    res.status(500).json({ err: 'Server error' })
  }
}

const postProject = async (req, res, next) => {
  try {
    const { title, description, tags, codeLink, link } = req.body
    const isFinished = req.body.isFinished === 'true' || req.body.isFinished === true
    const imageUrl = req.file ? req.file.path : req.body.imageUrl;
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
    next(err)
    res.status(500).json({ err: 'Server error' })
  }
}

const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params
    const { title, description, tags, codeLink } = req.body
    const imageUrl = req.file ? req.file.path : req.body.imageUrl;

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { title, description, tags, codeLink, imageUrl },
      { new: true, runValidators: true }
    )

    if (!updatedProject) {
      return res.status(404).json({ err: 'Project not found' })
    }

    res.status(200).json({ msg: 'Project updated successfully', project: updatedProject })
  } catch (err) {
    next(err)
    res.status(500).json({ err: 'Server error' })
  }
}

const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params
    const project = await Project.findByIdAndDelete(id)
    if (!project) {
      return res.status(400).json({ err: 'Project not found' })
    }
    res.status(200).json({ msg: 'Project deleted successfully' })
  } catch (err) {
    next(err)
    res.status(500).json({ err: 'Server error' })
  }
}

module.exports = { getProjects, postProject, updateProject, deleteProject }
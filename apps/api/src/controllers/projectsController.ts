import { Request, Response, NextFunction } from "express";
import Project from '../models/projectModel';

const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find()
    res.status(200).json(projects)
  }
  catch (err) {
    res.status(500).json({ err: 'Server error' })
  }
}

const postProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, tags, codeLink, link } = req.body
    const isFinished = req.body.isFinished === 'true' || req.body.isFinished === true
    const imageUrl = req.file ? req.file.path : req.body.imageUrl;
    if (!title || !description || !tags || !codeLink) {
      return res.status(400).json({ err: 'All fields should be filled' })
    }
    const parsedTags = Array.isArray(tags) ? tags : tags.split(',').map((tag: string) => tag.trim())

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
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((val: any) => val.message);
      return res.status(400).json({ err: messages });
    }
    next(err)
  }
}

const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { title, description, tags, codeLink, isFinished, link } = req.body
    const imageUrl = req.file ? req.file.path : req.body.imageUrl;
    const parsedTags = tags ? (Array.isArray(tags) ? tags : tags.split(',').map((tag: string) => tag.trim())) : undefined;

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { title, description, tags: parsedTags, codeLink, isFinished, link, imageUrl },
      { new: true, runValidators: true }
    )

    if (!updatedProject) {
      return res.status(404).json({ err: 'Project not found' })
    }

    res.status(200).json({ msg: 'Project updated successfully', project: updatedProject })
  } catch (err) {
    next(err)
  }
}

const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const project = await Project.findByIdAndDelete(id)
    if (!project) {
      return res.status(400).json({ err: 'Project not found' })
    }
    res.status(200).json({ msg: 'Project deleted successfully' })
  } catch (err) {
    next(err)
  }
}

export { getProjects, postProject, updateProject, deleteProject }
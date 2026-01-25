"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.postProject = exports.getProjects = void 0;
const projectModel_1 = __importDefault(require("../models/projectModel"));
const getProjects = async (req, res) => {
    try {
        const projects = await projectModel_1.default.find();
        res.status(200).json(projects);
    }
    catch (err) {
        res.status(500).json({ err: 'Server error' });
    }
};
exports.getProjects = getProjects;
const postProject = async (req, res, next) => {
    try {
        const { title, description, tags, codeLink, link } = req.body;
        const isFinished = req.body.isFinished === 'true' || req.body.isFinished === true;
        const imageUrl = req.file ? req.file.path : req.body.imageUrl;
        if (!title || !description || !tags || !codeLink) {
            return res.status(400).json({ err: 'All fields should be filled' });
        }
        const parsedTags = Array.isArray(tags) ? tags : tags.split(',').map((tag) => tag.trim());
        const project = new projectModel_1.default({
            title,
            description,
            tags: parsedTags,
            codeLink,
            isFinished,
            link,
            imageUrl
        });
        await project.save();
        res.status(201).json({ msg: 'Project added successfully' });
    }
    catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map((val) => val.message);
            return res.status(400).json({ err: messages });
        }
        next(err);
        res.status(500).json({ err: 'Server error' });
    }
};
exports.postProject = postProject;
const updateProject = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, tags, codeLink } = req.body;
        const imageUrl = req.file ? req.file.path : req.body.imageUrl;
        const updatedProject = await projectModel_1.default.findByIdAndUpdate(id, { title, description, tags, codeLink, imageUrl }, { new: true, runValidators: true });
        if (!updatedProject) {
            return res.status(404).json({ err: 'Project not found' });
        }
        res.status(200).json({ msg: 'Project updated successfully', project: updatedProject });
    }
    catch (err) {
        next(err);
        res.status(500).json({ err: 'Server error' });
    }
};
exports.updateProject = updateProject;
const deleteProject = async (req, res, next) => {
    try {
        const { id } = req.params;
        const project = await projectModel_1.default.findByIdAndDelete(id);
        if (!project) {
            return res.status(400).json({ err: 'Project not found' });
        }
        res.status(200).json({ msg: 'Project deleted successfully' });
    }
    catch (err) {
        next(err);
        res.status(500).json({ err: 'Server error' });
    }
};
exports.deleteProject = deleteProject;

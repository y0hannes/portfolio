import { Request, Response, NextFunction } from 'express';
import Experience from '../models/experienceModel';

export const getExperiences = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    res.status(200).json(experiences);
  } catch (err) {
    next(err);
  }
};

export const postExperience = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { role, company, period, description } = req.body;
    if (!role || !company || !period || !description) {
      return res.status(400).json({ err: 'All fields should be filled' });
    }
    const experience = new Experience({ role, company, period, description });
    await experience.save();
    res.status(201).json({ msg: 'Experience added successfully', experience });
  } catch (err) {
    next(err);
  }
};

export const updateExperience = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { role, company, period, description } = req.body;

    const updatedExperience = await Experience.findByIdAndUpdate(
      id,
      { role, company, period, description },
      { new: true, runValidators: true },
    );

    if (!updatedExperience) {
      return res.status(404).json({ err: 'Experience not found' });
    }

    res
      .status(200)
      .json({
        msg: 'Experience updated successfully',
        experience: updatedExperience,
      });
  } catch (err) {
    next(err);
  }
};

export const deleteExperience = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const experience = await Experience.findByIdAndDelete(id);
    if (!experience) {
      return res.status(400).json({ err: 'Experience not found' });
    }
    res.status(200).json({ msg: 'Experience deleted successfully' });
  } catch (err) {
    next(err);
  }
};

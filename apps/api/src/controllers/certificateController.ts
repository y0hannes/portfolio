import { Request, Response, NextFunction } from 'express';
import Certificate from '../models/certificateModel';

export const getCertificates = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 });
    res.status(200).json(certificates);
  } catch (err) {
    next(err);
  }
};

export const postCertificate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, issuer, date, category, icon, verificationUrl } = req.body;
    if (!title || !issuer || !date || !category) {
      return res
        .status(400)
        .json({ err: 'All required fields should be filled' });
    }

    const imageUrl = req.file ? req.file.path : undefined;

    const certificate = new Certificate({
      title,
      issuer,
      date,
      category,
      icon: icon || 'Award',
      imageUrl,
      verificationUrl,
    });
    await certificate.save();
    res
      .status(201)
      .json({ msg: 'Certificate added successfully', certificate });
  } catch (err) {
    next(err);
  }
};

export const updateCertificate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const {
      title,
      issuer,
      date,
      category,
      icon,
      verificationUrl,
      imageUrl: bodyImageUrl,
    } = req.body;

    const imageUrl = req.file ? req.file.path : bodyImageUrl;

    const updatedCertificate = await Certificate.findByIdAndUpdate(
      id,
      { title, issuer, date, category, icon, verificationUrl, imageUrl },
      { new: true, runValidators: true },
    );

    if (!updatedCertificate) {
      return res.status(404).json({ err: 'Certificate not found' });
    }

    res.status(200).json({
      msg: 'Certificate updated successfully',
      certificate: updatedCertificate,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteCertificate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const certificate = await Certificate.findByIdAndDelete(id);
    if (!certificate) {
      return res.status(400).json({ err: 'Certificate not found' });
    }
    res.status(200).json({ msg: 'Certificate deleted successfully' });
  } catch (err) {
    next(err);
  }
};

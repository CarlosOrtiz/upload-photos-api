import { Request, Response } from 'express'
import Photo from '../models/Photo';
import moment from 'moment';
import fse from 'fs-extra';
import path from 'path';
import fs from 'fs';

export const getAllPhotos = async (req: Request, res: Response): Promise<Response> => {
  return res.json(await Photo.find({ state: 'active' }))
}

export const getAllPhotosInactive = async (req: Request, res: Response): Promise<Response> => {
  return res.json(await Photo.find({ state: 'inactive' }))
}

export const getPhotoById = async (req: Request, res: Response): Promise<Response> => {
  return res.json(await Photo.findById(req.params.id))
}

export const createPhoto = async (req: Request, res: Response): Promise<Response> => {
  const { name, detail } = req.body;
  const newFile = {
    name,
    detail,
    url: req.file.path,
    state: 'active',
    date: moment().format("DD MM YYYY h:mm:ss a")
  }
  const data = new Photo(newFile)
  await data.save();

  return res.json({ success: 'OK' })
}

export const deletePhoto = async (req: Request, res: Response): Promise<Response> => {
  const data = await Photo.findByIdAndRemove(req.params.id);
  if (!data)
    return res.json({ error: 'PHOTO_NOT_EXIT', detail: "¡La foto no se encuentra registrada!" })

  if (fs.existsSync(path.resolve(data.url)))
    await fse.unlink(path.resolve(data.url))

  return res.json({ success: 'OK' })
}

export const updatedPhoto = async (req: Request, res: Response): Promise<Response> => {
  const { name, detail } = req.body;
  try {
    const response = await Photo.findByIdAndUpdate(req.params.id, {
      name, detail
    });

    if (!response)
      return res.json({ error: 'PHOTO_NOT_EXIT', detail: "¡La foto no se encuentra registrada!" })

    return res.json({ success: 'OK' })
  } catch (err) {
    return res.json({ err })
  }

}

export const inactivePhoto = async (req: Request, res: Response): Promise<Response> => {
  await Photo.findByIdAndUpdate(req.params.id, {
    state: "inactive"
  });

  return res.json({ success: 'OK' })
}

export const activePhoto = async (req: Request, res: Response): Promise<Response> => {
  await Photo.findByIdAndUpdate(req.params.id, {
    state: "active"
  });

  return res.json({ success: 'OK' })
}


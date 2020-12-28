import { Request, Response } from 'express'
import Photo from '../models/Photo';
import moment from 'moment';
import fse from 'fs-extra';
import path from 'path';
import fs from 'fs';

export const getAllPhotos = async (req: Request, res: Response): Promise<Response> => {
  return res.json(await Photo.PhotoModel.find({ state: 'active' }))
}

export const getAllGallery = async (req: Request, res: Response): Promise<Response> => {
  return res.json(await Photo.Gallery.find({ state: 'active' }))
}

export const getAllPhotosInactive = async (req: Request, res: Response): Promise<Response> => {
  return res.json(await Photo.PhotoModel.find({ state: 'inactive' }))
}

export const getPhotoById = async (req: Request, res: Response): Promise<Response> => {
  return res.json(await Photo.PhotoModel.findById(req.params.id))
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
  const data = new Photo.PhotoModel(newFile)

  await data.save();
  return res.json({ success: 'OK' })
}

export const createGallery = async (req: Request, res: Response): Promise<Response> => {
  let newProduct = new Photo.Gallery({
    name: req.body.name,
    detail: req.body.detail,
    images: req.files,
    state: 'active',
    date: moment().format("DD MM YYYY h:mm:ss a")
  });
  await newProduct.save();
  return res.json({ newProduct });
}

export const deletePhoto = async (req: Request, res: Response): Promise<Response> => {
  const data = await Photo.PhotoModel.findByIdAndRemove(req.params.id);
  if (!data)
    return res.json({ error: 'PHOTO_NOT_EXIT', detail: "¡La foto no se encuentra registrada!" })

  if (fs.existsSync(path.resolve(data.url)))
    await fse.unlink(path.resolve(data.url))

  return res.json({ success: 'OK' })
}

export const deleteGallery = async (req: Request, res: Response): Promise<Response> => {
  const data = await Photo.Gallery.findByIdAndRemove(req.params.id);

  if (!data)
    return res.json({ error: 'GALLERY_NOT_EXIT', detail: "¡La foto no se encuentra registrada!" })

  data?.images.map(async item => {
    if (fs.existsSync(path.resolve(item.path)))
      await fse.unlink(path.resolve(item.path))
  })

  return res.json({ success: 'OK' })
}

export const updatedPhoto = async (req: Request, res: Response): Promise<Response> => {
  const { name, detail } = req.body;
  try {
    const response = await Photo.PhotoModel.findByIdAndUpdate(req.params.id, {
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
  await Photo.PhotoModel.findByIdAndUpdate(req.params.id, {
    state: "inactive"
  });

  return res.json({ success: 'OK' })
}

export const activePhoto = async (req: Request, res: Response): Promise<Response> => {
  await Photo.PhotoModel.findByIdAndUpdate(req.params.id, {
    state: "active"
  });

  return res.json({ success: 'OK' })
}


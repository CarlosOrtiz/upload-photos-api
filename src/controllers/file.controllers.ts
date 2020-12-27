import { Request, Response } from 'express'
import moment from 'moment';
import Photo from '../models/Photo';

export const getAllPhotos = (req: Request, res: Response): Response => {

  return res.json({ success: 'OK' })
}


export const createPhoto = (req: Request, res: Response): Response => {
  console.log('Savaing file')
  const { name, detail } = req.body;
  const newFile = {
    name,
    detail,
    url: req.file.path,
    state: 'active',
    date: moment().format("DD MM YYYY h:mm:ss a")
  }
  const data = new Photo(newFile)

  console.log(data)

  return res.json({ success: 'OK' })
}

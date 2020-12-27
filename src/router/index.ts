import { Router } from 'express';
const router = Router();
import { createPhoto, getAllPhotos } from '../controllers/file.controllers'
import multer from '../../@common/multer';

router.route('/photos')
  .post(multer.single('image'), createPhoto)
  .get(getAllPhotos)

export default router;
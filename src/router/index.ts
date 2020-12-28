import { Router } from 'express';
const router = Router();
import {
  createPhoto,
  getAllPhotos,
  getPhotoById,
  deletePhoto,
  updatedPhoto,
  inactivePhoto,
  getAllPhotosInactive,
  activePhoto
} from '../controllers/file.controllers'
import multer from '../../@common/multer';

router.route('/photos')
  .post(multer.single('image'), createPhoto)
  .get(getAllPhotos)

router.route('/photos/inactive')
  .get(getAllPhotosInactive)

router.route('/photos/:id')
  .get(getPhotoById)
  .delete(deletePhoto)
  .put(updatedPhoto)

router.route('/photos/inactive/:id')
  .put(inactivePhoto)

router.route('/photos/active/:id')
  .put(activePhoto)

export default router;
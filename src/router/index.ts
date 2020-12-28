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
  activePhoto,
  createGallery,
  getAllGallery,
  deleteGallery
} from '../controllers/file.controllers'
import multer from '../../@common/multer';

router.route('/photo')
  .post(multer.single("image"), createPhoto)

router.route('/photos')
  .get(getAllPhotos)

router.route('/gallery')
  .post(multer.array("image", 10), createGallery)
  .get(getAllGallery)

router.route('/gallery/:id')
  .delete(deleteGallery)

router.route('/photos/inactive')
  .get(getAllPhotosInactive)

router.route('/photo/:id')
  .get(getPhotoById)
  .delete(deletePhoto)
  .put(updatedPhoto)

router.route('/photo/inactive/:id')
  .put(inactivePhoto)

router.route('/photo/active/:id')
  .put(activePhoto)

export default router;
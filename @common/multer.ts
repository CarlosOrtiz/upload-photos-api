import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { imageFileFilter } from './file-uploading.utils';
import path from 'path'

const diskStorage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

export default multer({
  storage: diskStorage,
  limits: { fieldSize: 1000000, fileSize: 1000000 },
  fileFilter: imageFileFilter
});
export const imageFileFilter = (req: any, file: any, callback: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(new Error('Solo se permiten archivos de imagen!'), false)
  }
  callback(null, true);
};
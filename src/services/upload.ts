import * as del from 'del';

export const fileFilter = (req, file, cb) => {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|xlsx|xls|csv|zip)$/)) {
    return cb(new Error('File format not allowed!'), false);
  }
  cb(undefined, true);
};

export const cleanFolder = (folderPath: string) => {
  // delete files inside folder but not the folder itself
  del.sync([`${folderPath}/**`, `!${folderPath}`]);
};

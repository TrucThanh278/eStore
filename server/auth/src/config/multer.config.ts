import multer, { memoryStorage, StorageEngine } from 'multer';

export const upload = (
  optionStorage: StorageEngine = memoryStorage(),
  fileSize: number = 4,
) => {
  return multer({
    storage: optionStorage,
    limits: { fileSize: fileSize * 1024 * 1024 }, // 4MB
    // fileFilter: (req, file, cb) => {
    //     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    //         cb(null, true);
    //     } else {
    //         cb(new Error('Only JPG and PNG images are allowed.'), false);
    //     }
    // }
  });
};

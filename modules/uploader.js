//загрузка нового изображения
const path = require('path');
const multer = require('multer');

let storage = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, path.join('public', 'tmp'))
  },
  filename (req, file, cb) {
    cb(null, `spaceindex_${Date.now()}_${file.originalname}`);
  }
})

module.exports = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter (req, file, cb) {
    let mime = file.mimetype;
    if (mime.indexOf('image') === -1) {
      cb(null, false);
    }else{
      cb(null, true);
    }
  }
}).single('image');

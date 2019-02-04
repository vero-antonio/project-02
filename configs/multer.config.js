const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const CLOUDINARY_KEY = process.env.CLOUDINARY_KEY;
const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET;
const CLOUDINARY_CLOUD = process.env.CLOUDINARY_CLOUD;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'event-pics',
  allowedFormats: ['jpg', 'png', 'jpeg'],
  filename: (req, file, next) => {
    next(undefined, file.originalname);
  }
})

const upload = multer({
  storage: storage,
  fileFilter: (req, file, next) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
      next(null, false, new Error('Only image files are allowed!'));
    } else {
      next(null, true);
    }
  }
});

module.exports = upload;
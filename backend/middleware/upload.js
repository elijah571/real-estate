import multer from "multer";
import path from "path";

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Define folder to store files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

// File filter (only image files allowed)
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extname && mimeType) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
};

// Create the upload instance
export const upload = multer({ storage, fileFilter });


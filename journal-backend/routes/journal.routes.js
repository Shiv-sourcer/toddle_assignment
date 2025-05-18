const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journal.controller');
const authMiddleware = require('../middleware/auth.middleware');
const multer = require('multer');

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // upload destination folder
  },
  filename: function (req, file, cb) {
    // Save with original filename + timestamp for uniqueness
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

// File filter to accept only certain file types (image, video, pdf)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|pdf/;
  const ext = file.originalname.toLowerCase();

  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only images, videos, and PDFs are allowed'));
  }
};

const upload = multer({ storage, fileFilter });

router.use(authMiddleware);

// Update journal creation endpoint to accept file upload
router.post('/', upload.single('attachment'), journalController.createJournal);

// Other routes...
module.exports = router;


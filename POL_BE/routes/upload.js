const express = require('express');
const router = express.Router();
const { upload, formatFileUrl } = require('../middleware/upload');

// @route   POST /api/upload
// @desc    Upload single image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }
    const fileData = formatFileUrl(req, req.file);
    res.json(fileData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/upload/multiple
// @desc    Upload multiple images
router.post('/multiple', upload.array('images', 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No image files provided' });
    }
    const uploadedImages = req.files.map((file) => formatFileUrl(req, file));
    res.json(uploadedImages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

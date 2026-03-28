const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { upload } = require('../middleware/upload');
const cloudinary = require('../config/cloudinary');
const authMiddleware = require('../middleware/authMiddleware');

// @route   GET /api/products
// @desc    Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/products
// @desc    Create a new product with images
router.post('/', authMiddleware, upload.array('images', 5), async (req, res) => {
  try {
    const { name, category, price, originalPrice, badge, inStock, specs, description } = req.body;

    // Get image URLs from uploaded files
    const images = req.files ? req.files.map((file) => file.path) : [];

    // Parse specs if it's a string (comma-separated)
    let parsedSpecs = specs;
    if (typeof specs === 'string') {
      parsedSpecs = specs.split(',').map((s) => s.trim()).filter((s) => s.length > 0);
    }

    const product = new Product({
      name,
      category,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      images,
      badge,
      inStock: inStock === 'true' || inStock === true,
      specs: parsedSpecs || [],
      description,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/products/:id
// @desc    Update a product
router.put('/:id', authMiddleware, upload.array('newImages', 5), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const { name, category, price, originalPrice, badge, inStock, specs, description, existingImages } = req.body;

    // Parse existing images
    let images = [];
    if (existingImages) {
      images = typeof existingImages === 'string' ? JSON.parse(existingImages) : existingImages;
    }

    // Add new uploaded images
    if (req.files && req.files.length > 0) {
      const newImageUrls = req.files.map((file) => file.path);
      images = [...images, ...newImageUrls];
    }

    // Enforce max 5 images
    if (images.length > 5) {
      images = images.slice(0, 5);
    }

    // Parse specs if it's a string
    let parsedSpecs = specs;
    if (typeof specs === 'string') {
      parsedSpecs = specs.split(',').map((s) => s.trim()).filter((s) => s.length > 0);
    }

    product.name = name || product.name;
    product.category = category || product.category;
    product.price = price ? Number(price) : product.price;
    product.originalPrice = originalPrice ? Number(originalPrice) : undefined;
    product.images = images;
    product.badge = badge !== undefined ? badge : product.badge;
    product.inStock = inStock !== undefined ? (inStock === 'true' || inStock === true) : product.inStock;
    product.specs = parsedSpecs || product.specs;
    product.description = description || product.description;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product and its Cloudinary images
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete images from Cloudinary
    for (const imageUrl of product.images) {
      try {
        // Extract public_id from Cloudinary URL
        const urlParts = imageUrl.split('/');
        const filename = urlParts[urlParts.length - 1];
        const publicId = `pol-products/${filename.split('.')[0]}`;
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.error('Error deleting image from Cloudinary:', err);
      }
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/products/:id/images
// @desc    Add images to an existing product
router.post('/:id/images', authMiddleware, upload.array('images', 5), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No images provided' });
    }

    const currentCount = product.images.length;
    const availableSlots = 5 - currentCount;

    if (availableSlots <= 0) {
      return res.status(400).json({ message: 'Product already has maximum 5 images' });
    }

    const newImages = req.files.slice(0, availableSlots).map((file) => file.path);
    product.images = [...product.images, ...newImages];

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/products/:id/images/:imageIndex
// @desc    Remove a specific image from a product
router.delete('/:id/images/:imageIndex', authMiddleware, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const imageIndex = parseInt(req.params.imageIndex);
    if (imageIndex < 0 || imageIndex >= product.images.length) {
      return res.status(400).json({ message: 'Invalid image index' });
    }

    const imageUrl = product.images[imageIndex];

    // Delete from Cloudinary
    try {
      const urlParts = imageUrl.split('/');
      const filename = urlParts[urlParts.length - 1];
      const publicId = `pol-products/${filename.split('.')[0]}`;
      await cloudinary.uploader.destroy(publicId);
    } catch (err) {
      console.error('Error deleting image from Cloudinary:', err);
    }

    product.images.splice(imageIndex, 1);
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

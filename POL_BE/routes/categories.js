const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const authMiddleware = require('../middleware/authMiddleware');

// @route   GET /api/categories
// @desc    Get all categories (optionally filter by section or active status)
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { section, isActive } = req.query;
        let query = {};
        if (section) query.section = section;
        if (isActive !== undefined) query.isActive = isActive === 'true';

        const categories = await Category.find(query).sort({ name: 1 });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/categories/:id
// @desc    Get single category by ID or slug
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        let category = await Category.findById(req.params.id).catch(() => null);
        if (!category) {
            category = await Category.findOne({ slug: req.params.id });
        }
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/categories
// @desc    Create a new category
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { name, section } = req.body;

        // Check if category already exists in that section
        const exists = await Category.findOne({ name: new RegExp('^' + name + '$', 'i'), section });
        if (exists) {
            return res.status(400).json({ message: `Category '${name}' already exists in ${section}` });
        }

        const category = new Category(req.body);
        const savedCategory = await category.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Category slug already exists' });
        }
        res.status(400).json({ message: error.message });
    }
});

// @route   PUT /api/categories/:id
// @desc    Update a category
// @access  Private
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        let category = await Category.findById(req.params.id).catch(() => null);
        if (!category) {
            category = await Category.findOne({ slug: req.params.id });
        }
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // If renaming, check for duplicates in the same section
        if (req.body.name && req.body.name !== category.name) {
            const section = req.body.section || category.section;
            const exists = await Category.findOne({
                name: new RegExp('^' + req.body.name + '$', 'i'),
                section,
                _id: { $ne: category._id }
            });
            if (exists) {
                return res.status(400).json({ message: `Category '${req.body.name}' already exists in ${section}` });
            }
        }

        Object.assign(category, req.body);

        // Recalculate slug if name changed
        if (req.body.name) {
            category.slug = category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        }

        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Category slug already exists' });
        }
        res.status(400).json({ message: error.message });
    }
});

// @route   DELETE /api/categories/:id
// @desc    Delete a category
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        let category = await Category.findByIdAndDelete(req.params.id).catch(() => null);
        if (!category) {
            category = await Category.findOneAndDelete({ slug: req.params.id });
        }
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

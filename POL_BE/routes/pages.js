const express = require('express');
const router = express.Router();
const Page = require('../models/Page');
const authMiddleware = require('../middleware/authMiddleware');

// @route   GET /api/pages
// @desc    Get all pages (metadata)
// @access  Public
router.get('/', async (req, res) => {
    try {
        const pages = await Page.find({}, 'name title updatedAt');
        res.json(pages);
    } catch (error) {
        console.error('Fetch pages error:', error);
        res.status(500).json({ message: 'Server error fetching pages' });
    }
});

// @route   GET /api/pages/:name
// @desc    Get page content by name
// @access  Public
router.get('/:name', async (req, res) => {
    try {
        const page = await Page.findOne({ name: req.params.name.toLowerCase() });
        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }
        res.json(page);
    } catch (error) {
        console.error('Fetch page error:', error);
        res.status(500).json({ message: 'Server error fetching page content' });
    }
});

// @route   PUT /api/pages/:name
// @desc    Update page content
// @access  Private (Admin)
router.put('/:name', authMiddleware, async (req, res) => {
    try {
        const { sections, title } = req.body;

        let page = await Page.findOne({ name: req.params.name.toLowerCase() });

        if (!page) {
            // Create if it doesn't exist
            page = new Page({
                name: req.params.name.toLowerCase(),
                title: title || req.params.name,
                sections: sections || []
            });
        } else {
            // Update existing
            if (title) page.title = title;
            if (sections) page.sections = sections;
        }

        await page.save();
        res.json(page);
    } catch (error) {
        console.error('Update page error:', error);
        res.status(500).json({ message: 'Server error updating page content' });
    }
});

// @route   PATCH /api/pages/:name/sections/:sectionId
// @desc    Update a specific section of a page
// @access  Private (Admin)
router.patch('/:name/sections/:sectionId', authMiddleware, async (req, res) => {
    try {
        const { content, enabled } = req.body;

        const page = await Page.findOne({ name: req.params.name.toLowerCase() });
        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }

        const sectionIndex = page.sections.findIndex(s => s.id === req.params.sectionId);
        if (sectionIndex === -1) {
            return res.status(404).json({ message: 'Section not found' });
        }

        if (content !== undefined) page.sections[sectionIndex].content = content;
        if (enabled !== undefined) page.sections[sectionIndex].enabled = enabled;

        await page.save();
        res.json(page.sections[sectionIndex]);
    } catch (error) {
        console.error('Update section error:', error);
        res.status(500).json({ message: 'Server error updating section content' });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const authMiddleware = require('../middleware/authMiddleware');

// @route   GET /api/settings
// @desc    Get app settings (singleton)
router.get('/', async (req, res) => {
  try {
    const settings = await Settings.getSettings();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PATCH /api/settings
// @desc    Update app settings
router.patch('/', authMiddleware, async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    const updatedSettings = await settings.save();
    res.json(updatedSettings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/settings
// @desc    Replace app settings
router.put('/', authMiddleware, async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings(req.body);
    } else {
      settings.showScrollingHeadline = req.body.showScrollingHeadline ?? settings.showScrollingHeadline;
      settings.showSidebar = req.body.showSidebar ?? settings.showSidebar;
      settings.enableTicketing = req.body.enableTicketing ?? settings.enableTicketing;
      settings.maintenanceMode = req.body.maintenanceMode ?? settings.maintenanceMode;
      settings.headlines = req.body.headlines ?? settings.headlines;
    }
    const updatedSettings = await settings.save();
    res.json(updatedSettings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

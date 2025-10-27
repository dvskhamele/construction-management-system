// Site Engineer Routes for Construction Management System
const express = require('express');
const router = express.Router();
const SiteEngineerModel = require('../models/siteEngineerModel');

// Initialize site engineer model
let siteEngineerModel;

// Middleware to initialize site engineer model
router.use((req, res, next) => {
  if (!siteEngineerModel) {
    siteEngineerModel = new SiteEngineerModel();
  }
  next();
});

// Create a new site engineer record
router.post('/site-engineers', async (req, res) => {
  try {
    const { name, employeeId, phone, email, qualification, experience, specialization, currentSiteId, currentProjectId, salary, joiningDate, emergencyContact, address, skills, certifications } = req.body;
    
    // Validate required fields
    if (!name || !employeeId || !phone) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: name, employeeId, phone' 
      });
    }
    
    const engineerData = {
      name,
      employeeId,
      phone,
      email,
      qualification,
      experience,
      specialization,
      currentSiteId,
      currentProjectId,
      salary,
      joiningDate,
      emergencyContact,
      address,
      skills,
      certifications
    };
    
    const result = await siteEngineerModel.createSiteEngineer(engineerData);
    
    res.status(201).json({ 
      success: true, 
      message: 'Site engineer created successfully',
      engineer: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get all site engineers
router.get('/site-engineers', async (req, res) => {
  try {
    const result = await siteEngineerModel.getAllSiteEngineers();
    
    res.json({ 
      success: true, 
      engineers: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get site engineer by ID
router.get('/site-engineers/:id', async (req, res) => {
  try {
    const result = await siteEngineerModel.getSiteEngineerById(parseInt(req.params.id));
    
    if (!result) {
      return res.status(404).json({ 
        success: false, 
        error: 'Site engineer not found' 
      });
    }
    
    res.json({ 
      success: true, 
      engineer: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Update site engineer details
router.put('/site-engineers/:id', async (req, res) => {
  try {
    const updateData = req.body;
    
    const result = await siteEngineerModel.updateSiteEngineer(parseInt(req.params.id), updateData);
    
    if (!result) {
      return res.status(404).json({ 
        success: false, 
        error: 'Site engineer not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Site engineer updated successfully',
      engineer: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Assign site to engineer
router.put('/site-engineers/:id/sites/:siteId', async (req, res) => {
  try {
    const result = await siteEngineerModel.assignSiteToEngineer(parseInt(req.params.id), parseInt(req.params.siteId));
    
    if (!result) {
      return res.status(404).json({ 
        success: false, 
        error: 'Site engineer not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Site assigned to engineer successfully',
      engineer: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Assign project to engineer
router.put('/site-engineers/:id/projects/:projectId', async (req, res) => {
  try {
    const result = await siteEngineerModel.assignProjectToEngineer(parseInt(req.params.id), parseInt(req.params.projectId));
    
    if (!result) {
      return res.status(404).json({ 
        success: false, 
        error: 'Site engineer not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Project assigned to engineer successfully',
      engineer: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Remove site assignment from engineer
router.delete('/site-engineers/:id/sites/:siteId', async (req, res) => {
  try {
    const result = await siteEngineerModel.removeSiteAssignment(parseInt(req.params.id), parseInt(req.params.siteId));
    
    if (!result) {
      return res.status(404).json({ 
        success: false, 
        error: 'Site engineer not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Site assignment removed from engineer successfully',
      engineer: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Remove project assignment from engineer
router.delete('/site-engineers/:id/projects/:projectId', async (req, res) => {
  try {
    const result = await siteEngineerModel.removeProjectAssignment(parseInt(req.params.id), parseInt(req.params.projectId));
    
    if (!result) {
      return res.status(404).json({ 
        success: false, 
        error: 'Site engineer not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Project assignment removed from engineer successfully',
      engineer: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get engineers by current site
router.get('/sites/:siteId/site-engineers', async (req, res) => {
  try {
    const result = await siteEngineerModel.getEngineersByCurrentSite(parseInt(req.params.siteId));
    
    res.json({ 
      success: true, 
      engineers: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get engineers by current project
router.get('/projects/:projectId/site-engineers', async (req, res) => {
  try {
    const result = await siteEngineerModel.getEngineersByCurrentProject(parseInt(req.params.projectId));
    
    res.json({ 
      success: true, 
      engineers: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get engineers by specialization
router.get('/site-engineers/specialization/:specialization', async (req, res) => {
  try {
    const result = await siteEngineerModel.getEngineersBySpecialization(req.params.specialization);
    
    res.json({ 
      success: true, 
      engineers: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get engineers by status
router.get('/site-engineers/status/:status', async (req, res) => {
  try {
    const result = await siteEngineerModel.getEngineersByStatus(req.params.status);
    
    res.json({ 
      success: true, 
      engineers: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Update engineer performance rating
router.put('/site-engineers/:id/performance-rating', async (req, res) => {
  try {
    const { rating } = req.body;
    
    if (rating === undefined || rating === null) {
      return res.status(400).json({ 
        success: false, 
        error: 'Rating is required' 
      });
    }
    
    const result = await siteEngineerModel.updateEngineerPerformanceRating(parseInt(req.params.id), rating);
    
    if (!result) {
      return res.status(404).json({ 
        success: false, 
        error: 'Site engineer not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Engineer performance rating updated successfully',
      engineer: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get top performing engineer
router.get('/site-engineers/top-performing', async (req, res) => {
  try {
    const result = await siteEngineerModel.getTopPerformingEngineer();
    
    res.json({ 
      success: true, 
      engineer: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get most experienced engineer
router.get('/site-engineers/most-experienced', async (req, res) => {
  try {
    const result = await siteEngineerModel.getMostExperiencedEngineer();
    
    res.json({ 
      success: true, 
      engineer: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get engineers by experience level
router.get('/site-engineers/experience', async (req, res) => {
  try {
    const { minExperience, maxExperience } = req.query;
    
    if (!minExperience || !maxExperience) {
      return res.status(400).json({ 
        success: false, 
        error: 'minExperience and maxExperience are required' 
      });
    }
    
    const result = await siteEngineerModel.getEngineersByExperience(parseInt(minExperience), parseInt(maxExperience));
    
    res.json({ 
      success: true, 
      engineers: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get engineers by qualification
router.get('/site-engineers/qualification/:qualification', async (req, res) => {
  try {
    const result = await siteEngineerModel.getEngineersByQualification(req.params.qualification);
    
    res.json({ 
      success: true, 
      engineers: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

module.exports = router;
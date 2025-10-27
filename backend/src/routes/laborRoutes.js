// Labor Routes for Construction Management System
const express = require('express');
const router = express.Router();
const LaborModel = require('../models/laborModel');

// Initialize labor model
let laborModel;

// Middleware to initialize labor model
router.use((req, res, next) => {
  if (!laborModel) {
    laborModel = new LaborModel();
  }
  next();
});

// Create a new labor
router.post('/labors', async (req, res) => {
  try {
    const { name, phone, role, dailyWage, projectId, siteId, status, skills, experience, emergencyContact, address, joiningDate } = req.body;
    
    // Validate required fields
    if (!name || !phone || !dailyWage) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: name, phone, dailyWage' 
      });
    }
    
    const laborData = {
      name,
      phone,
      role,
      dailyWage,
      projectId,
      siteId,
      status,
      skills,
      experience,
      emergencyContact,
      address,
      joiningDate
    };
    
    const result = await laborModel.createLabor(laborData);
    
    res.status(201).json({ 
      success: true, 
      message: 'Labor created successfully',
      labor: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get all labors
router.get('/labors', async (req, res) => {
  try {
    const result = await laborModel.getAllLabors();
    
    res.json({ 
      success: true, 
      labors: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get labor by ID
router.get('/labors/:id', async (req, res) => {
  try {
    const result = await laborModel.getLaborById(parseInt(req.params.id));
    
    if (!result) {
      return res.status(404).json({ 
        success: false, 
        error: 'Labor not found' 
      });
    }
    
    res.json({ 
      success: true, 
      labor: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Update labor details
router.put('/labors/:id', async (req, res) => {
  try {
    const updateData = req.body;
    
    const result = await laborModel.updateLabor(parseInt(req.params.id), updateData);
    
    if (!result) {
      return res.status(404).json({ 
        success: false, 
        error: 'Labor not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Labor updated successfully',
      labor: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get labors by project
router.get('/projects/:projectId/labors', async (req, res) => {
  try {
    const result = await laborModel.getLaborsByProject(parseInt(req.params.projectId));
    
    res.json({ 
      success: true, 
      labors: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get labors by site
router.get('/sites/:siteId/labors', async (req, res) => {
  try {
    const result = await laborModel.getLaborsBySite(parseInt(req.params.siteId));
    
    res.json({ 
      success: true, 
      labors: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Update labor attendance
router.put('/labors/:id/attendance', async (req, res) => {
  try {
    const { date, status } = req.body;
    
    if (!date || !status) {
      return res.status(400).json({ 
        success: false, 
        error: 'Date and status are required' 
      });
    }
    
    const result = await laborModel.updateLaborAttendance(parseInt(req.params.id), date, status);
    
    if (!result) {
      return res.status(404).json({ 
        success: false, 
        error: 'Labor not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Labor attendance updated successfully',
      labor: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get labors by status
router.get('/labors/status/:status', async (req, res) => {
  try {
    const result = await laborModel.getLaborsByStatus(req.params.status);
    
    res.json({ 
      success: true, 
      labors: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get absent labors for a specific date
router.get('/labors/absent/:date', async (req, res) => {
  try {
    const result = await laborModel.getAbsentLaborsForDate(req.params.date);
    
    res.json({ 
      success: true, 
      labors: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get present labors for a specific date
router.get('/labors/present/:date', async (req, res) => {
  try {
    const result = await laborModel.getPresentLaborsForDate(req.params.date);
    
    res.json({ 
      success: true, 
      labors: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

module.exports = router;
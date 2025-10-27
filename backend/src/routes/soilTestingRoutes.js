// Soil Testing Routes for Construction Management System
const express = require('express');
const router = express.Router();
const SoilTestingModel = require('../models/soilTestingModel');

// Initialize soil testing model
let soilTestingModel;

// Middleware to initialize soil testing model
router.use((req, res, next) => {
  if (!soilTestingModel) {
    soilTestingModel = new SoilTestingModel();
  }
  next();
});

// Create a new soil test request
router.post('/soil-tests', async (req, res) => {
  try {
    const { projectId, projectType, location, contractorId, status, testDate, required, testResults, bearingCapacity, reportUrl } = req.body;
    
    // Validate required fields
    if (!projectId || !projectType || !location || !contractorId) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: projectId, projectType, location, contractorId' 
      });
    }
    
    const testData = {
      projectId,
      projectType,
      location,
      contractorId,
      status,
      testDate,
      required,
      testResults,
      bearingCapacity,
      reportUrl
    };
    
    const result = await soilTestingModel.createSoilTest(testData);
    
    res.status(201).json({ 
      success: true, 
      message: 'Soil test created successfully',
      soilTest: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get all soil tests
router.get('/soil-tests', async (req, res) => {
  try {
    const result = await soilTestingModel.getAllSoilTests();
    
    res.json({ 
      success: true, 
      soilTests: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get soil test by ID
router.get('/soil-tests/:id', async (req, res) => {
  try {
    const result = await soilTestingModel.getSoilTestById(parseInt(req.params.id));
    
    if (!result) {
      return res.status(404).json({ 
        success: false, 
        error: 'Soil test not found' 
      });
    }
    
    res.json({ 
      success: true, 
      soilTest: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Update soil test status
router.put('/soil-tests/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ 
        success: false, 
        error: 'Status is required' 
      });
    }
    
    const result = await soilTestingModel.updateSoilTestStatus(parseInt(req.params.id), status);
    
    if (!result) {
      return res.status(404).json({ 
        success: false, 
        error: 'Soil test not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Soil test status updated successfully',
      soilTest: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Update soil test results
router.put('/soil-tests/:id/results', async (req, res) => {
  try {
    const { testResults, bearingCapacity, reportUrl } = req.body;
    
    const resultsData = {
      testResults,
      bearingCapacity,
      reportUrl
    };
    
    const result = await soilTestingModel.updateSoilTestResults(parseInt(req.params.id), resultsData);
    
    if (!result) {
      return res.status(404).json({ 
        success: false, 
        error: 'Soil test not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Soil test results updated successfully',
      soilTest: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get soil tests by project ID
router.get('/projects/:projectId/soil-tests', async (req, res) => {
  try {
    const result = await soilTestingModel.getSoilTestsByProject(parseInt(req.params.projectId));
    
    res.json({ 
      success: true, 
      soilTests: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get soil tests by contractor ID
router.get('/contractors/:contractorId/soil-tests', async (req, res) => {
  try {
    const result = await soilTestingModel.getSoilTestsByContractor(parseInt(req.params.contractorId));
    
    res.json({ 
      success: true, 
      soilTests: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get pending soil tests
router.get('/soil-tests/pending', async (req, res) => {
  try {
    const result = await soilTestingModel.getPendingSoilTests();
    
    res.json({ 
      success: true, 
      soilTests: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

module.exports = router;
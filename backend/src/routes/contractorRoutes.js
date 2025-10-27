// Contractor Routes for Construction Management System
const express = require('express');
const router = express.Router();
const ContractorModel = require('../models/contractorModel');

// Initialize contractor model
let contractorModel;

// Middleware to initialize contractor model
router.use((req, res, next) => {
  if (!contractorModel) {
    contractorModel = new ContractorModel();
  }
  next();
});

// Create a new contractor
router.post('/contractors', async (req, res) => {
  try {
    const { name, company, phone, email, address, licenseNumber, specialization, experience, rating, bankDetails, emergencyContact, taxInfo, insuranceInfo } = req.body;
    
    // Validate required fields
    if (!name || !company || !phone) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: name, company, phone' 
      });
    }
    
    const contractorData = {
      name,
      company,
      phone,
      email,
      address,
      licenseNumber,
      specialization,
      experience,
      rating,
      bankDetails,
      emergencyContact,
      taxInfo,
      insuranceInfo
    };
    
    const result = await contractorModel.createContractor(contractorData);
    
    res.status(201).json({ 
      success: true, 
      message: 'Contractor created successfully',
      contractor: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get all contractors
router.get('/contractors', async (req, res) => {
  try {
    const result = await contractorModel.getAllContractors();
    
    res.json({ 
      success: true, 
      contractors: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get contractor by ID
router.get('/contractors/:id', async (req, res) => {
  try {
    const result = await contractorModel.getContractorById(parseInt(req.params.id));
    
    if (!result) {
      return res.status(404).json({ 
        success: false, 
        error: 'Contractor not found' 
      });
    }
    
    res.json({ 
      success: true, 
      contractor: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Update contractor details
router.put('/contractors/:id', async (req, res) => {
  try {
    const updateData = req.body;
    
    const result = await contractorModel.updateContractor(parseInt(req.params.id), updateData);
    
    if (!result) {
      return res.status(404).json({ 
        success: false, 
        error: 'Contractor not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Contractor updated successfully',
      contractor: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Assign contractor to a project
router.put('/contractors/:id/projects/:projectId', async (req, res) => {
  try {
    const result = await contractorModel.assignContractorToProject(parseInt(req.params.id), parseInt(req.params.projectId));
    
    if (!result) {
      return res.status(404).json({ 
        success: false, 
        error: 'Contractor not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Contractor assigned to project successfully',
      contractor: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Remove contractor from project
router.delete('/contractors/:id/projects/:projectId', async (req, res) => {
  try {
    const result = await contractorModel.removeContractorFromProject(parseInt(req.params.id), parseInt(req.params.projectId));
    
    if (!result) {
      return res.status(404).json({ 
        success: false, 
        error: 'Contractor not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Contractor removed from project successfully',
      contractor: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get contractors by specialization
router.get('/contractors/specialization/:specialization', async (req, res) => {
  try {
    const result = await contractorModel.getContractorsBySpecialization(req.params.specialization);
    
    res.json({ 
      success: true, 
      contractors: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get contractors by status
router.get('/contractors/status/:status', async (req, res) => {
  try {
    const result = await contractorModel.getContractorsByStatus(req.params.status);
    
    res.json({ 
      success: true, 
      contractors: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get contractors by project
router.get('/projects/:projectId/contractors', async (req, res) => {
  try {
    const result = await contractorModel.getContractorsByProject(parseInt(req.params.projectId));
    
    res.json({ 
      success: true, 
      contractors: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Update contractor rating
router.put('/contractors/:id/rating', async (req, res) => {
  try {
    const { rating } = req.body;
    
    if (rating === undefined || rating === null) {
      return res.status(400).json({ 
        success: false, 
        error: 'Rating is required' 
      });
    }
    
    const result = await contractorModel.updateContractorRating(parseInt(req.params.id), rating);
    
    if (!result) {
      return res.status(404).json({ 
        success: false, 
        error: 'Contractor not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Contractor rating updated successfully',
      contractor: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

module.exports = router;
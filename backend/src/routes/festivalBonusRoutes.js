// Festival Bonus Routes for Construction Management System
const express = require('express');
const router = express.Router();
const FestivalBonusModel = require('../models/festivalBonusModel');

// Initialize festival bonus model
let festivalBonusModel;

// Middleware to initialize festival bonus model
router.use((req, res, next) => {
  if (!festivalBonusModel) {
    festivalBonusModel = new FestivalBonusModel();
  }
  next();
});

// Create a new festival bonus record
router.post('/festival-bonuses', async (req, res) => {
  try {
    const { festivalName, festivalDate, bonusType, employeeId, employeeName, projectId, bonusAmount, eligibilityCriteria, description, approvalRequired, remarks } = req.body;
    
    // Validate required fields
    if (!festivalName || !festivalDate || !employeeId || !employeeName || !bonusAmount) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: festivalName, festivalDate, employeeId, employeeName, bonusAmount' 
      });
    }
    
    const bonusData = {
      festivalName,
      festivalDate,
      bonusType,
      employeeId,
      employeeName,
      projectId,
      bonusAmount,
      eligibilityCriteria,
      description,
      approvalRequired,
      remarks
    };
    
    const result = await festivalBonusModel.createFestivalBonus(bonusData);
    
    res.status(201).json({ 
      success: true, 
      message: 'Festival bonus record created successfully',
      bonus: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get all festival bonuses
router.get('/festival-bonuses', async (req, res) => {
  try {
    const result = await festivalBonusModel.getAllFestivalBonuses();
    
    res.json({ 
      success: true, 
      bonuses: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get festival bonus by ID
router.get('/festival-bonuses/:id', async (req, res) => {
  try {
    const result = await festivalBonusModel.getFestivalBonusById(parseInt(req.params.id));
    
    if (!result) {
      return res.status(404).json({ 
        success: false, 
        error: 'Festival bonus record not found' 
      });
    }
    
    res.json({ 
      success: true, 
      bonus: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Update festival bonus status
router.put('/festival-bonuses/:id/status', async (req, res) => {
  try {
    const { status, updatedBy } = req.body;
    
    if (!status) {
      return res.status(400).json({ 
        success: false, 
        error: 'Status is required' 
      });
    }
    
    const result = await festivalBonusModel.updateFestivalBonusStatus(parseInt(req.params.id), status, updatedBy);
    
    if (!result) {
      return res.status(404).json({ 
        success: false, 
        error: 'Festival bonus record not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Festival bonus status updated successfully',
      bonus: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get festival bonuses by festival name
router.get('/festival-bonuses/festival/:festivalName', async (req, res) => {
  try {
    const result = await festivalBonusModel.getFestivalBonusesByFestival(req.params.festivalName);
    
    res.json({ 
      success: true, 
      bonuses: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get festival bonuses by employee
router.get('/festival-bonuses/employee/:employeeId', async (req, res) => {
  try {
    const result = await festivalBonusModel.getFestivalBonusesByEmployee(parseInt(req.params.employeeId));
    
    res.json({ 
      success: true, 
      bonuses: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get festival bonuses by project
router.get('/festival-bonuses/project/:projectId', async (req, res) => {
  try {
    const result = await festivalBonusModel.getFestivalBonusesByProject(parseInt(req.params.projectId));
    
    res.json({ 
      success: true, 
      bonuses: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get festival bonuses by status
router.get('/festival-bonuses/status/:status', async (req, res) => {
  try {
    const result = await festivalBonusModel.getFestivalBonusesByStatus(req.params.status);
    
    res.json({ 
      success: true, 
      bonuses: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get upcoming festivals for bonus planning
router.get('/festival-bonuses/upcoming', async (req, res) => {
  try {
    const { monthsAhead } = req.query;
    const result = await festivalBonusModel.getUpcomingFestivals(monthsAhead ? parseInt(monthsAhead) : 3);
    
    res.json({ 
      success: true, 
      festivals: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get total bonus amount by festival
router.get('/festival-bonuses/festival/:festivalName/total-amount', async (req, res) => {
  try {
    const result = await festivalBonusModel.getTotalBonusAmountByFestival(req.params.festivalName);
    
    res.json({ 
      success: true, 
      totalAmount: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get total bonus amount by employee
router.get('/festival-bonuses/employee/:employeeId/total-amount', async (req, res) => {
  try {
    const result = await festivalBonusModel.getTotalBonusAmountByEmployee(parseInt(req.params.employeeId));
    
    res.json({ 
      success: true, 
      totalAmount: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Create early salary request
router.post('/early-salary-requests', async (req, res) => {
  try {
    const { festivalName, festivalDate, employeeId, employeeName, projectId, bonusAmount, eligibilityCriteria, description, approvalRequired, remarks } = req.body;
    
    // Validate required fields
    if (!festivalName || !festivalDate || !employeeId || !employeeName || !bonusAmount) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: festivalName, festivalDate, employeeId, employeeName, bonusAmount' 
      });
    }
    
    const requestData = {
      festivalName,
      festivalDate,
      employeeId,
      employeeName,
      projectId,
      bonusAmount,
      eligibilityCriteria,
      description,
      approvalRequired,
      remarks,
      bonusType: 'early_salary' // Override to early_salary
    };
    
    const result = await festivalBonusModel.createEarlySalaryRequest(requestData);
    
    res.status(201).json({ 
      success: true, 
      message: 'Early salary request created successfully',
      request: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get all early salary requests
router.get('/early-salary-requests', async (req, res) => {
  try {
    const result = await festivalBonusModel.getEarlySalaryRequests();
    
    res.json({ 
      success: true, 
      requests: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get early salary requests by employee
router.get('/early-salary-requests/employee/:employeeId', async (req, res) => {
  try {
    const result = await festivalBonusModel.getEarlySalaryRequestsByEmployee(parseInt(req.params.employeeId));
    
    res.json({ 
      success: true, 
      requests: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get early salary requests by status
router.get('/early-salary-requests/status/:status', async (req, res) => {
  try {
    const result = await festivalBonusModel.getEarlySalaryRequestsByStatus(req.params.status);
    
    res.json({ 
      success: true, 
      requests: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get festival bonuses by date range
router.get('/festival-bonuses/date-range', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({ 
        success: false, 
        error: 'startDate and endDate are required' 
      });
    }
    
    const result = await festivalBonusModel.getBonusesByDateRange(startDate, endDate);
    
    res.json({ 
      success: true, 
      bonuses: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get festival bonuses by year
router.get('/festival-bonuses/year/:year', async (req, res) => {
  try {
    const result = await festivalBonusModel.getBonusesByYear(parseInt(req.params.year));
    
    res.json({ 
      success: true, 
      bonuses: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

module.exports = router;
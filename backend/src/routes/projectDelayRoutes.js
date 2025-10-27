// Project Delay Routes for Construction Management System
const express = require('express');
const router = express.Router();
const ProjectDelayModel = require('../models/projectDelayModel');

// Initialize project delay model
let projectDelayModel;

// Middleware to initialize project delay model
router.use((req, res, next) => {
  if (!projectDelayModel) {
    projectDelayModel = new ProjectDelayModel();
  }
  next();
});

// Create a new delay record
router.post('/delays', async (req, res) => {
  try {
    const { projectId, delayType, delayReason, startDate, expectedEndDate, delayDuration, impactLevel, reportedBy, description, mitigationSteps, costImpact } = req.body;
    
    // Validate required fields
    if (!projectId || !delayType || !delayReason || !startDate || !delayDuration) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: projectId, delayType, delayReason, startDate, delayDuration' 
      });
    }
    
    const delayData = {
      projectId,
      delayType,
      delayReason,
      startDate,
      expectedEndDate,
      delayDuration,
      impactLevel,
      reportedBy,
      description,
      mitigationSteps,
      costImpact
    };
    
    const result = await projectDelayModel.createDelayRecord(delayData);
    
    res.status(201).json({ 
      success: true, 
      message: 'Delay record created successfully',
      delay: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get all delay records
router.get('/delays', async (req, res) => {
  try {
    const result = await projectDelayModel.getAllDelayRecords();
    
    res.json({ 
      success: true, 
      delays: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get delay record by ID
router.get('/delays/:id', async (req, res) => {
  try {
    const result = await projectDelayModel.getDelayRecordById(parseInt(req.params.id));
    
    if (!result) {
      return res.status(404).json({ 
        success: false, 
        error: 'Delay record not found' 
      });
    }
    
    res.json({ 
      success: true, 
      delay: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Update delay record
router.put('/delays/:id', async (req, res) => {
  try {
    const updateData = req.body;
    
    const result = await projectDelayModel.updateDelayRecord(parseInt(req.params.id), updateData);
    
    if (!result) {
      return res.status(404).json({ 
        success: false, 
        error: 'Delay record not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Delay record updated successfully',
      delay: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Mark delay as resolved
router.put('/delays/:id/resolve', async (req, res) => {
  try {
    const { resolutionDate } = req.body;
    
    const result = await projectDelayModel.markDelayAsResolved(parseInt(req.params.id), resolutionDate);
    
    if (!result) {
      return res.status(404).json({ 
        success: false, 
        error: 'Delay record not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Delay record marked as resolved successfully',
      delay: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get delays by project ID
router.get('/projects/:projectId/delays', async (req, res) => {
  try {
    const result = await projectDelayModel.getDelaysByProject(parseInt(req.params.projectId));
    
    res.json({ 
      success: true, 
      delays: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get delays by type
router.get('/delays/type/:delayType', async (req, res) => {
  try {
    const result = await projectDelayModel.getDelaysByType(req.params.delayType);
    
    res.json({ 
      success: true, 
      delays: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get active delays
router.get('/delays/active', async (req, res) => {
  try {
    const result = await projectDelayModel.getActiveDelays();
    
    res.json({ 
      success: true, 
      delays: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get delays by impact level
router.get('/delays/impact/:impactLevel', async (req, res) => {
  try {
    const result = await projectDelayModel.getDelaysByImpactLevel(req.params.impactLevel);
    
    res.json({ 
      success: true, 
      delays: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Add mitigation step to delay record
router.post('/delays/:id/mitigation-steps', async (req, res) => {
  try {
    const { step, responsible, deadline, status } = req.body;
    
    // Validate required fields
    if (!step || !responsible || !deadline) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: step, responsible, deadline' 
      });
    }
    
    const stepData = {
      step,
      responsible,
      deadline,
      status
    };
    
    const result = await projectDelayModel.addMitigationStep(parseInt(req.params.id), stepData);
    
    if (!result) {
      return res.status(404).json({ 
        success: false, 
        error: 'Delay record not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Mitigation step added successfully',
      delay: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Update mitigation step status
router.put('/delays/:id/mitigation-steps/:stepId', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ 
        success: false, 
        error: 'Status is required' 
      });
    }
    
    const result = await projectDelayModel.updateMitigationStepStatus(parseInt(req.params.id), parseInt(req.params.stepId), status);
    
    if (!result) {
      return res.status(404).json({ 
        success: false, 
        error: 'Delay record not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Mitigation step status updated successfully',
      delay: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get total delay duration by project
router.get('/projects/:projectId/total-delay-duration', async (req, res) => {
  try {
    const result = await projectDelayModel.getTotalDelayDurationByProject(parseInt(req.params.projectId));
    
    res.json({ 
      success: true, 
      totalDelayDuration: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get total cost impact by project
router.get('/projects/:projectId/total-cost-impact', async (req, res) => {
  try {
    const result = await projectDelayModel.getTotalCostImpactByProject(parseInt(req.params.projectId));
    
    res.json({ 
      success: true, 
      totalCostImpact: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

module.exports = router;
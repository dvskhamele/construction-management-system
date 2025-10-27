// Weather Impact Routes for Construction Management System
const express = require('express');
const router = express.Router();
const WeatherImpactModel = require('../models/weatherImpactModel');

// Initialize weather impact model
let weatherImpactModel;

// Middleware to initialize weather impact model
router.use((req, res, next) => {
  if (!weatherImpactModel) {
    weatherImpactModel = new WeatherImpactModel();
  }
  next();
});

// Create a new weather impact record
router.post('/weather-impacts', async (req, res) => {
  try {
    const { projectId, siteId, date, weatherCondition, temperature, rainfall, windSpeed, description, impactLevel, affectedWork, workStopped, durationOfImpact, reportedBy } = req.body;
    
    // Validate required fields
    if (!projectId || !date || !weatherCondition) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: projectId, date, weatherCondition' 
      });
    }
    
    const weatherData = {
      projectId,
      siteId,
      date,
      weatherCondition,
      temperature,
      rainfall,
      windSpeed,
      description,
      impactLevel,
      affectedWork,
      workStopped,
      durationOfImpact,
      reportedBy
    };
    
    const result = await weatherImpactModel.createWeatherImpact(weatherData);
    
    res.status(201).json({ 
      success: true, 
      message: 'Weather impact record created successfully',
      weatherImpact: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get all weather impact records
router.get('/weather-impacts', async (req, res) => {
  try {
    const result = await weatherImpactModel.getAllWeatherImpacts();
    
    res.json({ 
      success: true, 
      weatherImpacts: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get weather impact record by ID
router.get('/weather-impacts/:id', async (req, res) => {
  try {
    const result = await weatherImpactModel.getWeatherImpactById(parseInt(req.params.id));
    
    if (!result) {
      return res.status(404).json({ 
        success: false, 
        error: 'Weather impact record not found' 
      });
    }
    
    res.json({ 
      success: true, 
      weatherImpact: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Update weather impact record
router.put('/weather-impacts/:id', async (req, res) => {
  try {
    const updateData = req.body;
    
    const result = await weatherImpactModel.updateWeatherImpact(parseInt(req.params.id), updateData);
    
    if (!result) {
      return res.status(404).json({ 
        success: false, 
        error: 'Weather impact record not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Weather impact record updated successfully',
      weatherImpact: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Mark weather impact as resolved
router.put('/weather-impacts/:id/resolve', async (req, res) => {
  try {
    const result = await weatherImpactModel.markWeatherImpactAsResolved(parseInt(req.params.id));
    
    if (!result) {
      return res.status(404).json({ 
        success: false, 
        error: 'Weather impact record not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Weather impact record marked as resolved successfully',
      weatherImpact: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get weather impacts by project
router.get('/projects/:projectId/weather-impacts', async (req, res) => {
  try {
    const result = await weatherImpactModel.getWeatherImpactsByProject(parseInt(req.params.projectId));
    
    res.json({ 
      success: true, 
      weatherImpacts: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get weather impacts by site
router.get('/sites/:siteId/weather-impacts', async (req, res) => {
  try {
    const result = await weatherImpactModel.getWeatherImpactsBySite(parseInt(req.params.siteId));
    
    res.json({ 
      success: true, 
      weatherImpacts: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get weather impacts by condition
router.get('/weather-impacts/condition/:condition', async (req, res) => {
  try {
    const result = await weatherImpactModel.getWeatherImpactsByCondition(req.params.condition);
    
    res.json({ 
      success: true, 
      weatherImpacts: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get weather impacts by date range
router.get('/weather-impacts/date-range', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({ 
        success: false, 
        error: 'startDate and endDate are required' 
      });
    }
    
    const result = await weatherImpactModel.getWeatherImpactsByDateRange(startDate, endDate);
    
    res.json({ 
      success: true, 
      weatherImpacts: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get active weather impacts
router.get('/weather-impacts/active', async (req, res) => {
  try {
    const result = await weatherImpactModel.getActiveWeatherImpacts();
    
    res.json({ 
      success: true, 
      weatherImpacts: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get weather impacts by impact level
router.get('/weather-impacts/impact/:impactLevel', async (req, res) => {
  try {
    const result = await weatherImpactModel.getWeatherImpactsByImpactLevel(req.params.impactLevel);
    
    res.json({ 
      success: true, 
      weatherImpacts: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get total days affected by weather for a project
router.get('/projects/:projectId/total-weather-days', async (req, res) => {
  try {
    const result = await weatherImpactModel.getTotalWeatherAffectedDaysByProject(parseInt(req.params.projectId));
    
    res.json({ 
      success: true, 
      totalWeatherDays: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get common weather conditions
router.get('/weather-impacts/common-conditions', async (req, res) => {
  try {
    const result = await weatherImpactModel.getCommonWeatherConditions();
    
    res.json({ 
      success: true, 
      commonConditions: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get weather impacts by date
router.get('/weather-impacts/date/:date', async (req, res) => {
  try {
    const result = await weatherImpactModel.getWeatherImpactsByDate(req.params.date);
    
    res.json({ 
      success: true, 
      weatherImpacts: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get severe weather alerts
router.get('/weather-impacts/severe-alerts', async (req, res) => {
  try {
    const result = await weatherImpactModel.getSevereWeatherAlerts();
    
    res.json({ 
      success: true, 
      severeAlerts: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

module.exports = router;
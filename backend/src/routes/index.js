// Main API Routes for Construction Management System
const express = require('express');
const router = express.Router();

// Import all individual route modules
const soilTestingRoutes = require('./soilTestingRoutes');
const laborRoutes = require('./laborRoutes');
const contractorRoutes = require('./contractorRoutes');
const projectDelayRoutes = require('./projectDelayRoutes');
const weatherImpactRoutes = require('./weatherImpactRoutes');
const festivalBonusRoutes = require('./festivalBonusRoutes');
const siteEngineerRoutes = require('./siteEngineerRoutes');
const pmsRoutes = require('./pmsRoutes');
const analyticsRoutes = require('./analyticsRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const guestRoutes = require('./guestRoutes');
const housekeepingRoutes = require('./housekeepingRoutes');
const requestRoutes = require('./requestRoutes');

// Mount all routes under their respective paths
router.use('/soil-testing', soilTestingRoutes);
router.use('/labor', laborRoutes);
router.use('/contractors', contractorRoutes);
router.use('/delays', projectDelayRoutes);
router.use('/weather-impacts', weatherImpactRoutes);
router.use('/bonuses', festivalBonusRoutes);
router.use('/site-engineers', siteEngineerRoutes);

// Existing routes for compatibility
router.use('/pms', pmsRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/guest', guestRoutes);
router.use('/housekeeping', housekeepingRoutes);
router.use('/', requestRoutes);

module.exports = router;
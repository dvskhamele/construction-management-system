// Weather Impact Model for Construction Management System
const DatabaseAdapter = require('../utils/database');

class WeatherImpactModel {
  constructor() {
    this.db = new DatabaseAdapter();
  }

  // Create a new weather impact record
  async createWeatherImpact(weatherData) {
    const allWeatherImpacts = await this.getAllWeatherImpacts();
    const newId = allWeatherImpacts.length > 0 ? Math.max(...allWeatherImpacts.map(w => w.id)) + 1 : 1;
    
    const newWeatherImpact = {
      id: newId,
      projectId: weatherData.projectId,
      siteId: weatherData.siteId,
      date: weatherData.date,
      weatherCondition: weatherData.weatherCondition, // rain, storm, extreme heat, extreme cold, etc.
      temperature: weatherData.temperature,
      rainfall: weatherData.rainfall, // in mm
      windSpeed: weatherData.windSpeed, // in km/h
      description: weatherData.description,
      impactLevel: weatherData.impactLevel || 'medium', // low, medium, high
      affectedWork: weatherData.affectedWork || [], // list of work types affected
      workStopped: weatherData.workStopped || false, // whether work was completely stopped
      durationOfImpact: weatherData.durationOfImpact || 1, // in days
      status: weatherData.status || 'active', // active, resolved
      reportedBy: weatherData.reportedBy,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const createdWeatherImpact = await this.db.create('weatherImpacts', newWeatherImpact);
    
    // Log activity
    await this.db.create('activity', {
      type: 'weather',
      title: 'Weather impact recorded',
      description: `Weather impact on project ${newWeatherImpact.projectId} due to ${newWeatherImpact.weatherCondition}`,
      timestamp: new Date().toISOString(),
      status: newWeatherImpact.status
    });

    return createdWeatherImpact;
  }

  // Get all weather impact records
  async getAllWeatherImpacts() {
    return await this.db.find('weatherImpacts', {});
  }

  // Get weather impact record by ID
  async getWeatherImpactById(weatherId) {
    return await this.db.findById('weatherImpacts', weatherId);
  }

  // Update weather impact record
  async updateWeatherImpact(weatherId, updateData) {
    const weatherImpact = await this.getWeatherImpactById(weatherId);
    if (weatherImpact) {
      const updatedWeatherImpact = await this.db.update('weatherImpacts', weatherId, {
        ...updateData,
        updatedAt: new Date().toISOString()
      });

      // Log activity
      await this.db.create('activity', {
        type: 'weather',
        title: 'Weather impact record updated',
        description: `Weather impact record updated for project ${weatherImpact.projectId}`,
        timestamp: new Date().toISOString(),
        status: updatedWeatherImpact.status
      });

      return updatedWeatherImpact;
    }
    return null;
  }

  // Mark weather impact as resolved
  async markWeatherImpactAsResolved(weatherId) {
    const weatherImpact = await this.getWeatherImpactById(weatherId);
    if (weatherImpact) {
      const updatedWeatherImpact = await this.db.update('weatherImpacts', weatherId, {
        status: 'resolved',
        updatedAt: new Date().toISOString()
      });

      // Log activity
      await this.db.create('activity', {
        type: 'weather',
        title: 'Weather impact resolved',
        description: `Weather impact resolved for project ${weatherImpact.projectId}`,
        timestamp: new Date().toISOString(),
        status: 'resolved'
      });

      return updatedWeatherImpact;
    }
    return null;
  }

  // Get weather impacts by project
  async getWeatherImpactsByProject(projectId) {
    const weatherImpacts = await this.db.find('weatherImpacts', {});
    return weatherImpacts.filter(impact => impact.projectId === projectId);
  }

  // Get weather impacts by site
  async getWeatherImpactsBySite(siteId) {
    const weatherImpacts = await this.db.find('weatherImpacts', {});
    return weatherImpacts.filter(impact => impact.siteId === siteId);
  }

  // Get weather impacts by condition
  async getWeatherImpactsByCondition(condition) {
    const weatherImpacts = await this.db.find('weatherImpacts', {});
    return weatherImpacts.filter(impact => impact.weatherCondition === condition);
  }

  // Get weather impacts by date range
  async getWeatherImpactsByDateRange(startDate, endDate) {
    const weatherImpacts = await this.db.find('weatherImpacts', {});
    return weatherImpacts.filter(impact => 
      impact.date >= startDate && impact.date <= endDate
    );
  }

  // Get active weather impacts
  async getActiveWeatherImpacts() {
    const weatherImpacts = await this.db.find('weatherImpacts', {});
    return weatherImpacts.filter(impact => impact.status === 'active');
  }

  // Get weather impacts by impact level
  async getWeatherImpactsByImpactLevel(impactLevel) {
    const weatherImpacts = await this.db.find('weatherImpacts', {});
    return weatherImpacts.filter(impact => impact.impactLevel === impactLevel);
  }

  // Calculate total days affected by weather for a project
  async getTotalWeatherAffectedDaysByProject(projectId) {
    const weatherImpacts = await this.getWeatherImpactsByProject(projectId);
    const totalDays = weatherImpacts.reduce((total, impact) => total + impact.durationOfImpact, 0);
    return totalDays;
  }

  // Get most common weather conditions affecting projects
  async getCommonWeatherConditions() {
    const weatherImpacts = await this.getAllWeatherImpacts();
    const conditionCounts = {};
    
    weatherImpacts.forEach(impact => {
      if (conditionCounts[impact.weatherCondition]) {
        conditionCounts[impact.weatherCondition]++;
      } else {
        conditionCounts[impact.weatherCondition] = 1;
      }
    });
    
    return conditionCounts;
  }

  // Get weather impacts affecting multiple projects on same date
  async getWeatherImpactsByDate(date) {
    const weatherImpacts = await this.db.find('weatherImpacts', {});
    return weatherImpacts.filter(impact => impact.date === date);
  }

  // Get severe weather alerts (high impact level)
  async getSevereWeatherAlerts() {
    const weatherImpacts = await this.db.find('weatherImpacts', {});
    return weatherImpacts.filter(impact => impact.impactLevel === 'high' && impact.status === 'active');
  }
}

module.exports = WeatherImpactModel;
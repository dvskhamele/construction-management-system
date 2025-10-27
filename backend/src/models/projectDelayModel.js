// Project Delay Model for Construction Management System
const DatabaseAdapter = require('../utils/database');

class ProjectDelayModel {
  constructor() {
    this.db = new DatabaseAdapter();
  }

  // Create a new delay record
  async createDelayRecord(delayData) {
    const allDelays = await this.getAllDelayRecords();
    const newId = allDelays.length > 0 ? Math.max(...allDelays.map(d => d.id)) + 1 : 1;
    
    const newDelay = {
      id: newId,
      projectId: delayData.projectId,
      delayType: delayData.delayType, // weather, material, labor, permit, etc.
      delayReason: delayData.delayReason,
      startDate: delayData.startDate,
      expectedEndDate: delayData.expectedEndDate,
      actualEndDate: delayData.actualEndDate || null,
      delayDuration: delayData.delayDuration, // in days
      impactLevel: delayData.impactLevel || 'medium', // low, medium, high
      status: delayData.status || 'active', // active, resolved, ongoing
      reportedBy: delayData.reportedBy,
      description: delayData.description,
      mitigationSteps: delayData.mitigationSteps || [],
      costImpact: delayData.costImpact || 0, // estimated additional cost
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const createdDelay = await this.db.create('projectDelays', newDelay);
    
    // Log activity
    await this.db.create('activity', {
      type: 'delay',
      title: 'Project delay recorded',
      description: `Delay in project ${newDelay.projectId} due to ${newDelay.delayReason}`,
      timestamp: new Date().toISOString(),
      status: newDelay.status
    });

    return createdDelay;
  }

  // Get all delay records
  async getAllDelayRecords() {
    return await this.db.find('projectDelays', {});
  }

  // Get delay record by ID
  async getDelayRecordById(delayId) {
    return await this.db.findById('projectDelays', delayId);
  }

  // Update delay record
  async updateDelayRecord(delayId, updateData) {
    const delayRecord = await this.getDelayRecordById(delayId);
    if (delayRecord) {
      const updatedDelay = await this.db.update('projectDelays', delayId, {
        ...updateData,
        updatedAt: new Date().toISOString()
      });

      // Log activity
      await this.db.create('activity', {
        type: 'delay',
        title: 'Project delay record updated',
        description: `Delay record for project ${delayRecord.projectId} updated`,
        timestamp: new Date().toISOString(),
        status: updatedDelay.status
      });

      return updatedDelay;
    }
    return null;
  }

  // Mark delay as resolved
  async markDelayAsResolved(delayId, resolutionDate) {
    const delayRecord = await this.getDelayRecordById(delayId);
    if (delayRecord) {
      const updatedDelay = await this.db.update('projectDelays', delayId, {
        status: 'resolved',
        actualEndDate: resolutionDate || new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString()
      });

      // Log activity
      await this.db.create('activity', {
        type: 'delay',
        title: 'Project delay resolved',
        description: `Delay in project ${delayRecord.projectId} resolved`,
        timestamp: new Date().toISOString(),
        status: 'resolved'
      });

      return updatedDelay;
    }
    return null;
  }

  // Get delays by project ID
  async getDelaysByProject(projectId) {
    const delays = await this.db.find('projectDelays', {});
    return delays.filter(delay => delay.projectId === projectId);
  }

  // Get delays by type
  async getDelaysByType(delayType) {
    const delays = await this.db.find('projectDelays', {});
    return delays.filter(delay => delay.delayType === delayType);
  }

  // Get active delays
  async getActiveDelays() {
    const delays = await this.db.find('projectDelays', {});
    return delays.filter(delay => delay.status === 'active' || delay.status === 'ongoing');
  }

  // Get delays by impact level
  async getDelaysByImpactLevel(impactLevel) {
    const delays = await this.db.find('projectDelays', {});
    return delays.filter(delay => delay.impactLevel === impactLevel);
  }

  // Add mitigation step to delay record
  async addMitigationStep(delayId, stepData) {
    const delayRecord = await this.getDelayRecordById(delayId);
    if (delayRecord) {
      const newMitigationStep = {
        id: Date.now(),
        step: stepData.step,
        responsible: stepData.responsible,
        deadline: stepData.deadline,
        status: stepData.status || 'pending',
        createdAt: new Date().toISOString()
      };

      const updatedMitigationSteps = [...delayRecord.mitigationSteps, newMitigationStep];
      
      const updatedDelay = await this.db.update('projectDelays', delayId, {
        mitigationSteps: updatedMitigationSteps,
        updatedAt: new Date().toISOString()
      });

      return updatedDelay;
    }
    return null;
  }

  // Update mitigation step status
  async updateMitigationStepStatus(delayId, stepId, status) {
    const delayRecord = await this.getDelayRecordById(delayId);
    if (delayRecord) {
      const updatedMitigationSteps = delayRecord.mitigationSteps.map(step => {
        if (step.id == stepId) {
          return {
            ...step,
            status,
            updatedAt: new Date().toISOString()
          };
        }
        return step;
      });
      
      const updatedDelay = await this.db.update('projectDelays', delayId, {
        mitigationSteps: updatedMitigationSteps,
        updatedAt: new Date().toISOString()
      });

      return updatedDelay;
    }
    return null;
  }

  // Calculate total delay duration by project
  async getTotalDelayDurationByProject(projectId) {
    const delays = await this.getDelaysByProject(projectId);
    const totalDelay = delays.reduce((total, delay) => total + delay.delayDuration, 0);
    return totalDelay;
  }

  // Calculate total cost impact by project
  async getTotalCostImpactByProject(projectId) {
    const delays = await this.getDelaysByProject(projectId);
    const totalCostImpact = delays.reduce((total, delay) => total + delay.costImpact, 0);
    return totalCostImpact;
  }
}

module.exports = ProjectDelayModel;
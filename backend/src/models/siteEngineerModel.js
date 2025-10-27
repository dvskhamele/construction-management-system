// Site Engineer Model for Construction Management System
const DatabaseAdapter = require('../utils/database');

class SiteEngineerModel {
  constructor() {
    this.db = new DatabaseAdapter();
  }

  // Create a new site engineer record
  async createSiteEngineer(engineerData) {
    const allEngineers = await this.getAllSiteEngineers();
    const newId = allEngineers.length > 0 ? Math.max(...allEngineers.map(e => e.id)) + 1 : 1;
    
    const newEngineer = {
      id: newId,
      name: engineerData.name,
      employeeId: engineerData.employeeId,
      phone: engineerData.phone,
      email: engineerData.email,
      qualification: engineerData.qualification, // BE, ME, Diploma, etc.
      experience: engineerData.experience, // in years
      specialization: engineerData.specialization, // civil, electrical, mechanical, etc.
      currentSiteId: engineerData.currentSiteId,
      currentProjectId: engineerData.currentProjectId,
      assignedSites: engineerData.assignedSites || [],
      assignedProjects: engineerData.assignedProjects || [],
      status: engineerData.status || 'active', // active, on-leave, inactive
      salary: engineerData.salary,
      joiningDate: engineerData.joiningDate || new Date().toISOString().split('T')[0],
      emergencyContact: engineerData.emergencyContact,
      address: engineerData.address,
      skills: engineerData.skills || [],
      certifications: engineerData.certifications || [],
      performanceRating: engineerData.performanceRating || 0,
      projectsManaged: engineerData.projectsManaged || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const createdEngineer = await this.db.create('siteEngineers', newEngineer);
    
    // Log activity
    await this.db.create('activity', {
      type: 'engineer',
      title: 'New site engineer added',
      description: `${newEngineer.name} added to system`,
      timestamp: new Date().toISOString(),
      status: newEngineer.status
    });

    return createdEngineer;
  }

  // Get all site engineers
  async getAllSiteEngineers() {
    return await this.db.find('siteEngineers', {});
  }

  // Get site engineer by ID
  async getSiteEngineerById(engineerId) {
    return await this.db.findById('siteEngineers', engineerId);
  }

  // Update site engineer details
  async updateSiteEngineer(engineerId, updateData) {
    const engineer = await this.getSiteEngineerById(engineerId);
    if (engineer) {
      const updatedEngineer = await this.db.update('siteEngineers', engineerId, {
        ...updateData,
        updatedAt: new Date().toISOString()
      });

      // Log activity
      await this.db.create('activity', {
        type: 'engineer',
        title: 'Site engineer details updated',
        description: `${engineer.name}'s details updated`,
        timestamp: new Date().toISOString(),
        status: updatedEngineer.status
      });

      return updatedEngineer;
    }
    return null;
  }

  // Assign site to engineer
  async assignSiteToEngineer(engineerId, siteId) {
    const engineer = await this.getSiteEngineerById(engineerId);
    if (engineer) {
      const updatedAssignedSites = engineer.assignedSites.includes(siteId) 
        ? engineer.assignedSites 
        : [...engineer.assignedSites, siteId];
      
      const updatedCurrentSite = siteId;
      
      const updatedEngineer = await this.db.update('siteEngineers', engineerId, {
        assignedSites: updatedAssignedSites,
        currentSiteId: updatedCurrentSite,
        updatedAt: new Date().toISOString()
      });

      // Log activity
      await this.db.create('activity', {
        type: 'engineer',
        title: 'Site assigned to engineer',
        description: `${engineer.name} assigned to site ${siteId}`,
        timestamp: new Date().toISOString(),
        status: updatedEngineer.status
      });

      return updatedEngineer;
    }
    return null;
  }

  // Assign project to engineer
  async assignProjectToEngineer(engineerId, projectId) {
    const engineer = await this.getSiteEngineerById(engineerId);
    if (engineer) {
      const updatedAssignedProjects = engineer.assignedProjects.includes(projectId) 
        ? engineer.assignedProjects 
        : [...engineer.assignedProjects, projectId];
      
      const updatedCurrentProject = projectId;
      
      const updatedEngineer = await this.db.update('siteEngineers', engineerId, {
        assignedProjects: updatedAssignedProjects,
        currentProjectId: updatedCurrentProject,
        updatedAt: new Date().toISOString()
      });

      // Log activity
      await this.db.create('activity', {
        type: 'engineer',
        title: 'Project assigned to engineer',
        description: `${engineer.name} assigned to project ${projectId}`,
        timestamp: new Date().toISOString(),
        status: updatedEngineer.status
      });

      return updatedEngineer;
    }
    return null;
  }

  // Remove site assignment from engineer
  async removeSiteAssignment(engineerId, siteId) {
    const engineer = await this.getSiteEngineerById(engineerId);
    if (engineer) {
      const updatedAssignedSites = engineer.assignedSites.filter(id => id !== siteId);
      
      const updatedEngineer = await this.db.update('siteEngineers', engineerId, {
        assignedSites: updatedAssignedSites,
        currentSiteId: updatedAssignedSites.length > 0 ? updatedAssignedSites[updatedAssignedSites.length - 1] : null,
        updatedAt: new Date().toISOString()
      });

      // Log activity
      await this.db.create('activity', {
        type: 'engineer',
        title: 'Site assignment removed from engineer',
        description: `${engineer.name} removed from site ${siteId}`,
        timestamp: new Date().toISOString(),
        status: updatedEngineer.status
      });

      return updatedEngineer;
    }
    return null;
  }

  // Remove project assignment from engineer
  async removeProjectAssignment(engineerId, projectId) {
    const engineer = await this.getSiteEngineerById(engineerId);
    if (engineer) {
      const updatedAssignedProjects = engineer.assignedProjects.filter(id => id !== projectId);
      
      const updatedEngineer = await this.db.update('siteEngineers', engineerId, {
        assignedProjects: updatedAssignedProjects,
        currentProjectId: updatedAssignedProjects.length > 0 ? updatedAssignedProjects[updatedAssignedProjects.length - 1] : null,
        updatedAt: new Date().toISOString()
      });

      // Log activity
      await this.db.create('activity', {
        type: 'engineer',
        title: 'Project assignment removed from engineer',
        description: `${engineer.name} removed from project ${projectId}`,
        timestamp: new Date().toISOString(),
        status: updatedEngineer.status
      });

      return updatedEngineer;
    }
    return null;
  }

  // Get engineers by current site
  async getEngineersByCurrentSite(siteId) {
    const engineers = await this.db.find('siteEngineers', {});
    return engineers.filter(engineer => engineer.currentSiteId === siteId);
  }

  // Get engineers by current project
  async getEngineersByCurrentProject(projectId) {
    const engineers = await this.db.find('siteEngineers', {});
    return engineers.filter(engineer => engineer.currentProjectId === projectId);
  }

  // Get engineers by specialization
  async getEngineersBySpecialization(specialization) {
    const engineers = await this.db.find('siteEngineers', {});
    return engineers.filter(engineer => engineer.specialization === specialization);
  }

  // Get engineers by status
  async getEngineersByStatus(status) {
    const engineers = await this.db.find('siteEngineers', {});
    return engineers.filter(engineer => engineer.status === status);
  }

  // Update engineer performance rating
  async updateEngineerPerformanceRating(engineerId, rating) {
    const engineer = await this.getSiteEngineerById(engineerId);
    if (engineer) {
      // Calculate new average rating
      const newRating = ((engineer.performanceRating * engineer.projectsManaged) + rating) / 
                        (engineer.projectsManaged + 1);
      
      const updatedEngineer = await this.db.update('siteEngineers', engineerId, {
        performanceRating: newRating,
        projectsManaged: engineer.projectsManaged + 1,
        updatedAt: new Date().toISOString()
      });

      return updatedEngineer;
    }
    return null;
  }

  // Get engineer with highest performance rating
  async getTopPerformingEngineer() {
    const engineers = await this.db.find('siteEngineers', {});
    if (engineers.length === 0) return null;
    
    return engineers.reduce((top, engineer) => 
      engineer.performanceRating > top.performanceRating ? engineer : top
    );
  }

  // Get engineer with most projects managed
  async getMostExperiencedEngineer() {
    const engineers = await this.db.find('siteEngineers', {});
    if (engineers.length === 0) return null;
    
    return engineers.reduce((top, engineer) => 
      engineer.projectsManaged > top.projectsManaged ? engineer : top
    );
  }

  // Get engineers by experience level
  async getEngineersByExperience(minExperience, maxExperience) {
    const engineers = await this.db.find('siteEngineers', {});
    return engineers.filter(engineer => 
      engineer.experience >= minExperience && engineer.experience <= maxExperience
    );
  }

  // Get engineers by qualification
  async getEngineersByQualification(qualification) {
    const engineers = await this.db.find('siteEngineers', {});
    return engineers.filter(engineer => engineer.qualification === qualification);
  }
}

module.exports = SiteEngineerModel;
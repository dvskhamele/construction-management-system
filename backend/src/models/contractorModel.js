// Contractor Model for Construction Management System
const DatabaseAdapter = require('../utils/database');

class ContractorModel {
  constructor() {
    this.db = new DatabaseAdapter();
  }

  // Create a new contractor
  async createContractor(contractorData) {
    const allContractors = await this.getAllContractors();
    const newId = allContractors.length > 0 ? Math.max(...allContractors.map(c => c.id)) + 1 : 1;
    
    const newContractor = {
      id: newId,
      name: contractorData.name,
      company: contractorData.company,
      phone: contractorData.phone,
      email: contractorData.email,
      address: contractorData.address,
      licenseNumber: contractorData.licenseNumber,
      specialization: contractorData.specialization, // e.g., 'civil', 'electrical', 'plumbing'
      experience: contractorData.experience, // in years
      rating: contractorData.rating || 0,
      projectsCompleted: contractorData.projectsCompleted || 0,
      currentProjects: contractorData.currentProjects || [],
      status: contractorData.status || 'active', // active, inactive, suspended
      bankDetails: contractorData.bankDetails || {},
      emergencyContact: contractorData.emergencyContact,
      taxInfo: contractorData.taxInfo,
      insuranceInfo: contractorData.insuranceInfo,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const createdContractor = await this.db.create('contractors', newContractor);
    
    // Log activity
    await this.db.create('activity', {
      type: 'contractor',
      title: 'New contractor added',
      description: `${newContractor.name} added to system`,
      timestamp: new Date().toISOString(),
      status: newContractor.status
    });

    return createdContractor;
  }

  // Get all contractors
  async getAllContractors() {
    return await this.db.find('contractors', {});
  }

  // Get contractor by ID
  async getContractorById(contractorId) {
    return await this.db.findById('contractors', contractorId);
  }

  // Update contractor details
  async updateContractor(contractorId, updateData) {
    const contractor = await this.getContractorById(contractorId);
    if (contractor) {
      const updatedContractor = await this.db.update('contractors', contractorId, {
        ...updateData,
        updatedAt: new Date().toISOString()
      });

      // Log activity
      await this.db.create('activity', {
        type: 'contractor',
        title: 'Contractor details updated',
        description: `${contractor.name}'s details updated`,
        timestamp: new Date().toISOString(),
        status: updatedContractor.status
      });

      return updatedContractor;
    }
    return null;
  }

  // Assign contractor to a project
  async assignContractorToProject(contractorId, projectId) {
    const contractor = await this.getContractorById(contractorId);
    if (contractor) {
      const updatedCurrentProjects = contractor.currentProjects.includes(projectId) 
        ? contractor.currentProjects 
        : [...contractor.currentProjects, projectId];
      
      const updatedContractor = await this.db.update('contractors', contractorId, {
        currentProjects: updatedCurrentProjects,
        updatedAt: new Date().toISOString()
      });

      // Log activity
      await this.db.create('activity', {
        type: 'contractor',
        title: 'Contractor assigned to project',
        description: `${contractor.name} assigned to project ${projectId}`,
        timestamp: new Date().toISOString(),
        status: updatedContractor.status
      });

      return updatedContractor;
    }
    return null;
  }

  // Remove contractor from project
  async removeContractorFromProject(contractorId, projectId) {
    const contractor = await this.getContractorById(contractorId);
    if (contractor) {
      const updatedCurrentProjects = contractor.currentProjects.filter(id => id !== projectId);
      
      const updatedContractor = await this.db.update('contractors', contractorId, {
        currentProjects: updatedCurrentProjects,
        updatedAt: new Date().toISOString()
      });

      // Log activity
      await this.db.create('activity', {
        type: 'contractor',
        title: 'Contractor removed from project',
        description: `${contractor.name} removed from project ${projectId}`,
        timestamp: new Date().toISOString(),
        status: updatedContractor.status
      });

      return updatedContractor;
    }
    return null;
  }

  // Get contractors by specialization
  async getContractorsBySpecialization(specialization) {
    const contractors = await this.db.find('contractors', {});
    return contractors.filter(c => c.specialization === specialization);
  }

  // Get contractors by status
  async getContractorsByStatus(status) {
    const contractors = await this.db.find('contractors', {});
    return contractors.filter(c => c.status === status);
  }

  // Get contractors by project
  async getContractorsByProject(projectId) {
    const contractors = await this.db.find('contractors', {});
    return contractors.filter(c => c.currentProjects.includes(projectId));
  }

  // Update contractor rating
  async updateContractorRating(contractorId, rating) {
    const contractor = await this.getContractorById(contractorId);
    if (contractor) {
      // Calculate new average rating
      const newRating = ((contractor.rating * contractor.projectsCompleted) + rating) / 
                        (contractor.projectsCompleted + 1);
      
      const updatedContractor = await this.db.update('contractors', contractorId, {
        rating: newRating,
        projectsCompleted: contractor.projectsCompleted + 1,
        updatedAt: new Date().toISOString()
      });

      return updatedContractor;
    }
    return null;
  }
}

module.exports = ContractorModel;
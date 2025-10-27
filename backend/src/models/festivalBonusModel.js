// Festival Bonus/Salary Model for Construction Management System
const DatabaseAdapter = require('../utils/database');

class FestivalBonusModel {
  constructor() {
    this.db = new DatabaseAdapter();
  }

  // Create a new festival bonus record
  async createFestivalBonus(bonusData) {
    const allBonuses = await this.getAllFestivalBonuses();
    const newId = allBonuses.length > 0 ? Math.max(...allBonuses.map(b => b.id)) + 1 : 1;
    
    const newBonus = {
      id: newId,
      festivalName: bonusData.festivalName, // Diwali, Holi, Eid, etc.
      festivalDate: bonusData.festivalDate,
      bonusType: bonusData.bonusType || 'festival_bonus', // festival_bonus, early_salary, etc.
      employeeId: bonusData.employeeId,
      employeeName: bonusData.employeeName,
      projectId: bonusData.projectId,
      bonusAmount: bonusData.bonusAmount,
      eligibilityCriteria: bonusData.eligibilityCriteria || 'all', // all, long_term, performance_based, etc.
      status: bonusData.status || 'pending', // pending, approved, paid, cancelled
      description: bonusData.description,
      approvalRequired: bonusData.approvalRequired || true,
      approvedBy: bonusData.approvedBy || null,
      approvedDate: bonusData.approvedDate || null,
      paymentDate: bonusData.paymentDate || null,
      remarks: bonusData.remarks || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const createdBonus = await this.db.create('festivalBonuses', newBonus);
    
    // Log activity
    await this.db.create('activity', {
      type: 'bonus',
      title: 'Festival bonus created',
      description: `${newBonus.festivalName} bonus for ${newBonus.employeeName}`,
      timestamp: new Date().toISOString(),
      status: newBonus.status
    });

    return createdBonus;
  }

  // Get all festival bonuses
  async getAllFestivalBonuses() {
    return await this.db.find('festivalBonuses', {});
  }

  // Get festival bonus by ID
  async getFestivalBonusById(bonusId) {
    return await this.db.findById('festivalBonuses', bonusId);
  }

  // Update festival bonus status
  async updateFestivalBonusStatus(bonusId, status, updatedBy) {
    const bonus = await this.getFestivalBonusById(bonusId);
    if (bonus) {
      const updatedBonus = await this.db.update('festivalBonuses', bonusId, {
        status,
        approvedBy: status === 'approved' ? updatedBy : bonus.approvedBy,
        approvedDate: status === 'approved' ? new Date().toISOString() : bonus.approvedDate,
        paymentDate: status === 'paid' ? new Date().toISOString() : bonus.paymentDate,
        updatedAt: new Date().toISOString()
      });

      // Log activity
      await this.db.create('activity', {
        type: 'bonus',
        title: `Festival bonus ${status}`,
        description: `${bonus.festivalName} bonus for ${bonus.employeeName} ${status}`,
        timestamp: new Date().toISOString(),
        status
      });

      return updatedBonus;
    }
    return null;
  }

  // Get festival bonuses by festival name
  async getFestivalBonusesByFestival(festivalName) {
    const bonuses = await this.db.find('festivalBonuses', {});
    return bonuses.filter(bonus => bonus.festivalName === festivalName);
  }

  // Get festival bonuses by employee
  async getFestivalBonusesByEmployee(employeeId) {
    const bonuses = await this.db.find('festivalBonuses', {});
    return bonuses.filter(bonus => bonus.employeeId === employeeId);
  }

  // Get festival bonuses by project
  async getFestivalBonusesByProject(projectId) {
    const bonuses = await this.db.find('festivalBonuses', {});
    return bonuses.filter(bonus => bonus.projectId === projectId);
  }

  // Get festival bonuses by status
  async getFestivalBonusesByStatus(status) {
    const bonuses = await this.db.find('festivalBonuses', {});
    return bonuses.filter(bonus => bonus.status === status);
  }

  // Get upcoming festivals for bonus planning
  async getUpcomingFestivals(monthsAhead = 3) {
    const now = new Date();
    const futureDate = new Date();
    futureDate.setMonth(now.getMonth() + monthsAhead);
    
    const bonuses = await this.db.find('festivalBonuses', {});
    return bonuses.filter(bonus => {
      const bonusDate = new Date(bonus.festivalDate);
      return bonusDate >= now && bonusDate <= futureDate;
    });
  }

  // Get total bonus amount by festival
  async getTotalBonusAmountByFestival(festivalName) {
    const bonuses = await this.getFestivalBonusesByFestival(festivalName);
    const totalAmount = bonuses.reduce((total, bonus) => total + bonus.bonusAmount, 0);
    return totalAmount;
  }

  // Get total bonus amount by employee
  async getTotalBonusAmountByEmployee(employeeId) {
    const bonuses = await this.getFestivalBonusesByEmployee(employeeId);
    const totalAmount = bonuses.reduce((total, bonus) => total + bonus.bonusAmount, 0);
    return totalAmount;
  }

  // Create early salary request
  async createEarlySalaryRequest(requestData) {
    const newRequest = {
      ...requestData,
      bonusType: 'early_salary',
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Add to the same collection with a different bonus type
    const createdRequest = await this.db.create('festivalBonuses', newRequest);
    
    // Log activity
    await this.db.create('activity', {
      type: 'salary',
      title: 'Early salary request created',
      description: `Early salary request for ${newRequest.employeeName} for ${newRequest.festivalName}`,
      timestamp: new Date().toISOString(),
      status: 'pending'
    });

    return createdRequest;
  }

  // Get all early salary requests
  async getEarlySalaryRequests() {
    const bonuses = await this.db.find('festivalBonuses', {});
    return bonuses.filter(bonus => bonus.bonusType === 'early_salary');
  }

  // Get early salary requests by employee
  async getEarlySalaryRequestsByEmployee(employeeId) {
    const requests = await this.getEarlySalaryRequests();
    return requests.filter(request => request.employeeId === employeeId);
  }

  // Get early salary requests by status
  async getEarlySalaryRequestsByStatus(status) {
    const requests = await this.getEarlySalaryRequests();
    return requests.filter(request => request.status === status);
  }

  // Get festival bonuses for a specific date range
  async getBonusesByDateRange(startDate, endDate) {
    const bonuses = await this.db.find('festivalBonuses', {});
    return bonuses.filter(bonus => 
      bonus.festivalDate >= startDate && bonus.festivalDate <= endDate
    );
  }

  // Get festival bonuses by year
  async getBonusesByYear(year) {
    const bonuses = await this.db.find('festivalBonuses', {});
    return bonuses.filter(bonus => new Date(bonus.festivalDate).getFullYear() == year);
  }
}

module.exports = FestivalBonusModel;
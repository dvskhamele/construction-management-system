// Labor Model for Construction Management System
const DatabaseAdapter = require('../utils/database');

class LaborModel {
  constructor() {
    this.db = new DatabaseAdapter();
  }

  // Create a new labor entry
  async createLabor(laborData) {
    const allLabors = await this.getAllLabors();
    const newId = allLabors.length > 0 ? Math.max(...allLabors.map(l => l.id)) + 1 : 1;
    
    const newLabor = {
      id: newId,
      name: laborData.name,
      phone: laborData.phone,
      role: laborData.role,
      dailyWage: laborData.dailyWage,
      projectId: laborData.projectId,
      siteId: laborData.siteId,
      status: laborData.status || 'active', // active, inactive, on-leave
      attendance: laborData.attendance || [],
      totalWorkingDays: laborData.totalWorkingDays || 0,
      totalPay: laborData.totalPay || 0,
      skills: laborData.skills || [],
      experience: laborData.experience || 0, // in years
      emergencyContact: laborData.emergencyContact,
      address: laborData.address,
      joiningDate: laborData.joiningDate || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const createdLabor = await this.db.create('labors', newLabor);
    
    // Log activity
    await this.db.create('activity', {
      type: 'labor',
      title: 'New labor added',
      description: `${newLabor.name} added to project ${newLabor.projectId}`,
      timestamp: new Date().toISOString(),
      status: newLabor.status
    });

    return createdLabor;
  }

  // Get all labors
  async getAllLabors() {
    return await this.db.find('labors', {});
  }

  // Get labor by ID
  async getLaborById(laborId) {
    return await this.db.findById('labors', laborId);
  }

  // Update labor details
  async updateLabor(laborId, updateData) {
    const labor = await this.getLaborById(laborId);
    if (labor) {
      const updatedLabor = await this.db.update('labors', laborId, {
        ...updateData,
        updatedAt: new Date().toISOString()
      });

      // Log activity
      await this.db.create('activity', {
        type: 'labor',
        title: 'Labor details updated',
        description: `${labor.name}'s details updated`,
        timestamp: new Date().toISOString(),
        status: updatedLabor.status
      });

      return updatedLabor;
    }
    return null;
  }

  // Get labors by project
  async getLaborsByProject(projectId) {
    const labors = await this.db.find('labors', {});
    return labors.filter(labor => labor.projectId === projectId);
  }

  // Get labors by site
  async getLaborsBySite(siteId) {
    const labors = await this.db.find('labors', {});
    return labors.filter(labor => labor.siteId === siteId);
  }

  // Update labor attendance
  async updateLaborAttendance(laborId, date, status) {
    const labor = await this.getLaborById(laborId);
    if (labor) {
      // Check if attendance for this date already exists
      const existingAttendanceIndex = labor.attendance.findIndex(
        record => record.date === date
      );

      let updatedAttendance;
      if (existingAttendanceIndex !== -1) {
        // Update existing attendance record
        updatedAttendance = [...labor.attendance];
        updatedAttendance[existingAttendanceIndex].status = status;
        updatedAttendance[existingAttendanceIndex].updatedAt = new Date().toISOString();
      } else {
        // Add new attendance record
        const newAttendanceRecord = {
          date,
          status,
          createdAt: new Date().toISOString()
        };
        updatedAttendance = [...labor.attendance, newAttendanceRecord];
      }

      // Update working days count
      const workingDays = updatedAttendance.filter(record => record.status === 'present').length;
      
      // Update total pay
      const totalPay = workingDays * labor.dailyWage;

      const updatedLabor = await this.db.update('labors', laborId, {
        attendance: updatedAttendance,
        totalWorkingDays: workingDays,
        totalPay,
        updatedAt: new Date().toISOString()
      });

      // Log activity
      await this.db.create('activity', {
        type: 'attendance',
        title: 'Labor attendance updated',
        description: `${labor.name} marked as ${status} on ${date}`,
        timestamp: new Date().toISOString(),
        status
      });

      return updatedLabor;
    }
    return null;
  }

  // Get labors by status
  async getLaborsByStatus(status) {
    const labors = await this.db.find('labors', {});
    return labors.filter(labor => labor.status === status);
  }

  // Get absent labors for a specific date
  async getAbsentLaborsForDate(date) {
    const labors = await this.db.find('labors', {});
    return labors.filter(labor => {
      const attendanceRecord = labor.attendance.find(record => record.date === date);
      return !attendanceRecord || attendanceRecord.status === 'absent';
    });
  }

  // Get present labors for a specific date
  async getPresentLaborsForDate(date) {
    const labors = await this.db.find('labors', {});
    return labors.filter(labor => {
      const attendanceRecord = labor.attendance.find(record => record.date === date);
      return attendanceRecord && attendanceRecord.status === 'present';
    });
  }
}

module.exports = LaborModel;
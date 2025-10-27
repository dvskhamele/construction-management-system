// Soil Testing Model for Construction Management System
const DatabaseAdapter = require('../utils/database');

class SoilTestingModel {
  constructor() {
    this.db = new DatabaseAdapter();
  }

  // Create a new soil testing request
  async createSoilTest(testData) {
    const allTests = await this.getAllSoilTests();
    const newId = allTests.length > 0 ? Math.max(...allTests.map(t => t.id)) + 1 : 1;
    
    const newTest = {
      id: newId,
      projectId: testData.projectId,
      projectType: testData.projectType,
      location: testData.location,
      contractorId: testData.contractorId,
      status: testData.status || 'pending',
      testDate: testData.testDate,
      required: testData.required || false,
      testResults: testData.testResults || null,
      bearingCapacity: testData.bearingCapacity || null,
      reportUrl: testData.reportUrl || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const createdTest = await this.db.create('soilTests', newTest);
    
    // Log activity
    await this.db.create('activity', {
      type: 'soilTest',
      title: 'New soil test created',
      description: `Soil test for ${newTest.projectType} project at ${newTest.location}`,
      timestamp: new Date().toISOString(),
      status: newTest.status
    });

    return createdTest;
  }

  // Get all soil tests
  async getAllSoilTests() {
    return await this.db.find('soilTests', {});
  }

  // Get soil test by ID
  async getSoilTestById(testId) {
    return await this.db.findById('soilTests', testId);
  }

  // Update soil test status
  async updateSoilTestStatus(testId, status) {
    const test = await this.getSoilTestById(testId);
    if (test) {
      const updatedTest = await this.db.update('soilTests', testId, {
        status,
        updatedAt: new Date().toISOString()
      });

      // Log activity
      await this.db.create('activity', {
        type: 'soilTest',
        title: `Soil test ${status.toLowerCase()}`,
        description: `Soil test for project at ${test.location} marked as ${status}`,
        timestamp: new Date().toISOString(),
        status
      });

      return updatedTest;
    }
    return null;
  }

  // Update soil test results
  async updateSoilTestResults(testId, results) {
    const test = await this.getSoilTestById(testId);
    if (test) {
      const updatedData = {
        testResults: results.testResults || test.testResults,
        bearingCapacity: results.bearingCapacity || test.bearingCapacity,
        reportUrl: results.reportUrl || test.reportUrl,
        updatedAt: new Date().toISOString()
      };

      const updatedTest = await this.db.update('soilTests', testId, updatedData);

      // Log activity
      await this.db.create('activity', {
        type: 'soilTest',
        title: 'Soil test results updated',
        description: `Results updated for soil test at ${test.location}`,
        timestamp: new Date().toISOString(),
        status: test.status
      });

      return updatedTest;
    }
    return null;
  }

  // Get soil tests by project ID
  async getSoilTestsByProject(projectId) {
    const tests = await this.db.find('soilTests', {});
    return tests.filter(test => test.projectId === projectId);
  }

  // Get soil tests by contractor ID
  async getSoilTestsByContractor(contractorId) {
    const tests = await this.db.find('soilTests', {});
    return tests.filter(test => test.contractorId === contractorId);
  }

  // Get pending soil tests
  async getPendingSoilTests() {
    const tests = await this.db.find('soilTests', {});
    return tests.filter(test => test.status === 'pending');
  }
}

module.exports = SoilTestingModel;
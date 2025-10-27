// Construction API Service for interacting with backend
class ConstructionApiService {
  constructor() {
    // Use environment variable for API URL, with fallback to localhost:3001
    // For Netlify deployments, the API will be at the same origin
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 
                  (typeof window !== 'undefined' ? window.location.origin + '/api' : 'http://localhost:3001/api');
    // In production, always use mock data
    this.useMockData = process.env.NODE_ENV === 'production';
  }

  // Mock data for when backend is not available
  getMockDashboardStats() {
    return Promise.resolve({
      pendingTasks: 12,
      activeSites: 42,
      availableSites: 8,
      totalCrew: 24,
      qualityRating: 94,
      revenue: 12500
    });
  }

  getMockRecentActivity() {
    return Promise.resolve([
      {
        id: 1,
        type: 'task',
        title: 'New task created',
        description: 'John Doe - Extra materials (Site 205)',
        time: '2 minutes ago'
      },
      {
        id: 2,
        type: 'site',
        title: 'Site status updated',
        description: 'Site 103 marked as Clean',
        time: '1 hour ago'
      },
      {
        id: 3,
        type: 'task',
        title: 'Task completed',
        description: 'Foundation work delivered to Site 102',
        time: '15 minutes ago'
      },
      {
        id: 4,
        type: 'maintenance',
        title: 'Maintenance task',
        description: 'Leaky pipe reported in Site 302',
        time: '2 hours ago'
      }
    ]);
  }

  getMockNotifications() {
    return Promise.resolve([
      {
        id: 1,
        title: 'New construction task',
        message: 'John Doe needs extra materials in Site 205',
        time: '2 minutes ago',
        read: false
      },
      {
        id: 2,
        title: 'Site status updated',
        message: 'Site 103 has been marked as Clean',
        time: '1 hour ago',
        read: false
      },
      {
        id: 3,
        title: 'Maintenance required',
        message: 'Leaky pipe reported in Site 302',
        time: '2 hours ago',
        read: true
      }
    ]);
  }

  // Authentication
  async login(email, password) {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return Promise.resolve({
        user: { id: 1, name: 'Admin User', email: email, role: 'admin' },
        token: 'mock-jwt-token'
      });
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      return response.json();
    } catch (error) {
      // Mock login for development
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock login due to backend error:', error);
      }
      return Promise.resolve({
        user: { id: 1, name: 'Admin User', email: email, role: 'admin' },
        token: 'mock-jwt-token'
      });
    }
  }

  // Dashboard
  async getDashboardStats() {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return this.getMockDashboardStats();
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/dashboard/stats`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock dashboard stats due to backend error:', error);
      }
      return this.getMockDashboardStats();
    }
  }

  async getRecentActivity() {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return this.getMockRecentActivity();
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/dashboard/activity`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock recent activity due to backend error:', error);
      }
      return this.getMockRecentActivity();
    }
  }

  // Sites
  async getAllSites() {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Try to get from localStorage first
      const storedSites = localStorage.getItem('constructionSites');
      if (storedSites) {
        return Promise.resolve(JSON.parse(storedSites));
      }
      return Promise.resolve([
        { id: 101, status: 'clean', lastUpdated: '2 hours ago' },
        { id: 102, status: 'dirty', lastUpdated: '5 hours ago' },
        { id: 103, status: 'inspected', lastUpdated: '1 day ago' },
        { id: 104, status: 'dirty', lastUpdated: '3 hours ago' }
      ]);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/sites`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock sites data due to backend error:', error);
      }
      return Promise.resolve([
        { id: 101, status: 'clean', lastUpdated: '2 hours ago' },
        { id: 102, status: 'dirty', lastUpdated: '5 hours ago' },
        { id: 103, status: 'inspected', lastUpdated: '1 day ago' },
        { id: 104, status: 'dirty', lastUpdated: '3 hours ago' }
      ]);
    }
  }

  async getSiteById(id) {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return Promise.resolve({
        id: id,
        status: 'clean',
        lastUpdated: '2 hours ago'
      });
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/sites/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock site data due to backend error:', error);
      }
      return Promise.resolve({
        id: id,
        status: 'clean',
        lastUpdated: '2 hours ago'
      });
    }
  }

  async updateSiteStatus(id, status, userId) {
    // In production, always use mock data and store in localStorage
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Update localStorage
      const storedSites = localStorage.getItem('constructionSites');
      let sites = storedSites ? JSON.parse(storedSites) : [
        { id: 101, status: 'clean', lastUpdated: '2 hours ago' },
        { id: 102, status: 'dirty', lastUpdated: '5 hours ago' },
        { id: 103, status: 'inspected', lastUpdated: '1 day ago' },
        { id: 104, status: 'dirty', lastUpdated: '3 hours ago' }
      ];
      
      const siteIndex = sites.findIndex(site => site.id === id);
      if (siteIndex !== -1) {
        sites[siteIndex] = { ...sites[siteIndex], status, lastUpdated: 'Just now' };
        localStorage.setItem('constructionSites', JSON.stringify(sites));
      }
      
      return Promise.resolve({
        id: id,
        status: status,
        lastUpdated: 'Just now'
      });
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/sites/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status, userId }),
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock site update due to backend error:', error);
      }
      return Promise.resolve({
        id: id,
        status: status,
        lastUpdated: 'Just now'
      });
    }
  }

  // Tasks
  async getAllTasks() {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Try to get from localStorage first
      const storedTasks = localStorage.getItem('constructionTasks');
      if (storedTasks) {
        return Promise.resolve(JSON.parse(storedTasks));
      }
      return Promise.resolve([
        { id: 1, worker: 'John Doe', site: 205, task: 'Extra materials', priority: 'medium', status: 'pending' },
        { id: 2, worker: 'Jane Smith', site: 102, task: 'Foundation work', priority: 'high', status: 'in-progress' },
        { id: 3, worker: 'Robert Johnson', site: 302, task: 'Maintenance', priority: 'low', status: 'completed' }
      ]);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/tasks`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock tasks data due to backend error:', error);
      }
      return Promise.resolve([
        { id: 1, worker: 'John Doe', site: 205, task: 'Extra materials', priority: 'medium', status: 'pending' },
        { id: 2, worker: 'Jane Smith', site: 102, task: 'Foundation work', priority: 'high', status: 'in-progress' },
        { id: 3, worker: 'Robert Johnson', site: 302, task: 'Maintenance', priority: 'low', status: 'completed' }
      ]);
    }
  }

  async getTasksByDepartment(department) {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return Promise.resolve([]);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/tasks/department/${department}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock department tasks due to backend error:', error);
      }
      return Promise.resolve([]);
    }
  }

  async createTask(taskData) {
    // In production, always use mock data and store in localStorage
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Update localStorage
      const storedTasks = localStorage.getItem('constructionTasks');
      let tasks = storedTasks ? JSON.parse(storedTasks) : [
        { id: 1, worker: 'John Doe', site: 205, task: 'Extra materials', priority: 'medium', status: 'pending' },
        { id: 2, worker: 'Jane Smith', site: 102, task: 'Foundation work', priority: 'high', status: 'in-progress' },
        { id: 3, worker: 'Robert Johnson', site: 302, task: 'Maintenance', priority: 'low', status: 'completed' }
      ];
      
      const newTask = {
        id: Date.now(),
        ...taskData,
        status: 'pending'
      };
      
      tasks.push(newTask);
      localStorage.setItem('constructionTasks', JSON.stringify(tasks));
      
      return Promise.resolve(newTask);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(taskData),
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock task creation due to backend error:', error);
      }
      return Promise.resolve({
        id: Date.now(),
        ...taskData,
        status: 'pending'
      });
    }
  }

  async updateTaskStatus(id, status, userId) {
    // In production, always use mock data and store in localStorage
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Update localStorage
      const storedTasks = localStorage.getItem('constructionTasks');
      let tasks = storedTasks ? JSON.parse(storedTasks) : [
        { id: 1, worker: 'John Doe', site: 205, task: 'Extra materials', priority: 'medium', status: 'pending' },
        { id: 2, worker: 'Jane Smith', site: 102, task: 'Foundation work', priority: 'high', status: 'in-progress' },
        { id: 3, worker: 'Robert Johnson', site: 302, task: 'Maintenance', priority: 'low', status: 'completed' }
      ];
      
      const taskIndex = tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], status };
        localStorage.setItem('constructionTasks', JSON.stringify(tasks));
      }
      
      return Promise.resolve({
        id: id,
        status: status
      });
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/tasks/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status, userId }),
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock task update due to backend error:', error);
      }
      return Promise.resolve({
        id: id,
        status: status
      });
    }
  }

  // Locations
  async getLocations() {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Try to get from localStorage first
      const storedLocations = localStorage.getItem('constructionLocations');
      if (storedLocations) {
        return Promise.resolve(JSON.parse(storedLocations));
      }
      return Promise.resolve([
        { id: 1, name: 'Main Warehouse', address: '123 Construction Ave, Delhi', type: 'warehouse', capacity: 10000 },
        { id: 2, name: 'Site A - Downtown Office', address: '456 Business St, Delhi', type: 'construction-site', capacity: 5000 },
        { id: 3, name: 'Site B - Residency Project', address: '789 Residential Rd, Delhi', type: 'construction-site', capacity: 3000 },
        { id: 4, name: 'Equipment Yard', address: '321 Industrial Zone, Delhi', type: 'yard', capacity: 8000 }
      ]);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/locations`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock locations data due to backend error:', error);
      }
      return Promise.resolve([
        { id: 1, name: 'Main Warehouse', address: '123 Construction Ave, Delhi', type: 'warehouse', capacity: 10000 },
        { id: 2, name: 'Site A - Downtown Office', address: '456 Business St, Delhi', type: 'construction-site', capacity: 5000 },
        { id: 3, name: 'Site B - Residency Project', address: '789 Residential Rd, Delhi', type: 'construction-site', capacity: 3000 },
        { id: 4, name: 'Equipment Yard', address: '321 Industrial Zone, Delhi', type: 'yard', capacity: 8000 }
      ]);
    }
  }

  async createLocation(locationData) {
    // In production, always use mock data and store in localStorage
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Update localStorage
      const storedLocations = localStorage.getItem('constructionLocations');
      let locations = storedLocations ? JSON.parse(storedLocations) : [
        { id: 1, name: 'Main Warehouse', address: '123 Construction Ave, Delhi', type: 'warehouse', capacity: 10000 },
        { id: 2, name: 'Site A - Downtown Office', address: '456 Business St, Delhi', type: 'construction-site', capacity: 5000 },
        { id: 3, name: 'Site B - Residency Project', address: '789 Residential Rd, Delhi', type: 'construction-site', capacity: 3000 },
        { id: 4, name: 'Equipment Yard', address: '321 Industrial Zone, Delhi', type: 'yard', capacity: 8000 }
      ];
      
      const newLocation = {
        id: Date.now(),
        ...locationData
      };
      
      locations.push(newLocation);
      localStorage.setItem('constructionLocations', JSON.stringify(locations));
      
      return Promise.resolve(newLocation);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/locations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(locationData),
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock location creation due to backend error:', error);
      }
      return Promise.resolve({
        id: Date.now(),
        ...locationData
      });
    }
  }

  // Inventory
  async getInventory() {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Try to get from localStorage first
      const storedInventory = localStorage.getItem('constructionInventory');
      if (storedInventory) {
        return Promise.resolve(JSON.parse(storedInventory));
      }
      return Promise.resolve([
        { id: 1, name: 'Steel Beams', category: 'Structural Materials', quantity: 150, minStock: 100, supplier: 'Steel Suppliers Inc.', price: 129.99, lastOrdered: '2023-08-15', locationId: 1, location: 'Main Warehouse', consumptionRate: 2.5 },
        { id: 2, name: 'Concrete Mix', category: 'Foundation Materials', quantity: 85, minStock: 50, supplier: 'Concrete Co.', price: 35.50, lastOrdered: '2023-08-20', locationId: 2, location: 'Site A - Downtown Office', consumptionRate: 5.0 },
        { id: 3, name: 'Electrical Wiring', category: 'Electrical Materials', quantity: 2500, minStock: 2000, supplier: 'ElectroSupply', price: 0.75, lastOrdered: '2023-09-01', locationId: 1, location: 'Main Warehouse', consumptionRate: 10.0 },
        { id: 4, name: 'Safety Helmets', category: 'Safety Equipment', quantity: 40, minStock: 30, supplier: 'SafetyFirst', price: 28.99, lastOrdered: '2023-08-25', locationId: 4, location: 'Equipment Yard', consumptionRate: 0.2 },
        { id: 5, name: 'Wood Planks', category: 'Framing Materials', quantity: 750, minStock: 500, supplier: 'Timber Works', price: 19.25, lastOrdered: '2023-07-30', locationId: 1, location: 'Main Warehouse', consumptionRate: 15.0 },
        { id: 6, name: 'Drywall Sheets', category: 'Finishing Materials', quantity: 95, minStock: 80, supplier: 'WallPro', price: 24.50, lastOrdered: '2023-08-10', locationId: 2, location: 'Site A - Downtown Office', consumptionRate: 8.0 },
        { id: 7, name: 'Paint Cans', category: 'Finishing Materials', quantity: 45, minStock: 50, supplier: 'ColorCo', price: 43.75, lastOrdered: '2023-08-20', locationId: 3, location: 'Site B - Residency Project', consumptionRate: 2.0 },
        { id: 8, name: 'Power Tools', category: 'Equipment', quantity: 15, minStock: 20, supplier: 'ToolTech', price: 122.50, lastOrdered: '2023-09-05', locationId: 4, location: 'Equipment Yard', consumptionRate: 0.05 },
        { id: 9, name: 'Work Gloves', category: 'Safety Equipment', quantity: 120, minStock: 100, supplier: 'SafetyFirst', price: 5.99, lastOrdered: '2023-08-28', locationId: 1, location: 'Main Warehouse', consumptionRate: 3.0 },
        { id: 10, name: 'Plumbing Pipes', category: 'Plumbing Materials', quantity: 600, minStock: 500, supplier: 'PipePro', price: 12.75, lastOrdered: '2023-08-05', locationId: 2, location: 'Site A - Downtown Office', consumptionRate: 7.0 }
      ]);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/inventory`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock inventory data due to backend error:', error);
      }
      return Promise.resolve([
        { id: 1, name: 'Steel Beams', category: 'Structural Materials', quantity: 150, minStock: 100, supplier: 'Steel Suppliers Inc.', price: 129.99, lastOrdered: '2023-08-15', locationId: 1, location: 'Main Warehouse', consumptionRate: 2.5 },
        { id: 2, name: 'Concrete Mix', category: 'Foundation Materials', quantity: 85, minStock: 50, supplier: 'Concrete Co.', price: 35.50, lastOrdered: '2023-08-20', locationId: 2, location: 'Site A - Downtown Office', consumptionRate: 5.0 },
        { id: 3, name: 'Electrical Wiring', category: 'Electrical Materials', quantity: 2500, minStock: 2000, supplier: 'ElectroSupply', price: 0.75, lastOrdered: '2023-09-01', locationId: 1, location: 'Main Warehouse', consumptionRate: 10.0 },
        { id: 4, name: 'Safety Helmets', category: 'Safety Equipment', quantity: 40, minStock: 30, supplier: 'SafetyFirst', price: 28.99, lastOrdered: '2023-08-25', locationId: 4, location: 'Equipment Yard', consumptionRate: 0.2 },
        { id: 5, name: 'Wood Planks', category: 'Framing Materials', quantity: 750, minStock: 500, supplier: 'Timber Works', price: 19.25, lastOrdered: '2023-07-30', locationId: 1, location: 'Main Warehouse', consumptionRate: 15.0 },
        { id: 6, name: 'Drywall Sheets', category: 'Finishing Materials', quantity: 95, minStock: 80, supplier: 'WallPro', price: 24.50, lastOrdered: '2023-08-10', locationId: 2, location: 'Site A - Downtown Office', consumptionRate: 8.0 },
        { id: 7, name: 'Paint Cans', category: 'Finishing Materials', quantity: 45, minStock: 50, supplier: 'ColorCo', price: 43.75, lastOrdered: '2023-08-20', locationId: 3, location: 'Site B - Residency Project', consumptionRate: 2.0 },
        { id: 8, name: 'Power Tools', category: 'Equipment', quantity: 15, minStock: 20, supplier: 'ToolTech', price: 122.50, lastOrdered: '2023-09-05', locationId: 4, location: 'Equipment Yard', consumptionRate: 0.05 },
        { id: 9, name: 'Work Gloves', category: 'Safety Equipment', quantity: 120, minStock: 100, supplier: 'SafetyFirst', price: 5.99, lastOrdered: '2023-08-28', locationId: 1, location: 'Main Warehouse', consumptionRate: 3.0 },
        { id: 10, name: 'Plumbing Pipes', category: 'Plumbing Materials', quantity: 600, minStock: 500, supplier: 'PipePro', price: 12.75, lastOrdered: '2023-08-05', locationId: 2, location: 'Site A - Downtown Office', consumptionRate: 7.0 }
      ]);
    }
  }

  async createInventoryItem(itemData) {
    // In production, always use mock data and store in localStorage
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Update localStorage
      const storedInventory = localStorage.getItem('constructionInventory');
      let inventory = storedInventory ? JSON.parse(storedInventory) : [
        { id: 1, name: 'Steel Beams', category: 'Structural Materials', quantity: 150, minStock: 100, supplier: 'Steel Suppliers Inc.', price: 129.99, lastOrdered: '2023-08-15', locationId: 1, location: 'Main Warehouse', consumptionRate: 2.5 },
        { id: 2, name: 'Concrete Mix', category: 'Foundation Materials', quantity: 85, minStock: 50, supplier: 'Concrete Co.', price: 35.50, lastOrdered: '2023-08-20', locationId: 2, location: 'Site A - Downtown Office', consumptionRate: 5.0 },
        { id: 3, name: 'Electrical Wiring', category: 'Electrical Materials', quantity: 2500, minStock: 2000, supplier: 'ElectroSupply', price: 0.75, lastOrdered: '2023-09-01', locationId: 1, location: 'Main Warehouse', consumptionRate: 10.0 },
        { id: 4, name: 'Safety Helmets', category: 'Safety Equipment', quantity: 40, minStock: 30, supplier: 'SafetyFirst', price: 28.99, lastOrdered: '2023-08-25', locationId: 4, location: 'Equipment Yard', consumptionRate: 0.2 },
        { id: 5, name: 'Wood Planks', category: 'Framing Materials', quantity: 750, minStock: 500, supplier: 'Timber Works', price: 19.25, lastOrdered: '2023-07-30', locationId: 1, location: 'Main Warehouse', consumptionRate: 15.0 },
        { id: 6, name: 'Drywall Sheets', category: 'Finishing Materials', quantity: 95, minStock: 80, supplier: 'WallPro', price: 24.50, lastOrdered: '2023-08-10', locationId: 2, location: 'Site A - Downtown Office', consumptionRate: 8.0 },
        { id: 7, name: 'Paint Cans', category: 'Finishing Materials', quantity: 45, minStock: 50, supplier: 'ColorCo', price: 43.75, lastOrdered: '2023-08-20', locationId: 3, location: 'Site B - Residency Project', consumptionRate: 2.0 },
        { id: 8, name: 'Power Tools', category: 'Equipment', quantity: 15, minStock: 20, supplier: 'ToolTech', price: 122.50, lastOrdered: '2023-09-05', locationId: 4, location: 'Equipment Yard', consumptionRate: 0.05 },
        { id: 9, name: 'Work Gloves', category: 'Safety Equipment', quantity: 120, minStock: 100, supplier: 'SafetyFirst', price: 5.99, lastOrdered: '2023-08-28', locationId: 1, location: 'Main Warehouse', consumptionRate: 3.0 },
        { id: 10, name: 'Plumbing Pipes', category: 'Plumbing Materials', quantity: 600, minStock: 500, supplier: 'PipePro', price: 12.75, lastOrdered: '2023-08-05', locationId: 2, location: 'Site A - Downtown Office', consumptionRate: 7.0 }
      ];
      
      // Find location object to get the ID
      const storedLocations = localStorage.getItem('constructionLocations');
      const locations = storedLocations ? JSON.parse(storedLocations) : [
        { id: 1, name: 'Main Warehouse', address: '123 Construction Ave, Delhi', type: 'warehouse', capacity: 10000 },
        { id: 2, name: 'Site A - Downtown Office', address: '456 Business St, Delhi', type: 'construction-site', capacity: 5000 },
        { id: 3, name: 'Site B - Residency Project', address: '789 Residential Rd, Delhi', type: 'construction-site', capacity: 3000 },
        { id: 4, name: 'Equipment Yard', address: '321 Industrial Zone, Delhi', type: 'yard', capacity: 8000 }
      ];
      
      const location = locations.find(loc => loc.name === itemData.location);
      
      const newItem = {
        id: Date.now(),
        ...itemData,
        locationId: location ? location.id : 1, // Default to first location if not found
        consumptionRate: 0, // Default consumption rate
        lastOrdered: new Date().toISOString().split('T')[0]
      };
      
      inventory.push(newItem);
      localStorage.setItem('constructionInventory', JSON.stringify(inventory));
      
      return Promise.resolve(newItem);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/inventory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(itemData),
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock inventory creation due to backend error:', error);
      }
      return Promise.resolve({
        id: Date.now(),
        ...itemData,
        consumptionRate: 0, // Default consumption rate
        lastOrdered: new Date().toISOString().split('T')[0]
      });
    }
  }

  // Consumption tracking
  async logConsumption(consumptionData) {
    // In production, always use mock data and update inventory
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update inventory to reduce quantity
      const storedInventory = localStorage.getItem('constructionInventory');
      let inventory = storedInventory ? JSON.parse(storedInventory) : [
        { id: 1, name: 'Steel Beams', category: 'Structural Materials', quantity: 150, minStock: 100, supplier: 'Steel Suppliers Inc.', price: 129.99, lastOrdered: '2023-08-15', locationId: 1, location: 'Main Warehouse', consumptionRate: 2.5 },
        { id: 2, name: 'Concrete Mix', category: 'Foundation Materials', quantity: 85, minStock: 50, supplier: 'Concrete Co.', price: 35.50, lastOrdered: '2023-08-20', locationId: 2, location: 'Site A - Downtown Office', consumptionRate: 5.0 },
        { id: 3, name: 'Electrical Wiring', category: 'Electrical Materials', quantity: 2500, minStock: 2000, supplier: 'ElectroSupply', price: 0.75, lastOrdered: '2023-09-01', locationId: 1, location: 'Main Warehouse', consumptionRate: 10.0 },
        { id: 4, name: 'Safety Helmets', category: 'Safety Equipment', quantity: 40, minStock: 30, supplier: 'SafetyFirst', price: 28.99, lastOrdered: '2023-08-25', locationId: 4, location: 'Equipment Yard', consumptionRate: 0.2 },
        { id: 5, name: 'Wood Planks', category: 'Framing Materials', quantity: 750, minStock: 500, supplier: 'Timber Works', price: 19.25, lastOrdered: '2023-07-30', locationId: 1, location: 'Main Warehouse', consumptionRate: 15.0 },
        { id: 6, name: 'Drywall Sheets', category: 'Finishing Materials', quantity: 95, minStock: 80, supplier: 'WallPro', price: 24.50, lastOrdered: '2023-08-10', locationId: 2, location: 'Site A - Downtown Office', consumptionRate: 8.0 },
        { id: 7, name: 'Paint Cans', category: 'Finishing Materials', quantity: 45, minStock: 50, supplier: 'ColorCo', price: 43.75, lastOrdered: '2023-08-20', locationId: 3, location: 'Site B - Residency Project', consumptionRate: 2.0 },
        { id: 8, name: 'Power Tools', category: 'Equipment', quantity: 15, minStock: 20, supplier: 'ToolTech', price: 122.50, lastOrdered: '2023-09-05', locationId: 4, location: 'Equipment Yard', consumptionRate: 0.05 },
        { id: 9, name: 'Work Gloves', category: 'Safety Equipment', quantity: 120, minStock: 100, supplier: 'SafetyFirst', price: 5.99, lastOrdered: '2023-08-28', locationId: 1, location: 'Main Warehouse', consumptionRate: 3.0 },
        { id: 10, name: 'Plumbing Pipes', category: 'Plumbing Materials', quantity: 600, minStock: 500, supplier: 'PipePro', price: 12.75, lastOrdered: '2023-08-05', locationId: 2, location: 'Site A - Downtown Office', consumptionRate: 7.0 }
      ];
      
      // Find and update the item
      const itemIndex = inventory.findIndex(item => item.id === consumptionData.itemId);
      if (itemIndex !== -1) {
        // Reduce inventory by consumption amount
        inventory[itemIndex].quantity -= consumptionData.quantity;
        // Update last consumption date
        inventory[itemIndex].lastConsumed = new Date().toISOString().split('T')[0];
      }
      
      localStorage.setItem('constructionInventory', JSON.stringify(inventory));
      
      // Save consumption record
      const storedConsumptions = localStorage.getItem('constructionConsumptions') || '[]';
      const consumptions = JSON.parse(storedConsumptions);
      const newConsumption = {
        id: Date.now(),
        ...consumptionData,
        timestamp: new Date().toISOString()
      };
      consumptions.push(newConsumption);
      localStorage.setItem('constructionConsumptions', JSON.stringify(consumptions));
      
      return Promise.resolve(newConsumption);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/consumption`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(consumptionData),
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock consumption logging due to backend error:', error);
      }
      return Promise.resolve({
        id: Date.now(),
        ...consumptionData,
        timestamp: new Date().toISOString()
      });
    }
  }

  async getConsumptionRecords() {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Try to get from localStorage first
      const storedConsumptions = localStorage.getItem('constructionConsumptions');
      if (storedConsumptions) {
        return Promise.resolve(JSON.parse(storedConsumptions));
      }
      return Promise.resolve([
        { id: 1, itemId: 1, itemName: 'Steel Beams', quantity: 10, projectId: 'PROJ-001', date: '2023-10-20', timestamp: new Date('2023-10-20').toISOString() },
        { id: 2, itemId: 3, itemName: 'Electrical Wiring', quantity: 50, projectId: 'PROJ-002', date: '2023-10-19', timestamp: new Date('2023-10-19').toISOString() },
        { id: 3, itemId: 5, itemName: 'Wood Planks', quantity: 100, projectId: 'PROJ-001', date: '2023-10-18', timestamp: new Date('2023-10-18').toISOString() },
        { id: 4, itemId: 2, itemName: 'Concrete Mix', quantity: 20, projectId: 'PROJ-003', date: '2023-10-17', timestamp: new Date('2023-10-17').toISOString() }
      ]);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/consumption`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock consumption records due to backend error:', error);
      }
      return Promise.resolve([
        { id: 1, itemId: 1, itemName: 'Steel Beams', quantity: 10, projectId: 'PROJ-001', date: '2023-10-20', timestamp: new Date('2023-10-20').toISOString() },
        { id: 2, itemId: 3, itemName: 'Electrical Wiring', quantity: 50, projectId: 'PROJ-002', date: '2023-10-19', timestamp: new Date('2023-10-19').toISOString() },
        { id: 3, itemId: 5, itemName: 'Wood Planks', quantity: 100, projectId: 'PROJ-001', date: '2023-10-18', timestamp: new Date('2023-10-18').toISOString() },
        { id: 4, itemId: 2, itemName: 'Concrete Mix', quantity: 20, projectId: 'PROJ-003', date: '2023-10-17', timestamp: new Date('2023-10-17').toISOString() }
      ]);
    }
  }

  // Helper functions for formatting and utilities
  getStatusClass(status) {
    switch(status) {
      case 'active': return 'bg-emerald-100 text-emerald-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-teal-100 text-teal-800'
      case 'pending': return 'bg-amber-100 text-amber-800'
      case 'prospecting': return 'bg-slate-100 text-slate-800'
      case 'new': return 'bg-purple-100 text-purple-800'
      case 'qualified': return 'bg-emerald-100 text-emerald-800'
      case 'contacted': return 'bg-blue-100 text-blue-800'
      case 'maintenance': return 'bg-rose-100 text-rose-800'
      case 'low_stock': return 'bg-amber-100 text-amber-800'
      case 'out_of_stock': return 'bg-rose-100 text-rose-800'
      case 'in_stock': return 'bg-teal-100 text-teal-800'
      case 'overstocked': return 'bg-blue-100 text-blue-800'
      default: return 'bg-slate-100 text-slate-800'
    }
  }

  getPriorityClass(priority) {
    switch(priority) {
      case 'high': return 'bg-rose-100 text-rose-800'
      case 'medium': return 'bg-amber-100 text-amber-800'
      case 'low': return 'bg-emerald-100 text-emerald-800'
      default: return 'bg-slate-100 text-slate-800'
    }
  }

  getStatusText(status) {
    switch(status) {
      case 'active': return 'Active'
      case 'in-progress': return 'In Progress'
      case 'completed': return 'Completed'
      case 'pending': return 'Pending'
      case 'prospecting': return 'Prospecting'
      case 'new': return 'New'
      case 'qualified': return 'Qualified'
      case 'contacted': return 'Contacted'
      case 'maintenance': return 'Maintenance'
      case 'low_stock': return 'Low Stock'
      case 'out_of_stock': return 'Out of Stock'
      case 'in_stock': return 'In Stock'
      case 'overstocked': return 'Overstocked'
      default: return status.charAt(0).toUpperCase() + status.slice(1)
    }
  }

  getPriorityText(priority) {
    switch(priority) {
      case 'high': return 'High'
      case 'medium': return 'Medium'
      case 'low': return 'Low'
      default: return priority.charAt(0).toUpperCase() + priority.slice(1)
    }
  }

  // Mock data helpers for when backend is not available
  getMockDashboardStats() {
    return {
      pendingTasks: 12,
      activeSites: 42,
      availableSites: 8,
      totalCrew: 24,
      qualityRating: 94,
      revenue: 12500
    };
  }

  getMockRecentActivity() {
    return [
      {
        id: 1,
        type: 'task',
        title: 'New task created',
        description: 'John Doe - Extra materials (Site 205)',
        time: '2 minutes ago'
      },
      {
        id: 2,
        type: 'site',
        title: 'Site status updated',
        description: 'Site 103 marked as Clean',
        time: '1 hour ago'
      },
      {
        id: 3,
        type: 'task',
        title: 'Task completed',
        description: 'Foundation work delivered to Site 102',
        time: '15 minutes ago'
      },
      {
        id: 4,
        type: 'maintenance',
        title: 'Maintenance task',
        description: 'Leaky pipe reported in Site 302',
        time: '2 hours ago'
      }
    ];
  }

  getMockNotifications() {
    return [
      {
        id: 1,
        title: 'New construction task',
        message: 'John Doe needs extra materials in Site 205',
        time: '2 minutes ago',
        read: false
      },
      {
        id: 2,
        title: 'Site status updated',
        message: 'Site 103 has been marked as Clean',
        time: '1 hour ago',
        read: false
      },
      {
        id: 3,
        title: 'Maintenance required',
        message: 'Leaky pipe reported in Site 302',
        time: '2 hours ago',
        read: true
      }
    ];
  }

  // Legal Documents Management
  async getLegalDocuments() {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Try to get from localStorage first
      const storedDocuments = localStorage.getItem('legalDocuments');
      if (storedDocuments) {
        return Promise.resolve(JSON.parse(storedDocuments));
      }
      return Promise.resolve([
        {
          id: 1,
          title: 'Building Permit - Downtown Complex',
          type: 'permit',
          category: 'regulatory',
          project: 'Downtown Office Complex',
          client: 'Metro Developments',
          status: 'active',
          expiryDate: '2026-05-15',
          fileName: 'building-permit-2025.pdf',
          uploadedAt: '2025-01-20',
          uploadedBy: 'Rajesh Sharma',
          size: '2.4 MB'
        },
        {
          id: 2,
          title: 'Insurance Certificate - Liability',
          type: 'insurance',
          category: 'compliance',
          project: 'Residential Tower A',
          client: 'Urban Homes Ltd',
          status: 'active',
          expiryDate: '2025-08-30',
          fileName: 'liability-insurance-2025.pdf',
          uploadedAt: '2025-01-18',
          uploadedBy: 'Priya Patel',
          size: '1.8 MB'
        },
        {
          id: 3,
          title: 'Safety Compliance Checklist',
          type: 'compliance',
          category: 'safety',
          project: 'Industrial Facility',
          client: 'Tech Manufacturing Inc',
          status: 'active',
          expiryDate: '2025-03-15',
          fileName: 'safety-checklist.pdf',
          uploadedAt: '2025-01-15',
          uploadedBy: 'Vikram Singh',
          size: '0.9 MB'
        },
        {
          id: 4,
          title: 'Subcontractor Agreement - Plumbing',
          type: 'contract',
          category: 'subcontract',
          project: 'Commercial Plaza',
          client: 'BuildRight Contractors',
          status: 'active',
          expiryDate: '2025-12-31',
          fileName: 'plumbing-contract.pdf',
          uploadedAt: '2025-01-10',
          uploadedBy: 'Amit Kumar',
          size: '3.2 MB'
        }
      ]);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/legal-documents`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock legal documents due to backend error:', error);
      }
      return Promise.resolve([
        {
          id: 1,
          title: 'Building Permit - Downtown Complex',
          type: 'permit',
          category: 'regulatory',
          project: 'Downtown Office Complex',
          client: 'Metro Developments',
          status: 'active',
          expiryDate: '2026-05-15',
          fileName: 'building-permit-2025.pdf',
          uploadedAt: '2025-01-20',
          uploadedBy: 'Rajesh Sharma',
          size: '2.4 MB'
        },
        {
          id: 2,
          title: 'Insurance Certificate - Liability',
          type: 'insurance',
          category: 'compliance',
          project: 'Residential Tower A',
          client: 'Urban Homes Ltd',
          status: 'active',
          expiryDate: '2025-08-30',
          fileName: 'liability-insurance-2025.pdf',
          uploadedAt: '2025-01-18',
          uploadedBy: 'Priya Patel',
          size: '1.8 MB'
        },
        {
          id: 3,
          title: 'Safety Compliance Checklist',
          type: 'compliance',
          category: 'safety',
          project: 'Industrial Facility',
          client: 'Tech Manufacturing Inc',
          status: 'active',
          expiryDate: '2025-03-15',
          fileName: 'safety-checklist.pdf',
          uploadedAt: '2025-01-15',
          uploadedBy: 'Vikram Singh',
          size: '0.9 MB'
        },
        {
          id: 4,
          title: 'Subcontractor Agreement - Plumbing',
          type: 'contract',
          category: 'subcontract',
          project: 'Commercial Plaza',
          client: 'BuildRight Contractors',
          status: 'active',
          expiryDate: '2025-12-31',
          fileName: 'plumbing-contract.pdf',
          uploadedAt: '2025-01-10',
          uploadedBy: 'Amit Kumar',
          size: '3.2 MB'
        }
      ]);
    }
  }

  async uploadLegalDocument(documentData) {
    // In production, always use mock data and store in localStorage
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Update localStorage
      const storedDocuments = localStorage.getItem('legalDocuments');
      let documents = storedDocuments ? JSON.parse(storedDocuments) : [
        {
          id: 1,
          title: 'Building Permit - Downtown Complex',
          type: 'permit',
          category: 'regulatory',
          project: 'Downtown Office Complex',
          client: 'Metro Developments',
          status: 'active',
          expiryDate: '2026-05-15',
          fileName: 'building-permit-2025.pdf',
          uploadedAt: '2025-01-20',
          uploadedBy: 'Rajesh Sharma',
          size: '2.4 MB'
        },
        {
          id: 2,
          title: 'Insurance Certificate - Liability',
          type: 'insurance',
          category: 'compliance',
          project: 'Residential Tower A',
          client: 'Urban Homes Ltd',
          status: 'active',
          expiryDate: '2025-08-30',
          fileName: 'liability-insurance-2025.pdf',
          uploadedAt: '2025-01-18',
          uploadedBy: 'Priya Patel',
          size: '1.8 MB'
        },
        {
          id: 3,
          title: 'Safety Compliance Checklist',
          type: 'compliance',
          category: 'safety',
          project: 'Industrial Facility',
          client: 'Tech Manufacturing Inc',
          status: 'active',
          expiryDate: '2025-03-15',
          fileName: 'safety-checklist.pdf',
          uploadedAt: '2025-01-15',
          uploadedBy: 'Vikram Singh',
          size: '0.9 MB'
        },
        {
          id: 4,
          title: 'Subcontractor Agreement - Plumbing',
          type: 'contract',
          category: 'subcontract',
          project: 'Commercial Plaza',
          client: 'BuildRight Contractors',
          status: 'active',
          expiryDate: '2025-12-31',
          fileName: 'plumbing-contract.pdf',
          uploadedAt: '2025-01-10',
          uploadedBy: 'Amit Kumar',
          size: '3.2 MB'
        }
      ];
      
      const newDocument = {
        id: Date.now(),
        ...documentData,
        uploadedAt: new Date().toISOString().split('T')[0],
        uploadedBy: 'Current User', // This would be the actual user in a real app
        size: '1.2 MB' // Mock size
      };
      
      documents.push(newDocument);
      localStorage.setItem('legalDocuments', JSON.stringify(documents));
      
      return Promise.resolve(newDocument);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/legal-documents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(documentData),
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock document upload due to backend error:', error);
      }
      return Promise.resolve({
        id: Date.now(),
        ...documentData,
        uploadedAt: new Date().toISOString().split('T')[0],
        uploadedBy: 'Current User',
        size: '1.2 MB'
      });
    }
  }

  // Construction CRM Features
  async getProjects() {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Try to get from localStorage first
      const storedProjects = localStorage.getItem('constructionProjects');
      if (storedProjects) {
        return Promise.resolve(JSON.parse(storedProjects));
      }
      return Promise.resolve([
        {
          id: 1,
          name: 'Downtown Office Complex',
          client: 'Metro Developments',
          startDate: '2025-02-01',
          endDate: '2026-03-31',
          budget: 12500000,
          status: 'active',
          location: 'Downtown District',
          description: '12-story office complex with modern amenities',
          progress: 45,
          tasksCompleted: 24,
          totalTasks: 54,
          crewSize: 28,
          equipment: 12
        },
        {
          id: 2,
          name: 'Residential Tower A',
          client: 'Urban Homes Ltd',
          startDate: '2025-01-15',
          endDate: '2025-11-30',
          budget: 8750000,
          status: 'active',
          location: 'Riverside Area',
          description: '20-story residential tower with luxury finishes',
          progress: 72,
          tasksCompleted: 38,
          totalTasks: 53,
          crewSize: 32,
          equipment: 8
        },
        {
          id: 3,
          name: 'Industrial Facility',
          client: 'Tech Manufacturing Inc',
          startDate: '2024-11-01',
          endDate: '2025-09-15',
          budget: 15200000,
          status: 'in-progress',
          location: 'Industrial Zone',
          description: 'Manufacturing facility with warehouse space',
          progress: 38,
          tasksCompleted: 17,
          totalTasks: 45,
          crewSize: 42,
          equipment: 18
        }
      ]);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/projects`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock projects due to backend error:', error);
      }
      return Promise.resolve([
        {
          id: 1,
          name: 'Downtown Office Complex',
          client: 'Metro Developments',
          startDate: '2025-02-01',
          endDate: '2026-03-31',
          budget: 12500000,
          status: 'active',
          location: 'Downtown District',
          description: '12-story office complex with modern amenities',
          progress: 45,
          tasksCompleted: 24,
          totalTasks: 54,
          crewSize: 28,
          equipment: 12
        },
        {
          id: 2,
          name: 'Residential Tower A',
          client: 'Urban Homes Ltd',
          startDate: '2025-01-15',
          endDate: '2025-11-30',
          budget: 8750000,
          status: 'active',
          location: 'Riverside Area',
          description: '20-story residential tower with luxury finishes',
          progress: 72,
          tasksCompleted: 38,
          totalTasks: 53,
          crewSize: 32,
          equipment: 8
        },
        {
          id: 3,
          name: 'Industrial Facility',
          client: 'Tech Manufacturing Inc',
          startDate: '2024-11-01',
          endDate: '2025-09-15',
          budget: 15200000,
          status: 'in-progress',
          location: 'Industrial Zone',
          description: 'Manufacturing facility with warehouse space',
          progress: 38,
          tasksCompleted: 17,
          totalTasks: 45,
          crewSize: 42,
          equipment: 18
        }
      ]);
    }
  }

  async getLeads() {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Try to get from localStorage first
      const storedLeads = localStorage.getItem('constructionLeads');
      if (storedLeads) {
        return Promise.resolve(JSON.parse(storedLeads));
      }
      return Promise.resolve([
        {
          id: 1,
          name: 'Rajesh Gupta',
          company: 'Premier Builders',
          email: 'rajesh@premierbuilders.com',
          phone: '+91 98765 43210',
          source: 'referral',
          status: 'qualified',
          value: 5000000,
          lastContact: '2025-01-18',
          notes: 'Interested in residential projects'
        },
        {
          id: 2,
          name: 'Priya Sharma',
          company: 'Urban Construction',
          email: 'priya@urbancon.com',
          phone: '+91 98765 43211',
          source: 'website',
          status: 'new',
          value: 12000000,
          lastContact: '2025-01-20',
          notes: 'Inquiring about commercial development'
        },
        {
          id: 3,
          name: 'Amit Patel',
          company: 'Elite Construction',
          email: 'amit@eliteconst.com',
          phone: '+91 98765 43212',
          source: 'trade show',
          status: 'contacted',
          value: 8500000,
          lastContact: '2025-01-15',
          notes: 'Follow up needed next week'
        }
      ]);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/leads`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock leads due to backend error:', error);
      }
      return Promise.resolve([
        {
          id: 1,
          name: 'Rajesh Gupta',
          company: 'Premier Builders',
          email: 'rajesh@premierbuilders.com',
          phone: '+91 98765 43210',
          source: 'referral',
          status: 'qualified',
          value: 5000000,
          lastContact: '2025-01-18',
          notes: 'Interested in residential projects'
        },
        {
          id: 2,
          name: 'Priya Sharma',
          company: 'Urban Construction',
          email: 'priya@urbancon.com',
          phone: '+91 98765 43211',
          source: 'website',
          status: 'new',
          value: 12000000,
          lastContact: '2025-01-20',
          notes: 'Inquiring about commercial development'
        },
        {
          id: 3,
          name: 'Amit Patel',
          company: 'Elite Construction',
          email: 'amit@eliteconst.com',
          phone: '+91 98765 43212',
          source: 'trade show',
          status: 'contacted',
          value: 8500000,
          lastContact: '2025-01-15',
          notes: 'Follow up needed next week'
        }
      ]);
    }
  }

  async getBlogPosts() {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Try to get from localStorage first
      const storedPosts = localStorage.getItem('blogPosts');
      if (storedPosts) {
        return Promise.resolve(JSON.parse(storedPosts));
      }
      return Promise.resolve([
        {
          id: 1,
          title: "10 Strategies to Reduce Construction Waste and Improve Sustainability",
          excerpt: "Learn how implementing proper waste management protocols can reduce costs by up to 30% while maintaining project timelines.",
          category: "Sustainability",
          author: "Rajesh Sharma",
          date: "2025-01-15",
          readTime: "8 min",
          image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
          tags: ["waste management", "sustainability", "efficiency"]
        },
        {
          id: 2,
          title: "The Future of Legal Compliance in Construction: What Contractors Need to Know",
          excerpt: "Navigate the evolving landscape of construction regulations and ensure your projects remain compliant with current and upcoming laws.",
          category: "Legal",
          author: "Priya Patel",
          date: "2025-01-10",
          readTime: "12 min",
          image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
          tags: ["compliance", "legal", "regulations"]
        },
        {
          id: 3,
          title: "How Digital Transformation is Revolutionizing Construction Project Management",
          excerpt: "Discover the tools and technologies that are reshaping how construction projects are planned, executed, and managed.",
          category: "Technology",
          author: "Amit Kumar",
          date: "2025-01-05",
          readTime: "10 min",
          image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
          tags: ["technology", "digital transformation", "project management"]
        },
        {
          id: 4,
          title: "Material Cost Optimization: Strategies for Managing Fluctuating Prices",
          excerpt: "Learn how to protect your profit margins against volatile material costs with smart procurement and inventory strategies.",
          category: "Finance",
          author: "Sunita Mehta",
          date: "2024-12-28",
          readTime: "7 min",
          image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
          tags: ["cost optimization", "procurement", "finance"]
        },
        {
          id: 5,
          title: "Safety First: Implementing a Zero-Incident Culture on Construction Sites",
          excerpt: "Building a safety-first culture that protects workers and reduces costly delays and legal issues.",
          category: "Safety",
          author: "Vikram Singh",
          date: "2024-12-20",
          readTime: "9 min",
          image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
          tags: ["safety", "culture", "risk management"]
        },
        {
          id: 6,
          title: "The Rise of Green Building: Opportunities for Construction Contractors",
          excerpt: "Explore the growing market for sustainable construction and how to position your business for green building projects.",
          category: "Sustainability",
          author: "Arjun Desai",
          date: "2024-12-15",
          readTime: "11 min",
          image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
          tags: ["green building", "sustainability", "market opportunities"]
        }
      ]);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/blog`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock blog posts due to backend error:', error);
      }
      return Promise.resolve([
        {
          id: 1,
          title: "10 Strategies to Reduce Construction Waste and Improve Sustainability",
          excerpt: "Learn how implementing proper waste management protocols can reduce costs by up to 30% while maintaining project timelines.",
          category: "Sustainability",
          author: "Rajesh Sharma",
          date: "2025-01-15",
          readTime: "8 min",
          image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
          tags: ["waste management", "sustainability", "efficiency"]
        },
        {
          id: 2,
          title: "The Future of Legal Compliance in Construction: What Contractors Need to Know",
          excerpt: "Navigate the evolving landscape of construction regulations and ensure your projects remain compliant with current and upcoming laws.",
          category: "Legal",
          author: "Priya Patel",
          date: "2025-01-10",
          readTime: "12 min",
          image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
          tags: ["compliance", "legal", "regulations"]
        },
        {
          id: 3,
          title: "How Digital Transformation is Revolutionizing Construction Project Management",
          excerpt: "Discover the tools and technologies that are reshaping how construction projects are planned, executed, and managed.",
          category: "Technology",
          author: "Amit Kumar",
          date: "2025-01-05",
          readTime: "10 min",
          image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
          tags: ["technology", "digital transformation", "project management"]
        },
        {
          id: 4,
          title: "Material Cost Optimization: Strategies for Managing Fluctuating Prices",
          excerpt: "Learn how to protect your profit margins against volatile material costs with smart procurement and inventory strategies.",
          category: "Finance",
          author: "Sunita Mehta",
          date: "2024-12-28",
          readTime: "7 min",
          image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
          tags: ["cost optimization", "procurement", "finance"]
        },
        {
          id: 5,
          title: "Safety First: Implementing a Zero-Incident Culture on Construction Sites",
          excerpt: "Building a safety-first culture that protects workers and reduces costly delays and legal issues.",
          category: "Safety",
          author: "Vikram Singh",
          date: "2024-12-20",
          readTime: "9 min",
          image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
          tags: ["safety", "culture", "risk management"]
        },
        {
          id: 6,
          title: "The Rise of Green Building: Opportunities for Construction Contractors",
          excerpt: "Explore the growing market for sustainable construction and how to position your business for green building projects.",
          category: "Sustainability",
          author: "Arjun Desai",
          date: "2024-12-15",
          readTime: "11 min",
          image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
          tags: ["green building", "sustainability", "market opportunities"]
        }
      ]);
    }
  }

  // Additional helper methods for CRM and other features
  async getProjects() {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Try to get from localStorage first
      const storedProjects = localStorage.getItem('constructionProjects');
      if (storedProjects) {
        return Promise.resolve(JSON.parse(storedProjects));
      }
      return Promise.resolve([
        {
          id: 1,
          name: 'Downtown Office Complex',
          client: 'Metro Developments',
          startDate: '2025-02-01',
          endDate: '2026-03-31',
          budget: 12500000,
          status: 'active',
          location: 'Downtown District',
          description: '12-story office complex with modern amenities',
          progress: 45,
          tasksCompleted: 24,
          totalTasks: 54,
          crewSize: 28,
          equipment: 12
        },
        {
          id: 2,
          name: 'Residential Tower A',
          client: 'Urban Homes Ltd',
          startDate: '2025-01-15',
          endDate: '2025-11-30',
          budget: 8750000,
          status: 'active',
          location: 'Riverside Area',
          description: '20-story residential tower with luxury finishes',
          progress: 72,
          tasksCompleted: 38,
          totalTasks: 53,
          crewSize: 32,
          equipment: 8
        },
        {
          id: 3,
          name: 'Industrial Facility',
          client: 'Tech Manufacturing Inc',
          startDate: '2024-11-01',
          endDate: '2025-09-15',
          budget: 15200000,
          status: 'in-progress',
          location: 'Industrial Zone',
          description: 'Manufacturing facility with warehouse space',
          progress: 38,
          tasksCompleted: 17,
          totalTasks: 45,
          crewSize: 42,
          equipment: 18
        }
      ]);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/projects`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock projects due to backend error:', error);
      }
      return Promise.resolve([
        {
          id: 1,
          name: 'Downtown Office Complex',
          client: 'Metro Developments',
          startDate: '2025-02-01',
          endDate: '2026-03-31',
          budget: 12500000,
          status: 'active',
          location: 'Downtown District',
          description: '12-story office complex with modern amenities',
          progress: 45,
          tasksCompleted: 24,
          totalTasks: 54,
          crewSize: 28,
          equipment: 12
        },
        {
          id: 2,
          name: 'Residential Tower A',
          client: 'Urban Homes Ltd',
          startDate: '2025-01-15',
          endDate: '2025-11-30',
          budget: 8750000,
          status: 'active',
          location: 'Riverside Area',
          description: '20-story residential tower with luxury finishes',
          progress: 72,
          tasksCompleted: 38,
          totalTasks: 53,
          crewSize: 32,
          equipment: 8
        },
        {
          id: 3,
          name: 'Industrial Facility',
          client: 'Tech Manufacturing Inc',
          startDate: '2024-11-01',
          endDate: '2025-09-15',
          budget: 15200000,
          status: 'in-progress',
          location: 'Industrial Zone',
          description: 'Manufacturing facility with warehouse space',
          progress: 38,
          tasksCompleted: 17,
          totalTasks: 45,
          crewSize: 42,
          equipment: 18
        }
      ]);
    }
  }

  async getLeads() {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Try to get from localStorage first
      const storedLeads = localStorage.getItem('constructionLeads');
      if (storedLeads) {
        return Promise.resolve(JSON.parse(storedLeads));
      }
      return Promise.resolve([
        {
          id: 1,
          name: 'Rajesh Gupta',
          company: 'Premier Builders',
          email: 'rajesh@premierbuilders.com',
          phone: '+91 98765 43210',
          source: 'referral',
          status: 'qualified',
          value: 5000000,
          lastContact: '2025-01-18',
          notes: 'Interested in residential projects'
        },
        {
          id: 2,
          name: 'Priya Sharma',
          company: 'Urban Construction',
          email: 'priya@urbancon.com',
          phone: '+91 98765 43211',
          source: 'website',
          status: 'new',
          value: 12000000,
          lastContact: '2025-01-20',
          notes: 'Inquiring about commercial development'
        },
        {
          id: 3,
          name: 'Amit Patel',
          company: 'Elite Construction',
          email: 'amit@eliteconst.com',
          phone: '+91 98765 43212',
          source: 'trade show',
          status: 'contacted',
          value: 8500000,
          lastContact: '2025-01-15',
          notes: 'Follow up needed next week'
        }
      ]);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/leads`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock leads due to backend error:', error);
      }
      return Promise.resolve([
        {
          id: 1,
          name: 'Rajesh Gupta',
          company: 'Premier Builders',
          email: 'rajesh@premierbuilders.com',
          phone: '+91 98765 43210',
          source: 'referral',
          status: 'qualified',
          value: 5000000,
          lastContact: '2025-01-18',
          notes: 'Interested in residential projects'
        },
        {
          id: 2,
          name: 'Priya Sharma',
          company: 'Urban Construction',
          email: 'priya@urbancon.com',
          phone: '+91 98765 43211',
          source: 'website',
          status: 'new',
          value: 12000000,
          lastContact: '2025-01-20',
          notes: 'Inquiring about commercial development'
        },
        {
          id: 3,
          name: 'Amit Patel',
          company: 'Elite Construction',
          email: 'amit@eliteconst.com',
          phone: '+91 98765 43212',
          source: 'trade show',
          status: 'contacted',
          value: 8500000,
          lastContact: '2025-01-15',
          notes: 'Follow up needed next week'
        }
      ]);
    }
  }

  // Add missing helper functions that were referenced in components
  getMockDashboardStats() {
    return {
      pendingTasks: 12,
      activeSites: 42,
      availableSites: 8,
      totalCrew: 24,
      qualityRating: 94,
      revenue: 12500
    };
  }

  getMockRecentActivity() {
    return [
      {
        id: 1,
        type: 'task',
        title: 'New task created',
        description: 'John Doe - Extra materials (Site 205)',
        time: '2 minutes ago'
      },
      {
        id: 2,
        type: 'site',
        title: 'Site status updated',
        description: 'Site 103 marked as Clean',
        time: '1 hour ago'
      },
      {
        id: 3,
        type: 'task',
        title: 'Task completed',
        description: 'Foundation work delivered to Site 102',
        time: '15 minutes ago'
      },
      {
        id: 4,
        type: 'maintenance',
        title: 'Maintenance task',
        description: 'Leaky pipe reported in Site 302',
        time: '2 hours ago'
      }
    ];
  }

  getMockNotifications() {
    return [
      {
        id: 1,
        title: 'New construction task',
        message: 'John Doe needs extra materials in Site 205',
        time: '2 minutes ago',
        read: false
      },
      {
        id: 2,
        title: 'Site status updated',
        message: 'Site 103 has been marked as Clean',
        time: '1 hour ago',
        read: false
      },
      {
        id: 3,
        title: 'Maintenance required',
        message: 'Leaky pipe reported in Site 302',
        time: '2 hours ago',
        read: true
      }
    ];
  }

  // Consumption tracking
  async logConsumption(consumptionData) {
    // In production, always use mock data and update inventory
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update inventory to reduce quantity
      const storedInventory = localStorage.getItem('constructionInventory');
      let inventory = storedInventory ? JSON.parse(storedInventory) : [
        { id: 1, name: 'Steel Beams', category: 'Structural Materials', quantity: 150, minStock: 100, supplier: 'Steel Suppliers Inc.', price: 129.99, lastOrdered: '2023-08-15', locationId: 1, location: 'Main Warehouse', consumptionRate: 2.5 },
        { id: 2, name: 'Concrete Mix', category: 'Foundation Materials', quantity: 85, minStock: 50, supplier: 'Concrete Co.', price: 35.50, lastOrdered: '2023-08-20', locationId: 2, location: 'Site A - Downtown Office', consumptionRate: 5.0 },
        { id: 3, name: 'Electrical Wiring', category: 'Electrical Materials', quantity: 2500, minStock: 2000, supplier: 'ElectroSupply', price: 0.75, lastOrdered: '2023-09-01', locationId: 1, location: 'Main Warehouse', consumptionRate: 10.0 },
        { id: 4, name: 'Safety Helmets', category: 'Safety Equipment', quantity: 40, minStock: 30, supplier: 'SafetyFirst', price: 28.99, lastOrdered: '2023-08-25', locationId: 4, location: 'Equipment Yard', consumptionRate: 0.2 },
        { id: 5, name: 'Wood Planks', category: 'Framing Materials', quantity: 750, minStock: 500, supplier: 'Timber Works', price: 19.25, lastOrdered: '2023-07-30', locationId: 1, location: 'Main Warehouse', consumptionRate: 15.0 },
        { id: 6, name: 'Drywall Sheets', category: 'Finishing Materials', quantity: 95, minStock: 80, supplier: 'WallPro', price: 24.50, lastOrdered: '2023-08-10', locationId: 2, location: 'Site A - Downtown Office', consumptionRate: 8.0 },
        { id: 7, name: 'Paint Cans', category: 'Finishing Materials', quantity: 45, minStock: 50, supplier: 'ColorCo', price: 43.75, lastOrdered: '2023-08-20', locationId: 3, location: 'Site B - Residency Project', consumptionRate: 2.0 },
        { id: 8, name: 'Power Tools', category: 'Equipment', quantity: 15, minStock: 20, supplier: 'ToolTech', price: 122.50, lastOrdered: '2023-09-05', locationId: 4, location: 'Equipment Yard', consumptionRate: 0.05 },
        { id: 9, name: 'Work Gloves', category: 'Safety Equipment', quantity: 120, minStock: 100, supplier: 'SafetyFirst', price: 5.99, lastOrdered: '2023-08-28', locationId: 1, location: 'Main Warehouse', consumptionRate: 3.0 },
        { id: 10, name: 'Plumbing Pipes', category: 'Plumbing Materials', quantity: 600, minStock: 500, supplier: 'PipePro', price: 12.75, lastOrdered: '2023-08-05', locationId: 2, location: 'Site A - Downtown Office', consumptionRate: 7.0 }
      ];
      
      // Find and update the item
      const itemIndex = inventory.findIndex(item => item.id === consumptionData.itemId);
      if (itemIndex !== -1) {
        // Reduce inventory by consumption amount
        inventory[itemIndex].quantity -= consumptionData.quantity;
        // Update last consumption date
        inventory[itemIndex].lastConsumed = new Date().toISOString().split('T')[0];
      }
      
      localStorage.setItem('constructionInventory', JSON.stringify(inventory));
      
      // Save consumption record
      const storedConsumptions = localStorage.getItem('constructionConsumptions') || '[]';
      const consumptions = JSON.parse(storedConsumptions);
      const newConsumption = {
        id: Date.now(),
        ...consumptionData,
        timestamp: new Date().toISOString()
      };
      consumptions.push(newConsumption);
      localStorage.setItem('constructionConsumptions', JSON.stringify(consumptions));
      
      return Promise.resolve(newConsumption);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/consumption`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(consumptionData),
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock consumption logging due to backend error:', error);
      }
      return Promise.resolve({
        id: Date.now(),
        ...consumptionData,
        timestamp: new Date().toISOString()
      });
    }
  }

  async getConsumptionRecords() {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Try to get from localStorage first
      const storedConsumptions = localStorage.getItem('constructionConsumptions');
      if (storedConsumptions) {
        return Promise.resolve(JSON.parse(storedConsumptions));
      }
      return Promise.resolve([
        { id: 1, itemId: 1, itemName: 'Steel Beams', quantity: 10, projectId: 'PROJ-001', projectName: 'Downtown Office Complex', date: '2023-10-20', timestamp: new Date('2023-10-20').toISOString() },
        { id: 2, itemId: 3, itemName: 'Electrical Wiring', quantity: 50, projectId: 'PROJ-002', projectName: 'Residential Tower A', date: '2023-10-19', timestamp: new Date('2023-10-19').toISOString() },
        { id: 3, itemId: 5, itemName: 'Wood Planks', quantity: 100, projectId: 'PROJ-001', projectName: 'Downtown Office Complex', date: '2023-10-18', timestamp: new Date('2023-10-18').toISOString() },
        { id: 4, itemId: 2, itemName: 'Concrete Mix', quantity: 20, projectId: 'PROJ-003', projectName: 'Industrial Facility', date: '2023-10-17', timestamp: new Date('2023-10-17').toISOString() }
      ]);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/consumption`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock consumption records due to backend error:', error);
      }
      return Promise.resolve([
        { id: 1, itemId: 1, itemName: 'Steel Beams', quantity: 10, projectId: 'PROJ-001', projectName: 'Downtown Office Complex', date: '2023-10-20', timestamp: new Date('2023-10-20').toISOString() },
        { id: 2, itemId: 3, itemName: 'Electrical Wiring', quantity: 50, projectId: 'PROJ-002', projectName: 'Residential Tower A', date: '2023-10-19', timestamp: new Date('2023-10-19').toISOString() },
        { id: 3, itemId: 5, itemName: 'Wood Planks', quantity: 100, projectId: 'PROJ-001', projectName: 'Downtown Office Complex', date: '2023-10-18', timestamp: new Date('2023-10-18').toISOString() },
        { id: 4, itemId: 2, itemName: 'Concrete Mix', quantity: 20, projectId: 'PROJ-003', projectName: 'Industrial Facility', date: '2023-10-17', timestamp: new Date('2023-10-17').toISOString() }
      ]);
    }
  }

  // Soil Testing Management
  async getSoilTests() {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Try to get from localStorage first
      const storedTests = localStorage.getItem('soilTests');
      if (storedTests) {
        return Promise.resolve(JSON.parse(storedTests));
      }
      return Promise.resolve([
        {
          id: 1,
          projectId: 1,
          projectType: 'residential',
          location: 'Downtown Complex',
          contractorId: 1,
          status: 'completed',
          testDate: '2025-02-15',
          required: true,
          testResults: 'Safe bearing capacity: 200 kN/m²',
          bearingCapacity: 200,
          reportUrl: '/reports/soil-test-1.pdf',
          createdAt: '2025-02-10'
        },
        {
          id: 2,
          projectId: 2,
          projectType: 'commercial',
          location: 'Business Park',
          contractorId: 2,
          status: 'pending',
          testDate: '2025-03-20',
          required: true,
          testResults: null,
          bearingCapacity: null,
          reportUrl: null,
          createdAt: '2025-03-10'
        }
      ]);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/soil-testing/soil-tests`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock soil tests due to backend error:', error);
      }
      return Promise.resolve([
        {
          id: 1,
          projectId: 1,
          projectType: 'residential',
          location: 'Downtown Complex',
          contractorId: 1,
          status: 'completed',
          testDate: '2025-02-15',
          required: true,
          testResults: 'Safe bearing capacity: 200 kN/m²',
          bearingCapacity: 200,
          reportUrl: '/reports/soil-test-1.pdf',
          createdAt: '2025-02-10'
        },
        {
          id: 2,
          projectId: 2,
          projectType: 'commercial',
          location: 'Business Park',
          contractorId: 2,
          status: 'pending',
          testDate: '2025-03-20',
          required: true,
          testResults: null,
          bearingCapacity: null,
          reportUrl: null,
          createdAt: '2025-03-10'
        }
      ]);
    }
  }

  async createSoilTest(testData) {
    // In production, always use mock data and store in localStorage
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Update localStorage
      const storedTests = localStorage.getItem('soilTests');
      let tests = storedTests ? JSON.parse(storedTests) : [
        {
          id: 1,
          projectId: 1,
          projectType: 'residential',
          location: 'Downtown Complex',
          contractorId: 1,
          status: 'completed',
          testDate: '2025-02-15',
          required: true,
          testResults: 'Safe bearing capacity: 200 kN/m²',
          bearingCapacity: 200,
          reportUrl: '/reports/soil-test-1.pdf',
          createdAt: '2025-02-10'
        },
        {
          id: 2,
          projectId: 2,
          projectType: 'commercial',
          location: 'Business Park',
          contractorId: 2,
          status: 'pending',
          testDate: '2025-03-20',
          required: true,
          testResults: null,
          bearingCapacity: null,
          reportUrl: null,
          createdAt: '2025-03-10'
        }
      ];
      
      const newTest = {
        id: Date.now(),
        ...testData,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      
      tests.push(newTest);
      localStorage.setItem('soilTests', JSON.stringify(tests));
      
      return Promise.resolve(newTest);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/soil-testing/soil-tests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(testData),
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock soil test creation due to backend error:', error);
      }
      return Promise.resolve({
        id: Date.now(),
        ...testData,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      });
    }
  }

  // Labor Management
  async getLabors() {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Try to get from localStorage first
      const storedLabors = localStorage.getItem('labors');
      if (storedLabors) {
        return Promise.resolve(JSON.parse(storedLabors));
      }
      return Promise.resolve([
        {
          id: 1,
          name: 'Ramesh Kumar',
          phone: '+91 98765 43210',
          role: 'Mistry',
          dailyWage: 800,
          projectId: 1,
          siteId: 101,
          status: 'active',
          attendance: [
            { date: '2025-03-20', status: 'present' },
            { date: '2025-03-19', status: 'present' },
            { date: '2025-03-18', status: 'absent' }
          ],
          totalWorkingDays: 25,
          totalPay: 20000,
          skills: ['carpentry', 'construction'],
          experience: 5,
          emergencyContact: '+91 98765 43211',
          address: '123 Construction Lane, Delhi',
          joiningDate: '2024-01-15'
        },
        {
          id: 2,
          name: 'Suresh Patel',
          phone: '+91 98765 43212',
          role: 'Labor',
          dailyWage: 600,
          projectId: 1,
          siteId: 101,
          status: 'active',
          attendance: [
            { date: '2025-03-20', status: 'present' },
            { date: '2025-03-19', status: 'present' },
            { date: '2025-03-18', status: 'present' }
          ],
          totalWorkingDays: 30,
          totalPay: 18000,
          skills: ['masonry'],
          experience: 3,
          emergencyContact: '+91 98765 43213',
          address: '456 Building St, Delhi',
          joiningDate: '2024-02-20'
        }
      ]);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/labor/labors`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock labors due to backend error:', error);
      }
      return Promise.resolve([
        {
          id: 1,
          name: 'Ramesh Kumar',
          phone: '+91 98765 43210',
          role: 'Mistry',
          dailyWage: 800,
          projectId: 1,
          siteId: 101,
          status: 'active',
          attendance: [
            { date: '2025-03-20', status: 'present' },
            { date: '2025-03-19', status: 'present' },
            { date: '2025-03-18', status: 'absent' }
          ],
          totalWorkingDays: 25,
          totalPay: 20000,
          skills: ['carpentry', 'construction'],
          experience: 5,
          emergencyContact: '+91 98765 43211',
          address: '123 Construction Lane, Delhi',
          joiningDate: '2024-01-15'
        },
        {
          id: 2,
          name: 'Suresh Patel',
          phone: '+91 98765 43212',
          role: 'Labor',
          dailyWage: 600,
          projectId: 1,
          siteId: 101,
          status: 'active',
          attendance: [
            { date: '2025-03-20', status: 'present' },
            { date: '2025-03-19', status: 'present' },
            { date: '2025-03-18', status: 'present' }
          ],
          totalWorkingDays: 30,
          totalPay: 18000,
          skills: ['masonry'],
          experience: 3,
          emergencyContact: '+91 98765 43213',
          address: '456 Building St, Delhi',
          joiningDate: '2024-02-20'
        }
      ]);
    }
  }

  async createLabor(laborData) {
    // In production, always use mock data and store in localStorage
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Update localStorage
      const storedLabors = localStorage.getItem('labors');
      let labors = storedLabors ? JSON.parse(storedLabors) : [
        {
          id: 1,
          name: 'Ramesh Kumar',
          phone: '+91 98765 43210',
          role: 'Mistry',
          dailyWage: 800,
          projectId: 1,
          siteId: 101,
          status: 'active',
          attendance: [
            { date: '2025-03-20', status: 'present' },
            { date: '2025-03-19', status: 'present' },
            { date: '2025-03-18', status: 'absent' }
          ],
          totalWorkingDays: 25,
          totalPay: 20000,
          skills: ['carpentry', 'construction'],
          experience: 5,
          emergencyContact: '+91 98765 43211',
          address: '123 Construction Lane, Delhi',
          joiningDate: '2024-01-15'
        },
        {
          id: 2,
          name: 'Suresh Patel',
          phone: '+91 98765 43212',
          role: 'Labor',
          dailyWage: 600,
          projectId: 1,
          siteId: 101,
          status: 'active',
          attendance: [
            { date: '2025-03-20', status: 'present' },
            { date: '2025-03-19', status: 'present' },
            { date: '2025-03-18', status: 'present' }
          ],
          totalWorkingDays: 30,
          totalPay: 18000,
          skills: ['masonry'],
          experience: 3,
          emergencyContact: '+91 98765 43213',
          address: '456 Building St, Delhi',
          joiningDate: '2024-02-20'
        }
      ];
      
      const newLabor = {
        id: Date.now(),
        ...laborData,
        attendance: [],
        totalWorkingDays: 0,
        totalPay: 0,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      
      labors.push(newLabor);
      localStorage.setItem('labors', JSON.stringify(labors));
      
      return Promise.resolve(newLabor);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/labor/labors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(laborData),
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock labor creation due to backend error:', error);
      }
      return Promise.resolve({
        id: Date.now(),
        ...laborData,
        attendance: [],
        totalWorkingDays: 0,
        totalPay: 0,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      });
    }
  }

  async updateLaborAttendance(laborId, date, status) {
    // In production, always use mock data and update in localStorage
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Update localStorage
      const storedLabors = localStorage.getItem('labors');
      let labors = storedLabors ? JSON.parse(storedLabors) : [
        {
          id: 1,
          name: 'Ramesh Kumar',
          phone: '+91 98765 43210',
          role: 'Mistry',
          dailyWage: 800,
          projectId: 1,
          siteId: 101,
          status: 'active',
          attendance: [
            { date: '2025-03-20', status: 'present' },
            { date: '2025-03-19', status: 'present' },
            { date: '2025-03-18', status: 'absent' }
          ],
          totalWorkingDays: 25,
          totalPay: 20000,
          skills: ['carpentry', 'construction'],
          experience: 5,
          emergencyContact: '+91 98765 43211',
          address: '123 Construction Lane, Delhi',
          joiningDate: '2024-01-15'
        },
        {
          id: 2,
          name: 'Suresh Patel',
          phone: '+91 98765 43212',
          role: 'Labor',
          dailyWage: 600,
          projectId: 1,
          siteId: 101,
          status: 'active',
          attendance: [
            { date: '2025-03-20', status: 'present' },
            { date: '2025-03-19', status: 'present' },
            { date: '2025-03-18', status: 'present' }
          ],
          totalWorkingDays: 30,
          totalPay: 18000,
          skills: ['masonry'],
          experience: 3,
          emergencyContact: '+91 98765 43213',
          address: '456 Building St, Delhi',
          joiningDate: '2024-02-20'
        }
      ];
      
      const laborIndex = labors.findIndex(labor => labor.id === parseInt(laborId));
      if (laborIndex !== -1) {
        // Check if attendance for this date already exists
        const existingAttendanceIndex = labors[laborIndex].attendance.findIndex(
          record => record.date === date
        );

        let updatedAttendance;
        if (existingAttendanceIndex !== -1) {
          // Update existing attendance record
          updatedAttendance = [...labors[laborIndex].attendance];
          updatedAttendance[existingAttendanceIndex].status = status;
        } else {
          // Add new attendance record
          const newAttendanceRecord = {
            date,
            status,
            createdAt: new Date().toISOString().split('T')[0]
          };
          updatedAttendance = [...labors[laborIndex].attendance, newAttendanceRecord];
        }

        // Update working days count
        const workingDays = updatedAttendance.filter(record => record.status === 'present').length;
        
        // Update total pay
        const totalPay = workingDays * labors[laborIndex].dailyWage;

        labors[laborIndex] = {
          ...labors[laborIndex],
          attendance: updatedAttendance,
          totalWorkingDays: workingDays,
          totalPay,
          updatedAt: new Date().toISOString().split('T')[0]
        };

        localStorage.setItem('labors', JSON.stringify(labors));
        return Promise.resolve(labors[laborIndex]);
      }
      return Promise.resolve(null);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/labor/labors/${laborId}/attendance`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ date, status }),
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock labor attendance update due to backend error:', error);
      }
      return Promise.resolve(null);
    }
  }

  // Contractor Management
  async getContractors() {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Try to get from localStorage first
      const storedContractors = localStorage.getItem('contractors');
      if (storedContractors) {
        return Promise.resolve(JSON.parse(storedContractors));
      }
      return Promise.resolve([
        {
          id: 1,
          name: 'Raj Construction',
          company: 'Raj Construction Pvt Ltd',
          phone: '+91 98765 43210',
          email: 'contact@rajconstruction.com',
          address: '123 Construction Ave, Delhi',
          licenseNumber: 'LC-2025-001',
          specialization: 'civil',
          experience: 8,
          rating: 4.5,
          projectsCompleted: 15,
          currentProjects: [1, 2],
          status: 'active',
          bankDetails: {
            accountNumber: '1234567890',
            ifsc: 'HDFC0000123',
            bankName: 'HDFC Bank'
          },
          emergencyContact: '+91 98765 43211',
          taxInfo: { gstin: '12ABCDE1234F1Z5' },
          insuranceInfo: { policyNumber: 'POL-12345', expiryDate: '2026-03-15' }
        },
        {
          id: 2,
          name: 'Sharma Electrical',
          company: 'Sharma Electrical Solutions',
          phone: '+91 98765 43212',
          email: 'info@sharmaelec.com',
          address: '456 Electrical St, Delhi',
          licenseNumber: 'LC-2025-002',
          specialization: 'electrical',
          experience: 6,
          rating: 4.2,
          projectsCompleted: 12,
          currentProjects: [2],
          status: 'active',
          bankDetails: {
            accountNumber: '0987654321',
            ifsc: 'ICIC0000456',
            bankName: 'ICICI Bank'
          },
          emergencyContact: '+91 98765 43213',
          taxInfo: { gstin: '12ABCDE5678F2Z3' },
          insuranceInfo: { policyNumber: 'POL-54321', expiryDate: '2026-05-20' }
        }
      ]);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/contractors/contractors`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock contractors due to backend error:', error);
      }
      return Promise.resolve([
        {
          id: 1,
          name: 'Raj Construction',
          company: 'Raj Construction Pvt Ltd',
          phone: '+91 98765 43210',
          email: 'contact@rajconstruction.com',
          address: '123 Construction Ave, Delhi',
          licenseNumber: 'LC-2025-001',
          specialization: 'civil',
          experience: 8,
          rating: 4.5,
          projectsCompleted: 15,
          currentProjects: [1, 2],
          status: 'active',
          bankDetails: {
            accountNumber: '1234567890',
            ifsc: 'HDFC0000123',
            bankName: 'HDFC Bank'
          },
          emergencyContact: '+91 98765 43211',
          taxInfo: { gstin: '12ABCDE1234F1Z5' },
          insuranceInfo: { policyNumber: 'POL-12345', expiryDate: '2026-03-15' }
        },
        {
          id: 2,
          name: 'Sharma Electrical',
          company: 'Sharma Electrical Solutions',
          phone: '+91 98765 43212',
          email: 'info@sharmaelec.com',
          address: '456 Electrical St, Delhi',
          licenseNumber: 'LC-2025-002',
          specialization: 'electrical',
          experience: 6,
          rating: 4.2,
          projectsCompleted: 12,
          currentProjects: [2],
          status: 'active',
          bankDetails: {
            accountNumber: '0987654321',
            ifsc: 'ICIC0000456',
            bankName: 'ICICI Bank'
          },
          emergencyContact: '+91 98765 43213',
          taxInfo: { gstin: '12ABCDE5678F2Z3' },
          insuranceInfo: { policyNumber: 'POL-54321', expiryDate: '2026-05-20' }
        }
      ]);
    }
  }

  async createContractor(contractorData) {
    // In production, always use mock data and store in localStorage
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Update localStorage
      const storedContractors = localStorage.getItem('contractors');
      let contractors = storedContractors ? JSON.parse(storedContractors) : [
        {
          id: 1,
          name: 'Raj Construction',
          company: 'Raj Construction Pvt Ltd',
          phone: '+91 98765 43210',
          email: 'contact@rajconstruction.com',
          address: '123 Construction Ave, Delhi',
          licenseNumber: 'LC-2025-001',
          specialization: 'civil',
          experience: 8,
          rating: 4.5,
          projectsCompleted: 15,
          currentProjects: [1, 2],
          status: 'active',
          bankDetails: {
            accountNumber: '1234567890',
            ifsc: 'HDFC0000123',
            bankName: 'HDFC Bank'
          },
          emergencyContact: '+91 98765 43211',
          taxInfo: { gstin: '12ABCDE1234F1Z5' },
          insuranceInfo: { policyNumber: 'POL-12345', expiryDate: '2026-03-15' }
        },
        {
          id: 2,
          name: 'Sharma Electrical',
          company: 'Sharma Electrical Solutions',
          phone: '+91 98765 43212',
          email: 'info@sharmaelec.com',
          address: '456 Electrical St, Delhi',
          licenseNumber: 'LC-2025-002',
          specialization: 'electrical',
          experience: 6,
          rating: 4.2,
          projectsCompleted: 12,
          currentProjects: [2],
          status: 'active',
          bankDetails: {
            accountNumber: '0987654321',
            ifsc: 'ICIC0000456',
            bankName: 'ICICI Bank'
          },
          emergencyContact: '+91 98765 43213',
          taxInfo: { gstin: '12ABCDE5678F2Z3' },
          insuranceInfo: { policyNumber: 'POL-54321', expiryDate: '2026-05-20' }
        }
      ];
      
      const newContractor = {
        id: Date.now(),
        ...contractorData,
        projectsCompleted: 0,
        currentProjects: [],
        rating: 0,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      
      contractors.push(newContractor);
      localStorage.setItem('contractors', JSON.stringify(contractors));
      
      return Promise.resolve(newContractor);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/contractors/contractors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(contractorData),
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock contractor creation due to backend error:', error);
      }
      return Promise.resolve({
        id: Date.now(),
        ...contractorData,
        projectsCompleted: 0,
        currentProjects: [],
        rating: 0,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      });
    }
  }

  // Project Delay Tracking
  async getProjectDelays() {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Try to get from localStorage first
      const storedDelays = localStorage.getItem('projectDelays');
      if (storedDelays) {
        return Promise.resolve(JSON.parse(storedDelays));
      }
      return Promise.resolve([
        {
          id: 1,
          projectId: 1,
          delayType: 'weather',
          delayReason: 'Heavy rains',
          startDate: '2025-03-15',
          expectedEndDate: '2025-03-20',
          actualEndDate: '2025-03-18',
          delayDuration: 3,
          impactLevel: 'medium',
          status: 'resolved',
          reportedBy: 'Site Engineer',
          description: 'Work stopped due to continuous rainfall',
          mitigationSteps: [
            { id: 1, step: 'Cover materials', responsible: 'Supervisor', deadline: '2025-03-16', status: 'completed' }
          ],
          costImpact: 50000
        },
        {
          id: 2,
          projectId: 2,
          delayType: 'material',
          delayReason: 'Material shortage',
          startDate: '2025-03-18',
          expectedEndDate: '2025-03-25',
          actualEndDate: null,
          delayDuration: 7,
          impactLevel: 'high',
          status: 'active',
          reportedBy: 'Project Manager',
          description: 'Cement supply delayed due to transport issues',
          mitigationSteps: [
            { id: 1, step: 'Source from alternative supplier', responsible: 'Procurement', deadline: '2025-03-20', status: 'in-progress' }
          ],
          costImpact: 120000
        }
      ]);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/delays/delays`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock project delays due to backend error:', error);
      }
      return Promise.resolve([
        {
          id: 1,
          projectId: 1,
          delayType: 'weather',
          delayReason: 'Heavy rains',
          startDate: '2025-03-15',
          expectedEndDate: '2025-03-20',
          actualEndDate: '2025-03-18',
          delayDuration: 3,
          impactLevel: 'medium',
          status: 'resolved',
          reportedBy: 'Site Engineer',
          description: 'Work stopped due to continuous rainfall',
          mitigationSteps: [
            { id: 1, step: 'Cover materials', responsible: 'Supervisor', deadline: '2025-03-16', status: 'completed' }
          ],
          costImpact: 50000
        },
        {
          id: 2,
          projectId: 2,
          delayType: 'material',
          delayReason: 'Material shortage',
          startDate: '2025-03-18',
          expectedEndDate: '2025-03-25',
          actualEndDate: null,
          delayDuration: 7,
          impactLevel: 'high',
          status: 'active',
          reportedBy: 'Project Manager',
          description: 'Cement supply delayed due to transport issues',
          mitigationSteps: [
            { id: 1, step: 'Source from alternative supplier', responsible: 'Procurement', deadline: '2025-03-20', status: 'in-progress' }
          ],
          costImpact: 120000
        }
      ]);
    }
  }

  async createProjectDelay(delayData) {
    // In production, always use mock data and store in localStorage
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Update localStorage
      const storedDelays = localStorage.getItem('projectDelays');
      let delays = storedDelays ? JSON.parse(storedDelays) : [
        {
          id: 1,
          projectId: 1,
          delayType: 'weather',
          delayReason: 'Heavy rains',
          startDate: '2025-03-15',
          expectedEndDate: '2025-03-20',
          actualEndDate: '2025-03-18',
          delayDuration: 3,
          impactLevel: 'medium',
          status: 'resolved',
          reportedBy: 'Site Engineer',
          description: 'Work stopped due to continuous rainfall',
          mitigationSteps: [
            { id: 1, step: 'Cover materials', responsible: 'Supervisor', deadline: '2025-03-16', status: 'completed' }
          ],
          costImpact: 50000
        },
        {
          id: 2,
          projectId: 2,
          delayType: 'material',
          delayReason: 'Material shortage',
          startDate: '2025-03-18',
          expectedEndDate: '2025-03-25',
          actualEndDate: null,
          delayDuration: 7,
          impactLevel: 'high',
          status: 'active',
          reportedBy: 'Project Manager',
          description: 'Cement supply delayed due to transport issues',
          mitigationSteps: [
            { id: 1, step: 'Source from alternative supplier', responsible: 'Procurement', deadline: '2025-03-20', status: 'in-progress' }
          ],
          costImpact: 120000
        }
      ];
      
      const newDelay = {
        id: Date.now(),
        ...delayData,
        status: 'active',
        mitigationSteps: [],
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      
      delays.push(newDelay);
      localStorage.setItem('projectDelays', JSON.stringify(delays));
      
      return Promise.resolve(newDelay);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/delays/delays`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(delayData),
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock project delay creation due to backend error:', error);
      }
      return Promise.resolve({
        id: Date.now(),
        ...delayData,
        status: 'active',
        mitigationSteps: [],
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      });
    }
  }

  // Weather Impact Tracking
  async getWeatherImpacts() {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Try to get from localStorage first
      const storedWeatherImpacts = localStorage.getItem('weatherImpacts');
      if (storedWeatherImpacts) {
        return Promise.resolve(JSON.parse(storedWeatherImpacts));
      }
      return Promise.resolve([
        {
          id: 1,
          projectId: 1,
          siteId: 101,
          date: '2025-03-15',
          weatherCondition: 'rain',
          temperature: 22,
          rainfall: 45.5,
          windSpeed: 30,
          description: 'Heavy rainfall with strong winds',
          impactLevel: 'high',
          affectedWork: ['excavation', 'concrete work'],
          workStopped: true,
          durationOfImpact: 2,
          status: 'resolved',
          reportedBy: 'Site Engineer'
        },
        {
          id: 2,
          projectId: 2,
          siteId: 102,
          date: '2025-03-18',
          weatherCondition: 'extreme_heat',
          temperature: 42,
          rainfall: 0,
          windSpeed: 15,
          description: 'Heat wave with temperature above 40°C',
          impactLevel: 'medium',
          affectedWork: ['plastering', 'painting'],
          workStopped: false,
          durationOfImpact: 1,
          status: 'active',
          reportedBy: 'Project Manager'
        }
      ]);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/weather-impacts/weather-impacts`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock weather impacts due to backend error:', error);
      }
      return Promise.resolve([
        {
          id: 1,
          projectId: 1,
          siteId: 101,
          date: '2025-03-15',
          weatherCondition: 'rain',
          temperature: 22,
          rainfall: 45.5,
          windSpeed: 30,
          description: 'Heavy rainfall with strong winds',
          impactLevel: 'high',
          affectedWork: ['excavation', 'concrete work'],
          workStopped: true,
          durationOfImpact: 2,
          status: 'resolved',
          reportedBy: 'Site Engineer'
        },
        {
          id: 2,
          projectId: 2,
          siteId: 102,
          date: '2025-03-18',
          weatherCondition: 'extreme_heat',
          temperature: 42,
          rainfall: 0,
          windSpeed: 15,
          description: 'Heat wave with temperature above 40°C',
          impactLevel: 'medium',
          affectedWork: ['plastering', 'painting'],
          workStopped: false,
          durationOfImpact: 1,
          status: 'active',
          reportedBy: 'Project Manager'
        }
      ]);
    }
  }

  async createWeatherImpact(weatherData) {
    // In production, always use mock data and store in localStorage
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Update localStorage
      const storedWeatherImpacts = localStorage.getItem('weatherImpacts');
      let weatherImpacts = storedWeatherImpacts ? JSON.parse(storedWeatherImpacts) : [
        {
          id: 1,
          projectId: 1,
          siteId: 101,
          date: '2025-03-15',
          weatherCondition: 'rain',
          temperature: 22,
          rainfall: 45.5,
          windSpeed: 30,
          description: 'Heavy rainfall with strong winds',
          impactLevel: 'high',
          affectedWork: ['excavation', 'concrete work'],
          workStopped: true,
          durationOfImpact: 2,
          status: 'resolved',
          reportedBy: 'Site Engineer'
        },
        {
          id: 2,
          projectId: 2,
          siteId: 102,
          date: '2025-03-18',
          weatherCondition: 'extreme_heat',
          temperature: 42,
          rainfall: 0,
          windSpeed: 15,
          description: 'Heat wave with temperature above 40°C',
          impactLevel: 'medium',
          affectedWork: ['plastering', 'painting'],
          workStopped: false,
          durationOfImpact: 1,
          status: 'active',
          reportedBy: 'Project Manager'
        }
      ];
      
      const newWeatherImpact = {
        id: Date.now(),
        ...weatherData,
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      
      weatherImpacts.push(newWeatherImpact);
      localStorage.setItem('weatherImpacts', JSON.stringify(weatherImpacts));
      
      return Promise.resolve(newWeatherImpact);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/weather-impacts/weather-impacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(weatherData),
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock weather impact creation due to backend error:', error);
      }
      return Promise.resolve({
        id: Date.now(),
        ...weatherData,
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      });
    }
  }

  // Festival Bonus Management
  async getFestivalBonuses() {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Try to get from localStorage first
      const storedBonuses = localStorage.getItem('festivalBonuses');
      if (storedBonuses) {
        return Promise.resolve(JSON.parse(storedBonuses));
      }
      return Promise.resolve([
        {
          id: 1,
          festivalName: 'Diwali',
          festivalDate: '2025-11-01',
          bonusType: 'festival_bonus',
          employeeId: 1,
          employeeName: 'Ramesh Kumar',
          projectId: 1,
          bonusAmount: 5000,
          eligibilityCriteria: 'all',
          status: 'paid',
          description: 'Diwali bonus for all employees',
          approvalRequired: true,
          approvedBy: 'Manager',
          approvedDate: '2025-10-25',
          paymentDate: '2025-10-28',
          remarks: 'Early payment requested by employee',
          createdAt: '2025-10-20'
        },
        {
          id: 2,
          festivalName: 'Diwali',
          festivalDate: '2025-11-01',
          bonusType: 'early_salary',
          employeeId: 2,
          employeeName: 'Suresh Patel',
          projectId: 1,
          bonusAmount: 12000,
          eligibilityCriteria: 'performance_based',
          status: 'approved',
          description: 'Early salary for Diwali festival',
          approvalRequired: true,
          approvedBy: 'HR',
          approvedDate: '2025-10-22',
          paymentDate: null,
          remarks: 'To be paid before festival',
          createdAt: '2025-10-15'
        }
      ]);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/bonuses/festival-bonuses`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock festival bonuses due to backend error:', error);
      }
      return Promise.resolve([
        {
          id: 1,
          festivalName: 'Diwali',
          festivalDate: '2025-11-01',
          bonusType: 'festival_bonus',
          employeeId: 1,
          employeeName: 'Ramesh Kumar',
          projectId: 1,
          bonusAmount: 5000,
          eligibilityCriteria: 'all',
          status: 'paid',
          description: 'Diwali bonus for all employees',
          approvalRequired: true,
          approvedBy: 'Manager',
          approvedDate: '2025-10-25',
          paymentDate: '2025-10-28',
          remarks: 'Early payment requested by employee',
          createdAt: '2025-10-20'
        },
        {
          id: 2,
          festivalName: 'Diwali',
          festivalDate: '2025-11-01',
          bonusType: 'early_salary',
          employeeId: 2,
          employeeName: 'Suresh Patel',
          projectId: 1,
          bonusAmount: 12000,
          eligibilityCriteria: 'performance_based',
          status: 'approved',
          description: 'Early salary for Diwali festival',
          approvalRequired: true,
          approvedBy: 'HR',
          approvedDate: '2025-10-22',
          paymentDate: null,
          remarks: 'To be paid before festival',
          createdAt: '2025-10-15'
        }
      ]);
    }
  }

  async createFestivalBonus(bonusData) {
    // In production, always use mock data and store in localStorage
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Update localStorage
      const storedBonuses = localStorage.getItem('festivalBonuses');
      let bonuses = storedBonuses ? JSON.parse(storedBonuses) : [
        {
          id: 1,
          festivalName: 'Diwali',
          festivalDate: '2025-11-01',
          bonusType: 'festival_bonus',
          employeeId: 1,
          employeeName: 'Ramesh Kumar',
          projectId: 1,
          bonusAmount: 5000,
          eligibilityCriteria: 'all',
          status: 'paid',
          description: 'Diwali bonus for all employees',
          approvalRequired: true,
          approvedBy: 'Manager',
          approvedDate: '2025-10-25',
          paymentDate: '2025-10-28',
          remarks: 'Early payment requested by employee',
          createdAt: '2025-10-20'
        },
        {
          id: 2,
          festivalName: 'Diwali',
          festivalDate: '2025-11-01',
          bonusType: 'early_salary',
          employeeId: 2,
          employeeName: 'Suresh Patel',
          projectId: 1,
          bonusAmount: 12000,
          eligibilityCriteria: 'performance_based',
          status: 'approved',
          description: 'Early salary for Diwali festival',
          approvalRequired: true,
          approvedBy: 'HR',
          approvedDate: '2025-10-22',
          paymentDate: null,
          remarks: 'To be paid before festival',
          createdAt: '2025-10-15'
        }
      ];
      
      const newBonus = {
        id: Date.now(),
        ...bonusData,
        status: 'pending',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      
      bonuses.push(newBonus);
      localStorage.setItem('festivalBonuses', JSON.stringify(bonuses));
      
      return Promise.resolve(newBonus);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/bonuses/festival-bonuses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(bonusData),
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock festival bonus creation due to backend error:', error);
      }
      return Promise.resolve({
        id: Date.now(),
        ...bonusData,
        status: 'pending',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      });
    }
  }

  // Site Engineer Management
  async getSiteEngineers() {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Try to get from localStorage first
      const storedEngineers = localStorage.getItem('siteEngineers');
      if (storedEngineers) {
        return Promise.resolve(JSON.parse(storedEngineers));
      }
      return Promise.resolve([
        {
          id: 1,
          name: 'Anil Sharma',
          employeeId: 'ENG001',
          phone: '+91 98765 43210',
          email: 'anil@construction.com',
          qualification: 'BE Civil',
          experience: 7,
          specialization: 'civil',
          currentSiteId: 101,
          currentProjectId: 1,
          assignedSites: [101, 102],
          assignedProjects: [1, 2],
          status: 'active',
          salary: 75000,
          joiningDate: '2023-05-15',
          emergencyContact: '+91 98765 43211',
          address: '789 Engineer Ave, Delhi',
          skills: ['project management', 'structural analysis', 'quality control'],
          certifications: ['PMP', 'Safety Certified'],
          performanceRating: 4.2,
          projectsManaged: 8,
          createdAt: '2023-05-15'
        },
        {
          id: 2,
          name: 'Pooja Singh',
          employeeId: 'ENG002',
          phone: '+91 98765 43212',
          email: 'pooja@construction.com',
          qualification: 'ME Construction',
          experience: 5,
          specialization: 'electrical',
          currentSiteId: 103,
          currentProjectId: 2,
          assignedSites: [103],
          assignedProjects: [2],
          status: 'active',
          salary: 68000,
          joiningDate: '2024-01-10',
          emergencyContact: '+91 98765 43213',
          address: '321 Construction St, Delhi',
          skills: ['electrical design', 'system integration', 'troubleshooting'],
          certifications: ['Electrical Inspector'],
          performanceRating: 4.6,
          projectsManaged: 5,
          createdAt: '2024-01-10'
        }
      ]);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/site-engineers/site-engineers`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock site engineers due to backend error:', error);
      }
      return Promise.resolve([
        {
          id: 1,
          name: 'Anil Sharma',
          employeeId: 'ENG001',
          phone: '+91 98765 43210',
          email: 'anil@construction.com',
          qualification: 'BE Civil',
          experience: 7,
          specialization: 'civil',
          currentSiteId: 101,
          currentProjectId: 1,
          assignedSites: [101, 102],
          assignedProjects: [1, 2],
          status: 'active',
          salary: 75000,
          joiningDate: '2023-05-15',
          emergencyContact: '+91 98765 43211',
          address: '789 Engineer Ave, Delhi',
          skills: ['project management', 'structural analysis', 'quality control'],
          certifications: ['PMP', 'Safety Certified'],
          performanceRating: 4.2,
          projectsManaged: 8,
          createdAt: '2023-05-15'
        },
        {
          id: 2,
          name: 'Pooja Singh',
          employeeId: 'ENG002',
          phone: '+91 98765 43212',
          email: 'pooja@construction.com',
          qualification: 'ME Construction',
          experience: 5,
          specialization: 'electrical',
          currentSiteId: 103,
          currentProjectId: 2,
          assignedSites: [103],
          assignedProjects: [2],
          status: 'active',
          salary: 68000,
          joiningDate: '2024-01-10',
          emergencyContact: '+91 98765 43213',
          address: '321 Construction St, Delhi',
          skills: ['electrical design', 'system integration', 'troubleshooting'],
          certifications: ['Electrical Inspector'],
          performanceRating: 4.6,
          projectsManaged: 5,
          createdAt: '2024-01-10'
        }
      ]);
    }
  }

  async createSiteEngineer(engineerData) {
    // In production, always use mock data and store in localStorage
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Update localStorage
      const storedEngineers = localStorage.getItem('siteEngineers');
      let engineers = storedEngineers ? JSON.parse(storedEngineers) : [
        {
          id: 1,
          name: 'Anil Sharma',
          employeeId: 'ENG001',
          phone: '+91 98765 43210',
          email: 'anil@construction.com',
          qualification: 'BE Civil',
          experience: 7,
          specialization: 'civil',
          currentSiteId: 101,
          currentProjectId: 1,
          assignedSites: [101, 102],
          assignedProjects: [1, 2],
          status: 'active',
          salary: 75000,
          joiningDate: '2023-05-15',
          emergencyContact: '+91 98765 43211',
          address: '789 Engineer Ave, Delhi',
          skills: ['project management', 'structural analysis', 'quality control'],
          certifications: ['PMP', 'Safety Certified'],
          performanceRating: 4.2,
          projectsManaged: 8,
          createdAt: '2023-05-15'
        },
        {
          id: 2,
          name: 'Pooja Singh',
          employeeId: 'ENG002',
          phone: '+91 98765 43212',
          email: 'pooja@construction.com',
          qualification: 'ME Construction',
          experience: 5,
          specialization: 'electrical',
          currentSiteId: 103,
          currentProjectId: 2,
          assignedSites: [103],
          assignedProjects: [2],
          status: 'active',
          salary: 68000,
          joiningDate: '2024-01-10',
          emergencyContact: '+91 98765 43213',
          address: '321 Construction St, Delhi',
          skills: ['electrical design', 'system integration', 'troubleshooting'],
          certifications: ['Electrical Inspector'],
          performanceRating: 4.6,
          projectsManaged: 5,
          createdAt: '2024-01-10'
        }
      ];
      
      const newEngineer = {
        id: Date.now(),
        ...engineerData,
        assignedSites: [],
        assignedProjects: [],
        performanceRating: 0,
        projectsManaged: 0,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      
      engineers.push(newEngineer);
      localStorage.setItem('siteEngineers', JSON.stringify(engineers));
      
      return Promise.resolve(newEngineer);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/site-engineers/site-engineers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(engineerData),
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock site engineer creation due to backend error:', error);
      }
      return Promise.resolve({
        id: Date.now(),
        ...engineerData,
        assignedSites: [],
        assignedProjects: [],
        performanceRating: 0,
        projectsManaged: 0,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      });
    }
  }

  // Notifications
  async getNotifications() {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return this.getMockNotifications();
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/notifications`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock notifications due to backend error:', error);
      }
      return this.getMockNotifications();
    }
  }

  async markNotificationAsRead(id) {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return Promise.resolve({ success: true });
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/notifications/${id}/read`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock notification update due to backend error:', error);
      }
      return Promise.resolve({ success: true });
    }
  }

  async markAllNotificationsAsRead() {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return Promise.resolve({ success: true });
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/notifications/read-all`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock notification update due to backend error:', error);
      }
      return Promise.resolve({ success: true });
    }
  }
}

// Export as a singleton
const constructionApiService = new ConstructionApiService();
export default constructionApiService;

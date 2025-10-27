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
// API Service for Construction Management System
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 
                     (typeof window !== 'undefined' ? '/api' : 'http://localhost:3001/api');

// In production, use real API instead of mock data
// For this prototype, we'll use mock data with localStorage persistence
const USE_MOCK_DATA = true;

// Types for our API responses
interface LoginResponse {
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
  token: string;
}

interface DashboardStats {
  stats: {
    pendingTasks: number;
    activeProjects: number;
    completedProjects: number;
    revenueToday: number;
    projectCompletionRate: number;
    teamActive: number;
    maintenanceRequests: number;
    avgResponseTime: number;
    qualityRating: number;
  };
}

interface DashboardActivity {
  activity: Array<{
    id: number;
    type: string;
    title: string;
    description: string;
    timestamp: string;
    status: string;
  }>;
}

interface DashboardProjects {
  projects: Array<{
    id: number;
    name: string;
    status: string;
    progress: number;
    deadline: string;
  }>;
}

interface DashboardTasks {
  tasks: Array<{
    id: number;
    projectId: number;
    title: string;
    description: string;
    priority: string;
    status: string;
    assignee: string;
    dueDate: string;
    createdAt: string;
    updatedAt: string;
  }>;
}

interface DashboardPerformance {
  projectPerformance: number;
  teamPerformance: number;
  qualityMetrics: number;
}

interface ProjectsResponse {
  projects: Array<{
    id: number;
    name: string;
    description: string;
    status: string;
    progress: number;
    startDate: string;
    deadline: string;
    budget: number;
    assignedCrew: string;
  }>;
}

interface TasksResponse {
  tasks: Array<{
    id: number;
    projectId: number;
    title: string;
    description: string;
    priority: string;
    status: string;
    assignee: string;
    dueDate: string;
    createdAt: string;
    updatedAt: string;
  }>;
}

interface TeamResponse {
  team: Array<{
    id: number;
    name: string;
    role: string;
    status: string;
    availability: string;
  }>;
}

interface EquipmentResponse {
  equipment: Array<{
    id: number;
    name: string;
    status: string;
    assignedProject: string;
    lastMaintenance: string;
    nextMaintenance: string;
  }>;
}

interface InventoryResponse {
  inventory: Array<{
    id: number;
    name: string;
    quantity: number;
    unit: string;
    minStock: number;
    costPerUnit: number;
  }>;
}

class ConstructionAPIService {
  // Authentication
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('This is a Demo version - In the real version, you will get actual data from the backend');
      }

      return response.json();
    } catch (error) {
      console.error('Login error:', error);
      // For prototype, return mock data if backend is not available
      return {
        user: {
          id: 1,
          email: email,
          name: email.split('@')[0],
          role: 'ADMIN'
        },
        token: 'mock-jwt-token'
      };
    }
  }

  // Dashboard
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/stats`);
      if (!response.ok) {
        throw new Error('This is a Demo version - In the real version, you will get actual data from the backend');
      }
      return response.json();
    } catch (error) {
      console.error('Dashboard stats error:', error);
      // For prototype, return mock data if backend is not available
      return {
        stats: {
          pendingTasks: 18,
          activeProjects: 12,
          completedProjects: 8,
          revenueToday: 45000,
          projectCompletionRate: 78,
          teamActive: 24,
          maintenanceRequests: 5,
          avgResponseTime: 25,
          qualityRating: 92
        }
      };
    }
  }

  async getDashboardActivity(): Promise<DashboardActivity> {
    // In production, always use mock data
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return {
        activity: [
          {
            id: 1,
            type: 'project',
            title: 'New project started',
            description: 'Foundation work for project "Residential Complex A" has begun',
            timestamp: new Date().toISOString(),
            status: 'STARTED'
          },
          {
            id: 2,
            type: 'task',
            title: 'Task completed',
            description: 'Plumbing installation completed at site 102',
            timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
            status: 'COMPLETED'
          },
          {
            id: 3,
            type: 'defect',
            title: 'Defect logged',
            description: 'Crack found in wall of building C - needs repair',
            timestamp: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
            status: 'REPORTED'
          },
          {
            id: 4,
            type: 'equipment',
            title: 'Equipment maintenance',
            description: 'Excavator scheduled for maintenance next week',
            timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
            status: 'SCHEDULED'
          },
          {
            id: 5,
            type: 'inventory',
            title: 'Inventory updated',
            description: 'Cement supply delivered to site 305',
            timestamp: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
            status: 'IN'
          }
        ]
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/activity`);
      if (!response.ok) {
        throw new Error('This is a Demo version - In the real version, you will get actual data from the backend');
      }
      return response.json();
    } catch (error) {
      // For prototype, return mock data if backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Backend not available, using mock data for dashboard activity');
      }
      return {
        activity: [
          {
            id: 1,
            type: 'project',
            title: 'New project started',
            description: 'Foundation work for project "Residential Complex A" has begun',
            timestamp: new Date().toISOString(),
            status: 'STARTED'
          },
          {
            id: 2,
            type: 'task',
            title: 'Task completed',
            description: 'Plumbing installation completed at site 102',
            timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
            status: 'COMPLETED'
          },
          {
            id: 3,
            type: 'defect',
            title: 'Defect logged',
            description: 'Crack found in wall of building C - needs repair',
            timestamp: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
            status: 'REPORTED'
          },
          {
            id: 4,
            type: 'equipment',
            title: 'Equipment maintenance',
            description: 'Excavator scheduled for maintenance next week',
            timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
            status: 'SCHEDULED'
          },
          {
            id: 5,
            type: 'inventory',
            title: 'Inventory updated',
            description: 'Cement supply delivered to site 305',
            timestamp: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
            status: 'IN'
          }
        ]
      };
    }
  }

  async getDashboardProjects(): Promise<DashboardProjects> {
    // In production, always use mock data
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Try to get from localStorage first
      const storedProjects = localStorage.getItem('constructionProjects');
      if (storedProjects) {
        return JSON.parse(storedProjects);
      }
      return {
        projects: [
          { id: 1, name: 'Residential Complex A', status: 'ACTIVE', progress: 75, deadline: '2025-03-15' },
          { id: 2, name: 'Office Building B', status: 'PLANNING', progress: 15, deadline: '2025-08-20' },
          { id: 3, name: 'Shopping Mall C', status: 'ACTIVE', progress: 45, deadline: '2025-06-30' },
          { id: 4, name: 'Apartment Complex D', status: 'COMPLETED', progress: 100, deadline: '2025-01-10' }
        ]
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/projects`);
      if (!response.ok) {
        throw new Error('This is a Demo version - In the real version, you will get actual data from the backend');
      }
      return response.json();
    } catch (error) {
      // For prototype, return mock data if backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Backend not available, using mock data for dashboard projects');
      }
      return {
        projects: [
          { id: 1, name: 'Residential Complex A', status: 'ACTIVE', progress: 75, deadline: '2025-03-15' },
          { id: 2, name: 'Office Building B', status: 'PLANNING', progress: 15, deadline: '2025-08-20' },
          { id: 3, name: 'Shopping Mall C', status: 'ACTIVE', progress: 45, deadline: '2025-06-30' },
          { id: 4, name: 'Apartment Complex D', status: 'COMPLETED', progress: 100, deadline: '2025-01-10' }
        ]
      };
    }
  }

  async getDashboardTasks(): Promise<DashboardTasks> {
    // In production, always use mock data
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Try to get from localStorage first
      const storedTasks = localStorage.getItem('constructionTasks');
      if (storedTasks) {
        return JSON.parse(storedTasks);
      }
      return {
        tasks: [
          {
            id: 1,
            projectId: 1,
            title: 'Foundation Work',
            description: 'Pour concrete for foundation',
            priority: 'HIGH',
            status: 'IN_PROGRESS',
            assignee: 'John Smith',
            dueDate: '2025-02-15',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 2,
            projectId: 3,
            title: 'Electrical Installation',
            description: 'Install electrical wiring on second floor',
            priority: 'MEDIUM',
            status: 'PENDING',
            assignee: 'Sarah Johnson',
            dueDate: '2025-03-20',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 3,
            projectId: 2,
            title: 'Design Approval',
            description: 'Get architect approval for plans',
            priority: 'LOW',
            status: 'REVIEW',
            assignee: 'Mike Chen',
            dueDate: '2025-04-10',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ]
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/tasks`);
      if (!response.ok) {
        throw new Error('This is a Demo version - In the real version, you will get actual data from the backend');
      }
      return response.json();
    } catch (error) {
      // For prototype, return mock data if backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Backend not available, using mock data for dashboard tasks');
      }
      return {
        tasks: [
          {
            id: 1,
            projectId: 1,
            title: 'Foundation Work',
            description: 'Pour concrete for foundation',
            priority: 'HIGH',
            status: 'IN_PROGRESS',
            assignee: 'John Smith',
            dueDate: '2025-02-15',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 2,
            projectId: 3,
            title: 'Electrical Installation',
            description: 'Install electrical wiring on second floor',
            priority: 'MEDIUM',
            status: 'PENDING',
            assignee: 'Sarah Johnson',
            dueDate: '2025-03-20',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 3,
            projectId: 2,
            title: 'Design Approval',
            description: 'Get architect approval for plans',
            priority: 'LOW',
            status: 'REVIEW',
            assignee: 'Mike Chen',
            dueDate: '2025-04-10',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ]
      };
    }
  }

  async getDashboardPerformance(): Promise<DashboardPerformance> {
    // In production, always use mock data
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return {
        projectPerformance: 87,
        teamPerformance: 92,
        qualityMetrics: 95
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/performance`);
      if (!response.ok) {
        throw new Error('This is a Demo version - In the real version, you will get actual data from the backend');
      }
      return response.json();
    } catch (error) {
      // For prototype, return mock data if backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Backend not available, using mock data for dashboard performance');
      }
      return {
        projectPerformance: 87,
        teamPerformance: 92,
        qualityMetrics: 95
      };
    }
  }

  // Projects
  async getProjects(): Promise<ProjectsResponse> {
    // In production, always use mock data
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Try to get from localStorage first
      const storedProjects = localStorage.getItem('constructionProjects');
      if (storedProjects) {
        return JSON.parse(storedProjects);
      }
      return {
        projects: [
          { 
            id: 1, 
            name: 'Residential Complex A', 
            description: 'High-end residential complex with 200 units', 
            status: 'ACTIVE', 
            progress: 75, 
            startDate: '2024-10-15', 
            deadline: '2025-03-15', 
            budget: 25000000, 
            assignedCrew: 'Alpha Construction Team' 
          },
          { 
            id: 2, 
            name: 'Office Building B', 
            description: 'Modern office building with 10 floors', 
            status: 'PLANNING', 
            progress: 15, 
            startDate: '2025-01-10', 
            deadline: '2025-08-20', 
            budget: 45000000, 
            assignedCrew: 'Beta Construction Team' 
          },
          { 
            id: 3, 
            name: 'Shopping Mall C', 
            description: 'Multi-level shopping mall with food court', 
            status: 'ACTIVE', 
            progress: 45, 
            startDate: '2024-12-01', 
            deadline: '2025-06-30', 
            budget: 65000000, 
            assignedCrew: 'Gamma Construction Team' 
          },
          { 
            id: 4, 
            name: 'Apartment Complex D', 
            description: 'Luxury apartment complex with amenities', 
            status: 'COMPLETED', 
            progress: 100, 
            startDate: '2024-01-15', 
            deadline: '2025-01-10', 
            budget: 32000000, 
            assignedCrew: 'Delta Construction Team' 
          }
        ]
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/projects`);
      if (!response.ok) {
        throw new Error('This is a Demo version - In the real version, you will get actual data from the backend');
      }
      return response.json();
    } catch (error) {
      // For prototype, return mock data if backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Backend not available, using mock data for projects');
      }
      return {
        projects: [
          { 
            id: 1, 
            name: 'Residential Complex A', 
            description: 'High-end residential complex with 200 units', 
            status: 'ACTIVE', 
            progress: 75, 
            startDate: '2024-10-15', 
            deadline: '2025-03-15', 
            budget: 25000000, 
            assignedCrew: 'Alpha Construction Team' 
          },
          { 
            id: 2, 
            name: 'Office Building B', 
            description: 'Modern office building with 10 floors', 
            status: 'PLANNING', 
            progress: 15, 
            startDate: '2025-01-10', 
            deadline: '2025-08-20', 
            budget: 45000000, 
            assignedCrew: 'Beta Construction Team' 
          },
          { 
            id: 3, 
            name: 'Shopping Mall C', 
            description: 'Multi-level shopping mall with food court', 
            status: 'ACTIVE', 
            progress: 45, 
            startDate: '2024-12-01', 
            deadline: '2025-06-30', 
            budget: 65000000, 
            assignedCrew: 'Gamma Construction Team' 
          },
          { 
            id: 4, 
            name: 'Apartment Complex D', 
            description: 'Luxury apartment complex with amenities', 
            status: 'COMPLETED', 
            progress: 100, 
            startDate: '2024-01-15', 
            deadline: '2025-01-10', 
            budget: 32000000, 
            assignedCrew: 'Delta Construction Team' 
          }
        ]
      };
    }
  }

  async updateProjectStatus(projectId: number, status: string): Promise<any> {
    // In production, always use mock data and store in localStorage
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Update localStorage
      const storedProjects = localStorage.getItem('constructionProjects');
      let projectsData = storedProjects ? JSON.parse(storedProjects) : {
        projects: [
          { 
            id: 1, 
            name: 'Residential Complex A', 
            description: 'High-end residential complex with 200 units', 
            status: 'ACTIVE', 
            progress: 75, 
            startDate: '2024-10-15', 
            deadline: '2025-03-15', 
            budget: 25000000, 
            assignedCrew: 'Alpha Construction Team' 
          },
          { 
            id: 2, 
            name: 'Office Building B', 
            description: 'Modern office building with 10 floors', 
            status: 'PLANNING', 
            progress: 15, 
            startDate: '2025-01-10', 
            deadline: '2025-08-20', 
            budget: 45000000, 
            assignedCrew: 'Beta Construction Team' 
          },
          { 
            id: 3, 
            name: 'Shopping Mall C', 
            description: 'Multi-level shopping mall with food court', 
            status: 'ACTIVE', 
            progress: 45, 
            startDate: '2024-12-01', 
            deadline: '2025-06-30', 
            budget: 65000000, 
            assignedCrew: 'Gamma Construction Team' 
          },
          { 
            id: 4, 
            name: 'Apartment Complex D', 
            description: 'Luxury apartment complex with amenities', 
            status: 'COMPLETED', 
            progress: 100, 
            startDate: '2024-01-15', 
            deadline: '2025-01-10', 
            budget: 32000000, 
            assignedCrew: 'Delta Construction Team' 
          }
        ]
      };
      
      const projectIndex = projectsData.projects.findIndex((project: any) => project.id === projectId);
      if (projectIndex !== -1) {
        projectsData.projects[projectIndex] = { ...projectsData.projects[projectIndex], status };
        localStorage.setItem('constructionProjects', JSON.stringify(projectsData));
      }
      
      return {
        success: true,
        project: {
          id: projectId,
          status: status,
          updatedAt: new Date().toISOString()
        }
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/projects/${projectId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('This is a Demo version - In the real version, you will get actual data from the backend');
      }

      return response.json();
    } catch (error) {
      // For prototype, simulate success even if backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Backend not available, simulating project status update');
      }
      return {
        success: true,
        project: {
          id: projectId,
          status: status,
          updatedAt: new Date().toISOString()
        }
      };
    }
  }

  // Tasks
  async getTasks(): Promise<TasksResponse> {
    // In production, always use mock data
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Try to get from localStorage first
      const storedTasks = localStorage.getItem('constructionTasks');
      if (storedTasks) {
        return JSON.parse(storedTasks);
      }
      return {
        tasks: [
          {
            id: 1,
            projectId: 1,
            title: 'Foundation Work',
            description: 'Pour concrete for foundation',
            priority: 'HIGH',
            status: 'IN_PROGRESS',
            assignee: 'John Smith',
            dueDate: '2025-02-15',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 2,
            projectId: 3,
            title: 'Electrical Installation',
            description: 'Install electrical wiring on second floor',
            priority: 'MEDIUM',
            status: 'PENDING',
            assignee: 'Sarah Johnson',
            dueDate: '2025-03-20',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 3,
            projectId: 2,
            title: 'Design Approval',
            description: 'Get architect approval for plans',
            priority: 'LOW',
            status: 'REVIEW',
            assignee: 'Mike Chen',
            dueDate: '2025-04-10',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 4,
            projectId: 1,
            title: 'Plumbing Installation',
            description: 'Install main plumbing lines',
            priority: 'HIGH',
            status: 'PENDING',
            assignee: 'David Wilson',
            dueDate: '2025-02-28',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ]
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/tasks`);
      if (!response.ok) {
        throw new Error('This is a Demo version - In the real version, you will get actual data from the backend');
      }
      return response.json();
    } catch (error) {
      // For prototype, return mock data if backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Backend not available, using mock data for tasks');
      }
      return {
        tasks: [
          {
            id: 1,
            projectId: 1,
            title: 'Foundation Work',
            description: 'Pour concrete for foundation',
            priority: 'HIGH',
            status: 'IN_PROGRESS',
            assignee: 'John Smith',
            dueDate: '2025-02-15',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 2,
            projectId: 3,
            title: 'Electrical Installation',
            description: 'Install electrical wiring on second floor',
            priority: 'MEDIUM',
            status: 'PENDING',
            assignee: 'Sarah Johnson',
            dueDate: '2025-03-20',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 3,
            projectId: 2,
            title: 'Design Approval',
            description: 'Get architect approval for plans',
            priority: 'LOW',
            status: 'REVIEW',
            assignee: 'Mike Chen',
            dueDate: '2025-04-10',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 4,
            projectId: 1,
            title: 'Plumbing Installation',
            description: 'Install main plumbing lines',
            priority: 'HIGH',
            status: 'PENDING',
            assignee: 'David Wilson',
            dueDate: '2025-02-28',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ]
      };
    }
  }

  async updateTaskStatus(taskId: number, status: string): Promise<any> {
    // In production, always use mock data and store in localStorage
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Update localStorage
      const storedTasks = localStorage.getItem('constructionTasks');
      let tasksData = storedTasks ? JSON.parse(storedTasks) : {
        tasks: [
          {
            id: 1,
            projectId: 1,
            title: 'Foundation Work',
            description: 'Pour concrete for foundation',
            priority: 'HIGH',
            status: 'IN_PROGRESS',
            assignee: 'John Smith',
            dueDate: '2025-02-15',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 2,
            projectId: 3,
            title: 'Electrical Installation',
            description: 'Install electrical wiring on second floor',
            priority: 'MEDIUM',
            status: 'PENDING',
            assignee: 'Sarah Johnson',
            dueDate: '2025-03-20',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 3,
            projectId: 2,
            title: 'Design Approval',
            description: 'Get architect approval for plans',
            priority: 'LOW',
            status: 'REVIEW',
            assignee: 'Mike Chen',
            dueDate: '2025-04-10',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 4,
            projectId: 1,
            title: 'Plumbing Installation',
            description: 'Install main plumbing lines',
            priority: 'HIGH',
            status: 'PENDING',
            assignee: 'David Wilson',
            dueDate: '2025-02-28',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ]
      };
      
      const taskIndex = tasksData.tasks.findIndex((task: any) => task.id === taskId);
      if (taskIndex !== -1) {
        tasksData.tasks[taskIndex] = { ...tasksData.tasks[taskIndex], status };
        localStorage.setItem('constructionTasks', JSON.stringify(tasksData));
      }
      
      return {
        success: true,
        task: {
          id: taskId,
          status: status,
          updatedAt: new Date().toISOString()
        }
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('This is a Demo version - In the real version, you will get actual data from the backend');
      }

      return response.json();
    } catch (error) {
      // For prototype, simulate success even if backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Backend not available, simulating task status update');
      }
      return {
        success: true,
        task: {
          id: taskId,
          status: status,
          updatedAt: new Date().toISOString()
        }
      };
    }
  }

  // Team
  async getTeam(): Promise<TeamResponse> {
    // In production, always use mock data
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Try to get from localStorage first
      const storedTeam = localStorage.getItem('constructionTeam');
      if (storedTeam) {
        return JSON.parse(storedTeam);
      }
      return {
        team: [
          { id: 1, name: 'John Smith', role: 'Project Manager', status: 'ACTIVE', availability: 'FULL_TIME' },
          { id: 2, name: 'Sarah Johnson', role: 'Electrician', status: 'ACTIVE', availability: 'FULL_TIME' },
          { id: 3, name: 'Robert Davis', role: 'Plumber', status: 'ON_LEAVE', availability: 'UNAVAILABLE' },
          { id: 4, name: 'Maria Garcia', role: 'Architect', status: 'ACTIVE', availability: 'PART_TIME' }
        ]
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/team`);
      if (!response.ok) {
        throw new Error('This is a Demo version - In the real version, you will get actual data from the backend');
      }
      return response.json();
    } catch (error) {
      // For prototype, return mock data if backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Backend not available, using mock data for team');
      }
      return {
        team: [
          { id: 1, name: 'John Smith', role: 'Project Manager', status: 'ACTIVE', availability: 'FULL_TIME' },
          { id: 2, name: 'Sarah Johnson', role: 'Electrician', status: 'ACTIVE', availability: 'FULL_TIME' },
          { id: 3, name: 'Robert Davis', role: 'Plumber', status: 'ON_LEAVE', availability: 'UNAVAILABLE' },
          { id: 4, name: 'Maria Garcia', role: 'Architect', status: 'ACTIVE', availability: 'PART_TIME' }
        ]
      };
    }
  }

  async updateTeamStatus(teamId: number, status: string): Promise<any> {
    // In production, always use mock data and store in localStorage
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Update localStorage
      const storedTeam = localStorage.getItem('constructionTeam');
      let teamData = storedTeam ? JSON.parse(storedTeam) : {
        team: [
          { id: 1, name: 'John Smith', role: 'Project Manager', status: 'ACTIVE', availability: 'FULL_TIME' },
          { id: 2, name: 'Sarah Johnson', role: 'Electrician', status: 'ACTIVE', availability: 'FULL_TIME' },
          { id: 3, name: 'Robert Davis', role: 'Plumber', status: 'ON_LEAVE', availability: 'UNAVAILABLE' },
          { id: 4, name: 'Maria Garcia', role: 'Architect', status: 'ACTIVE', availability: 'PART_TIME' }
        ]
      };
      
      const teamIndex = teamData.team.findIndex((member: any) => member.id === teamId);
      if (teamIndex !== -1) {
        teamData.team[teamIndex] = { ...teamData.team[teamIndex], status };
        localStorage.setItem('constructionTeam', JSON.stringify(teamData));
      }
      
      return {
        success: true,
        team: {
          id: teamId,
          status: status,
          updatedAt: new Date().toISOString()
        }
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/team/${teamId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('This is a Demo version - In the real version, you will get actual data from the backend');
      }

      return response.json();
    } catch (error) {
      // For prototype, simulate success even if backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Backend not available, simulating team status update');
      }
      return {
        success: true,
        team: {
          id: teamId,
          status: status,
          updatedAt: new Date().toISOString()
        }
      };
    }
  }

  // Equipment
  async getEquipment(): Promise<EquipmentResponse> {
    // In production, always use mock data
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Try to get from localStorage first
      const storedEquipment = localStorage.getItem('constructionEquipment');
      if (storedEquipment) {
        return JSON.parse(storedEquipment);
      }
      return {
        equipment: [
          { id: 1, name: 'Excavator', status: 'OPERATIONAL', assignedProject: 'Residential Complex A', lastMaintenance: '2025-01-10', nextMaintenance: '2025-02-10' },
          { id: 2, name: 'Concrete Mixer', status: 'UNDER_REPAIR', assignedProject: 'Office Building B', lastMaintenance: '2024-12-05', nextMaintenance: '2025-01-05' },
          { id: 3, name: 'Crane', status: 'OPERATIONAL', assignedProject: 'Shopping Mall C', lastMaintenance: '2025-01-01', nextMaintenance: '2025-02-01' },
          { id: 4, name: 'Generator', status: 'OPERATIONAL', assignedProject: 'Apartment Complex D', lastMaintenance: '2024-12-15', nextMaintenance: '2025-01-15' }
        ]
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/equipment`);
      if (!response.ok) {
        throw new Error('This is a Demo version - In the real version, you will get actual data from the backend');
      }
      return response.json();
    } catch (error) {
      // For prototype, return mock data if backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Backend not available, using mock data for equipment');
      }
      return {
        equipment: [
          { id: 1, name: 'Excavator', status: 'OPERATIONAL', assignedProject: 'Residential Complex A', lastMaintenance: '2025-01-10', nextMaintenance: '2025-02-10' },
          { id: 2, name: 'Concrete Mixer', status: 'UNDER_REPAIR', assignedProject: 'Office Building B', lastMaintenance: '2024-12-05', nextMaintenance: '2025-01-05' },
          { id: 3, name: 'Crane', status: 'OPERATIONAL', assignedProject: 'Shopping Mall C', lastMaintenance: '2025-01-01', nextMaintenance: '2025-02-01' },
          { id: 4, name: 'Generator', status: 'OPERATIONAL', assignedProject: 'Apartment Complex D', lastMaintenance: '2024-12-15', nextMaintenance: '2025-01-15' }
        ]
      };
    }
  }

  async updateEquipmentStatus(equipmentId: number, status: string): Promise<any> {
    // In production, always use mock data and store in localStorage
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Update localStorage
      const storedEquipment = localStorage.getItem('constructionEquipment');
      let equipmentData = storedEquipment ? JSON.parse(storedEquipment) : {
        equipment: [
          { id: 1, name: 'Excavator', status: 'OPERATIONAL', assignedProject: 'Residential Complex A', lastMaintenance: '2025-01-10', nextMaintenance: '2025-02-10' },
          { id: 2, name: 'Concrete Mixer', status: 'UNDER_REPAIR', assignedProject: 'Office Building B', lastMaintenance: '2024-12-05', nextMaintenance: '2025-01-05' },
          { id: 3, name: 'Crane', status: 'OPERATIONAL', assignedProject: 'Shopping Mall C', lastMaintenance: '2025-01-01', nextMaintenance: '2025-02-01' },
          { id: 4, name: 'Generator', status: 'OPERATIONAL', assignedProject: 'Apartment Complex D', lastMaintenance: '2024-12-15', nextMaintenance: '2025-01-15' }
        ]
      };
      
      const equipmentIndex = equipmentData.equipment.findIndex((item: any) => item.id === equipmentId);
      if (equipmentIndex !== -1) {
        equipmentData.equipment[equipmentIndex] = { ...equipmentData.equipment[equipmentIndex], status };
        localStorage.setItem('constructionEquipment', JSON.stringify(equipmentData));
      }
      
      return {
        success: true,
        equipment: {
          id: equipmentId,
          status: status,
          updatedAt: new Date().toISOString()
        }
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/equipment/${equipmentId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('This is a Demo version - In the real version, you will get actual data from the backend');
      }

      return response.json();
    } catch (error) {
      // For prototype, simulate success even if backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Backend not available, simulating equipment status update');
      }
      return {
        success: true,
        equipment: {
          id: equipmentId,
          status: status,
          updatedAt: new Date().toISOString()
        }
      };
    }
  }

  // Inventory
  async getInventory(): Promise<InventoryResponse> {
    // In production, always use mock data
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Try to get from localStorage first
      const storedInventory = localStorage.getItem('constructionInventory');
      if (storedInventory) {
        return JSON.parse(storedInventory);
      }
      return {
        inventory: [
          { id: 1, name: 'Cement', quantity: 1200, unit: 'bags', minStock: 300, costPerUnit: 12 },
          { id: 2, name: 'Steel Bars', quantity: 850, unit: 'pieces', minStock: 200, costPerUnit: 45 },
          { id: 3, name: 'Sand', quantity: 450, unit: 'tons', minStock: 100, costPerUnit: 80 },
          { id: 4, name: 'Bricks', quantity: 5000, unit: 'pieces', minStock: 1000, costPerUnit: 0.8 }
        ]
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/inventory`);
      if (!response.ok) {
        throw new Error('This is a Demo version - In the real version, you will get actual data from the backend');
      }
      return response.json();
    } catch (error) {
      // For prototype, return mock data if backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Backend not available, using mock data for inventory');
      }
      return {
        inventory: [
          { id: 1, name: 'Cement', quantity: 1200, unit: 'bags', minStock: 300, costPerUnit: 12 },
          { id: 2, name: 'Steel Bars', quantity: 850, unit: 'pieces', minStock: 200, costPerUnit: 45 },
          { id: 3, name: 'Sand', quantity: 450, unit: 'tons', minStock: 100, costPerUnit: 80 },
          { id: 4, name: 'Bricks', quantity: 5000, unit: 'pieces', minStock: 1000, costPerUnit: 0.8 }
        ]
      };
    }
  }

  async updateInventoryQuantity(inventoryId: number, quantity: number): Promise<any> {
    // In production, always use mock data and store in localStorage
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Update localStorage
      const storedInventory = localStorage.getItem('constructionInventory');
      let inventoryData = storedInventory ? JSON.parse(storedInventory) : {
        inventory: [
          { id: 1, name: 'Cement', quantity: 1200, unit: 'bags', minStock: 300, costPerUnit: 12 },
          { id: 2, name: 'Steel Bars', quantity: 850, unit: 'pieces', minStock: 200, costPerUnit: 45 },
          { id: 3, name: 'Sand', quantity: 450, unit: 'tons', minStock: 100, costPerUnit: 80 },
          { id: 4, name: 'Bricks', quantity: 5000, unit: 'pieces', minStock: 1000, costPerUnit: 0.8 }
        ]
      };
      
      const inventoryIndex = inventoryData.inventory.findIndex((item: any) => item.id === inventoryId);
      if (inventoryIndex !== -1) {
        inventoryData.inventory[inventoryIndex] = { ...inventoryData.inventory[inventoryIndex], quantity };
        localStorage.setItem('constructionInventory', JSON.stringify(inventoryData));
      }
      
      return {
        success: true,
        inventory: {
          id: inventoryId,
          quantity: quantity,
          updatedAt: new Date().toISOString()
        }
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/inventory/${inventoryId}/quantity`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      });

      if (!response.ok) {
        throw new Error('Failed to update inventory quantity');
      }

      return response.json();
    } catch (error) {
      // For prototype, simulate success even if backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Backend not available, simulating inventory quantity update');
      }
      return {
        success: true,
        inventory: {
          id: inventoryId,
          quantity: quantity,
          updatedAt: new Date().toISOString()
        }
      };
    }
  }
}

const constructionApiService = new ConstructionAPIService();
export default constructionApiService;
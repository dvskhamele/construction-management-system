'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import EVENT_TRIGGERS, { AUTO_ASSIGNMENT_RULES, PROJECT_TEMPLATES } from '../utils/automationRules';

interface AutomationContextType {
  triggerEvent: (eventName: string, data: any) => any;
  detectRole: (invitedBy: any, email: string, phone: string) => string;
  getPermissions: (role: string) => any;
}

const AutomationContext = createContext<AutomationContextType | undefined>(undefined);

// Reducer to handle automation events
const automationReducer = (state: any, action: { type: string; payload: any }) => {
  switch(action.type) {
    case 'EVENT_TRIGGERED':
      return {
        ...state,
        lastEvent: action.payload.eventName,
        lastEventData: action.payload.data,
        lastResult: action.payload.result
      };
    default:
      return state;
  }
};

interface AutomationProviderProps {
  children: ReactNode;
}

export const AutomationProvider: React.FC<AutomationProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(automationReducer, {
    lastEvent: null,
    lastEventData: null,
    lastResult: null
  });

  // Function to trigger automation events
  const triggerEvent = (eventName: string, data: any) => {
    let result;
    
    switch(eventName) {
      case 'PROJECT_CREATED':
        result = EVENT_TRIGGERS.onProjectCreate(data);
        break;
      case 'USER_JOINED':
        result = EVENT_TRIGGERS.onUserJoin(data.user, data.invitedBy);
        break;
      case 'WORKER_CHECKIN':
        result = EVENT_TRIGGERS.onCheckin(data.siteId, data.workerId, data.geo, data.photo);
        break;
      case 'PHOTO_UPLOADED':
        result = EVENT_TRIGGERS.onPhotoUpload(data.taskId, data.photo, data.timestamp);
        break;
      case 'MATERIAL_DELIVERED':
        result = EVENT_TRIGGERS.onMaterialDelivery(data.siteId, data.invoicePhoto, data.materials);
        break;
      case 'TASK_COMPLETED':
        result = EVENT_TRIGGERS.onTaskComplete(data.taskId, data.supervisorOk);
        break;
      case 'BUDGET_OVERRUN':
        result = EVENT_TRIGGERS.onBudgetOverrun(data.siteId, data.category, data.amount);
        break;
      case 'DEFECT_LOGGED':
        result = EVENT_TRIGGERS.onDefectLogged(data.siteId, data.photo, data.severity);
        break;
      default:
        console.warn(`Unknown event: ${eventName}`);
        result = null;
    }
    
    // Dispatch the event
    dispatch({
      type: 'EVENT_TRIGGERED',
      payload: {
        eventName,
        data,
        result
      }
    });
    
    // Store results in localStorage - checking for specific properties based on result type
    if (result && typeof result === 'object') {
      if ('tasks' in result && Array.isArray(result.tasks)) {
        const storedTasks = localStorage.getItem('constructionTasks');
        let tasksData = storedTasks ? JSON.parse(storedTasks) : { tasks: [] };
        result.tasks.forEach((task: any) => tasksData.tasks.push(task));
        localStorage.setItem('constructionTasks', JSON.stringify(tasksData));
      }
      if ('budget' in result && result.budget) {
        const budgets = JSON.parse(localStorage.getItem('constructionBudgets') || '[]');
        budgets.push(result.budget);
        localStorage.setItem('constructionBudgets', JSON.stringify(budgets));
      }
      if ('inventoryItems' in result && Array.isArray(result.inventoryItems)) {
        const inventory = JSON.parse(localStorage.getItem('constructionInventory') || '{"inventory":[]}');
        result.inventoryItems.forEach((item: any) => inventory.inventory.push(item));
        localStorage.setItem('constructionInventory', JSON.stringify(inventory));
      }
      
      // Handle project creation specifically
      if (eventName === 'PROJECT_CREATED' && result && 'stages' in result && result.stages && 'tasks' in result && result.tasks && 'budget' in result && result.budget) {
        // Store project
        const storedProjects = localStorage.getItem('constructionProjects');
        let projectsData = storedProjects ? JSON.parse(storedProjects) : { projects: [] };
        projectsData.projects.push(data); // data contains the project object
        localStorage.setItem('constructionProjects', JSON.stringify(projectsData));
      }
    }
    
    return result;
  };

  // Role detection function
  const detectRole = (invitedBy: any, email: string, phone: string) => {
    return AUTO_ASSIGNMENT_RULES.detectRole(invitedBy, email, phone);
  };

  // Permission function
  const getPermissions = (role: string) => {
    return AUTO_ASSIGNMENT_RULES.getPermissions(role);
  };

  const value = {
    triggerEvent,
    detectRole,
    getPermissions
  };

  return (
    <AutomationContext.Provider value={value}>
      {children}
    </AutomationContext.Provider>
  );
};

export const useAutomation = () => {
  const context = useContext(AutomationContext);
  if (context === undefined) {
    throw new Error('useAutomation must be used within an AutomationProvider');
  }
  return context;
};
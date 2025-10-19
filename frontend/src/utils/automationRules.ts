// Project automation rules and templates
export const PROJECT_TEMPLATES = {
  'residential': {
    stages: [
      { name: 'Foundation', order: 1, autoTasks: ['excavation', 'concrete', 'curing'] },
      { name: 'Framing', order: 2, autoTasks: ['steel', 'concrete', 'curing'] },
      { name: 'Electrical', order: 3, autoTasks: ['wiring', 'fixtures', 'testing'] },
      { name: 'Plumbing', order: 4, autoTasks: ['pipes', 'connections', 'testing'] },
      { name: 'Finishing', order: 5, autoTasks: ['painting', 'flooring', 'cleaning'] },
      { name: 'Quality Check', order: 6, autoTasks: ['inspection', 'corrections', 'signoff'] },
      { name: 'Billing', order: 7, autoTasks: ['invoice', 'payment', 'closure'] }
    ],
    defaultBudgetCategories: ['Materials', 'Labor', 'Overheads']
  },
  'commercial': {
    stages: [
      { name: 'Foundation', order: 1, autoTasks: ['excavation', 'concrete', 'curing'] },
      { name: 'Structure', order: 2, autoTasks: ['steel', 'concrete', 'curing'] },
      { name: 'MEP', order: 3, autoTasks: ['electrical', 'plumbing', 'HVAC'] },
      { name: 'Finishing', order: 4, autoTasks: ['painting', 'flooring', 'cleaning'] },
      { name: 'Quality Check', order: 5, autoTasks: ['inspection', 'corrections', 'signoff'] },
      { name: 'Billing', order: 6, autoTasks: ['invoice', 'payment', 'closure'] }
    ],
    defaultBudgetCategories: ['Materials', 'Labor', 'Overheads']
  }
};

// Auto-assignment rules
export const AUTO_ASSIGNMENT_RULES = {
  // Role detection
  detectRole: (invitedBy: any, email: string, phone: string) => {
    if (email && email.includes('client')) return 'CLIENT';
    if (invitedBy && invitedBy.role === 'PROJECT_MANAGER') return 'SITE_SUPERVISOR';
    if (invitedBy && invitedBy.role === 'SITE_SUPERVISOR') return 'CREW_LEADER';
    if (phone) return 'WORKER';
    return 'USER';
  },
  
  // Auto-assign permissions based on role
  getPermissions: (role: string) => {
    switch(role) {
      case 'CLIENT':
        return { viewOnly: true, canApprove: true, canViewBudgets: true };
      case 'SITE_SUPERVISOR':
        return { canAssignTasks: true, canUpdateStatus: true, canLogMaterials: true };
      case 'CREW_LEADER':
        return { canUpdateStatus: true, canLogAttendance: true };
      case 'WORKER':
        return { canLogAttendance: true, canMarkTaskDone: true };
      default:
        return { viewOnly: true };
    }
  }
};

// Event triggers
export const EVENT_TRIGGERS = {
  onProjectCreate: (project: any) => {
    // Auto-create standard stages
    const stages = PROJECT_TEMPLATES[project.type as keyof typeof PROJECT_TEMPLATES]?.stages || PROJECT_TEMPLATES.residential.stages;
    const tasks: any[] = [];
    
    stages.forEach((stage: any, index: number) => {
      // Auto-create stage
      tasks.push({
        id: `${project.id}-stage-${index}`,
        title: stage.name,
        description: `Stage: ${stage.name}`,
        type: 'stage',
        projectId: project.id,
        status: index === 0 ? 'PENDING' : 'HOLD', // First stage active, others on hold
        priority: 'MEDIUM',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      
      // Auto-create subtasks
      stage.autoTasks.forEach((taskName: string, taskIndex: number) => {
        tasks.push({
          id: `${project.id}-${stage.name.toLowerCase()}-${taskIndex}`,
          title: `${stage.name}: ${taskName}`,
          description: `Subtask for ${stage.name}`,
          type: 'subtask',
          projectId: project.id,
          stage: stage.name,
          status: index === 0 ? 'PENDING' : 'HOLD', // Only for first stage
          priority: 'MEDIUM',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      });
    });
    
    // Auto-create budget categories
    const budget = {
      projectId: project.id,
      categories: PROJECT_TEMPLATES[project.type as keyof typeof PROJECT_TEMPLATES]?.defaultBudgetCategories || PROJECT_TEMPLATES.residential.defaultBudgetCategories,
      allocated: project.budget || 0,
      spent: 0,
      remaining: project.budget || 0
    };
    
    return { stages, tasks, budget };
  },
  
  onUserJoin: (user: any, invitedBy: any) => {
    const role = AUTO_ASSIGNMENT_RULES.detectRole(invitedBy, user.email, user.phone);
    const permissions = AUTO_ASSIGNMENT_RULES.getPermissions(role);
    
    return {
      role,
      permissions,
      onboardingMessage: `Aapka ${role} role assign kiya gaya hai`
    };
  },
  
  onCheckin: (siteId: string, workerId: string, geo: any, photo: any) => {
    const attendance = {
      id: `${siteId}-${workerId}-${Date.now()}`,
      siteId,
      workerId,
      checkin: new Date().toISOString(),
      geo,
      photo,
      status: 'ACTIVE'
    };
    
    // Return pre-filled daily tasks if it's first checkin of day
    const dailyTasks = localStorage.getItem('constructionTasks') 
      ? JSON.parse(localStorage.getItem('constructionTasks')!).tasks
      : [];
    
    const todayTasks = dailyTasks.filter((task: any) => 
      task.assignedTo === workerId && 
      new Date(task.createdAt).toDateString() === new Date().toDateString()
    );
    
    return { attendance, dailyTasks: todayTasks };
  },
  
  onPhotoUpload: (taskId: string, photo: any, timestamp: string) => {
    // Simple heuristics to suggest status
    const statusSuggestions = [
      { keywords: ['completed', 'done', 'finish'], status: 'COMPLETED' },
      { keywords: ['work', 'progress', 'in progress'], status: 'IN_PROGRESS' },
      { keywords: ['start', 'began'], status: 'IN_PROGRESS' }
    ];
    
    // This is a basic heuristic - in real implementation, use image recognition
    const suggestedStatus = statusSuggestions.find(s => 
      s.keywords.some((k: string) => photo.description?.toLowerCase().includes(k))
    )?.status || 'REVIEW';
    
    return {
      taskId,
      photo,
      timestamp,
      suggestedStatus,
      notification: `Photo uploaded. Suggested status: ${suggestedStatus}. Confirm?`
    };
  },
  
  onMaterialDelivery: (siteId: string, invoicePhoto: any, materials: any[]) => {
    // OCR and inventory creation
    const inventoryItems = materials.map(item => ({
      id: `${siteId}-${item.name}-${Date.now()}`,
      name: item.name,
      quantity: item.quantity,
      unit: item.unit,
      cost: item.cost,
      siteId,
      status: 'IN_STOCK',
      createdAt: new Date().toISOString()
    }));
    
    // Update budget
    const totalCost = materials.reduce((sum, item) => sum + (item.cost || 0), 0);
    const budgets = JSON.parse(localStorage.getItem('constructionBudgets') || '[]');
    const projectBudget = budgets.find((b: any) => b.siteId === siteId);
    
    if (projectBudget) {
      projectBudget.spent += totalCost;
      projectBudget.remaining = projectBudget.allocated - projectBudget.spent;
      localStorage.setItem('constructionBudgets', JSON.stringify(budgets));
    }
    
    // Auto-create storage tasks
    const storageTasks = materials.map(item => ({
      id: `storage-${siteId}-${item.name}-${Date.now()}`,
      title: `Store ${item.name}`,
      description: `Store ${item.quantity} ${item.unit} of ${item.name}`,
      type: 'storage',
      status: 'PENDING',
      priority: 'HIGH',
      assignedTo: 'STORE_INCHARGE',
      siteId,
      createdAt: new Date().toISOString()
    }));
    
    return { inventoryItems, storageTasks, budgetUpdate: { spent: totalCost } };
  },
  
  onTaskComplete: (taskId: string, supervisorOk: boolean) => {
    if (!supervisorOk) return { status: 'PENDING_REVIEW' };
    
    const tasks = JSON.parse(localStorage.getItem('constructionTasks') || '{"tasks":[]}').tasks;
    const taskIndex = tasks.findIndex((t: any) => t.id === taskId);
    
    if (taskIndex !== -1) {
      tasks[taskIndex].status = 'COMPLETED';
      tasks[taskIndex].updatedAt = new Date().toISOString();
      localStorage.setItem('constructionTasks', JSON.stringify({ tasks }));
    }
    
    // Auto-create next logical tasks
    const autoNextTasks: any[] = [];
    // In real implementation, this would create dependent tasks
    
    // Auto-draft invoice if milestone
    const isMilestone = tasks[taskIndex]?.priority === 'MILESTONE';
    let invoice = null;
    
    if (isMilestone) {
      invoice = {
        id: `invoice-${taskId}-${Date.now()}`,
        taskId,
        amount: tasks[taskIndex]?.estimatedCost || 0,
        status: 'DRAFT',
        client: tasks[taskIndex]?.client,
        createdAt: new Date().toISOString()
      };
    }
    
    return { status: 'COMPLETED', autoNextTasks, invoice };
  },
  
  onBudgetOverrun: (siteId: string, category: string, amount: number) => {
    // Lock further spend in category
    const budgets = JSON.parse(localStorage.getItem('constructionBudgets') || '[]');
    const projectBudget = budgets.find((b: any) => b.siteId === siteId);
    
    if (projectBudget) {
      projectBudget.lockedCategories = projectBudget.lockedCategories || [];
      if (!projectBudget.lockedCategories.includes(category)) {
        projectBudget.lockedCategories.push(category);
      }
      localStorage.setItem('constructionBudgets', JSON.stringify(budgets));
    }
    
    return {
      action: 'CATEGORY_LOCKED',
      escalation: { 
        to: 'PROJECT_MANAGER',
        reason: `Budget overrun in ${category}: ${amount}`,
        requires: 'approval'
      }
    };
  },
  
  onDefectLogged: (siteId: string, photo: any, severity: string) => {
    // Auto-create rework task
    const reworkTask = {
      id: `rework-${siteId}-${Date.now()}`,
      title: `Rework required - ${severity} defect`,
      description: `Defect identified in photos. Rework required.`,
      type: 'rework',
      status: 'PENDING',
      priority: severity === 'HIGH' ? 'URGENT' : severity === 'MEDIUM' ? 'HIGH' : 'MEDIUM',
      assignedTo: 'NEAREST_CREW',
      siteId,
      createdAt: new Date().toISOString()
    };
    
    // Auto-estimate cost from template
    const costTemplate: Record<string, number> = {
      'LOW': 5000,
      'MEDIUM': 15000,
      'HIGH': 30000
    };
    
    const estimatedCost = costTemplate[severity] || 10000;
    
    // Notify client if severity >= medium
    const shouldNotifyClient = severity === 'HIGH' || severity === 'MEDIUM';
    
    return {
      reworkTask,
      estimatedCost,
      notifyClient: shouldNotifyClient,
      message: shouldNotifyClient ? `Defect of ${severity} severity detected. Rework task created.` : null
    };
  }
};

// Vastu-aligned dashboard configuration
export const VASTU_DASHBOARD = {
  layout: {
    east: { // Growth direction
      components: ['progress', 'revenue', 'positive_metrics']
    },
    west: { // Closure zone
      components: ['defects', 'overdue', 'problems']
    },
    north: { // Vision direction
      components: ['forecast', 'upcoming', 'future_plans']
    },
    south: { // Stability
      components: ['completed', 'archive', 'historical']
    }
  },
  colors: {
    east: 'green', // Growth
    north: 'blue',  // Wisdom
    south: 'yellow', // Progress
    west: 'red'     // Alert (accent only)
  }
};

export default EVENT_TRIGGERS;
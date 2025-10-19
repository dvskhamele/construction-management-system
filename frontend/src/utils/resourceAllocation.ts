// Intelligent Resource Allocation System
export const RESOURCE_ALLOCATION_RULES = {
  // Allocate resources based on task priority and availability
  allocateResources: (tasks: any[], resources: any[], site: any) => {
    // Sort tasks by priority
    const sortedTasks = [...tasks].sort((a, b) => {
      const priorityOrder = { 'CRITICAL': 4, 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1, 'VERY_LOW': 0 };
      return (priorityOrder[b.priority as keyof typeof priorityOrder] || 0) - 
             (priorityOrder[a.priority as keyof typeof priorityOrder] || 0);
    });
    
    // Initialize allocation
    const allocations: any[] = [];
    const updatedResources = [...resources];
    
    // Allocate resources to tasks
    for (const task of sortedTasks) {
      if (task.status !== 'PENDING' && task.status !== 'ASSIGNED') continue;
      
      const requiredResources = task.requiredResources || [];
      const allocatedResources: any[] = [];
      
      for (const requiredResource of requiredResources) {
        // Find available resource of this type
        const availableResource = updatedResources.find(
          resource => 
            resource.type === requiredResource.type && 
            resource.status === 'AVAILABLE' &&
            (!resource.assignedTo || resource.assignedTo.taskId !== task.id)
        );
        
        if (availableResource) {
          // Allocate resource to task
          allocatedResources.push({
            ...availableResource,
            assignedTo: {
              taskId: task.id,
              taskName: task.title,
              assignedAt: new Date().toISOString()
            },
            status: 'ASSIGNED'
          });
          
          // Update resource in pool
          const resourceIndex = updatedResources.findIndex(r => r.id === availableResource.id);
          if (resourceIndex !== -1) {
            updatedResources[resourceIndex] = {
              ...updatedResources[resourceIndex],
              assignedTo: {
                taskId: task.id,
                taskName: task.title,
                assignedAt: new Date().toISOString()
              },
              status: 'ASSIGNED'
            };
          }
        }
      }
      
      // Add allocation if resources were assigned
      if (allocatedResources.length > 0) {
        allocations.push({
          taskId: task.id,
          taskName: task.title,
          resources: allocatedResources,
          allocatedAt: new Date().toISOString()
        });
      }
    }
    
    return {
      allocations,
      updatedResources
    };
  },
  
  // Optimize resource utilization
  optimizeResourceUtilization: (tasks: any[], resources: any[], site: any) => {
    // Calculate resource utilization rates
    const utilization: Record<string, number> = {};
    const totalResources = resources.length;
    
    resources.forEach(resource => {
      if (!utilization[resource.type]) {
        utilization[resource.type] = 0;
      }
      
      if (resource.status === 'ASSIGNED' || resource.status === 'IN_USE') {
        utilization[resource.type] += 1;
      }
    });
    
    // Calculate overall utilization
    const overallUtilization = Object.values(utilization).reduce((sum, count) => sum + count, 0) / totalResources * 100;
    
    // Identify underutilized resources
    const underutilizedResources = resources.filter(
      resource => resource.status === 'AVAILABLE' && 
      (!resource.lastUsed || 
       (new Date().getTime() - new Date(resource.lastUsed).getTime()) > 7 * 24 * 60 * 60 * 1000) // More than a week
    );
    
    // Identify overutilized resources
    const overutilizedResources = resources.filter(
      resource => resource.utilizationRate > 80 && 
      resource.status === 'ASSIGNED'
    );
    
    // Suggest optimizations
    const suggestions: string[] = [];
    
    if (overallUtilization < 60) {
      suggestions.push(`⚠️ Overall resource utilization is low (${Math.round(overallUtilization)}%) - consider reallocating or reducing resources`);
    } else if (overallUtilization > 90) {
      suggestions.push(`🚨 Overall resource utilization is high (${Math.round(overallUtilization)}%) - consider adding resources or redistributing workload`);
    }
    
    if (underutilizedResources.length > 0) {
      suggestions.push(`📉 ${underutilizedResources.length} resources are underutilized - consider reassigning or releasing them`);
    }
    
    if (overutilizedResources.length > 0) {
      suggestions.push(`🔥 ${overutilizedResources.length} resources are overutilized - consider maintenance or additional resources`);
    }
    
    // Resource balancing suggestions
    Object.entries(utilization).forEach(([type, count]) => {
      const totalOfType = resources.filter(r => r.type === type).length;
      const utilizationRate = totalOfType > 0 ? (count / totalOfType) * 100 : 0;
      
      if (utilizationRate < 40) {
        suggestions.push(`📉 ${type} utilization is low (${Math.round(utilizationRate)}%) - consider redistribution`);
      } else if (utilizationRate > 85) {
        suggestions.push(`🔥 ${type} utilization is high (${Math.round(utilizationRate)}%) - consider adding more units`);
      }
    });
    
    return {
      utilization,
      overallUtilization,
      underutilizedResources,
      overutilizedResources,
      suggestions
    };
  },
  
  // Predict resource needs for upcoming tasks
  predictResourceNeeds: (tasks: any[], resources: any[], lookaheadDays: number = 7) => {
    // Filter upcoming tasks
    const upcomingTasks = tasks.filter(task => {
      const daysUntilStart = Math.ceil(
        (new Date(task.startDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
      );
      
      return daysUntilStart >= 0 && daysUntilStart <= lookaheadDays;
    });
    
    // Aggregate resource requirements
    const resourceRequirements: Record<string, number> = {};
    
    upcomingTasks.forEach(task => {
      const requiredResources = task.requiredResources || [];
      requiredResources.forEach((resource: any) => {
        if (!resourceRequirements[resource.type]) {
          resourceRequirements[resource.type] = 0;
        }
        resourceRequirements[resource.type] += resource.quantity || 1;
      });
    });
    
    // Check current availability
    const currentAvailability: Record<string, number> = {};
    
    resources.forEach(resource => {
      if (resource.status === 'AVAILABLE') {
        if (!currentAvailability[resource.type]) {
          currentAvailability[resource.type] = 0;
        }
        currentAvailability[resource.type] += 1;
      }
    });
    
    // Identify shortages
    const shortages: any[] = [];
    const surpluses: any[] = [];
    
    Object.entries(resourceRequirements).forEach(([type, required]) => {
      const available = currentAvailability[type] || 0;
      const shortage = required - available;
      
      if (shortage > 0) {
        shortages.push({
          type,
          required,
          available,
          shortage,
          action: `Acquire ${shortage} more ${type}(s)`
        });
      } else if (shortage < 0) {
        surpluses.push({
          type,
          required,
          available,
          surplus: Math.abs(shortage),
          action: `Release ${Math.abs(shortage)} ${type}(s) or reassign to other projects`
        });
      }
    });
    
    return {
      upcomingTasks,
      resourceRequirements,
      currentAvailability,
      shortages,
      surpluses
    };
  },
  
  // Generate resource allocation report
  generateAllocationReport: (allocations: any[], resources: any[]) => {
    const report = {
      totalAllocations: allocations.length,
      resourcesAllocated: allocations.reduce((sum, alloc) => sum + alloc.resources.length, 0),
      allocationEfficiency: 0,
      resourceTypes: {} as Record<string, { allocated: number; total: number }>,
      allocationHistory: allocations.slice(-10) // Last 10 allocations
    };
    
    // Calculate allocation efficiency
    const totalResources = resources.length;
    const allocatedResources = allocations.reduce((sum, alloc) => sum + alloc.resources.length, 0);
    report.allocationEfficiency = totalResources > 0 ? (allocatedResources / totalResources) * 100 : 0;
    
    // Calculate resource type distribution
    resources.forEach(resource => {
      if (!report.resourceTypes[resource.type]) {
        report.resourceTypes[resource.type] = { allocated: 0, total: 0 };
      }
      report.resourceTypes[resource.type].total += 1;
      
      // Check if resource is allocated
      const isAllocated = allocations.some(alloc => 
        alloc.resources.some((r: any) => r.id === resource.id)
      );
      
      if (isAllocated) {
        report.resourceTypes[resource.type].allocated += 1;
      }
    });
    
    return report;
  }
};

export default RESOURCE_ALLOCATION_RULES;
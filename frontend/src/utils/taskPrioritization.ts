// Intelligent Task Prioritization System
export const TASK_PRIORITIZATION_RULES = {
  // Priority calculation based on multiple factors
  calculatePriority: (task: any, project: any, site: any) => {
    let priorityScore = 0;
    const factors: any = {};
    
    // Factor 1: Critical Path (25% weight)
    if (task.isOnCriticalPath) {
      priorityScore += 25;
      factors.criticalPath = 25;
    }
    
    // Factor 2: Due Date Proximity (20% weight)
    const daysUntilDue = Math.ceil(
      (new Date(task.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    
    if (daysUntilDue <= 1) {
      priorityScore += 20;
      factors.dueDate = 20;
    } else if (daysUntilDue <= 3) {
      priorityScore += 15;
      factors.dueDate = 15;
    } else if (daysUntilDue <= 7) {
      priorityScore += 10;
      factors.dueDate = 10;
    } else {
      factors.dueDate = 0;
    }
    
    // Factor 3: Dependency Status (15% weight)
    const incompleteDependencies = task.dependencies?.filter(
      (dep: string) => !task.isDependencyComplete(dep)
    ).length || 0;
    
    if (incompleteDependencies === 0) {
      priorityScore += 15;
      factors.dependencies = 15;
    } else if (incompleteDependencies === 1) {
      priorityScore += 10;
      factors.dependencies = 10;
    } else if (incompleteDependencies === 2) {
      priorityScore += 5;
      factors.dependencies = 5;
    } else {
      factors.dependencies = 0;
    }
    
    // Factor 4: Resource Availability (15% weight)
    const requiredResources = task.requiredResources || [];
    const availableResources = site.resources?.filter(
      (resource: any) => resource.status === 'AVAILABLE'
    ).length || 0;
    
    const resourceRatio = requiredResources.length > 0 
      ? availableResources / requiredResources.length 
      : 1;
      
    if (resourceRatio >= 1) {
      priorityScore += 15;
      factors.resources = 15;
    } else if (resourceRatio >= 0.75) {
      priorityScore += 10;
      factors.resources = 10;
    } else if (resourceRatio >= 0.5) {
      priorityScore += 5;
      factors.resources = 5;
    } else {
      factors.resources = 0;
    }
    
    // Factor 5: Safety Impact (10% weight)
    if (task.safetyImpact === 'HIGH') {
      priorityScore += 10;
      factors.safety = 10;
    } else if (task.safetyImpact === 'MEDIUM') {
      priorityScore += 5;
      factors.safety = 5;
    } else {
      factors.safety = 0;
    }
    
    // Factor 6: Budget Impact (10% weight)
    const budgetImpact = task.estimatedCost / project.budget;
    if (budgetImpact >= 0.1) {
      priorityScore += 10;
      factors.budget = 10;
    } else if (budgetImpact >= 0.05) {
      priorityScore += 5;
      factors.budget = 5;
    } else {
      factors.budget = 0;
    }
    
    // Factor 7: Weather Dependency (5% weight)
    if (task.weatherDependent && site.currentWeather?.adverseConditions) {
      priorityScore += 5;
      factors.weather = 5;
    } else {
      factors.weather = 0;
    }
    
    // Determine priority level
    let priorityLevel = 'LOW';
    if (priorityScore >= 80) {
      priorityLevel = 'CRITICAL';
    } else if (priorityScore >= 60) {
      priorityLevel = 'HIGH';
    } else if (priorityScore >= 40) {
      priorityLevel = 'MEDIUM';
    } else if (priorityScore >= 20) {
      priorityLevel = 'LOW';
    } else {
      priorityLevel = 'VERY_LOW';
    }
    
    return {
      priority: priorityLevel,
      score: priorityScore,
      factors,
      explanation: `Task priority calculated based on ${Object.keys(factors).filter(key => factors[key] > 0).length} factors`
    };
  },
  
  // Auto-reprioritize tasks when conditions change
  reprioritizeTasks: (tasks: any[], project: any, site: any) => {
    return tasks.map(task => {
      const priorityInfo = TASK_PRIORITIZATION_RULES.calculatePriority(task, project, site);
      return {
        ...task,
        priority: priorityInfo.priority,
        priorityScore: priorityInfo.score,
        priorityFactors: priorityInfo.factors
      };
    }).sort((a, b) => {
      // Sort by priority score descending
      return b.priorityScore - a.priorityScore;
    });
  },
  
  // Get priority recommendations
  getPriorityRecommendations: (task: any) => {
    const recommendations: string[] = [];
    
    // Due date recommendations
    const daysUntilDue = Math.ceil(
      (new Date(task.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    
    if (daysUntilDue <= 3) {
      recommendations.push('⚠️ Due date is approaching - prioritize this task');
    }
    
    // Dependency recommendations
    const incompleteDependencies = task.dependencies?.filter(
      (dep: string) => !task.isDependencyComplete(dep)
    ).length || 0;
    
    if (incompleteDependencies > 0) {
      recommendations.push(`🔗 ${incompleteDependencies} dependencies need completion first`);
    }
    
    // Resource recommendations
    if (task.requiredResources && task.requiredResources.length > 0) {
      const unavailableResources = task.requiredResources.filter(
        (resource: any) => resource.status !== 'AVAILABLE'
      );
      
      if (unavailableResources.length > 0) {
        recommendations.push(`🛠️ ${unavailableResources.length} resources currently unavailable`);
      }
    }
    
    // Safety recommendations
    if (task.safetyImpact === 'HIGH') {
      recommendations.push('🚨 High safety impact - ensure proper protocols');
    } else if (task.safetyImpact === 'MEDIUM') {
      recommendations.push('⚠️ Medium safety impact - follow safety guidelines');
    }
    
    // Weather recommendations
    if (task.weatherDependent) {
      recommendations.push('🌦️ Weather dependent - check forecast before scheduling');
    }
    
    return recommendations;
  }
};

export default TASK_PRIORITIZATION_RULES;
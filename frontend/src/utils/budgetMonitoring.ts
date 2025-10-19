// Intelligent Budget Monitoring System
export const BUDGET_MONITORING_RULES = {
  // Monitor budget health and predict overruns
  monitorBudgetHealth: (projects: any[], budgets: any[]) => {
    const budgetHealth: any[] = [];
    
    projects.forEach(project => {
      const projectBudget = budgets.find(b => b.projectId === project.id);
      
      if (projectBudget) {
        const allocated = projectBudget.allocated || 0;
        const spent = projectBudget.spent || 0;
        const remaining = allocated - spent;
        const percentageSpent = allocated > 0 ? (spent / allocated) * 100 : 0;
        
        // Calculate projected completion cost
        const progressPercentage = project.progress || 0;
        const projectedTotalCost = progressPercentage > 0 ? (spent / progressPercentage) * 100 : spent;
        const projectedOverrun = projectedTotalCost > allocated ? projectedTotalCost - allocated : 0;
        const projectedOverrunPercentage = allocated > 0 ? (projectedOverrun / allocated) * 100 : 0;
        
        // Determine budget health status
        let status = 'HEALTHY';
        let statusColor = 'text-emerald-600';
        let statusBg = 'bg-emerald-100';
        
        if (percentageSpent > 95) {
          status = 'CRITICAL';
          statusColor = 'text-red-600';
          statusBg = 'bg-red-100';
        } else if (percentageSpent > 85) {
          status = 'WARNING';
          statusColor = 'text-amber-600';
          statusBg = 'bg-amber-100';
        } else if (percentageSpent > 75) {
          status = 'CAUTION';
          statusColor = 'text-blue-600';
          statusBg = 'bg-blue-100';
        }
        
        // Predict potential issues
        const predictions: string[] = [];
        
        if (projectedOverrunPercentage > 20) {
          predictions.push(`🚨 Projected budget overrun of ${Math.round(projectedOverrunPercentage)}% (${Math.round(projectedOverrun).toLocaleString()} INR)`);
        } else if (projectedOverrunPercentage > 10) {
          predictions.push(`⚠️ Potential budget overrun of ${Math.round(projectedOverrunPercentage)}% (${Math.round(projectedOverrun).toLocaleString()} INR)`);
        }
        
        if (percentageSpent > 90) {
          predictions.push(`🔴 Critical budget utilization - only ${Math.round(100 - percentageSpent)}% remaining`);
        } else if (percentageSpent > 80) {
          predictions.push(`🟡 High budget utilization - ${Math.round(100 - percentageSpent)}% remaining`);
        }
        
        // Weekly spending trend
        const weeklySpending = projectBudget.weeklySpending || [];
        if (weeklySpending.length >= 2) {
          const currentWeek = weeklySpending[weeklySpending.length - 1];
          const previousWeek = weeklySpending[weeklySpending.length - 2];
          const spendingChange = ((currentWeek.amount - previousWeek.amount) / previousWeek.amount) * 100;
          
          if (spendingChange > 25) {
            predictions.push(`📈 Spending increased by ${Math.round(spendingChange)}% compared to last week`);
          } else if (spendingChange < -25) {
            predictions.push(`📉 Spending decreased by ${Math.round(Math.abs(spendingChange))}% compared to last week`);
          }
        }
        
        budgetHealth.push({
          projectId: project.id,
          projectName: project.name,
          allocated,
          spent,
          remaining,
          percentageSpent: Math.round(percentageSpent),
          projectedTotalCost: Math.round(projectedTotalCost),
          projectedOverrun: Math.round(projectedOverrun),
          projectedOverrunPercentage: Math.round(projectedOverrunPercentage),
          status,
          statusColor,
          statusBg,
          predictions,
          lastUpdated: projectBudget.updatedAt || new Date().toISOString()
        });
      }
    });
    
    return budgetHealth;
  },
  
  // Generate budget alerts
  generateBudgetAlerts: (budgetHealth: any[]) => {
    const alerts: any[] = [];
    
    budgetHealth.forEach(project => {
      // Critical alerts
      if (project.percentageSpent > 95) {
        alerts.push({
          id: `critical-${project.projectId}`,
          type: 'BUDGET_CRITICAL',
          severity: 'HIGH',
          projectId: project.projectId,
          projectName: project.projectName,
          message: `🚨 CRITICAL: ${project.projectName} budget utilization at ${project.percentageSpent}% - Immediate action required`,
          recommendation: `Review expenses immediately and consider budget increase or scope reduction`,
          priority: 'URGENT'
        });
      }
      
      // Warning alerts
      if (project.percentageSpent > 85 && project.percentageSpent <= 95) {
        alerts.push({
          id: `warning-${project.projectId}`,
          type: 'BUDGET_WARNING',
          severity: 'MEDIUM',
          projectId: project.projectId,
          projectName: project.projectName,
          message: `⚠️ WARNING: ${project.projectName} budget utilization at ${project.percentageSpent}% - Monitor closely`,
          recommendation: `Review upcoming expenses and consider preventive measures`,
          priority: 'HIGH'
        });
      }
      
      // Caution alerts
      if (project.percentageSpent > 75 && project.percentageSpent <= 85) {
        alerts.push({
          id: `caution-${project.projectId}`,
          type: 'BUDGET_CAUTION',
          severity: 'LOW',
          projectId: project.projectId,
          projectName: project.projectName,
          message: `🔵 CAUTION: ${project.projectName} budget utilization at ${project.percentageSpent}% - Keep monitoring`,
          recommendation: `Regular budget reviews recommended`,
          priority: 'MEDIUM'
        });
      }
      
      // Projected overrun alerts
      if (project.projectedOverrunPercentage > 20) {
        alerts.push({
          id: `overrun-${project.projectId}`,
          type: 'PROJECTED_OVERRUN',
          severity: 'HIGH',
          projectId: project.projectId,
          projectName: project.projectName,
          message: `💸 Projected overrun of ${project.projectedOverrunPercentage}% for ${project.projectName}`,
          recommendation: `Immediate budget planning and scope review required`,
          priority: 'HIGH'
        });
      } else if (project.projectedOverrunPercentage > 10) {
        alerts.push({
          id: `potential-overrun-${project.projectId}`,
          type: 'POTENTIAL_OVERRUN',
          severity: 'MEDIUM',
          projectId: project.projectId,
          projectName: project.projectName,
          message: `💰 Potential overrun of ${project.projectedOverrunPercentage}% for ${project.projectName}`,
          recommendation: `Monitor spending trends and adjust as needed`,
          priority: 'MEDIUM'
        });
      }
    });
    
    return alerts.sort((a, b) => {
      // Sort by priority
      const priorityOrder = { 'URGENT': 4, 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };
      return (priorityOrder[b.priority as keyof typeof priorityOrder] || 0) - 
             (priorityOrder[a.priority as keyof typeof priorityOrder] || 0);
    });
  },
  
  // Auto-budget adjustments
  suggestBudgetAdjustments: (budgetHealth: any[], projects: any[]) => {
    const adjustments: any[] = [];
    
    budgetHealth.forEach(project => {
      // Only suggest adjustments for projects with issues
      if (project.percentageSpent > 75 || project.projectedOverrunPercentage > 10) {
        const projectDetails = projects.find(p => p.id === project.projectId);
        
        if (projectDetails) {
          // Calculate suggested adjustment
          let adjustmentType = '';
          let adjustmentAmount = 0;
          let reason = '';
          
          if (project.percentageSpent > 95) {
            // Critical situation - suggest emergency budget increase
            adjustmentType = 'EMERGENCY_INCREASE';
            adjustmentAmount = Math.round(project.allocated * 0.1); // 10% increase
            reason = 'Critical budget utilization - emergency funds needed';
          } else if (project.percentageSpent > 85) {
            // Warning situation - suggest moderate budget increase
            adjustmentType = 'MODERATE_INCREASE';
            adjustmentAmount = Math.round(project.allocated * 0.05); // 5% increase
            reason = 'High budget utilization - buffer funds recommended';
          } else if (project.projectedOverrunPercentage > 20) {
            // Projected overrun - suggest budget increase
            adjustmentType = 'PROJECTED_INCREASE';
            adjustmentAmount = Math.round(project.projectedOverrun * 1.2); // 20% buffer on projected overrun
            reason = `Projected overrun of ${project.projectedOverrunPercentage}% - additional funds needed`;
          } else if (project.projectedOverrunPercentage > 10) {
            // Potential overrun - suggest small budget increase
            adjustmentType = 'SMALL_INCREASE';
            adjustmentAmount = Math.round(project.projectedOverrun * 1.1); // 10% buffer on projected overrun
            reason = `Potential overrun of ${project.projectedOverrunPercentage}% - small buffer recommended`;
          }
          
          if (adjustmentAmount > 0) {
            adjustments.push({
              projectId: project.projectId,
              projectName: project.projectName,
              adjustmentType,
              currentBudget: project.allocated,
              suggestedIncrease: adjustmentAmount,
              newBudget: project.allocated + adjustmentAmount,
              reason,
              confidence: project.percentageSpent > 90 ? 95 : 
                         project.percentageSpent > 80 ? 85 : 
                         project.projectedOverrunPercentage > 20 ? 90 : 80
            });
          }
        }
      }
    });
    
    return adjustments;
  },
  
  // Generate budget monitoring report
  generateBudgetReport: (budgetHealth: any[], alerts: any[], adjustments: any[]) => {
    // Calculate overall statistics
    const totalProjects = budgetHealth.length;
    const healthyProjects = budgetHealth.filter(p => p.status === 'HEALTHY').length;
    const cautionProjects = budgetHealth.filter(p => p.status === 'CAUTION').length;
    const warningProjects = budgetHealth.filter(p => p.status === 'WARNING').length;
    const criticalProjects = budgetHealth.filter(p => p.status === 'CRITICAL').length;
    
    // Calculate total budget metrics
    const totalAllocated = budgetHealth.reduce((sum, p) => sum + p.allocated, 0);
    const totalSpent = budgetHealth.reduce((sum, p) => sum + p.spent, 0);
    const totalRemaining = budgetHealth.reduce((sum, p) => sum + p.remaining, 0);
    const overallUtilization = totalAllocated > 0 ? (totalSpent / totalAllocated) * 100 : 0;
    
    // Calculate projected overruns
    const totalProjectedOverrun = budgetHealth.reduce((sum, p) => sum + p.projectedOverrun, 0);
    const projectsWithOverruns = budgetHealth.filter(p => p.projectedOverrun > 0).length;
    
    return {
      summary: {
        totalProjects,
        healthyProjects,
        cautionProjects,
        warningProjects,
        criticalProjects,
        totalAllocated,
        totalSpent,
        totalRemaining,
        overallUtilization: Math.round(overallUtilization),
        totalProjectedOverrun,
        projectsWithOverruns
      },
      budgetHealth: budgetHealth.sort((a, b) => b.percentageSpent - a.percentageSpent),
      alerts: alerts.slice(0, 10), // Top 10 alerts
      adjustments: adjustments.slice(0, 5), // Top 5 adjustments
      generatedAt: new Date().toISOString()
    };
  }
};

export default BUDGET_MONITORING_RULES;
// Central Intelligence Hub for Construction Management
import TASK_PRIORITIZATION_RULES from './taskPrioritization'
import RESOURCE_ALLOCATION_RULES from './resourceAllocation'
import DEFECT_PREDICTION_RULES from './defectPrediction'
import BUDGET_MONITORING_RULES from './budgetMonitoring'
import SAFETY_MONITORING_RULES from './safetyMonitoring'
import QUALITY_CONTROL_RULES from './qualityControl'
import PROJECT_SCHEDULING_RULES from './projectScheduling'
import CREW_MANAGEMENT_RULES from './crewManagement'
import MATERIALS_MANAGEMENT_RULES from './materialsManagement'

export const CONSTRUCTION_INTELLIGENCE_HUB = {
  // Integrate all intelligence systems
  analyzeProjectHealth: (
    projects: any[],
    tasks: any[],
    resources: any[],
    crew: any[],
    materials: any[],
    budgets: any[],
    incidents: any[],
    defects: any[],
    inspections: any[],
    weatherData: any[],
    site: any
  ) => {
    // Run all analysis systems
    const taskPrioritization = TASK_PRIORITIZATION_RULES.reprioritizeTasks(tasks, projects[0], site)
    const resourceAllocation = RESOURCE_ALLOCATION_RULES.allocateResources(tasks, resources, site)
    const defectPredictions = DEFECT_PREDICTION_RULES.predictDefects(tasks, materials, weatherData, site)
    const budgetHealth = BUDGET_MONITORING_RULES.monitorBudgetHealth(projects, budgets)
    const safetyMetrics = SAFETY_MONITORING_RULES.monitorSafety(incidents, inspections, crew, site)
    const qualityMetrics = QUALITY_CONTROL_RULES.monitorQuality(defects, inspections, tasks, site)
    const scheduleOptimization = PROJECT_SCHEDULING_RULES.generateSchedule(tasks, resources, {})
    const crewPerformance = CREW_MANAGEMENT_RULES.optimizeCrewAssignments(tasks, crew, projects)
    const materialsAnalysis = MATERIALS_MANAGEMENT_RULES.optimizeMaterialsOrdering(projects, materials, [])
    
    // Combine all insights
    const insights: any[] = []
    
    // Add task prioritization insights
    taskPrioritization.forEach((task: any) => {
      if (task.priority === 'CRITICAL' || task.priority === 'HIGH') {
        insights.push({
          id: `task-${task.id}-${Date.now()}`,
          type: 'TASK_PRIORITY',
          category: 'TASK_MANAGEMENT',
          severity: task.priority === 'CRITICAL' ? 'HIGH' : 'MEDIUM',
          confidence: task.priorityScore,
          description: `High priority task: ${task.title}`,
          recommendation: `Focus on completing ${task.title} immediately`,
          affectedProject: task.projectId,
          predictedAt: new Date().toISOString()
        })
      }
    })
    
    // Add resource allocation insights
    if (resourceAllocation.allocations.length > 0) {
      insights.push({
        id: `resource-${Date.now()}`,
        type: 'RESOURCE_ALLOCATION',
        category: 'RESOURCE_MANAGEMENT',
        severity: 'MEDIUM',
        confidence: 85,
        description: `${resourceAllocation.allocations.length} resources allocated to tasks`,
        recommendation: `Review resource allocation to ensure optimal utilization`,
        predictedAt: new Date().toISOString()
      })
    }
    
    // Add defect prediction insights
    defectPredictions.slice(0, 3).forEach(prediction => {
      insights.push({
        id: `defect-${prediction.id}-${Date.now()}`,
        type: 'DEFECT_PREDICTION',
        category: 'QUALITY_CONTROL',
        severity: prediction.severity,
        confidence: prediction.confidence,
        description: prediction.description,
        recommendation: prediction.recommendation,
        affectedTasks: prediction.affectedTasks,
        predictedAt: new Date().toISOString()
      })
    })
    
    // Add budget health insights
    budgetHealth.forEach(project => {
      if (project.percentageSpent > 85) {
        insights.push({
          id: `budget-${project.projectId}-${Date.now()}`,
          type: 'BUDGET_HEALTH',
          category: 'FINANCIAL_MANAGEMENT',
          severity: project.percentageSpent > 95 ? 'HIGH' : 'MEDIUM',
          confidence: 90,
          description: `High budget utilization (${project.percentageSpent}%) for ${project.projectName}`,
          recommendation: `Review expenses and consider budget adjustment for ${project.projectName}`,
          affectedProject: project.projectId,
          predictedAt: new Date().toISOString()
        })
      }
    })
    
    // Add safety insights
    safetyMetrics.predictions.slice(0, 3).forEach(prediction => {
      insights.push({
        id: `safety-${prediction.id}-${Date.now()}`,
        type: 'SAFETY_MONITORING',
        category: 'SAFETY_MANAGEMENT',
        severity: prediction.severity,
        confidence: prediction.confidence,
        description: prediction.description,
        recommendation: prediction.recommendation,
        affectedAreas: prediction.affectedAreas,
        predictedAt: new Date().toISOString()
      })
    })
    
    // Add quality insights
    qualityMetrics.predictions.slice(0, 3).forEach(prediction => {
      insights.push({
        id: `quality-${prediction.id}-${Date.now()}`,
        type: 'QUALITY_CONTROL',
        category: 'QUALITY_MANAGEMENT',
        severity: prediction.severity,
        confidence: prediction.confidence,
        description: prediction.description,
        recommendation: prediction.recommendation,
        affectedTasks: prediction.affectedTasks,
        predictedAt: new Date().toISOString()
      })
    })
    
    // Add scheduling insights
    if (scheduleOptimization.unscheduledTasks.length > 0) {
      insights.push({
        id: `schedule-${Date.now()}`,
        type: 'SCHEDULING',
        category: 'PROJECT_PLANNING',
        severity: scheduleOptimization.unscheduledTasks.length > 5 ? 'HIGH' : 'MEDIUM',
        confidence: 80,
        description: `${scheduleOptimization.unscheduledTasks.length} tasks could not be scheduled`,
        recommendation: `Review resource availability and task dependencies`,
        affectedTasks: scheduleOptimization.unscheduledTasks.map((t: any) => t.id),
        predictedAt: new Date().toISOString()
      })
    }
    
    // Add crew performance insights
    if (crewPerformance.unassignedTasks.length > 0) {
      insights.push({
        id: `crew-${Date.now()}`,
        type: 'CREW_MANAGEMENT',
        category: 'HUMAN_RESOURCES',
        severity: crewPerformance.unassignedTasks.length > 5 ? 'HIGH' : 'MEDIUM',
        confidence: 85,
        description: `${crewPerformance.unassignedTasks.length} tasks not assigned to crew`,
        recommendation: `Assign crew members to unassigned tasks`,
        affectedTasks: crewPerformance.unassignedTasks.map((t: any) => t.id),
        predictedAt: new Date().toISOString()
      })
    }
    
    // Add materials insights
    materialsAnalysis.materialsToOrder.slice(0, 3).forEach(order => {
      insights.push({
        id: `materials-${order.id}-${Date.now()}`,
        type: 'MATERIALS_MANAGEMENT',
        category: 'SUPPLY_CHAIN',
        severity: order.urgency === 'HIGH' ? 'HIGH' : 'MEDIUM',
        confidence: 90,
        description: `Need to order ${order.quantityToOrder} ${order.unit} of ${order.name}`,
        recommendation: `Place order with ${order.supplier} for ${order.name}`,
        affectedProject: order.siteId,
        predictedAt: new Date().toISOString()
      })
    })
    
    // Sort insights by severity and confidence
    const sortedInsights = insights.sort((a, b) => {
      const severityOrder = { 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 }
      const severityDiff = (severityOrder[b.severity as keyof typeof severityOrder] || 0) - 
                          (severityOrder[a.severity as keyof typeof severityOrder] || 0)
      
      if (severityDiff !== 0) return severityDiff
      
      return b.confidence - a.confidence
    })
    
    return {
      taskPrioritization,
      resourceAllocation,
      defectPredictions,
      budgetHealth,
      safetyMetrics,
      qualityMetrics,
      scheduleOptimization,
      crewPerformance,
      materialsAnalysis,
      insights: sortedInsights.slice(0, 10), // Top 10 insights
      generatedAt: new Date().toISOString()
    }
  },
  
  // Generate actionable recommendations
  generateRecommendations: (
    analysis: any,
    userRole: string
  ) => {
    const recommendations: any[] = []
    
    // Role-based filtering
    const relevantInsights = analysis.insights.filter((insight: any) => {
      // Filter insights based on user role
      switch(userRole) {
        case 'ADMIN':
          return true // Admin sees all insights
        case 'PROJECT_MANAGER':
          return ['PROJECT_PLANNING', 'FINANCIAL_MANAGEMENT', 'RESOURCE_MANAGEMENT', 'TASK_MANAGEMENT'].includes(insight.category)
        case 'SITE_SUPERVISOR':
          return ['SAFETY_MANAGEMENT', 'QUALITY_MANAGEMENT', 'HUMAN_RESOURCES'].includes(insight.category)
        case 'CREW_LEADER':
          return ['TASK_MANAGEMENT', 'HUMAN_RESOURCES'].includes(insight.category)
        case 'WORKER':
          return ['TASK_MANAGEMENT'].includes(insight.category)
        default:
          return false
      }
    })
    
    // Convert insights to actionable recommendations
    relevantInsights.forEach((insight: any) => {
      recommendations.push({
        id: `recommendation-${insight.id}`,
        type: insight.type,
        category: insight.category,
        priority: insight.severity === 'HIGH' ? 'URGENT' : 
                 insight.severity === 'MEDIUM' ? 'HIGH' : 'MEDIUM',
        title: insight.description,
        description: insight.recommendation,
        confidence: insight.confidence,
        createdAt: insight.predictedAt
      })
    })
    
    // Sort by priority
    return recommendations.sort((a, b) => {
      const priorityOrder = { 'URGENT': 4, 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 }
      return (priorityOrder[b.priority as keyof typeof priorityOrder] || 0) - 
             (priorityOrder[a.priority as keyof typeof priorityOrder] || 0)
    })
  },
  
  // Predict project outcomes
  predictProjectOutcomes: (
    projects: any[],
    analysis: any
  ) => {
    const predictions: any[] = []
    
    projects.forEach(project => {
      // Calculate project health score
      const healthFactors = {
        budget: analysis.budgetHealth.find((b: any) => b.projectId === project.id)?.percentageSpent || 100,
        schedule: analysis.scheduleOptimization.schedulingEfficiency || 100,
        quality: analysis.qualityMetrics.metrics.qualityRating || 100,
        safety: analysis.safetyMetrics.metrics.safetyRating || 100,
        resource: analysis.resourceAllocation.resourceUtilization || 100
      }
      
      // Normalize scores (higher is better)
      const normalizedScores = {
        budget: healthFactors.budget <= 80 ? 100 : 
               healthFactors.budget <= 90 ? 80 : 
               healthFactors.budget <= 95 ? 60 : 40,
        schedule: healthFactors.schedule,
        quality: healthFactors.quality,
        safety: healthFactors.safety,
        resource: healthFactors.resource >= 70 ? 100 : 
                 healthFactors.resource >= 50 ? 80 : 
                 healthFactors.resource >= 30 ? 60 : 40
      }
      
      // Calculate weighted health score
      const healthScore = Math.round(
        (normalizedScores.budget * 0.25) + 
        (normalizedScores.schedule * 0.20) + 
        (normalizedScores.quality * 0.20) + 
        (normalizedScores.safety * 0.20) + 
        (normalizedScores.resource * 0.15)
      )
      
      // Determine health status
      let healthStatus = 'HEALTHY'
      let healthColor = 'text-emerald-600'
      
      if (healthScore < 60) {
        healthStatus = 'AT_RISK'
        healthColor = 'text-red-600'
      } else if (healthScore < 80) {
        healthStatus = 'NEEDS_ATTENTION'
        healthColor = 'text-amber-600'
      }
      
      // Predict completion date
      const currentDate = new Date()
      const projectStart = new Date(project.startDate)
      const projectEnd = new Date(project.deadline)
      const totalProjectDays = Math.ceil(
        (projectEnd.getTime() - projectStart.getTime()) / (1000 * 60 * 60 * 24)
      )
      
      const elapsedDays = Math.ceil(
        (currentDate.getTime() - projectStart.getTime()) / (1000 * 60 * 60 * 24)
      )
      
      const progressPercentage = project.progress || 0
      const projectedCompletionDays = progressPercentage > 0 ? 
        Math.ceil((elapsedDays / progressPercentage) * 100) : totalProjectDays
      
      const projectedCompletionDate = new Date(projectStart)
      projectedCompletionDate.setDate(projectStart.getDate() + projectedCompletionDays)
      
      // Determine if project is on track
      let onTrackStatus = 'ON_TRACK'
      let onTrackColor = 'text-emerald-600'
      
      if (projectedCompletionDate > projectEnd) {
        const delayDays = Math.ceil(
          (projectedCompletionDate.getTime() - projectEnd.getTime()) / (1000 * 60 * 60 * 24)
        )
        onTrackStatus = `DELAYED_${delayDays}_DAYS`
        onTrackColor = 'text-red-600'
      } else if (projectedCompletionDate < projectEnd) {
        const earlyDays = Math.ceil(
          (projectEnd.getTime() - projectedCompletionDate.getTime()) / (1000 * 60 * 60 * 24)
        )
        onTrackStatus = `AHEAD_${earlyDays}_DAYS`
        onTrackColor = 'text-blue-600'
      }
      
      predictions.push({
        projectId: project.id,
        projectName: project.name,
        healthScore,
        healthStatus,
        healthColor,
        projectedCompletionDate: projectedCompletionDate.toISOString(),
        onTrackStatus,
        onTrackColor,
        factors: normalizedScores,
        createdAt: new Date().toISOString()
      })
    })
    
    return predictions.sort((a, b) => b.healthScore - a.healthScore)
  },
  
  // Generate comprehensive project report
  generateProjectReport: (
    projects: any[],
    analysis: any,
    recommendations: any[]
  ) => {
    // Calculate overall metrics
    const totalProjects = projects.length
    const activeProjects = projects.filter(p => p.status === 'ACTIVE').length
    const completedProjects = projects.filter(p => p.status === 'COMPLETED').length
    
    // Calculate health distribution
    const healthDistribution = {
      HEALTHY: analysis.predictions.filter((p: any) => p.healthStatus === 'HEALTHY').length,
      NEEDS_ATTENTION: analysis.predictions.filter((p: any) => p.healthStatus === 'NEEDS_ATTENTION').length,
      AT_RISK: analysis.predictions.filter((p: any) => p.healthStatus === 'AT_RISK').length
    }
    
    // Calculate on-track distribution
    const onTrackDistribution = {
      ON_TRACK: analysis.predictions.filter((p: any) => p.onTrackStatus === 'ON_TRACK').length,
      AHEAD: analysis.predictions.filter((p: any) => p.onTrackStatus.startsWith('AHEAD')).length,
      DELAYED: analysis.predictions.filter((p: any) => p.onTrackStatus.startsWith('DELAYED')).length
    }
    
    // Calculate average health score
    const avgHealthScore = analysis.predictions.length > 0 ? 
      Math.round(analysis.predictions.reduce((sum: number, p: any) => sum + p.healthScore, 0) / analysis.predictions.length) : 0
    
    // Get top recommendations
    const topRecommendations = recommendations.slice(0, 5)
    
    // Get critical insights
    const criticalInsights = analysis.insights.filter((i: any) => i.severity === 'HIGH').slice(0, 3)
    
    return {
      summary: {
        totalProjects,
        activeProjects,
        completedProjects,
        avgHealthScore,
        healthDistribution,
        onTrackDistribution
      },
      projects: analysis.predictions,
      recommendations: topRecommendations,
      criticalInsights,
      generatedAt: new Date().toISOString()
    }
  }
}

export default CONSTRUCTION_INTELLIGENCE_HUB
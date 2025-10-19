// Intelligent Quality Control System
export const QUALITY_CONTROL_RULES = {
  // Monitor quality metrics and predict defects
  monitorQuality: (defects: any[], inspections: any[], tasks: any[], site: any) => {
    // Calculate quality metrics
    const totalDefects = defects.length;
    const resolvedDefects = defects.filter(d => d.status === 'RESOLVED').length;
    const openDefects = defects.filter(d => d.status !== 'RESOLVED').length;
    
    // Calculate defect resolution rate
    const resolutionRate = totalDefects > 0 ? (resolvedDefects / totalDefects) * 100 : 100;
    
    // Calculate days since last defect
    const lastDefect = defects.length > 0 
      ? new Date(Math.max(...defects.map(d => new Date(d.reportedAt).getTime()))) 
      : null;
    const daysSinceLastDefect = lastDefect 
      ? Math.floor((new Date().getTime() - lastDefect.getTime()) / (1000 * 60 * 60 * 24))
      : 0;
      
    // Calculate inspection compliance rate
    const totalInspections = inspections.length;
    const completedInspections = inspections.filter(i => i.status === 'COMPLETED').length;
    const inspectionComplianceRate = totalInspections > 0 
      ? (completedInspections / totalInspections) * 100 
      : 100;
      
    // Calculate defect density (defects per completed task)
    const completedTasks = tasks.filter(t => t.status === 'COMPLETED').length;
    const defectDensity = completedTasks > 0 ? totalDefects / completedTasks : 0;
    
    // Determine quality rating
    let qualityRating = 0;
    let qualityStatus = 'EXCELLENT';
    let qualityColor = 'text-emerald-600';
    let qualityBg = 'bg-emerald-100';
    
    // Weighted scoring system
    qualityRating += (resolutionRate / 100) * 25; // 25% weight
    qualityRating += (inspectionComplianceRate / 100) * 25; // 25% weight
    qualityRating += (defectDensity < 0.1 ? 1 : defectDensity > 0.5 ? 0 : 1 - (defectDensity - 0.1) / 0.4) * 25; // 25% weight
    qualityRating += (daysSinceLastDefect > 30 ? 1 : daysSinceLastDefect / 30) * 25; // 25% weight
    
    // Determine status based on rating
    if (qualityRating >= 90) {
      qualityStatus = 'EXCELLENT';
      qualityColor = 'text-emerald-600';
      qualityBg = 'bg-emerald-100';
    } else if (qualityRating >= 75) {
      qualityStatus = 'GOOD';
      qualityColor = 'text-blue-600';
      qualityBg = 'bg-blue-100';
    } else if (qualityRating >= 60) {
      qualityStatus = 'FAIR';
      qualityColor = 'text-amber-600';
      qualityBg = 'bg-amber-100';
    } else {
      qualityStatus = 'POOR';
      qualityColor = 'text-red-600';
      qualityBg = 'bg-red-100';
    }
    
    // Predict potential quality issues
    const predictions: any[] = [];
    
    // Unresolved defects prediction
    if (openDefects > 0) {
      predictions.push({
        id: `open-defects-${site.id}-${Date.now()}`,
        type: 'UNRESOLVED_DEFECTS',
        severity: openDefects > 5 ? 'HIGH' : openDefects > 2 ? 'MEDIUM' : 'LOW',
        confidence: 90,
        description: `${openDefects} unresolved quality defects require attention`,
        recommendation: `Prioritize resolution of open defects to prevent rework`,
        affectedAreas: defects.filter(d => d.status !== 'RESOLVED').map(d => d.location),
        predictedAt: new Date().toISOString()
      });
    }
    
    // Defect density prediction
    if (defectDensity > 0.3) {
      predictions.push({
        id: `defect-density-${site.id}-${Date.now()}`,
        type: 'DEFECT_DENSITY',
        severity: 'HIGH',
        confidence: 85,
        description: `High defect density of ${defectDensity.toFixed(2)} defects per completed task`,
        recommendation: `Conduct quality audit and implement process improvements`,
        predictedAt: new Date().toISOString()
      });
    } else if (defectDensity > 0.1) {
      predictions.push({
        id: `defect-density-${site.id}-${Date.now()}`,
        type: 'DEFECT_DENSITY',
        severity: 'MEDIUM',
        confidence: 75,
        description: `Moderate defect density of ${defectDensity.toFixed(2)} defects per completed task`,
        recommendation: `Monitor quality trends and reinforce inspection protocols`,
        predictedAt: new Date().toISOString()
      });
    }
    
    // Inspection compliance prediction
    if (inspectionComplianceRate < 85) {
      predictions.push({
        id: `inspection-compliance-${site.id}-${Date.now()}`,
        type: 'INSPECTION_COMPLIANCE',
        severity: inspectionComplianceRate < 70 ? 'HIGH' : 'MEDIUM',
        confidence: 80,
        description: `Only ${Math.round(inspectionComplianceRate)}% inspection compliance - risk of quality issues`,
        recommendation: `Schedule pending inspections immediately to maintain quality standards`,
        affectedAreas: inspections.filter(i => i.status !== 'COMPLETED').map(i => i.location),
        predictedAt: new Date().toISOString()
      });
    }
    
    // Recurring defects prediction
    const recurringDefects: Record<string, number> = {};
    defects.forEach(defect => {
      if (!recurringDefects[defect.type]) {
        recurringDefects[defect.type] = 0;
      }
      recurringDefects[defect.type] += 1;
    });
    
    Object.entries(recurringDefects).forEach(([type, count]) => {
      if (count > 3) {
        predictions.push({
          id: `recurring-${type}-${site.id}-${Date.now()}`,
          type: 'RECURRING_DEFECTS',
          severity: count > 5 ? 'HIGH' : 'MEDIUM',
          confidence: 95,
          description: `${count} recurring ${type} defects detected`,
          recommendation: `Investigate root cause and implement permanent fix for ${type} defects`,
          predictedAt: new Date().toISOString()
        });
      }
    });
    
    return {
      metrics: {
        totalDefects,
        resolvedDefects,
        openDefects,
        resolutionRate: Math.round(resolutionRate),
        daysSinceLastDefect,
        totalInspections,
        completedInspections,
        inspectionComplianceRate: Math.round(inspectionComplianceRate),
        defectDensity: parseFloat(defectDensity.toFixed(2)),
        qualityRating: Math.round(qualityRating),
        qualityStatus,
        qualityColor,
        qualityBg
      },
      predictions: predictions.sort((a, b) => {
        // Sort by severity and confidence
        const severityOrder = { 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };
        const severityDiff = (severityOrder[b.severity as keyof typeof severityOrder] || 0) - 
                            (severityOrder[a.severity as keyof typeof severityOrder] || 0);
        
        if (severityDiff !== 0) return severityDiff;
        
        return b.confidence - a.confidence;
      }),
      lastUpdated: new Date().toISOString()
    };
  },
  
  // Generate quality alerts
  generateQualityAlerts: (qualityData: any) => {
    const alerts: any[] = [];
    
    // Critical alerts
    if (qualityData.metrics.qualityRating < 60) {
      alerts.push({
        id: `quality-critical-${Date.now()}`,
        type: 'QUALITY_CRITICAL',
        severity: 'HIGH',
        message: `🔴 CRITICAL: Site quality rating dropped to ${qualityData.metrics.qualityRating}%`,
        recommendation: `Immediate quality intervention required - conduct full site assessment`,
        priority: 'URGENT'
      });
    }
    
    // Warning alerts
    if (qualityData.metrics.qualityRating < 75 && qualityData.metrics.qualityRating >= 60) {
      alerts.push({
        id: `quality-warning-${Date.now()}`,
        type: 'QUALITY_WARNING',
        severity: 'MEDIUM',
        message: `🟡 WARNING: Site quality rating at ${qualityData.metrics.qualityRating}%`,
        recommendation: `Enhanced quality monitoring and process improvements recommended`,
        priority: 'HIGH'
      });
    }
    
    // Caution alerts
    if (qualityData.metrics.qualityRating < 90 && qualityData.metrics.qualityRating >= 75) {
      alerts.push({
        id: `quality-caution-${Date.now()}`,
        type: 'QUALITY_CAUTION',
        severity: 'LOW',
        message: `🔵 CAUTION: Site quality rating at ${qualityData.metrics.qualityRating}%`,
        recommendation: `Continue monitoring quality metrics`,
        priority: 'MEDIUM'
      });
    }
    
    // Unresolved defects alert
    if (qualityData.metrics.openDefects > 0) {
      alerts.push({
        id: `unresolved-defects-${Date.now()}`,
        type: 'UNRESOLVED_DEFECTS',
        severity: qualityData.metrics.openDefects > 5 ? 'HIGH' : 
                 qualityData.metrics.openDefects > 2 ? 'MEDIUM' : 'LOW',
        message: `⚠️ ${qualityData.metrics.openDefects} unresolved quality defects`,
        recommendation: `Resolve open defects within 48 hours to prevent rework`,
        priority: qualityData.metrics.openDefects > 5 ? 'HIGH' : 
                 qualityData.metrics.openDefects > 2 ? 'MEDIUM' : 'LOW'
      });
    }
    
    // Defect density alert
    if (qualityData.metrics.defectDensity > 0.2) {
      alerts.push({
        id: `defect-density-${Date.now()}`,
        type: 'DEFECT_DENSITY',
        severity: qualityData.metrics.defectDensity > 0.4 ? 'HIGH' : 'MEDIUM',
        message: `📈 High defect density of ${qualityData.metrics.defectDensity} defects per completed task`,
        recommendation: `Conduct quality audit and implement process improvements`,
        priority: qualityData.metrics.defectDensity > 0.4 ? 'HIGH' : 'MEDIUM'
      });
    }
    
    // Inspection compliance alert
    if (qualityData.metrics.inspectionComplianceRate < 85) {
      alerts.push({
        id: `inspection-compliance-${Date.now()}`,
        type: 'INSPECTION_COMPLIANCE',
        severity: qualityData.metrics.inspectionComplianceRate < 70 ? 'HIGH' : 'MEDIUM',
        message: `📋 Only ${qualityData.metrics.inspectionComplianceRate}% inspection compliance`,
        recommendation: `Schedule pending inspections to maintain quality standards`,
        priority: qualityData.metrics.inspectionComplianceRate < 70 ? 'HIGH' : 'MEDIUM'
      });
    }
    
    // Days since last defect alert
    if (qualityData.metrics.daysSinceLastDefect < 3) {
      alerts.push({
        id: `recent-defect-${Date.now()}`,
        type: 'RECENT_DEFECT',
        severity: 'HIGH',
        message: `🚨 Defect reported within last 3 days`,
        recommendation: `Investigate root cause and implement preventive measures`,
        priority: 'HIGH'
      });
    } else if (qualityData.metrics.daysSinceLastDefect < 7) {
      alerts.push({
        id: `recent-defect-${Date.now()}`,
        type: 'RECENT_DEFECT',
        severity: 'MEDIUM',
        message: `⚠️ Defect reported within last week`,
        recommendation: `Review quality protocols and reinforce inspection procedures`,
        priority: 'MEDIUM'
      });
    }
    
    return alerts.sort((a, b) => {
      // Sort by priority
      const priorityOrder = { 'URGENT': 4, 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };
      return (priorityOrder[b.priority as keyof typeof priorityOrder] || 0) - 
             (priorityOrder[a.priority as keyof typeof priorityOrder] || 0);
    });
  },
  
  // Suggest quality improvements
  suggestQualityImprovements: (qualityData: any, defects: any[], inspections: any[], tasks: any[]) => {
    const improvements: any[] = [];
    
    // Improvement suggestions based on quality data
    if (qualityData.metrics.qualityRating < 90) {
      // Add general improvement suggestions
      improvements.push({
        id: `general-quality-${Date.now()}`,
        type: 'GENERAL_IMPROVEMENT',
        priority: qualityData.metrics.qualityRating < 75 ? 'HIGH' : 
                 qualityData.metrics.qualityRating < 85 ? 'MEDIUM' : 'LOW',
        title: 'Enhance Overall Quality Control',
        description: `Current quality rating of ${qualityData.metrics.qualityRating}% indicates room for improvement`,
        actionItems: [
          'Implement daily quality walkthroughs',
          'Establish quality checkpoints at key milestones',
          'Increase inspection frequency for critical tasks',
          'Provide quality training to all crew members'
        ],
        estimatedCost: qualityData.metrics.qualityRating < 75 ? 75000 : 
                      qualityData.metrics.qualityRating < 85 ? 40000 : 20000,
        roi: 'Reduced rework costs and improved client satisfaction'
      });
    }
    
    // Specific improvement suggestions
    if (qualityData.metrics.openDefects > 0) {
      const unresolvedDefects = defects.filter(d => d.status !== 'RESOLVED');
      improvements.push({
        id: `resolve-defects-${Date.now()}`,
        type: 'DEFECT_RESOLUTION',
        priority: 'HIGH',
        title: 'Resolve Open Defects',
        description: `${unresolvedDefects.length} defects require immediate attention`,
        actionItems: unresolvedDefects.map(defect => 
          `Resolve defect #${defect.id}: ${defect.description.substring(0, 50)}...`
        ),
        estimatedCost: unresolvedDefects.length * 8000,
        roi: 'Prevent defect escalation and reduce rework costs'
      });
    }
    
    if (qualityData.metrics.defectDensity > 0.2) {
      improvements.push({
        id: `defect-analysis-${Date.now()}`,
        type: 'DEFECT_ANALYSIS',
        priority: qualityData.metrics.defectDensity > 0.4 ? 'HIGH' : 'MEDIUM',
        title: 'Conduct Defect Analysis',
        description: `High defect density of ${qualityData.metrics.defectDensity} defects per completed task`,
        actionItems: [
          'Perform root cause analysis of recurring defects',
          'Review work methods and procedures',
          'Update quality standards documentation',
          'Implement corrective actions for identified issues'
        ],
        estimatedCost: qualityData.metrics.defectDensity > 0.4 ? 50000 : 30000,
        roi: 'Reduced future defect occurrence and improved work quality'
      });
    }
    
    if (qualityData.metrics.inspectionComplianceRate < 90) {
      const pendingInspections = inspections.filter(i => i.status !== 'COMPLETED');
      improvements.push({
        id: `complete-inspections-${Date.now()}`,
        type: 'INSPECTION_COMPLIANCE',
        priority: qualityData.metrics.inspectionComplianceRate < 75 ? 'HIGH' : 'MEDIUM',
        title: 'Complete Pending Inspections',
        description: `${pendingInspections.length} inspections pending completion`,
        actionItems: pendingInspections.map(inspection => 
          `Complete inspection #${inspection.id}: ${inspection.location}`
        ),
        estimatedCost: pendingInspections.length * 3000,
        roi: 'Maintain quality standards and avoid regulatory issues'
      });
    }
    
    // Task completion quality check
    const poorlyCompletedTasks = tasks.filter(task => 
      task.status === 'COMPLETED' && 
      task.qualityRating && 
      task.qualityRating < 70
    );
    
    if (poorlyCompletedTasks.length > 0) {
      improvements.push({
        id: `task-quality-${Date.now()}`,
        type: 'TASK_QUALITY',
        priority: poorlyCompletedTasks.length > 5 ? 'HIGH' : 'MEDIUM',
        title: 'Improve Task Completion Quality',
        description: `${poorlyCompletedTasks.length} recently completed tasks scored below 70% quality`,
        actionItems: poorlyCompletedTasks.map(task => 
          `Review and improve quality of task: ${task.title}`
        ),
        estimatedCost: poorlyCompletedTasks.length * 5000,
        roi: 'Improved overall project quality and reduced rework'
      });
    }
    
    // Recurring defect resolution
    const recurringDefectTypes: Record<string, number> = {};
    defects.forEach(defect => {
      if (!recurringDefectTypes[defect.type]) {
        recurringDefectTypes[defect.type] = 0;
      }
      recurringDefectTypes[defect.type] += 1;
    });
    
    Object.entries(recurringDefectTypes).forEach(([type, count]) => {
      if (count > 3) {
        improvements.push({
          id: `recurring-${type}-${Date.now()}`,
          type: 'RECURRING_DEFECT_RESOLUTION',
          priority: count > 5 ? 'HIGH' : 'MEDIUM',
          title: `Address Recurring ${type} Defects`,
          description: `${count} recurring ${type} defects detected`,
          actionItems: [
            `Conduct detailed analysis of ${type} defect patterns`,
            `Review materials and methods used for ${type} tasks`,
            `Update training programs for ${type} work`,
            `Implement additional quality checks for ${type} tasks`
          ],
          estimatedCost: count > 5 ? 40000 : 25000,
          roi: `Eliminate recurring ${type} defects and reduce rework costs`
        });
      }
    });
    
    return improvements.sort((a, b) => {
      // Sort by priority
      const priorityOrder = { 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };
      return (priorityOrder[b.priority as keyof typeof priorityOrder] || 0) - 
             (priorityOrder[a.priority as keyof typeof priorityOrder] || 0);
    });
  },
  
  // Generate quality report
  generateQualityReport: (qualityData: any, alerts: any[], improvements: any[]) => {
    return {
      summary: {
        qualityRating: qualityData.metrics.qualityRating,
        qualityStatus: qualityData.metrics.qualityStatus,
        totalDefects: qualityData.metrics.totalDefects,
        resolvedDefects: qualityData.metrics.resolvedDefects,
        openDefects: qualityData.metrics.openDefects,
        resolutionRate: qualityData.metrics.resolutionRate,
        daysSinceLastDefect: qualityData.metrics.daysSinceLastDefect,
        inspectionComplianceRate: qualityData.metrics.inspectionComplianceRate,
        defectDensity: qualityData.metrics.defectDensity,
        lastUpdated: qualityData.lastUpdated
      },
      alerts: alerts.slice(0, 5), // Top 5 alerts
      improvements: improvements.slice(0, 3), // Top 3 improvements
      predictions: qualityData.predictions.slice(0, 5), // Top 5 predictions
      generatedAt: new Date().toISOString()
    };
  }
};

export default QUALITY_CONTROL_RULES;
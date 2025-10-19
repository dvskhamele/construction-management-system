// Intelligent Safety Monitoring System
export const SAFETY_MONITORING_RULES = {
  // Monitor safety metrics and predict incidents
  monitorSafety: (incidents: any[], inspections: any[], crew: any[], site: any) => {
    // Calculate safety metrics
    const totalIncidents = incidents.length;
    const resolvedIncidents = incidents.filter(i => i.status === 'RESOLVED').length;
    const openIncidents = incidents.filter(i => i.status !== 'RESOLVED').length;
    
    // Calculate incident resolution rate
    const resolutionRate = totalIncidents > 0 ? (resolvedIncidents / totalIncidents) * 100 : 100;
    
    // Calculate days since last incident
    const lastIncident = incidents.length > 0 
      ? new Date(Math.max(...incidents.map(i => new Date(i.reportedAt).getTime()))) 
      : null;
    const daysSinceLastIncident = lastIncident 
      ? Math.floor((new Date().getTime() - lastIncident.getTime()) / (1000 * 60 * 60 * 24))
      : 0;
      
    // Calculate inspection compliance rate
    const totalInspections = inspections.length;
    const completedInspections = inspections.filter(i => i.status === 'COMPLETED').length;
    const inspectionComplianceRate = totalInspections > 0 
      ? (completedInspections / totalInspections) * 100 
      : 100;
      
    // Calculate crew safety training completion
    const trainedCrew = crew.filter(c => c.safetyTrainingCompleted).length;
    const crewTrainingRate = crew.length > 0 ? (trainedCrew / crew.length) * 100 : 100;
    
    // Determine safety rating
    let safetyRating = 0;
    let safetyStatus = 'EXCELLENT';
    let safetyColor = 'text-emerald-600';
    let safetyBg = 'bg-emerald-100';
    
    // Weighted scoring system
    safetyRating += (resolutionRate / 100) * 25; // 25% weight
    safetyRating += (inspectionComplianceRate / 100) * 25; // 25% weight
    safetyRating += (crewTrainingRate / 100) * 25; // 25% weight
    safetyRating += (daysSinceLastIncident > 30 ? 1 : daysSinceLastIncident / 30) * 25; // 25% weight
    
    // Determine status based on rating
    if (safetyRating >= 90) {
      safetyStatus = 'EXCELLENT';
      safetyColor = 'text-emerald-600';
      safetyBg = 'bg-emerald-100';
    } else if (safetyRating >= 75) {
      safetyStatus = 'GOOD';
      safetyColor = 'text-blue-600';
      safetyBg = 'bg-blue-100';
    } else if (safetyRating >= 60) {
      safetyStatus = 'FAIR';
      safetyColor = 'text-amber-600';
      safetyBg = 'bg-amber-100';
    } else {
      safetyStatus = 'POOR';
      safetyColor = 'text-red-600';
      safetyBg = 'bg-red-100';
    }
    
    // Predict potential safety issues
    const predictions: any[] = [];
    
    // Unresolved incidents prediction
    if (openIncidents > 0) {
      predictions.push({
        id: `open-${site.id}-${Date.now()}`,
        type: 'UNRESOLVED_INCIDENTS',
        severity: openIncidents > 3 ? 'HIGH' : 'MEDIUM',
        confidence: 90,
        description: `${openIncidents} unresolved safety incidents require attention`,
        recommendation: `Prioritize resolution of open incidents to prevent escalation`,
        affectedAreas: incidents.filter(i => i.status !== 'RESOLVED').map(i => i.location),
        predictedAt: new Date().toISOString()
      });
    }
    
    // Inspection compliance prediction
    if (inspectionComplianceRate < 80) {
      predictions.push({
        id: `inspection-${site.id}-${Date.now()}`,
        type: 'INSPECTION_COMPLIANCE',
        severity: inspectionComplianceRate < 60 ? 'HIGH' : 'MEDIUM',
        confidence: 85,
        description: `Only ${Math.round(inspectionComplianceRate)}% inspection compliance - risk of regulatory issues`,
        recommendation: `Schedule pending inspections immediately to maintain compliance`,
        affectedAreas: inspections.filter(i => i.status !== 'COMPLETED').map(i => i.location),
        predictedAt: new Date().toISOString()
      });
    }
    
    // Crew training prediction
    if (crewTrainingRate < 85) {
      const untrainedCrew = crew.filter(c => !c.safetyTrainingCompleted);
      predictions.push({
        id: `training-${site.id}-${Date.now()}`,
        type: 'CREW_TRAINING',
        severity: crewTrainingRate < 70 ? 'HIGH' : 'MEDIUM',
        confidence: 80,
        description: `${untrainedCrew.length} crew members lack safety training`,
        recommendation: `Schedule safety training for untrained crew members`,
        affectedCrew: untrainedCrew.map(c => c.name),
        predictedAt: new Date().toISOString()
      });
    }
    
    // Incident frequency prediction
    if (totalIncidents > 5 && daysSinceLastIncident < 7) {
      predictions.push({
        id: `frequency-${site.id}-${Date.now()}`,
        type: 'INCIDENT_FREQUENCY',
        severity: 'HIGH',
        confidence: 95,
        description: `High incident frequency - ${totalIncidents} incidents in recent period`,
        recommendation: `Conduct immediate safety review and implement corrective measures`,
        predictedAt: new Date().toISOString()
      });
    } else if (totalIncidents > 2 && daysSinceLastIncident < 3) {
      predictions.push({
        id: `frequency-${site.id}-${Date.now()}`,
        type: 'INCIDENT_FREQUENCY',
        severity: 'MEDIUM',
        confidence: 90,
        description: `Increasing incident frequency - ${totalIncidents} incidents recently`,
        recommendation: `Monitor incident trends and reinforce safety protocols`,
        predictedAt: new Date().toISOString()
      });
    }
    
    return {
      metrics: {
        totalIncidents,
        resolvedIncidents,
        openIncidents,
        resolutionRate: Math.round(resolutionRate),
        daysSinceLastIncident,
        totalInspections,
        completedInspections,
        inspectionComplianceRate: Math.round(inspectionComplianceRate),
        trainedCrew,
        crewTrainingRate: Math.round(crewTrainingRate),
        safetyRating: Math.round(safetyRating),
        safetyStatus,
        safetyColor,
        safetyBg
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
  
  // Generate safety alerts
  generateSafetyAlerts: (safetyData: any) => {
    const alerts: any[] = [];
    
    // Critical alerts
    if (safetyData.metrics.safetyRating < 60) {
      alerts.push({
        id: `safety-critical-${Date.now()}`,
        type: 'SAFETY_CRITICAL',
        severity: 'HIGH',
        message: `🔴 CRITICAL: Site safety rating dropped to ${safetyData.metrics.safetyRating}%`,
        recommendation: `Immediate safety intervention required - conduct full site assessment`,
        priority: 'URGENT'
      });
    }
    
    // Warning alerts
    if (safetyData.metrics.safetyRating < 75 && safetyData.metrics.safetyRating >= 60) {
      alerts.push({
        id: `safety-warning-${Date.now()}`,
        type: 'SAFETY_WARNING',
        severity: 'MEDIUM',
        message: `🟡 WARNING: Site safety rating at ${safetyData.metrics.safetyRating}%`,
        recommendation: `Enhanced safety monitoring and crew training recommended`,
        priority: 'HIGH'
      });
    }
    
    // Caution alerts
    if (safetyData.metrics.safetyRating < 90 && safetyData.metrics.safetyRating >= 75) {
      alerts.push({
        id: `safety-caution-${Date.now()}`,
        type: 'SAFETY_CAUTION',
        severity: 'LOW',
        message: `🔵 CAUTION: Site safety rating at ${safetyData.metrics.safetyRating}%`,
        recommendation: `Continue monitoring safety metrics`,
        priority: 'MEDIUM'
      });
    }
    
    // Unresolved incidents alert
    if (safetyData.metrics.openIncidents > 0) {
      alerts.push({
        id: `unresolved-${Date.now()}`,
        type: 'UNRESOLVED_INCIDENTS',
        severity: safetyData.metrics.openIncidents > 3 ? 'HIGH' : 'MEDIUM',
        message: `⚠️ ${safetyData.metrics.openIncidents} unresolved safety incidents`,
        recommendation: `Resolve open incidents within 24 hours`,
        priority: safetyData.metrics.openIncidents > 3 ? 'HIGH' : 'MEDIUM'
      });
    }
    
    // Inspection compliance alert
    if (safetyData.metrics.inspectionComplianceRate < 80) {
      alerts.push({
        id: `inspection-${Date.now()}`,
        type: 'INSPECTION_COMPLIANCE',
        severity: safetyData.metrics.inspectionComplianceRate < 60 ? 'HIGH' : 'MEDIUM',
        message: `📋 Only ${safetyData.metrics.inspectionComplianceRate}% inspection compliance`,
        recommendation: `Schedule pending inspections to maintain regulatory compliance`,
        priority: safetyData.metrics.inspectionComplianceRate < 60 ? 'HIGH' : 'MEDIUM'
      });
    }
    
    // Crew training alert
    if (safetyData.metrics.crewTrainingRate < 85) {
      alerts.push({
        id: `training-${Date.now()}`,
        type: 'CREW_TRAINING',
        severity: safetyData.metrics.crewTrainingRate < 70 ? 'HIGH' : 'MEDIUM',
        message: `🎓 Only ${safetyData.metrics.crewTrainingRate}% crew trained in safety`,
        recommendation: `Schedule safety training for untrained crew members`,
        priority: safetyData.metrics.crewTrainingRate < 70 ? 'HIGH' : 'MEDIUM'
      });
    }
    
    // Days since last incident alert
    if (safetyData.metrics.daysSinceLastIncident < 3) {
      alerts.push({
        id: `recent-incident-${Date.now()}`,
        type: 'RECENT_INCIDENT',
        severity: 'HIGH',
        message: `🚨 Incident reported within last 3 days`,
        recommendation: `Investigate root cause and implement preventive measures`,
        priority: 'HIGH'
      });
    } else if (safetyData.metrics.daysSinceLastIncident < 7) {
      alerts.push({
        id: `recent-incident-${Date.now()}`,
        type: 'RECENT_INCIDENT',
        severity: 'MEDIUM',
        message: `⚠️ Incident reported within last week`,
        recommendation: `Review safety protocols and reinforce training`,
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
  
  // Suggest safety improvements
  suggestSafetyImprovements: (safetyData: any, incidents: any[], inspections: any[], crew: any[]) => {
    const improvements: any[] = [];
    
    // Improvement suggestions based on safety data
    if (safetyData.metrics.safetyRating < 90) {
      // Add general improvement suggestions
      improvements.push({
        id: `general-${Date.now()}`,
        type: 'GENERAL_IMPROVEMENT',
        priority: safetyData.metrics.safetyRating < 75 ? 'HIGH' : 
                 safetyData.metrics.safetyRating < 85 ? 'MEDIUM' : 'LOW',
        title: 'Enhance Overall Safety Protocol',
        description: `Current safety rating of ${safetyData.metrics.safetyRating}% indicates room for improvement`,
        actionItems: [
          'Conduct weekly safety meetings',
          'Implement daily safety briefings',
          'Review and update safety procedures',
          'Increase safety signage throughout site'
        ],
        estimatedCost: safetyData.metrics.safetyRating < 75 ? 50000 : 
                      safetyData.metrics.safetyRating < 85 ? 25000 : 10000,
        roi: 'Reduced incident costs and improved compliance'
      });
    }
    
    // Specific improvement suggestions
    if (safetyData.metrics.openIncidents > 0) {
      const unresolvedIncidents = incidents.filter(i => i.status !== 'RESOLVED');
      improvements.push({
        id: `resolve-${Date.now()}`,
        type: 'INCIDENT_RESOLUTION',
        priority: 'HIGH',
        title: 'Resolve Open Incidents',
        description: `${unresolvedIncidents.length} incidents require immediate attention`,
        actionItems: unresolvedIncidents.map(incident => 
          `Resolve incident #${incident.id}: ${incident.description.substring(0, 50)}...`
        ),
        estimatedCost: unresolvedIncidents.length * 5000,
        roi: 'Prevent incident escalation and regulatory penalties'
      });
    }
    
    if (safetyData.metrics.inspectionComplianceRate < 90) {
      const pendingInspections = inspections.filter(i => i.status !== 'COMPLETED');
      improvements.push({
        id: `inspect-${Date.now()}`,
        type: 'INSPECTION_COMPLIANCE',
        priority: safetyData.metrics.inspectionComplianceRate < 70 ? 'HIGH' : 'MEDIUM',
        title: 'Complete Pending Inspections',
        description: `${pendingInspections.length} inspections pending completion`,
        actionItems: pendingInspections.map(inspection => 
          `Complete inspection #${inspection.id}: ${inspection.location}`
        ),
        estimatedCost: pendingInspections.length * 2000,
        roi: 'Maintain regulatory compliance and avoid fines'
      });
    }
    
    if (safetyData.metrics.crewTrainingRate < 95) {
      const untrainedCrew = crew.filter(c => !c.safetyTrainingCompleted);
      improvements.push({
        id: `train-${Date.now()}`,
        type: 'CREW_TRAINING',
        priority: safetyData.metrics.crewTrainingRate < 80 ? 'HIGH' : 'MEDIUM',
        title: 'Conduct Safety Training',
        description: `${untrainedCrew.length} crew members need safety training`,
        actionItems: untrainedCrew.map(member => 
          `Train ${member.name} on safety protocols`
        ),
        estimatedCost: untrainedCrew.length * 3000,
        roi: 'Improved safety awareness and reduced incident likelihood'
      });
    }
    
    // Equipment safety recommendations
    // Note: In a real implementation, we would get equipment data from a parameter or API
    // For now, we'll use mock data
    const equipment = [
      { id: 1, name: 'Excavator', safetyStatus: 'SAFE', lastInspectionDate: new Date(Date.now() - 15*24*60*60*1000) },
      { id: 2, name: 'Crane', safetyStatus: 'UNSAFE', lastInspectionDate: new Date(Date.now() - 45*24*60*60*1000) },
      { id: 3, name: 'Concrete Mixer', safetyStatus: 'SAFE', lastInspectionDate: new Date(Date.now() - 10*24*60*60*1000) },
      { id: 4, name: 'Generator', safetyStatus: 'SAFE', lastInspectionDate: new Date(Date.now() - 20*24*60*60*1000) }
    ];
    
    const unsafeEquipment = equipment.filter(eq => 
      eq.safetyStatus === 'UNSAFE' || 
      eq.lastInspectionDate < new Date(Date.now() - 30*24*60*60*1000)
    );
    
    if (unsafeEquipment.length > 0) {
      improvements.push({
        id: `equip-${Date.now()}`,
        type: 'EQUIPMENT_SAFETY',
        priority: 'HIGH',
        title: 'Equipment Safety Review',
        description: `${unsafeEquipment.length} pieces of equipment require safety inspection`,
        actionItems: unsafeEquipment.map(eq => 
          `Inspect ${eq.name} for safety compliance`
        ),
        estimatedCost: unsafeEquipment.length * 1500,
        roi: 'Prevent equipment-related accidents and maintain productivity'
      });
    }
    
    return improvements.sort((a, b) => {
      // Sort by priority
      const priorityOrder = { 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };
      return (priorityOrder[b.priority as keyof typeof priorityOrder] || 0) - 
             (priorityOrder[a.priority as keyof typeof priorityOrder] || 0);
    });
  },
  
  // Generate safety report
  generateSafetyReport: (safetyData: any, alerts: any[], improvements: any[]) => {
    return {
      summary: {
        safetyRating: safetyData.metrics.safetyRating,
        safetyStatus: safetyData.metrics.safetyStatus,
        totalIncidents: safetyData.metrics.totalIncidents,
        resolvedIncidents: safetyData.metrics.resolvedIncidents,
        openIncidents: safetyData.metrics.openIncidents,
        resolutionRate: safetyData.metrics.resolutionRate,
        daysSinceLastIncident: safetyData.metrics.daysSinceLastIncident,
        inspectionComplianceRate: safetyData.metrics.inspectionComplianceRate,
        crewTrainingRate: safetyData.metrics.crewTrainingRate,
        lastUpdated: safetyData.lastUpdated
      },
      alerts: alerts.slice(0, 5), // Top 5 alerts
      improvements: improvements.slice(0, 3), // Top 3 improvements
      predictions: safetyData.predictions.slice(0, 5), // Top 5 predictions
      generatedAt: new Date().toISOString()
    };
  }
};

export default SAFETY_MONITORING_RULES;
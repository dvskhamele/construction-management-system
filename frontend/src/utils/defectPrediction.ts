// Intelligent Defect Prediction System
export const DEFECT_PREDICTION_RULES = {
  // Predict potential defects based on various factors
  predictDefects: (tasks: any[], materials: any[], weatherData: any[], site: any) => {
    const predictions: any[] = [];
    
    // Rule 1: Material Quality Issues
    materials.forEach(material => {
      // Check for expired materials
      if (material.expiryDate && new Date(material.expiryDate) < new Date()) {
        predictions.push({
          id: `exp-${material.id}-${Date.now()}`,
          type: 'MATERIAL_EXPIRY',
          severity: 'HIGH',
          confidence: 95,
          description: `Expired ${material.name} may cause structural defects`,
          recommendation: `Dispose of expired ${material.name} and replace with fresh stock`,
          affectedTasks: tasks.filter(task => 
            task.materials?.some((m: any) => m.id === material.id)
          ).map(task => task.id),
          predictedAt: new Date().toISOString()
        });
      }
      
      // Check for low-quality materials
      if (material.qualityRating && material.qualityRating < 3) {
        predictions.push({
          id: `qual-${material.id}-${Date.now()}`,
          type: 'MATERIAL_QUALITY',
          severity: material.qualityRating < 2 ? 'HIGH' : 'MEDIUM',
          confidence: 85,
          description: `Low quality ${material.name} may lead to defects`,
          recommendation: `Inspect ${material.name} closely or consider replacement`,
          affectedTasks: tasks.filter(task => 
            task.materials?.some((m: any) => m.id === material.id)
          ).map(task => task.id),
          predictedAt: new Date().toISOString()
        });
      }
    });
    
    // Rule 2: Weather-Related Defects
    const recentWeather = weatherData.slice(-7); // Last 7 days
    
    // Check for excessive rainfall
    const rainDays = recentWeather.filter(day => day.precipitation > 10).length;
    if (rainDays >= 3) {
      predictions.push({
        id: `rain-${site.id}-${Date.now()}`,
        type: 'WATER_DAMAGE',
        severity: rainDays >= 5 ? 'HIGH' : 'MEDIUM',
        confidence: rainDays >= 5 ? 90 : 70,
        description: `Extended rainfall period may cause water damage`,
        recommendation: `Inspect foundations and drainage systems for water accumulation`,
        affectedTasks: tasks.filter(task => 
          task.phase === 'FOUNDATION' || task.phase === 'BASEMENT'
        ).map(task => task.id),
        predictedAt: new Date().toISOString()
      });
    }
    
    // Check for temperature fluctuations
    const tempFluctuations = recentWeather.filter(day => 
      Math.abs(day.temperature - day.feelsLike) > 5
    ).length;
    
    if (tempFluctuations >= 3) {
      predictions.push({
        id: `temp-${site.id}-${Date.now()}`,
        type: 'MATERIAL_STRESS',
        severity: 'MEDIUM',
        confidence: 75,
        description: `Temperature fluctuations may stress materials`,
        recommendation: `Monitor concrete curing and metal expansion joints`,
        affectedTasks: tasks.filter(task => 
          task.phase === 'FOUNDATION' || task.phase === 'STRUCTURE'
        ).map(task => task.id),
        predictedAt: new Date().toISOString()
      });
    }
    
    // Rule 3: Task Sequence Issues
    tasks.forEach(task => {
      // Check for skipped dependencies
      const incompleteDependencies = task.dependencies?.filter(
        (dep: string) => !task.isDependencyComplete(dep)
      ).length || 0;
      
      if (incompleteDependencies > 0 && task.status === 'IN_PROGRESS') {
        predictions.push({
          id: `dep-${task.id}-${Date.now()}`,
          type: 'SEQUENCE_VIOLATION',
          severity: incompleteDependencies > 2 ? 'HIGH' : 'MEDIUM',
          confidence: 90,
          description: `Task started with ${incompleteDependencies} incomplete dependencies`,
          recommendation: `Review task sequence and ensure proper completion order`,
          affectedTasks: [task.id],
          predictedAt: new Date().toISOString()
        });
      }
      
      // Check for rushed tasks
      const plannedDuration = task.estimatedHours;
      const actualDuration = task.actualHours || 0;
      
      if (actualDuration > 0 && actualDuration < plannedDuration * 0.5) {
        predictions.push({
          id: `rush-${task.id}-${Date.now()}`,
          type: 'RUSHED_WORK',
          severity: 'MEDIUM',
          confidence: 80,
          description: `Task completed significantly faster than estimated`,
          recommendation: `Inspect work quality as rushed tasks often have defects`,
          affectedTasks: [task.id],
          predictedAt: new Date().toISOString()
        });
      }
    });
    
    // Rule 4: Crew Performance Issues
    const crewMembers = site.crew || [];
    crewMembers.forEach((member: any) => {
      // Check for inconsistent performance
      if (member.performanceRating && member.performanceRating < 60) {
        const memberTasks = tasks.filter(task => 
          task.assignedTo === member.id || task.assignedTo.includes(member.name)
        );
        
        if (memberTasks.length > 0) {
          predictions.push({
            id: `perf-${member.id}-${Date.now()}`,
            type: 'QUALITY_RISK',
            severity: member.performanceRating < 40 ? 'HIGH' : 'MEDIUM',
            confidence: 75,
            description: `Low performing crew member may affect work quality`,
            recommendation: `Provide additional supervision or training for ${member.name}`,
            affectedTasks: memberTasks.map(task => task.id),
            predictedAt: new Date().toISOString()
          });
        }
      }
    });
    
    // Rule 5: Equipment Issues
    const equipment = site.equipment || [];
    equipment.forEach((item: any) => {
      // Check for overdue maintenance
      if (item.nextMaintenance && new Date(item.nextMaintenance) < new Date()) {
        const equipmentTasks = tasks.filter(task => 
          task.equipment?.some((eq: any) => eq.id === item.id)
        );
        
        if (equipmentTasks.length > 0) {
          predictions.push({
            id: `maint-${item.id}-${Date.now()}`,
            type: 'EQUIPMENT_FAILURE',
            severity: 'HIGH',
            confidence: 85,
            description: `Overdue maintenance on ${item.name} may cause defects`,
            recommendation: `Schedule immediate maintenance for ${item.name}`,
            affectedTasks: equipmentTasks.map(task => task.id),
            predictedAt: new Date().toISOString()
          });
        }
      }
      
      // Check for frequent breakdowns
      if (item.breakdownCount && item.breakdownCount > 3) {
        const equipmentTasks = tasks.filter(task => 
          task.equipment?.some((eq: any) => eq.id === item.id)
        );
        
        if (equipmentTasks.length > 0) {
          predictions.push({
            id: `break-${item.id}-${Date.now()}`,
            type: 'EQUIPMENT_RELIABILITY',
            severity: 'MEDIUM',
            confidence: 80,
            description: `Frequently breaking ${item.name} may affect work quality`,
            recommendation: `Consider equipment replacement or repair for ${item.name}`,
            affectedTasks: equipmentTasks.map(task => task.id),
            predictedAt: new Date().toISOString()
          });
        }
      }
    });
    
    return predictions.sort((a, b) => {
      // Sort by severity and confidence
      const severityOrder = { 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };
      const severityDiff = (severityOrder[b.severity as keyof typeof severityOrder] || 0) - 
                          (severityOrder[a.severity as keyof typeof severityOrder] || 0);
      
      if (severityDiff !== 0) return severityDiff;
      
      return b.confidence - a.confidence;
    });
  },
  
  // Get defect prevention recommendations
  getPreventionRecommendations: (predictions: any[]) => {
    const recommendations: string[] = [];
    
    // Group predictions by type
    const predictionGroups: Record<string, any[]> = {};
    predictions.forEach(prediction => {
      if (!predictionGroups[prediction.type]) {
        predictionGroups[prediction.type] = [];
      }
      predictionGroups[prediction.type].push(prediction);
    });
    
    // Generate recommendations based on grouped predictions
    Object.entries(predictionGroups).forEach(([type, preds]) => {
      const highestSeverity = preds.reduce((max, pred) => 
        pred.severity === 'HIGH' ? pred : 
        pred.severity === 'MEDIUM' && max.severity !== 'HIGH' ? pred : max, 
        preds[0]
      );
      
      const avgConfidence = preds.reduce((sum, pred) => sum + pred.confidence, 0) / preds.length;
      
      switch(type) {
        case 'MATERIAL_EXPIRY':
          recommendations.push(`⚠️ ${preds.length} expired materials detected - Immediate disposal recommended`);
          break;
        case 'MATERIAL_QUALITY':
          recommendations.push(`🔍 ${preds.length} low-quality materials identified - Enhanced inspection required`);
          break;
        case 'WATER_DAMAGE':
          recommendations.push(`🌧️ Extended rainfall period - Foundation and drainage inspection advised`);
          break;
        case 'MATERIAL_STRESS':
          recommendations.push(`🌡️ Temperature fluctuations detected - Monitor concrete curing closely`);
          break;
        case 'SEQUENCE_VIOLATION':
          recommendations.push(`🔗 ${preds.length} task sequence violations - Review workflow immediately`);
          break;
        case 'RUSHED_WORK':
          recommendations.push(`⚡ ${preds.length} rushed tasks - Quality inspection strongly recommended`);
          break;
        case 'QUALITY_RISK':
          recommendations.push(`👥 Performance issues with crew members - Additional supervision needed`);
          break;
        case 'EQUIPMENT_FAILURE':
          recommendations.push(`🔧 ${preds.length} equipment maintenance issues - Schedule immediate servicing`);
          break;
        case 'EQUIPMENT_RELIABILITY':
          recommendations.push(`🛠️ ${preds.length} unreliable equipment - Consider replacement or repair`);
          break;
        default:
          recommendations.push(`📋 ${preds.length} potential issues detected - Review recommendations`);
      }
    });
    
    return recommendations;
  },
  
  // Generate defect prediction report
  generatePredictionReport: (predictions: any[], site: any) => {
    // Count predictions by severity
    const severityCounts = {
      HIGH: predictions.filter(p => p.severity === 'HIGH').length,
      MEDIUM: predictions.filter(p => p.severity === 'MEDIUM').length,
      LOW: predictions.filter(p => p.severity === 'LOW').length
    };
    
    // Count predictions by type
    const typeCounts: Record<string, number> = {};
    predictions.forEach(prediction => {
      if (!typeCounts[prediction.type]) {
        typeCounts[prediction.type] = 0;
      }
      typeCounts[prediction.type] += 1;
    });
    
    // Calculate average confidence
    const avgConfidence = predictions.length > 0 
      ? predictions.reduce((sum, pred) => sum + pred.confidence, 0) / predictions.length 
      : 0;
    
    // Get top 5 predictions
    const topPredictions = predictions.slice(0, 5);
    
    return {
      siteId: site.id,
      siteName: site.name,
      totalPredictions: predictions.length,
      severityCounts,
      typeCounts,
      avgConfidence: Math.round(avgConfidence),
      topPredictions,
      generatedAt: new Date().toISOString()
    };
  }
};

export default DEFECT_PREDICTION_RULES;
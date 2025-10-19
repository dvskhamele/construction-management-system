// Intelligent Crew Management System
export const CREW_MANAGEMENT_RULES = {
  // Optimize crew assignments based on skills and workload
  optimizeCrewAssignments: (tasks: any[], crew: any[], projects: any[]) => {
    // Create a copy of crew members to avoid mutation
    const updatedCrew = [...crew];
    const updatedTasks = [...tasks];
    
    // Calculate crew workload
    const crewWorkload: Record<number, { assignedHours: number, maxHours: number }> = {};
    
    updatedCrew.forEach(member => {
      crewWorkload[member.id] = {
        assignedHours: member.assignedTasks?.reduce((sum: number, task: any) => sum + (task.estimatedHours || 0), 0) || 0,
        maxHours: member.maxHoursPerWeek || 40
      };
    });
    
    // Sort tasks by priority and urgency
    const sortedTasks = updatedTasks.sort((a, b) => {
      const priorityOrder = { 'CRITICAL': 4, 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1, 'VERY_LOW': 0 };
      const priorityDiff = (priorityOrder[b.priority as keyof typeof priorityOrder] || 0) - 
                          (priorityOrder[a.priority as keyof typeof priorityOrder] || 0);
      
      if (priorityDiff !== 0) return priorityDiff;
      
      // Sort by due date if priorities are equal
      const aDue = new Date(a.dueDate).getTime();
      const bDue = new Date(b.dueDate).getTime();
      return aDue - bDue;
    });
    
    // Assign tasks to crew members
    const assignments: any[] = [];
    
    sortedTasks.forEach(task => {
      if (task.status !== 'PENDING' && task.status !== 'ASSIGNED') return;
      
      // Find suitable crew members based on required skills
      const requiredSkills = task.requiredSkills || [];
      const suitableCrew = updatedCrew.filter(member => 
        requiredSkills.every((skill: string) => 
          member.skills?.some((s: any) => s.name === skill && s.proficiency >= 70)
        ) && 
        // Check if crew member has capacity
        (crewWorkload[member.id].assignedHours + (task.estimatedHours || 0)) <= 
        crewWorkload[member.id].maxHours
      );
      
      // If no suitable crew found, find crew with partial skills
      if (suitableCrew.length === 0) {
        suitableCrew.push(...updatedCrew.filter(member => 
          requiredSkills.some((skill: string) => 
            member.skills?.some((s: any) => s.name === skill && s.proficiency >= 50)
          ) && 
          // Check if crew member has capacity
          (crewWorkload[member.id].assignedHours + (task.estimatedHours || 0)) <= 
          crewWorkload[member.id].maxHours
        ));
      }
      
      // If still no crew found, assign to anyone with capacity
      if (suitableCrew.length === 0) {
        suitableCrew.push(...updatedCrew.filter(member => 
          (crewWorkload[member.id].assignedHours + (task.estimatedHours || 0)) <= 
          crewWorkload[member.id].maxHours
        ));
      }
      
      // Assign to the best available crew member
      if (suitableCrew.length > 0) {
        // Sort by skill match and workload balance
        const bestCrew = suitableCrew.sort((a, b) => {
          // Calculate skill match score
          const aSkillMatch = requiredSkills.filter((skill: string) => 
            a.skills?.some((s: any) => s.name === skill)
          ).length;
          
          const bSkillMatch = requiredSkills.filter((skill: string) => 
            b.skills?.some((s: any) => s.name === skill)
          ).length;
          
          // Sort by skill match first
          const skillDiff = bSkillMatch - aSkillMatch;
          if (skillDiff !== 0) return skillDiff;
          
          // Then by workload balance (prefer less loaded crew)
          return crewWorkload[a.id].assignedHours - crewWorkload[b.id].assignedHours;
        })[0];
        
        // Assign task to crew member
        assignments.push({
          taskId: task.id,
          taskName: task.title,
          crewMemberId: bestCrew.id,
          crewMemberName: bestCrew.name,
          assignedAt: new Date().toISOString(),
          estimatedHours: task.estimatedHours || 0
        });
        
        // Update task status
        const taskIndex = updatedTasks.findIndex(t => t.id === task.id);
        if (taskIndex !== -1) {
          updatedTasks[taskIndex] = {
            ...updatedTasks[taskIndex],
            status: 'ASSIGNED',
            assignedTo: bestCrew.name,
            assignedAt: new Date().toISOString()
          };
        }
        
        // Update crew workload
        crewWorkload[bestCrew.id].assignedHours += task.estimatedHours || 0;
        
        // Update crew member's assigned tasks
        const crewIndex = updatedCrew.findIndex(c => c.id === bestCrew.id);
        if (crewIndex !== -1) {
          if (!updatedCrew[crewIndex].assignedTasks) {
            updatedCrew[crewIndex].assignedTasks = [];
          }
          updatedCrew[crewIndex].assignedTasks.push({
            taskId: task.id,
            taskName: task.title,
            assignedAt: new Date().toISOString(),
            estimatedHours: task.estimatedHours || 0
          });
        }
      }
    });
    
    return {
      assignments,
      updatedTasks,
      updatedCrew,
      unassignedTasks: updatedTasks.filter(task => 
        task.status === 'PENDING' || task.status === 'UNASSIGNED'
      ),
      overloadedCrew: updatedCrew.filter(member => 
        crewWorkload[member.id].assignedHours > crewWorkload[member.id].maxHours
      )
    };
  },
  
  // Predict crew performance and issues
  predictCrewPerformance: (crew: any[], tasks: any[], projects: any[]) => {
    const predictions: any[] = [];
    
    crew.forEach(member => {
      // Calculate performance metrics
      const completedTasks = member.assignedTasks?.filter((task: any) => task.status === 'COMPLETED').length || 0;
      const totalTasks = member.assignedTasks?.length || 0;
      const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 100;
      
      // Calculate average task duration vs estimate
      const taskDurations = member.assignedTasks?.filter((task: any) => 
        task.status === 'COMPLETED' && task.actualHours && task.estimatedHours
      ).map((task: any) => ({
        taskId: task.taskId,
        taskName: task.taskName,
        estimated: task.estimatedHours,
        actual: task.actualHours,
        variance: task.actualHours - task.estimatedHours
      })) || [];
      
      const avgVariance = taskDurations.length > 0 
        ? taskDurations.reduce((sum: number, task: any) => sum + task.variance, 0) / taskDurations.length 
        : 0;
      
      // Predict performance issues
      if (completionRate < 80) {
        predictions.push({
          id: `performance-${member.id}-${Date.now()}`,
          type: 'PERFORMANCE_ISSUE',
          severity: completionRate < 60 ? 'HIGH' : 'MEDIUM',
          confidence: 90,
          description: `Low completion rate of ${Math.round(completionRate)}% for ${member.name}`,
          recommendation: `Provide additional training or support for ${member.name}`,
          affectedCrew: [member.id],
          predictedAt: new Date().toISOString()
        });
      }
      
      if (avgVariance > 2) {
        predictions.push({
          id: `efficiency-${member.id}-${Date.now()}`,
          type: 'EFFICIENCY_ISSUE',
          severity: avgVariance > 4 ? 'HIGH' : 'MEDIUM',
          confidence: 85,
          description: `${member.name} consistently takes ${Math.round(avgVariance)} hours longer than estimated`,
          recommendation: `Review task estimation methods for ${member.name}'s work`,
          affectedCrew: [member.id],
          predictedAt: new Date().toISOString()
        });
      }
      
      // Workload predictions
      const assignedHours = member.assignedTasks?.reduce((sum: number, task: any) => sum + (task.estimatedHours || 0), 0) || 0;
      const maxHours = member.maxHoursPerWeek || 40;
      const workloadPercentage = maxHours > 0 ? (assignedHours / maxHours) * 100 : 0;
      
      if (workloadPercentage > 120) {
        predictions.push({
          id: `overload-${member.id}-${Date.now()}`,
          type: 'WORKLOAD_OVERLOAD',
          severity: 'HIGH',
          confidence: 95,
          description: `${member.name} is overloaded with ${Math.round(workloadPercentage)}% of capacity`,
          recommendation: `Redistribute workload or add support for ${member.name}`,
          affectedCrew: [member.id],
          predictedAt: new Date().toISOString()
        });
      } else if (workloadPercentage > 100) {
        predictions.push({
          id: `high-workload-${member.id}-${Date.now()}`,
          type: 'HIGH_WORKLOAD',
          severity: 'MEDIUM',
          confidence: 90,
          description: `${member.name} is at ${Math.round(workloadPercentage)}% of capacity`,
          recommendation: `Monitor workload for ${member.name} to prevent burnout`,
          affectedCrew: [member.id],
          predictedAt: new Date().toISOString()
        });
      }
      
      // Skill gap predictions
      const requiredSkills = tasks.filter(task => 
        task.assignedTo === member.name
      ).flatMap(task => task.requiredSkills || []);
      
      const missingSkills = requiredSkills.filter(skill => 
        !member.skills?.some((s: any) => s.name === skill && s.proficiency >= 70)
      );
      
      if (missingSkills.length > 0) {
        predictions.push({
          id: `skill-gap-${member.id}-${Date.now()}`,
          type: 'SKILL_GAP',
          severity: missingSkills.length > 3 ? 'HIGH' : 'MEDIUM',
          confidence: 80,
          description: `${member.name} lacks proficiency in ${missingSkills.length} required skills`,
          recommendation: `Provide training for ${missingSkills.join(', ')} skills`,
          affectedCrew: [member.id],
          predictedAt: new Date().toISOString()
        });
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
  
  // Generate crew performance reports
  generateCrewReports: (crew: any[], tasks: any[], projects: any[]) => {
    // Calculate overall crew metrics
    const totalCrew = crew.length;
    const activeCrew = crew.filter(member => member.status === 'ACTIVE').length;
    const onLeaveCrew = crew.filter(member => member.status === 'ON_LEAVE').length;
    const unavailableCrew = crew.filter(member => member.status === 'UNAVAILABLE').length;
    
    // Calculate skill distribution
    const skillDistribution: Record<string, number> = {};
    crew.forEach(member => {
      member.skills?.forEach((skill: any) => {
        if (!skillDistribution[skill.name]) {
          skillDistribution[skill.name] = 0;
        }
        skillDistribution[skill.name] += 1;
      });
    });
    
    // Calculate performance distribution
    const performanceDistribution: Record<string, number> = {
      'EXCELLENT': 0, // 90-100%
      'GOOD': 0,      // 75-89%
      'FAIR': 0,      // 60-74%
      'POOR': 0       // 0-59%
    };
    
    crew.forEach(member => {
      const completedTasks = member.assignedTasks?.filter((task: any) => task.status === 'COMPLETED').length || 0;
      const totalTasks = member.assignedTasks?.length || 0;
      const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 100;
      
      if (completionRate >= 90) {
        performanceDistribution.EXCELLENT += 1;
      } else if (completionRate >= 75) {
        performanceDistribution.GOOD += 1;
      } else if (completionRate >= 60) {
        performanceDistribution.FAIR += 1;
      } else {
        performanceDistribution.POOR += 1;
      }
    });
    
    // Calculate workload distribution
    const workloadDistribution: Record<string, number> = {
      'UNDERLOADED': 0,  // 0-50%
      'OPTIMAL': 0,      // 51-80%
      'OVERLOADED': 0    // 81-100%+
    };
    
    crew.forEach(member => {
      const assignedHours = member.assignedTasks?.reduce((sum: number, task: any) => sum + (task.estimatedHours || 0), 0) || 0;
      const maxHours = member.maxHoursPerWeek || 40;
      const workloadPercentage = maxHours > 0 ? (assignedHours / maxHours) * 100 : 0;
      
      if (workloadPercentage <= 50) {
        workloadDistribution.UNDERLOADED += 1;
      } else if (workloadPercentage <= 80) {
        workloadDistribution.OPTIMAL += 1;
      } else {
        workloadDistribution.OVERLOADED += 1;
      }
    });
    
    return {
      summary: {
        totalCrew,
        activeCrew,
        onLeaveCrew,
        unavailableCrew,
        skillDistribution,
        performanceDistribution,
        workloadDistribution
      },
      crew: crew.map(member => {
        // Calculate individual metrics
        const completedTasks = member.assignedTasks?.filter((task: any) => task.status === 'COMPLETED').length || 0;
        const totalTasks = member.assignedTasks?.length || 0;
        const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 100;
        
        const taskDurations = member.assignedTasks?.filter((task: any) => 
          task.status === 'COMPLETED' && task.actualHours && task.estimatedHours
        ).map((task: any) => ({
          taskId: task.taskId,
          taskName: task.taskName,
          estimated: task.estimatedHours,
          actual: task.actualHours,
          variance: task.actualHours - task.estimatedHours
        })) || [];
        
        const avgVariance = taskDurations.length > 0 
          ? taskDurations.reduce((sum: number, task: any) => sum + task.variance, 0) / taskDurations.length 
          : 0;
        
        const assignedHours = member.assignedTasks?.reduce((sum: number, task: any) => sum + (task.estimatedHours || 0), 0) || 0;
        const maxHours = member.maxHoursPerWeek || 40;
        const workloadPercentage = maxHours > 0 ? (assignedHours / maxHours) * 100 : 0;
        
        // Determine performance rating
        let performanceRating = 'EXCELLENT';
        if (completionRate >= 90) {
          performanceRating = 'EXCELLENT';
        } else if (completionRate >= 75) {
          performanceRating = 'GOOD';
        } else if (completionRate >= 60) {
          performanceRating = 'FAIR';
        } else {
          performanceRating = 'POOR';
        }
        
        // Determine workload status
        let workloadStatus = 'OPTIMAL';
        if (workloadPercentage <= 50) {
          workloadStatus = 'UNDERLOADED';
        } else if (workloadPercentage <= 80) {
          workloadStatus = 'OPTIMAL';
        } else {
          workloadStatus = 'OVERLOADED';
        }
        
        return {
          id: member.id,
          name: member.name,
          role: member.role,
          status: member.status,
          skills: member.skills,
          assignedTasks: member.assignedTasks,
          completedTasks,
          totalTasks,
          completionRate: Math.round(completionRate),
          avgVariance: Math.round(avgVariance * 10) / 10,
          assignedHours,
          maxHours,
          workloadPercentage: Math.round(workloadPercentage),
          performanceRating,
          workloadStatus,
          lastUpdated: member.lastUpdated || new Date().toISOString()
        };
      }).sort((a, b) => b.completionRate - a.completionRate),
      generatedAt: new Date().toISOString()
    };
  }
};

export default CREW_MANAGEMENT_RULES;
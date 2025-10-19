// Intelligent Project Scheduling System
export const PROJECT_SCHEDULING_RULES = {
  // Generate optimal project schedules based on dependencies and resources
  generateSchedule: (tasks: any[], resources: any[], constraints: any) => {
    // Sort tasks by priority and dependencies
    const sortedTasks = [...tasks].sort((a, b) => {
      // First sort by dependencies (tasks with no dependencies first)
      const aHasDependencies = a.dependencies && a.dependencies.length > 0;
      const bHasDependencies = b.dependencies && b.dependencies.length > 0;
      
      if (aHasDependencies && !bHasDependencies) return 1;
      if (!aHasDependencies && bHasDependencies) return -1;
      
      // Then sort by priority
      const priorityOrder = { 'CRITICAL': 4, 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1, 'VERY_LOW': 0 };
      return (priorityOrder[b.priority as keyof typeof priorityOrder] || 0) - 
             (priorityOrder[a.priority as keyof typeof priorityOrder] || 0);
    });
    
    // Initialize schedule
    const schedule: any[] = [];
    const scheduledTaskIds: Set<number> = new Set();
    const currentDate = new Date(constraints.startDate || new Date());
    
    // Schedule tasks respecting dependencies
    for (const task of sortedTasks) {
      // Skip if already scheduled
      if (scheduledTaskIds.has(task.id)) continue;
      
      // Check if dependencies are met
      const unsatisfiedDependencies = task.dependencies?.filter(
        (depId: number) => !scheduledTaskIds.has(depId)
      ) || [];
      
      if (unsatisfiedDependencies.length === 0) {
        // Calculate resource availability
        const requiredResources = task.requiredResources || [];
        const availableResources = requiredResources.filter((req: any) => 
          resources.some(res => 
            res.type === req.type && 
            res.status === 'AVAILABLE' &&
            (!res.assignedTo || !scheduledTaskIds.has(res.assignedTo.taskId))
          )
        );
        
        // Only schedule if resources are available or if it's a critical task
        if (availableResources.length >= requiredResources.length || task.priority === 'CRITICAL') {
          // Schedule task
          const startDate = new Date(currentDate);
          const duration = task.estimatedHours || 8; // Default 8 hours
          const endDate = new Date(startDate);
          endDate.setHours(endDate.getHours() + duration);
          
          schedule.push({
            taskId: task.id,
            taskName: task.title,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            duration,
            resources: availableResources,
            status: 'SCHEDULED',
            priority: task.priority
          });
          
          scheduledTaskIds.add(task.id);
          
          // Update resource assignments
          availableResources.forEach((req: any) => {
            const resource = resources.find(res => 
              res.type === req.type && 
              res.status === 'AVAILABLE' &&
              (!res.assignedTo || !scheduledTaskIds.has(res.assignedTo.taskId))
            );
            
            if (resource) {
              resource.assignedTo = {
                taskId: task.id,
                taskName: task.title,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString()
              };
              resource.status = 'ASSIGNED';
            }
          });
        }
      }
    }
    
    // Identify unscheduled tasks
    const unscheduledTasks = tasks.filter(task => !scheduledTaskIds.has(task.id));
    
    return {
      schedule,
      unscheduledTasks,
      totalScheduled: schedule.length,
      totalTasks: tasks.length,
      schedulingEfficiency: tasks.length > 0 ? (schedule.length / tasks.length) * 100 : 100,
      resourceUtilization: resources.length > 0 ? 
        (resources.filter(r => r.status === 'ASSIGNED').length / resources.length) * 100 : 0
    };
  },
  
  // Optimize existing schedules
  optimizeSchedule: (currentSchedule: any[], tasks: any[], resources: any[]) => {
    // Sort schedule by priority and start date
    const sortedSchedule = [...currentSchedule].sort((a, b) => {
      // Sort by priority first
      const priorityOrder = { 'CRITICAL': 4, 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1, 'VERY_LOW': 0 };
      const priorityDiff = (priorityOrder[b.priority as keyof typeof priorityOrder] || 0) - 
                          (priorityOrder[a.priority as keyof typeof priorityOrder] || 0);
      
      if (priorityDiff !== 0) return priorityDiff;
      
      // Then sort by start date
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });
    
    // Look for scheduling conflicts
    const conflicts: any[] = [];
    const optimizedSchedule: any[] = [];
    
    for (let i = 0; i < sortedSchedule.length; i++) {
      const currentTask = sortedSchedule[i];
      const currentStart = new Date(currentTask.startDate);
      const currentEnd = new Date(currentTask.endDate);
      
      // Check for resource conflicts with subsequent tasks
      for (let j = i + 1; j < sortedSchedule.length; j++) {
        const nextTask = sortedSchedule[j];
        const nextStart = new Date(nextTask.startDate);
        const nextEnd = new Date(nextTask.endDate);
        
        // Check if tasks overlap
        if (currentStart < nextEnd && nextStart < currentEnd) {
          // Check if they share resources
          const sharedResources = currentTask.resources.filter((res: any) => 
            nextTask.resources.some((nextRes: any) => nextRes.id === res.id)
          );
          
          if (sharedResources.length > 0) {
            conflicts.push({
              taskId1: currentTask.taskId,
              taskName1: currentTask.taskName,
              taskId2: nextTask.taskId,
              taskName2: nextTask.taskName,
              sharedResources,
              conflictStart: Math.max(currentStart.getTime(), nextStart.getTime()),
              conflictEnd: Math.min(currentEnd.getTime(), nextEnd.getTime())
            });
          }
        }
      }
      
      optimizedSchedule.push(currentTask);
    }
    
    // Resolve conflicts by rescheduling lower priority tasks
    const resolvedConflicts: any[] = [];
    const finalSchedule = [...optimizedSchedule];
    
    conflicts.forEach(conflict => {
      // Find the lower priority task
      const task1 = tasks.find(t => t.id === conflict.taskId1);
      const task2 = tasks.find(t => t.id === conflict.taskId2);
      
      if (task1 && task2) {
        const priorityOrder = { 'CRITICAL': 4, 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1, 'VERY_LOW': 0 };
        const task1Priority = priorityOrder[task1.priority as keyof typeof priorityOrder] || 0;
        const task2Priority = priorityOrder[task2.priority as keyof typeof priorityOrder] || 0;
        
        // Reschedule the lower priority task
        if (task1Priority < task2Priority) {
          // Reschedule task1
          const taskIndex = finalSchedule.findIndex(s => s.taskId === conflict.taskId1);
          if (taskIndex !== -1) {
            const newStartDate = new Date(finalSchedule[taskIndex].endDate);
            const duration = finalSchedule[taskIndex].duration;
            const newEndDate = new Date(newStartDate);
            newEndDate.setHours(newEndDate.getHours() + duration);
            
            finalSchedule[taskIndex] = {
              ...finalSchedule[taskIndex],
              startDate: newStartDate.toISOString(),
              endDate: newEndDate.toISOString()
            };
            
            resolvedConflicts.push({
              conflictId: `${conflict.taskId1}-${conflict.taskId2}`,
              resolvedTaskId: conflict.taskId1,
              resolvedTaskName: conflict.taskName1,
              reason: `Rescheduled to avoid resource conflict with ${conflict.taskName2}`,
              newStartDate: newStartDate.toISOString(),
              newEndDate: newEndDate.toISOString()
            });
          }
        } else {
          // Reschedule task2
          const taskIndex = finalSchedule.findIndex(s => s.taskId === conflict.taskId2);
          if (taskIndex !== -1) {
            const newStartDate = new Date(finalSchedule[taskIndex].endDate);
            const duration = finalSchedule[taskIndex].duration;
            const newEndDate = new Date(newStartDate);
            newEndDate.setHours(newEndDate.getHours() + duration);
            
            finalSchedule[taskIndex] = {
              ...finalSchedule[taskIndex],
              startDate: newStartDate.toISOString(),
              endDate: newEndDate.toISOString()
            };
            
            resolvedConflicts.push({
              conflictId: `${conflict.taskId1}-${conflict.taskId2}`,
              resolvedTaskId: conflict.taskId2,
              resolvedTaskName: conflict.taskName2,
              reason: `Rescheduled to avoid resource conflict with ${conflict.taskName1}`,
              newStartDate: newStartDate.toISOString(),
              newEndDate: newEndDate.toISOString()
            });
          }
        }
      }
    });
    
    return {
      originalSchedule: currentSchedule,
      optimizedSchedule: finalSchedule,
      conflicts: conflicts.length,
      resolvedConflicts,
      optimizationScore: conflicts.length > 0 ? 
        ((conflicts.length - resolvedConflicts.length) / conflicts.length) * 100 : 100
    };
  },
  
  // Predict schedule delays
  predictDelays: (schedule: any[], tasks: any[], weatherData: any[], resourceAvailability: any[]) => {
    const predictions: any[] = [];
    
    // Weather-related delays
    const adverseWeatherDays = weatherData.filter(day => 
      day.precipitation > 10 || day.windSpeed > 50 || day.temperature < 0 || day.temperature > 40
    );
    
    if (adverseWeatherDays.length > 0) {
      // Find tasks scheduled during adverse weather
      const affectedTasks = schedule.filter(scheduledTask => {
        const taskStart = new Date(scheduledTask.startDate);
        const taskEnd = new Date(scheduledTask.endDate);
        
        return adverseWeatherDays.some(weatherDay => {
          const weatherDate = new Date(weatherDay.date);
          return weatherDate >= taskStart && weatherDate <= taskEnd;
        });
      });
      
      if (affectedTasks.length > 0) {
        predictions.push({
          id: `weather-delay-${Date.now()}`,
          type: 'WEATHER_DELAY',
          severity: adverseWeatherDays.length > 3 ? 'HIGH' : 'MEDIUM',
          confidence: 85,
          description: `${adverseWeatherDays.length} days of adverse weather may cause delays`,
          recommendation: `Reschedule weather-sensitive tasks or implement protective measures`,
          affectedTasks: affectedTasks.map(t => t.taskId),
          predictedDelay: adverseWeatherDays.length * 0.5, // Half day per adverse weather day
          predictedAt: new Date().toISOString()
        });
      }
    }
    
    // Resource availability delays
    const unavailableResources = resourceAvailability.filter(res => res.status !== 'AVAILABLE');
    
    if (unavailableResources.length > 0) {
      // Find tasks requiring unavailable resources
      const affectedTasks = schedule.filter(scheduledTask => {
        return scheduledTask.resources.some((resource: any) => 
          unavailableResources.some(unavail => unavail.id === resource.id)
        );
      });
      
      if (affectedTasks.length > 0) {
        predictions.push({
          id: `resource-delay-${Date.now()}`,
          type: 'RESOURCE_DELAY',
          severity: unavailableResources.length > 5 ? 'HIGH' : 'MEDIUM',
          confidence: 90,
          description: `${unavailableResources.length} resources unavailable may cause delays`,
          recommendation: `Source alternative resources or reschedule dependent tasks`,
          affectedTasks: affectedTasks.map(t => t.taskId),
          predictedDelay: unavailableResources.length * 0.25, // Quarter day per unavailable resource
          predictedAt: new Date().toISOString()
        });
      }
    }
    
    // Task complexity delays
    tasks.forEach(task => {
      // Check for complex tasks with tight schedules
      if (task.complexity === 'HIGH' && task.estimatedHours < 16) {
        const scheduledTask = schedule.find(s => s.taskId === task.id);
        if (scheduledTask) {
          predictions.push({
            id: `complexity-delay-${task.id}-${Date.now()}`,
            type: 'COMPLEXITY_DELAY',
            severity: 'MEDIUM',
            confidence: 75,
            description: `Complex task "${task.title}" may require more time than estimated`,
            recommendation: `Review task estimation and consider extending schedule`,
            affectedTasks: [task.id],
            predictedDelay: 2, // 2 hours additional
            predictedAt: new Date().toISOString()
          });
        }
      }
      
      // Check for tasks with many dependencies
      if (task.dependencies && task.dependencies.length > 5) {
        const scheduledTask = schedule.find(s => s.taskId === task.id);
        if (scheduledTask) {
          predictions.push({
            id: `dependency-delay-${task.id}-${Date.now()}`,
            type: 'DEPENDENCY_DELAY',
            severity: task.dependencies.length > 10 ? 'HIGH' : 'MEDIUM',
            confidence: 80,
            description: `Task "${task.title}" has ${task.dependencies.length} dependencies which may cause delays`,
            recommendation: `Review dependency chain and identify potential bottlenecks`,
            affectedTasks: [task.id],
            predictedDelay: task.dependencies.length * 0.1, // 0.1 hours per dependency
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
  
  // Generate schedule report
  generateScheduleReport: (schedule: any[], tasks: any[], resources: any[]) => {
    // Calculate schedule metrics
    const totalTasks = tasks.length;
    const scheduledTasks = schedule.length;
    const unscheduledTasks = totalTasks - scheduledTasks;
    
    // Calculate schedule duration
    const scheduleStart = schedule.length > 0 
      ? new Date(Math.min(...schedule.map(s => new Date(s.startDate).getTime()))) 
      : new Date();
    const scheduleEnd = schedule.length > 0 
      ? new Date(Math.max(...schedule.map(s => new Date(s.endDate).getTime()))) 
      : new Date();
    const scheduleDuration = Math.ceil(
      (scheduleEnd.getTime() - scheduleStart.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    // Calculate resource utilization
    const totalResources = resources.length;
    const assignedResources = resources.filter(r => r.status === 'ASSIGNED').length;
    const resourceUtilization = totalResources > 0 ? (assignedResources / totalResources) * 100 : 0;
    
    // Calculate critical path tasks
    const criticalPathTasks = schedule.filter(s => s.priority === 'CRITICAL').length;
    const highPriorityTasks = schedule.filter(s => s.priority === 'HIGH').length;
    
    return {
      summary: {
        totalTasks,
        scheduledTasks,
        unscheduledTasks,
        scheduleEfficiency: totalTasks > 0 ? (scheduledTasks / totalTasks) * 100 : 100,
        scheduleStart: scheduleStart.toISOString(),
        scheduleEnd: scheduleEnd.toISOString(),
        scheduleDuration,
        totalResources,
        assignedResources,
        resourceUtilization: Math.round(resourceUtilization),
        criticalPathTasks,
        highPriorityTasks
      },
      schedule: schedule.sort((a, b) => 
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      ),
      unscheduled: tasks.filter(task => 
        !schedule.some(scheduled => scheduled.taskId === task.id)
      ),
      resourceAllocation: resources.filter(r => r.status === 'ASSIGNED'),
      generatedAt: new Date().toISOString()
    };
  }
};

export default PROJECT_SCHEDULING_RULES;
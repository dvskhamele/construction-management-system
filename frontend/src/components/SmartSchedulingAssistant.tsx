'use client'

import React, { useState, useEffect } from 'react'

interface CrewMember {
  id: number
  name: string
  role: string
  skills: string[]
  availability: 'available' | 'busy' | 'on_leave' | 'training'
  currentTasks: number
  maxTasks: number
}

interface Equipment {
  id: number
  name: string
  type: string
  status: 'available' | 'in_use' | 'maintenance' | 'out_of_service'
  location: string
}

interface Task {
  id: number
  title: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'pending' | 'assigned' | 'in_progress' | 'completed'
  requiredSkills: string[]
  requiredEquipment: string[]
  estimatedHours: number
  assignedTo?: number // Crew member ID
  assignedEquipment?: number[] // Equipment IDs
}

interface Project {
  id: number
  name: string
  status: 'planning' | 'active' | 'on_hold' | 'completed'
  deadline: string
  tasks: number[]
}

const SmartSchedulingAssistant: React.FC = () => {
  const [crews, setCrews] = useState<CrewMember[]>([])
  const [equipments, setEquipments] = useState<Equipment[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [conflicts, setConflicts] = useState<string[]>([])
  const [recommendations, setRecommendations] = useState<string[]>([])

  // Initialize with mock data for a mid-size construction company
  useEffect(() => {
    // Mock crew data for 20-50 employee construction company
    const mockCrews: CrewMember[] = [
      { id: 1, name: 'Rajesh Kumar', role: 'Project Manager', skills: ['planning', 'supervision'], availability: 'available', currentTasks: 3, maxTasks: 5 },
      { id: 2, name: 'Amit Sharma', role: 'Site Supervisor', skills: ['supervision', 'safety'], availability: 'available', currentTasks: 2, maxTasks: 4 },
      { id: 3, name: 'Suresh Patel', role: 'Electrician', skills: ['electrical', 'wiring'], availability: 'available', currentTasks: 4, maxTasks: 6 },
      { id: 4, name: 'Vikash Singh', role: 'Plumber', skills: ['plumbing', 'pipes'], availability: 'busy', currentTasks: 5, maxTasks: 5 },
      { id: 5, name: 'Deepak Yadav', role: 'Carpenter', skills: ['woodwork', 'framing'], availability: 'available', currentTasks: 2, maxTasks: 6 },
      { id: 6, name: 'Manoj Gupta', role: 'Mason', skills: ['bricklaying', 'stonework'], availability: 'available', currentTasks: 3, maxTasks: 5 },
      { id: 7, name: 'Anil Reddy', role: 'Painter', skills: ['painting', 'finishing'], availability: 'on_leave', currentTasks: 0, maxTasks: 4 },
      { id: 8, name: 'Sandeep Nair', role: 'Heavy Equipment Operator', skills: ['excavation', 'cranes'], availability: 'available', currentTasks: 1, maxTasks: 3 },
      { id: 9, name: 'Rahul Mehta', role: 'Safety Officer', skills: ['safety', 'compliance'], availability: 'available', currentTasks: 2, maxTasks: 4 },
      { id: 10, name: 'Vijay Desai', role: 'Foreman', skills: ['supervision', 'coordination'], availability: 'available', currentTasks: 3, maxTasks: 5 },
      { id: 11, name: 'Arjun Bose', role: 'Welder', skills: ['welding', 'metalwork'], availability: 'available', currentTasks: 2, maxTasks: 4 },
      { id: 12, name: 'Prakash Iyer', role: 'HVAC Technician', skills: ['hvac', 'ventilation'], availability: 'available', currentTasks: 1, maxTasks: 3 },
      { id: 13, name: 'Kiran Pillai', role: 'Concrete Specialist', skills: ['concrete', 'foundations'], availability: 'busy', currentTasks: 4, maxTasks: 4 },
      { id: 14, name: 'Mohan Rao', role: 'Surveyor', skills: ['surveying', 'measurement'], availability: 'available', currentTasks: 2, maxTasks: 3 },
      { id: 15, name: 'Naveen Kumar', role: 'Roofing Specialist', skills: ['roofing', 'waterproofing'], availability: 'available', currentTasks: 3, maxTasks: 4 },
      { id: 16, name: 'Sunil Verma', role: 'Landscaper', skills: ['landscaping', 'planting'], availability: 'available', currentTasks: 1, maxTasks: 3 },
      { id: 17, name: 'Ajay Malhotra', role: 'Insulation Specialist', skills: ['insulation', 'soundproofing'], availability: 'available', currentTasks: 2, maxTasks: 4 },
      { id: 18, name: 'Vishal Chopra', role: 'Tile Setter', skills: ['tiling', 'flooring'], availability: 'available', currentTasks: 3, maxTasks: 5 },
      { id: 19, name: 'Rakesh Jain', role: 'Glazier', skills: ['glass', 'windows'], availability: 'available', currentTasks: 2, maxTasks: 4 },
      { id: 20, name: 'Dinesh Khanna', role: 'General Laborer', skills: ['general', 'assistance'], availability: 'available', currentTasks: 4, maxTasks: 6 }
    ]

    // Mock equipment data
    const mockEquipments: Equipment[] = [
      { id: 1, name: 'Excavator CAT 320', type: 'heavy_machinery', status: 'available', location: 'Site A' },
      { id: 2, name: 'Bulldozer Komatsu D65', type: 'heavy_machinery', status: 'in_use', location: 'Site B' },
      { id: 3, name: 'Crane Liebherr LTM 1120', type: 'heavy_machinery', status: 'maintenance', location: 'Workshop' },
      { id: 4, name: 'Concrete Mixer JS500', type: 'tools', status: 'available', location: 'Site A' },
      { id: 5, name: 'Generator Cummins 200kW', type: 'tools', status: 'available', location: 'Site C' },
      { id: 6, name: 'Welding Machine Lincoln 500', type: 'tools', status: 'in_use', location: 'Site B' },
      { id: 7, name: 'Scaffolding System', type: 'materials', status: 'available', location: 'Warehouse' },
      { id: 8, name: 'Forklift Toyota 3000lb', type: 'heavy_machinery', status: 'available', location: 'Site A' }
    ]

    // Mock tasks data
    const mockTasks: Task[] = [
      { id: 1, title: 'Foundation Excavation', description: 'Excavate foundation for new office building', priority: 'high', status: 'pending', requiredSkills: ['excavation'], requiredEquipment: ['heavy_machinery'], estimatedHours: 40, assignedTo: undefined, assignedEquipment: [] },
      { id: 2, title: 'Electrical Rough-In', description: 'Install electrical conduits and wiring', priority: 'medium', status: 'pending', requiredSkills: ['electrical'], requiredEquipment: ['tools'], estimatedHours: 60, assignedTo: undefined, assignedEquipment: [] },
      { id: 3, title: 'Plumbing Installation', description: 'Install plumbing pipes and fixtures', priority: 'medium', status: 'pending', requiredSkills: ['plumbing'], requiredEquipment: ['tools'], estimatedHours: 50, assignedTo: undefined, assignedEquipment: [] },
      { id: 4, title: 'Framing Construction', description: 'Construct wooden frame structure', priority: 'high', status: 'pending', requiredSkills: ['framing'], requiredEquipment: [], estimatedHours: 80, assignedTo: undefined, assignedEquipment: [] },
      { id: 5, title: 'HVAC Ductwork', description: 'Install heating and cooling ductwork', priority: 'medium', status: 'pending', requiredSkills: ['hvac'], requiredEquipment: [], estimatedHours: 45, assignedTo: undefined, assignedEquipment: [] },
      { id: 6, title: 'Concrete Pouring', description: 'Pour concrete for foundation', priority: 'critical', status: 'pending', requiredSkills: ['concrete'], requiredEquipment: ['tools'], estimatedHours: 20, assignedTo: undefined, assignedEquipment: [] },
      { id: 7, title: 'Roof Installation', description: 'Install roofing materials', priority: 'high', status: 'pending', requiredSkills: ['roofing'], requiredEquipment: [], estimatedHours: 35, assignedTo: undefined, assignedEquipment: [] },
      { id: 8, title: 'Painting Interior', description: 'Paint interior walls and ceilings', priority: 'low', status: 'pending', requiredSkills: ['painting'], requiredEquipment: ['tools'], estimatedHours: 40, assignedTo: undefined, assignedEquipment: [] }
    ]

    // Mock projects data
    const mockProjects: Project[] = [
      { id: 1, name: 'Downtown Office Complex', status: 'active', deadline: '2025-12-31', tasks: [1, 2, 3, 4, 5, 6, 7, 8] },
      { id: 2, name: 'Residential Apartment Block', status: 'active', deadline: '2026-03-31', tasks: [2, 3, 4, 8] },
      { id: 3, name: 'Industrial Warehouse', status: 'planning', deadline: '2026-06-30', tasks: [1, 6, 7] },
      { id: 4, name: 'Retail Center Renovation', status: 'on_hold', deadline: '2025-11-30', tasks: [5, 8] }
    ]

    setCrews(mockCrews)
    setEquipments(mockEquipments)
    setTasks(mockTasks)
    setProjects(mockProjects)
  }, [])

  // Detect scheduling conflicts
  useEffect(() => {
    const detectedConflicts: string[] = []
    const generatedRecommendations: string[] = []

    // Check for crew overallocation
    crews.forEach(crew => {
      if (crew.currentTasks >= crew.maxTasks) {
        detectedConflicts.push(`${crew.name} is fully allocated (${crew.currentTasks}/${crew.maxTasks} tasks)`)
      } else if (crew.currentTasks > crew.maxTasks * 0.8) {
        generatedRecommendations.push(`Consider reducing workload for ${crew.name} to prevent burnout`)
      }
    })

    // Check for unavailable crew assignments
    tasks.forEach(task => {
      if (task.assignedTo) {
        const crew = crews.find(c => c.id === task.assignedTo)
        if (crew && crew.availability !== 'available') {
          detectedConflicts.push(`Task "${task.title}" assigned to ${crew.name} who is ${crew.availability}`)
        }
      }
    })

    // Check for equipment conflicts
    equipments.forEach(equip => {
      if (equip.status !== 'available') {
        const assignedTasks = tasks.filter(t => 
          t.assignedEquipment && t.assignedEquipment.includes(equip.id)
        )
        if (assignedTasks.length > 0) {
          detectedConflicts.push(`${equip.name} is ${equip.status} but assigned to ${assignedTasks.length} tasks`)
        }
      }
    })

    // Generate recommendations for optimal scheduling
    projects.forEach(project => {
      if (project.status === 'active') {
        const projectTasks = tasks.filter(t => project.tasks.includes(t.id) && t.status === 'pending')
        if (projectTasks.length > 0) {
          const criticalTasks = projectTasks.filter(t => t.priority === 'critical' || t.priority === 'high')
          if (criticalTasks.length > 0) {
            generatedRecommendations.push(`Prioritize ${criticalTasks.length} critical/high priority tasks for project "${project.name}"`)
          }
        }
      }
    })

    setConflicts(detectedConflicts)
    setRecommendations(generatedRecommendations)
  }, [crews, equipments, tasks, projects])

  // Assign task to crew member
  const assignTaskToCrew = (taskId: number, crewId: number) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, assignedTo: crewId, status: 'assigned' } 
          : task
      )
    )

    setCrews(prevCrews => 
      prevCrews.map(crew => 
        crew.id === crewId 
          ? { ...crew, currentTasks: crew.currentTasks + 1 } 
          : crew
      )
    )
  }

  // Assign equipment to task
  const assignEquipmentToTask = (taskId: number, equipmentId: number) => {
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId) {
          const newEquipment = task.assignedEquipment 
            ? [...task.assignedEquipment, equipmentId] 
            : [equipmentId]
          return { ...task, assignedEquipment: newEquipment }
        }
        return task
      })
    )
  }

  // Get available crew members for a task based on required skills
  const getAvailableCrewForTask = (task: Task) => {
    return crews.filter(crew => 
      crew.availability === 'available' && 
      crew.currentTasks < crew.maxTasks &&
      task.requiredSkills.some(skill => crew.skills.includes(skill))
    )
  }

  // Get available equipment for a task
  const getAvailableEquipmentForTask = (task: Task) => {
    return equipments.filter(equip => 
      equip.status === 'available' && 
      task.requiredEquipment.includes(equip.type)
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Smart Scheduling Assistant</h2>
        <p className="text-slate-600">
          Manual resource planning with conflict detection and optimization suggestions
        </p>
      </div>

      {/* Project Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Select Project
        </label>
        <select 
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={selectedProject || ''}
          onChange={(e) => setSelectedProject(e.target.value ? Number(e.target.value) : null)}
        >
          <option value="">All Projects</option>
          {projects.map(project => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      {/* Conflict Detection */}
      {conflicts.length > 0 && (
        <div className="mb-6 bg-rose-50 border border-rose-200 rounded-lg p-4">
          <h3 className="font-semibold text-rose-800 mb-2">Scheduling Conflicts Detected</h3>
          <ul className="list-disc pl-5 space-y-1">
            {conflicts.map((conflict, index) => (
              <li key={index} className="text-rose-700 text-sm">{conflict}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="mb-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h3 className="font-semibold text-amber-800 mb-2">Optimization Recommendations</h3>
          <ul className="list-disc pl-5 space-y-1">
            {recommendations.map((rec, index) => (
              <li key={index} className="text-amber-700 text-sm">{rec}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Task Assignment */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Pending Tasks</h3>
        <div className="space-y-4">
          {tasks
            .filter(task => task.status === 'pending')
            .filter(task => !selectedProject || projects.find(p => p.id === selectedProject)?.tasks.includes(task.id))
            .map(task => {
              const availableCrew = getAvailableCrewForTask(task)
              const availableEquipment = getAvailableEquipmentForTask(task)
              
              return (
                <div key={task.id} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium text-slate-800">{task.title}</h4>
                      <p className="text-sm text-slate-600 mt-1">{task.description}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.priority === 'critical' ? 'bg-rose-100 text-rose-800' :
                      task.priority === 'high' ? 'bg-amber-100 text-amber-800' :
                      task.priority === 'medium' ? 'bg-blue-100 text-blue-800' :
                      'bg-slate-100 text-slate-800'
                    }`}>
                      {task.priority.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Assign Crew Member
                      </label>
                      <select 
                        className="w-full px-2 py-1 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                        onChange={(e) => assignTaskToCrew(task.id, Number(e.target.value))}
                        disabled={availableCrew.length === 0}
                      >
                        <option value="">Select crew member</option>
                        {availableCrew.map(crew => (
                          <option key={crew.id} value={crew.id}>
                            {crew.name} ({crew.role}) - {crew.currentTasks}/{crew.maxTasks} tasks
                          </option>
                        ))}
                      </select>
                      {availableCrew.length === 0 && (
                        <p className="text-xs text-rose-600 mt-1">
                          No available crew members with required skills
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Assign Equipment
                      </label>
                      <select 
                        className="w-full px-2 py-1 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                        onChange={(e) => assignEquipmentToTask(task.id, Number(e.target.value))}
                        disabled={availableEquipment.length === 0}
                      >
                        <option value="">Select equipment</option>
                        {availableEquipment.map(equip => (
                          <option key={equip.id} value={equip.id}>
                            {equip.name} ({equip.location})
                          </option>
                        ))}
                      </select>
                      {availableEquipment.length === 0 && (
                        <p className="text-xs text-rose-600 mt-1">
                          No available equipment of required type
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-sm text-slate-600">
                    <span>Est. {task.estimatedHours} hours</span>
                    {task.requiredSkills.length > 0 && (
                      <span className="ml-3">Skills: {task.requiredSkills.join(', ')}</span>
                    )}
                  </div>
                </div>
              )
            })}
        </div>
      </div>

      {/* Resource Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-slate-200 rounded-lg p-4">
          <h3 className="font-semibold text-slate-800 mb-3">Crew Availability</h3>
          <div className="space-y-2">
            {crews
              .filter(crew => crew.availability === 'available')
              .slice(0, 5)
              .map(crew => (
                <div key={crew.id} className="flex justify-between items-center">
                  <span className="text-sm text-slate-700">{crew.name}</span>
                  <span className="text-xs px-2 py-1 bg-slate-100 rounded-full">
                    {crew.currentTasks}/{crew.maxTasks} tasks
                  </span>
                </div>
              ))}
            {crews.filter(crew => crew.availability === 'available').length === 0 && (
              <p className="text-sm text-slate-500">No crew members currently available</p>
            )}
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-4">
          <h3 className="font-semibold text-slate-800 mb-3">Equipment Status</h3>
          <div className="space-y-2">
            {equipments
              .filter(equip => equip.status === 'available')
              .slice(0, 5)
              .map(equip => (
                <div key={equip.id} className="flex justify-between items-center">
                  <span className="text-sm text-slate-700">{equip.name}</span>
                  <span className="text-xs px-2 py-1 bg-slate-100 rounded-full">
                    {equip.location}
                  </span>
                </div>
              ))}
            {equipments.filter(equip => equip.status === 'available').length === 0 && (
              <p className="text-sm text-slate-500">No equipment currently available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SmartSchedulingAssistant
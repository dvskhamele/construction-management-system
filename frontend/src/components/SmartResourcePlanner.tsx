'use client'

import React, { useState, useEffect } from 'react'

interface ConstructionResource {
  id: number
  name: string
  type: 'material' | 'equipment' | 'labor' | 'tool'
  category: string
  unit: string
  quantity: number
  allocated: number
  unitCost: number
  supplier?: string
  leadTime?: number // in days
}

interface ConstructionProject {
  id: number
  name: string
  status: 'planning' | 'active' | 'on_hold' | 'completed'
  startDate: string
  endDate: string
  budget: number
  spent: number
}

interface ResourceAllocation {
  id: number
  resourceId: number
  projectId: number
  quantity: number
  startDate: string
  endDate: string
  status: 'allocated' | 'in_use' | 'returned' | 'completed'
}

const SmartResourcePlanner: React.FC = () => {
  const [resources, setResources] = useState<ConstructionResource[]>([])
  const [projects, setProjects] = useState<ConstructionProject[]>([])
  const [allocations, setAllocations] = useState<ResourceAllocation[]>([])
  const [selectedResource, setSelectedResource] = useState<number | null>(null)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [allocationQuantity, setAllocationQuantity] = useState<number>(1)
  const [allocationStartDate, setAllocationStartDate] = useState<string>('')
  const [allocationEndDate, setAllocationEndDate] = useState<string>('')
  const [warnings, setWarnings] = useState<string[]>([])
  const [recommendations, setRecommendations] = useState<string[]>([])

  // Initialize with mock data for a mid-size construction company
  useEffect(() => {
    // Mock resources data for a mid-size construction company (20-50 employees)
    const mockResources: ConstructionResource[] = [
      // Materials from small suppliers like Infra Mart
      { id: 1, name: 'River Sand', type: 'material', category: 'Aggregates', unit: 'tons', quantity: 25, allocated: 20, unitCost: 2500, supplier: 'Infra Mart', leadTime: 2 },
      { id: 2, name: 'Crushed Stone 20mm', type: 'material', category: 'Aggregates', unit: 'tons', quantity: 45, allocated: 30, unitCost: 1800, supplier: 'Infra Mart', leadTime: 2 },
      { id: 3, name: 'Crushed Stone 10mm', type: 'material', category: 'Aggregates', unit: 'tons', quantity: 30, allocated: 25, unitCost: 2200, supplier: 'Infra Mart', leadTime: 2 },
      { id: 4, name: 'Portland Cement 50kg', type: 'material', category: 'Concrete', unit: 'bags', quantity: 150, allocated: 125, unitCost: 350, supplier: 'BuildPro Materials', leadTime: 3 },
      { id: 5, name: 'Ready Mix Concrete M20', type: 'material', category: 'Concrete', unit: 'cubic meters', quantity: 12, allocated: 8, unitCost: 4200, supplier: 'BuildPro Materials', leadTime: 3 },
      { id: 6, name: 'Standard Clay Bricks', type: 'material', category: 'Masonry', unit: 'pieces', quantity: 8000, allocated: 6000, unitCost: 8, supplier: 'Local Brick Suppliers', leadTime: 1 },
      { id: 7, name: 'Fly Ash Bricks', type: 'material', category: 'Masonry', unit: 'pieces', quantity: 5000, allocated: 3500, unitCost: 6, supplier: 'Local Brick Suppliers', leadTime: 1 },
      { id: 8, name: 'Exterior Paint White', type: 'material', category: 'Finishing', unit: 'liters', quantity: 30, allocated: 25, unitCost: 450, supplier: 'BuildPro Materials', leadTime: 3 },
      
      // Equipment for small to mid-size construction companies
      { id: 9, name: 'Excavator CAT 320', type: 'equipment', category: 'Earthmoving', unit: 'units', quantity: 2, allocated: 1, unitCost: 25000, supplier: 'JCB India Ltd.', leadTime: 5 },
      { id: 10, name: 'Bulldozer Komatsu D65', type: 'equipment', category: 'Earthmoving', unit: 'units', quantity: 1, allocated: 1, unitCost: 35000, supplier: 'Komatsu India', leadTime: 7 },
      { id: 11, name: 'Concrete Mixer JS500', type: 'equipment', category: 'Mixing', unit: 'units', quantity: 3, allocated: 2, unitCost: 8000, supplier: 'Bharat Mixers', leadTime: 3 },
      { id: 12, name: 'Generator Cummins 200kW', type: 'equipment', category: 'Power', unit: 'units', quantity: 2, allocated: 1, unitCost: 18000, supplier: 'Cummins India', leadTime: 4 },
      { id: 13, name: 'Scaffolding System', type: 'equipment', category: 'Safety', unit: 'sets', quantity: 10, allocated: 6, unitCost: 12000, supplier: 'Safeway Scaffolding', leadTime: 2 },
      { id: 14, name: 'Tower Crane 40T', type: 'equipment', category: 'Lifting', unit: 'units', quantity: 1, allocated: 0, unitCost: 150000, supplier: 'Zoomlion', leadTime: 10 },
      
      // Labor for 20-50 employee construction companies
      { id: 15, name: 'Project Managers', type: 'labor', category: 'Management', unit: 'persons', quantity: 5, allocated: 3, unitCost: 1200, supplier: 'In-house', leadTime: 1 },
      { id: 16, name: 'Site Supervisors', type: 'labor', category: 'Operations', unit: 'persons', quantity: 8, allocated: 6, unitCost: 1000, supplier: 'In-house', leadTime: 1 },
      { id: 17, name: 'Skilled Masons', type: 'labor', category: 'Masonry', unit: 'persons', quantity: 15, allocated: 12, unitCost: 800, supplier: 'Local Mason Union', leadTime: 1 },
      { id: 18, name: 'Electricians', type: 'labor', category: 'Electrical', unit: 'persons', quantity: 12, allocated: 8, unitCost: 900, supplier: 'Electrical Workers Union', leadTime: 2 },
      { id: 19, name: 'Plumbers', type: 'labor', category: 'Plumbing', unit: 'persons', quantity: 10, allocated: 7, unitCost: 850, supplier: 'Plumbing Technicians Guild', leadTime: 1 },
      { id: 20, name: 'Carpenters', type: 'labor', category: 'Woodwork', unit: 'persons', quantity: 12, allocated: 9, unitCost: 750, supplier: 'Carpentry Association', leadTime: 1 },
      { id: 21, name: 'HVAC Technicians', type: 'labor', category: 'HVAC', unit: 'persons', quantity: 8, allocated: 5, unitCost: 950, supplier: 'HVAC Professionals Group', leadTime: 2 },
      { id: 22, name: 'Painters', type: 'labor', category: 'Finishing', unit: 'persons', quantity: 18, allocated: 15, unitCost: 700, supplier: 'Painting Professionals Group', leadTime: 1 },
      { id: 23, name: 'General Laborers', type: 'labor', category: 'General', unit: 'persons', quantity: 25, allocated: 20, unitCost: 600, supplier: 'Local Labor Union', leadTime: 1 },
      { id: 24, name: 'Safety Officers', type: 'labor', category: 'Safety', unit: 'persons', quantity: 3, allocated: 2, unitCost: 1100, supplier: 'In-house', leadTime: 1 },
      
      // Tools for construction sites
      { id: 25, name: 'Power Drills', type: 'tool', category: 'Hand Tools', unit: 'units', quantity: 25, allocated: 18, unitCost: 3500, supplier: 'Bosch India', leadTime: 3 },
      { id: 26, name: 'Safety Helmets', type: 'tool', category: 'Safety Gear', unit: 'units', quantity: 50, allocated: 40, unitCost: 250, supplier: '3M Safety', leadTime: 2 },
      { id: 27, name: 'Measuring Tapes', type: 'tool', category: 'Measuring Tools', unit: 'units', quantity: 40, allocated: 32, unitCost: 450, supplier: 'Stanley Tools', leadTime: 1 },
      { id: 28, name: 'Level Instruments', type: 'tool', category: 'Surveying Tools', unit: 'units', quantity: 8, allocated: 6, unitCost: 12000, supplier: 'Leica Geosystems', leadTime: 5 },
      { id: 29, name: 'Welding Machines', type: 'tool', category: 'Fabrication Tools', unit: 'units', quantity: 6, allocated: 4, unitCost: 25000, supplier: 'Lincoln Electric', leadTime: 4 }
    ]

    // Mock projects data for construction company
    const mockProjects: ConstructionProject[] = [
      { id: 1, name: 'Downtown Office Complex', status: 'active', startDate: '2025-09-01', endDate: '2026-03-31', budget: 25000000, spent: 12000000 },
      { id: 2, name: 'Residential Apartment Block', status: 'active', startDate: '2025-10-15', endDate: '2026-08-31', budget: 18000000, spent: 8500000 },
      { id: 3, name: 'Industrial Warehouse', status: 'planning', startDate: '2026-01-01', endDate: '2026-12-31', budget: 32000000, spent: 0 },
      { id: 4, name: 'Retail Center Renovation', status: 'on_hold', startDate: '2025-08-01', endDate: '2026-02-28', budget: 15000000, spent: 3200000 },
      { id: 5, name: 'Mixed-Use Development', status: 'active', startDate: '2025-11-01', endDate: '2027-05-31', budget: 45000000, spent: 18500000 }
    ]

    // Mock allocations data for construction projects
    const mockAllocations: ResourceAllocation[] = [
      { id: 1, resourceId: 1, projectId: 1, quantity: 15, startDate: '2025-09-05', endDate: '2025-10-15', status: 'in_use' },
      { id: 2, resourceId: 2, projectId: 1, quantity: 20, startDate: '2025-09-10', endDate: '2025-11-20', status: 'in_use' },
      { id: 3, resourceId: 9, projectId: 2, quantity: 1, startDate: '2025-10-20', endDate: '2025-12-31', status: 'in_use' },
      { id: 4, resourceId: 15, projectId: 1, quantity: 8, startDate: '2025-09-01', endDate: '2026-03-31', status: 'in_use' },
      { id: 5, resourceId: 16, projectId: 2, quantity: 5, startDate: '2025-10-15', endDate: '2026-08-31', status: 'in_use' },
      { id: 6, resourceId: 25, projectId: 1, quantity: 10, startDate: '2025-09-05', endDate: '2025-10-31', status: 'in_use' },
      { id: 7, resourceId: 26, projectId: 2, quantity: 20, startDate: '2025-10-20', endDate: '2025-12-15', status: 'in_use' },
      { id: 8, resourceId: 13, projectId: 5, quantity: 4, startDate: '2025-11-05', endDate: '2026-02-28', status: 'in_use' }
    ]

    setResources(mockResources)
    setProjects(mockProjects)
    setAllocations(mockAllocations)
  }, [])

  // Detect resource conflicts and generate recommendations for construction management
  useEffect(() => {
    const detectedWarnings: string[] = []
    const generatedRecommendations: string[] = []

    // Check for over-allocation in construction resources
    resources.forEach(resource => {
      if (resource.allocated > resource.quantity) {
        detectedWarnings.push(`Resource over-allocated: ${resource.name} (${resource.allocated}/${resource.quantity} ${resource.unit})`)
      } else if (resource.allocated > resource.quantity * 0.8) {
        generatedRecommendations.push(`Approaching capacity: Consider ordering more ${resource.name} to prevent shortages`)
      }
    })

    // Check for critical construction materials running low
    resources.forEach(resource => {
      if (resource.type === 'material' && (resource.quantity - resource.allocated) < resource.quantity * 0.2) {
        detectedWarnings.push(`Critical material shortage: ${resource.name} (${resource.quantity - resource.allocated} ${resource.unit} remaining)`)
      }
    })

    // Check for equipment maintenance needs in construction
    resources.forEach(resource => {
      if (resource.type === 'equipment' && resource.allocated > 0 && resource.allocated === resource.quantity) {
        generatedRecommendations.push(`Schedule maintenance for ${resource.name} after current project completion`)
      }
    })

    // Check for labor shortages in construction projects
    resources.forEach(resource => {
      if (resource.type === 'labor' && (resource.quantity - resource.allocated) < resource.quantity * 0.3) {
        detectedWarnings.push(`Labor shortage: ${resource.name} (${resource.quantity - resource.allocated} persons available)`)
      }
    })

    // Check for project budget constraints in construction
    projects.forEach(project => {
      if (project.spent > project.budget * 0.9) {
        detectedWarnings.push(`Budget alert: Project "${project.name}" approaching budget limit (${Math.round((project.spent/project.budget)*100)}% spent)`)
      }
    })

    // Check for supplier reliability issues
    const suppliers = Array.from(new Set(resources.map(r => r.supplier).filter(Boolean))) as string[]
    suppliers.forEach(supplier => {
      const supplierResources = resources.filter(r => r.supplier === supplier)
      const avgLeadTime = supplierResources.reduce((sum, r) => sum + (r.leadTime || 0), 0) / supplierResources.length
      if (avgLeadTime > 7) { // High lead time indicates potential unreliability
        generatedRecommendations.push(`Evaluate supplier reliability: ${supplier} has high average lead time (${Math.round(avgLeadTime)} days)`)
      }
    })

    // Check for potential material quality issues
    resources.forEach(resource => {
      if (resource.type === 'material' && resource.unitCost < 50 && resource.category !== 'Safety Gear') {
        generatedRecommendations.push(`Verify material quality: Low-cost ${resource.name} may affect construction standards`)
      }
    })

    setWarnings(detectedWarnings)
    setRecommendations(generatedRecommendations)
  }, [resources, projects, allocations])

  // Handle resource allocation
  const handleAllocateResource = () => {
    if (!selectedResource || !selectedProject || !allocationStartDate || !allocationEndDate) {
      alert('Please fill all allocation fields')
      return
    }

    const resource = resources.find(r => r.id === selectedResource)
    const project = projects.find(p => p.id === selectedProject)
    
    if (!resource || !project) {
      alert('Invalid resource or project selection')
      return
    }

    // Check if sufficient quantity is available
    if (allocationQuantity > (resource.quantity - resource.allocated)) {
      alert(`Insufficient ${resource.name} available. Only ${(resource.quantity - resource.allocated)} units available.`)
      return
    }

    // Create new allocation
    const newAllocation: ResourceAllocation = {
      id: allocations.length + 1,
      resourceId: selectedResource!,
      projectId: selectedProject!,
      quantity: allocationQuantity,
      startDate: allocationStartDate,
      endDate: allocationEndDate,
      status: 'allocated'
    }

    // Update allocations
    setAllocations([...allocations, newAllocation])

    // Update resource allocation count
    setResources(resources.map(res => 
      res.id === selectedResource 
        ? { ...res, allocated: res.allocated + allocationQuantity } 
        : res
    ))

    // Reset form
    setSelectedResource(null)
    setSelectedProject(null)
    setAllocationQuantity(1)
    setAllocationStartDate('')
    setAllocationEndDate('')
  }

  // Handle resource deallocation
  const handleDeallocateResource = (allocationId: number) => {
    const allocation = allocations.find(a => a.id === allocationId)
    if (!allocation) return

    // Update allocations
    setAllocations(allocations.filter(a => a.id !== allocationId))

    // Update resource allocation count
    setResources(resources.map(res => 
      res.id === allocation.resourceId 
        ? { ...res, allocated: Math.max(0, res.allocated - allocation.quantity) } 
        : res
    ))
  }

  // Get available quantity for a resource
  const getAvailableQuantity = (resourceId: number) => {
    const resource = resources.find(r => r.id === resourceId)
    return resource ? resource.quantity - resource.allocated : 0
  }

  // Get current allocations for a resource
  const getResourceAllocations = (resourceId: number) => {
    return allocations.filter(a => a.resourceId === resourceId)
  }

  // Get current allocations for a project
  const getProjectAllocations = (projectId: number) => {
    return allocations.filter(a => a.projectId === projectId)
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Smart Resource Planner</h2>
        <p className="text-slate-600">
          Manual resource planning with conflict detection and optimization suggestions for 20-50 employee construction companies
        </p>
      </div>

      {/* Warnings and Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Warnings */}
        {warnings.length > 0 && (
          <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
            <h3 className="font-semibold text-rose-800 mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Resource Warnings
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              {warnings.map((warning, index) => (
                <li key={index} className="text-rose-700 text-sm">{warning}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h3 className="font-semibold text-amber-800 mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Optimization Recommendations
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              {recommendations.map((rec, index) => (
                <li key={index} className="text-amber-700 text-sm">{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Resource Allocation Form */}
      <div className="mb-8 bg-slate-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Allocate Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Resource</label>
            <select 
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={selectedResource || ''}
              onChange={(e) => setSelectedResource(Number(e.target.value))}
            >
              <option value="">Select resource</option>
              {resources.map(resource => (
                <option key={resource.id} value={resource.id}>
                  {resource.name} ({getAvailableQuantity(resource.id)} {resource.unit} available)
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Project</label>
            <select 
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={selectedProject || ''}
              onChange={(e) => setSelectedProject(Number(e.target.value))}
            >
              <option value="">Select project</option>
              {projects
                .filter(project => project.status === 'active' || project.status === 'planning')
                .map(project => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Quantity</label>
            <input
              type="number"
              min="1"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={allocationQuantity}
              onChange={(e) => setAllocationQuantity(Number(e.target.value))}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={allocationStartDate}
              onChange={(e) => setAllocationStartDate(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={allocationEndDate}
              onChange={(e) => setAllocationEndDate(e.target.value)}
            />
          </div>
        </div>
        
        <div className="mt-4">
          <button
            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300"
            onClick={handleAllocateResource}
          >
            Allocate Resource
          </button>
        </div>
      </div>

      {/* Resource Overview */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Resource Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { type: 'material', label: 'Materials', icon: '🧱', color: 'bg-amber-100 text-amber-800' },
            { type: 'equipment', label: 'Equipment', icon: '🛠️', color: 'bg-blue-100 text-blue-800' },
            { type: 'labor', label: 'Labor', icon: '👷', color: 'bg-emerald-100 text-emerald-800' },
            { type: 'tool', label: 'Tools', icon: '🔧', color: 'bg-purple-100 text-purple-800' }
          ].map(category => {
            const categoryResources = resources.filter(r => r.type === category.type)
            const totalQuantity = categoryResources.reduce((sum, r) => sum + r.quantity, 0)
            const allocatedQuantity = categoryResources.reduce((sum, r) => sum + r.allocated, 0)
            const utilization = totalQuantity > 0 ? Math.round((allocatedQuantity / totalQuantity) * 100) : 0
            
            return (
              <div key={category.type} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-3">{category.icon}</span>
                  <div>
                    <h4 className="font-semibold text-slate-800">{category.label}</h4>
                    <p className="text-sm text-slate-600">{utilization}% utilized</p>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Allocated</span>
                    <span className="font-medium text-slate-800">{allocatedQuantity}/{totalQuantity}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        utilization > 80 ? 'bg-rose-500' : 
                        utilization > 60 ? 'bg-amber-500' : 
                        'bg-teal-500'
                      }`} 
                      style={{ width: `${utilization}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-xs text-slate-500">
                  {categoryResources.length} items in category
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Current Allocations */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Current Allocations</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Resource</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Project</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {allocations.map(allocation => {
                const resource = resources.find(r => r.id === allocation.resourceId)
                const project = projects.find(p => p.id === allocation.projectId)
                
                return (
                  <tr key={allocation.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">
                        {resource?.name || 'Unknown Resource'}
                      </div>
                      <div className="text-sm text-slate-500">
                        {resource?.category || ''}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">
                        {project?.name || 'Unknown Project'}
                      </div>
                      <div className="text-sm text-slate-500">
                        {project?.status || ''}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {allocation.quantity} {resource?.unit || ''}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {new Date(allocation.startDate).toLocaleDateString()} - {new Date(allocation.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        allocation.status === 'allocated' ? 'bg-blue-100 text-blue-800' :
                        allocation.status === 'in_use' ? 'bg-green-100 text-green-800' :
                        allocation.status === 'returned' ? 'bg-purple-100 text-purple-800' :
                        'bg-slate-100 text-slate-800'
                      }`}>
                        {allocation.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        className="text-rose-600 hover:text-rose-900"
                        onClick={() => handleDeallocateResource(allocation.id)}
                      >
                        Deallocate
                      </button>
                    </td>
                  </tr>
                )
              })}
              {allocations.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-slate-500">
                    No resources currently allocated
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resource Categories */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Resource Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            'Concrete', 'Reinforcement', 'Aggregates', 'Masonry', 'Finishing',
            'Earthmoving', 'Mixing', 'Safety', 'Power', 'Lifting',
            'Electrical', 'Plumbing', 'Woodwork', 'Finishing', 'Surveying',
            'Hand Tools', 'Safety Gear', 'Measuring Tools', 'Surveying Tools', 'Fabrication Tools'
          ].map((category, index) => (
            <div key={index} className="bg-white border border-slate-200 rounded-lg p-3 text-center">
              <span className="text-sm font-medium text-slate-700">{category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SmartResourcePlanner
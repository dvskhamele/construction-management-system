// Intelligent Materials Management System
export const MATERIALS_MANAGEMENT_RULES = {
  // Optimize materials ordering based on project needs and inventory levels
  optimizeMaterialsOrdering: (projects: any[], inventory: any[], suppliers: any[]) => {
    // Calculate materials needed for each project
    const materialsNeeded: Record<string, number> = {};
    
    projects.forEach(project => {
      // Get project tasks that require materials
      const projectTasks = project.tasks || [];
      
      projectTasks.forEach((task: any) => {
        if (task.status !== 'COMPLETED' && task.materials) {
          task.materials.forEach((material: any) => {
            const materialKey = `${material.name}-${material.unit}`;
            if (!materialsNeeded[materialKey]) {
              materialsNeeded[materialKey] = 0;
            }
            materialsNeeded[materialKey] += material.quantity || 0;
          });
        }
      });
    });
    
    // Calculate current inventory levels
    const currentInventory: Record<string, number> = {};
    
    inventory.forEach(item => {
      const materialKey = `${item.name}-${item.unit}`;
      if (!currentInventory[materialKey]) {
        currentInventory[materialKey] = 0;
      }
      currentInventory[materialKey] += item.quantity || 0;
    });
    
    // Calculate materials to order
    const materialsToOrder: any[] = [];
    
    Object.entries(materialsNeeded).forEach(([materialKey, neededQuantity]) => {
      const currentQuantity = currentInventory[materialKey] || 0;
      const shortage = neededQuantity - currentQuantity;
      
      if (shortage > 0) {
        // Split material key to get name and unit
        const lastDashIndex = materialKey.lastIndexOf('-');
        const materialName = materialKey.substring(0, lastDashIndex);
        const materialUnit = materialKey.substring(lastDashIndex + 1);
        
        // Find supplier for this material
        const supplier = suppliers.find(s => 
          s.materials?.some((m: any) => m.name === materialName && m.unit === materialUnit)
        );
        
        materialsToOrder.push({
          id: `order-${materialKey}-${Date.now()}`,
          name: materialName,
          unit: materialUnit,
          quantityNeeded: neededQuantity,
          quantityInStock: currentQuantity,
          quantityToOrder: shortage,
          supplier: supplier ? supplier.name : 'Not Found',
          supplierContact: supplier ? supplier.contact : 'Not Available',
          estimatedCost: supplier ? shortage * (supplier.pricePerUnit || 0) : 0,
          urgency: shortage > neededQuantity * 0.5 ? 'HIGH' : 'MEDIUM',
          orderDate: new Date().toISOString(),
          expectedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 1 week default
        });
      }
    });
    
    return {
      materialsNeeded,
      currentInventory,
      materialsToOrder: materialsToOrder.sort((a, b) => {
        // Sort by urgency and quantity needed
        const urgencyOrder = { 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };
        const urgencyDiff = (urgencyOrder[b.urgency as keyof typeof urgencyOrder] || 0) - 
                           (urgencyOrder[a.urgency as keyof typeof urgencyOrder] || 0);
        
        if (urgencyDiff !== 0) return urgencyDiff;
        
        return b.quantityToOrder - a.quantityToOrder;
      }),
      totalOrders: materialsToOrder.length,
      totalEstimatedCost: materialsToOrder.reduce((sum, order) => sum + order.estimatedCost, 0)
    };
  },
  
  // Predict materials issues and shortages
  predictMaterialsIssues: (inventory: any[], projects: any[], suppliers: any[]) => {
    const predictions: any[] = [];
    
    // Check for expiring materials
    const expiringSoon = inventory.filter(item => {
      if (item.expiryDate) {
        const expiryDate = new Date(item.expiryDate);
        const daysUntilExpiry = Math.ceil(
          (expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
        );
        return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
      }
      return false;
    });
    
    if (expiringSoon.length > 0) {
      predictions.push({
        id: `expiry-${Date.now()}`,
        type: 'MATERIAL_EXPIRY',
        severity: expiringSoon.length > 5 ? 'HIGH' : 'MEDIUM',
        confidence: 95,
        description: `${expiringSoon.length} materials expiring within 30 days`,
        recommendation: `Dispose of or use expiring materials immediately to prevent waste`,
        affectedMaterials: expiringSoon.map(item => `${item.name} (${item.quantity} ${item.unit})`),
        predictedAt: new Date().toISOString()
      });
    }
    
    // Check for low stock materials
    const lowStock = inventory.filter(item => {
      const minStock = item.minStock || 0;
      const currentStock = item.quantity || 0;
      return currentStock <= minStock * 1.2; // 20% buffer
    });
    
    if (lowStock.length > 0) {
      predictions.push({
        id: `low-stock-${Date.now()}`,
        type: 'LOW_STOCK',
        severity: lowStock.length > 10 ? 'HIGH' : 
                 lowStock.length > 5 ? 'MEDIUM' : 'LOW',
        confidence: 90,
        description: `${lowStock.length} materials below minimum stock levels`,
        recommendation: `Reorder low stock materials immediately to prevent project delays`,
        affectedMaterials: lowStock.map(item => `${item.name} (${item.quantity}/${item.minStock} ${item.unit})`),
        predictedAt: new Date().toISOString()
      });
    }
    
    // Check for overstocked materials
    const overstocked = inventory.filter(item => {
      const maxStock = item.maxStock || Infinity;
      const currentStock = item.quantity || 0;
      return currentStock >= maxStock * 0.9; // 90% of max
    });
    
    if (overstocked.length > 0) {
      predictions.push({
        id: `overstock-${Date.now()}`,
        type: 'OVERSTOCK',
        severity: overstocked.length > 5 ? 'HIGH' : 'MEDIUM',
        confidence: 85,
        description: `${overstocked.length} materials overstocked`,
        recommendation: `Reduce orders for overstocked materials to free up storage space`,
        affectedMaterials: overstocked.map(item => `${item.name} (${item.quantity}/${item.maxStock || '∞'} ${item.unit})`),
        predictedAt: new Date().toISOString()
      });
    }
    
    // Check for quality issues
    const qualityIssues = inventory.filter(item => 
      item.qualityRating && item.qualityRating < 70
    );
    
    if (qualityIssues.length > 0) {
      predictions.push({
        id: `quality-${Date.now()}`,
        type: 'QUALITY_ISSUE',
        severity: qualityIssues.length > 3 ? 'HIGH' : 'MEDIUM',
        confidence: 80,
        description: `${qualityIssues.length} materials with poor quality ratings`,
        recommendation: `Inspect and replace poor quality materials to prevent defects`,
        affectedMaterials: qualityIssues.map(item => `${item.name} (Quality: ${item.qualityRating}%)`),
        predictedAt: new Date().toISOString()
      });
    }
    
    // Check for supplier reliability issues
    const unreliableSuppliers = suppliers.filter(supplier => 
      supplier.reliabilityRating && supplier.reliabilityRating < 75
    );
    
    if (unreliableSuppliers.length > 0) {
      predictions.push({
        id: `supplier-${Date.now()}`,
        type: 'SUPPLIER_RELIABILITY',
        severity: unreliableSuppliers.length > 2 ? 'HIGH' : 'MEDIUM',
        confidence: 75,
        description: `${unreliableSuppliers.length} unreliable suppliers identified`,
        recommendation: `Find alternative suppliers for critical materials`,
        affectedSuppliers: unreliableSuppliers.map(supplier => supplier.name),
        predictedAt: new Date().toISOString()
      });
    }
    
    return predictions.sort((a, b) => {
      // Sort by severity and confidence
      const severityOrder = { 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };
      const severityDiff = (severityOrder[b.severity as keyof typeof severityOrder] || 0) - 
                          (severityOrder[a.severity as keyof typeof severityOrder] || 0);
      
      if (severityDiff !== 0) return severityDiff;
      
      return b.confidence - a.confidence;
    });
  },
  
  // Generate materials management reports
  generateMaterialsReports: (inventory: any[], projects: any[], suppliers: any[]) => {
    // Calculate inventory metrics
    const totalItems = inventory.length;
    const inStockItems = inventory.filter(item => (item.quantity || 0) > 0).length;
    const outOfStockItems = inventory.filter(item => (item.quantity || 0) === 0).length;
    const expiringItems = inventory.filter(item => {
      if (item.expiryDate) {
        const expiryDate = new Date(item.expiryDate);
        const daysUntilExpiry = Math.ceil(
          (expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
        );
        return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
      }
      return false;
    }).length;
    
    // Calculate inventory value
    const totalInventoryValue = inventory.reduce((sum, item) => 
      sum + ((item.quantity || 0) * (item.costPerUnit || 0)), 0
    );
    
    // Calculate turnover rate
    const totalConsumed = inventory.reduce((sum, item) => 
      sum + (item.consumed || 0), 0
    );
    
    const turnoverRate = totalInventoryValue > 0 ? 
      (totalConsumed / totalInventoryValue) * 100 : 0;
    
    // Calculate stockout frequency
    const stockouts = inventory.filter(item => 
      item.stockouts && item.stockouts > 0
    ).length;
    
    const stockoutFrequency = totalItems > 0 ? 
      (stockouts / totalItems) * 100 : 0;
    
    // Categorize inventory by type
    const inventoryByCategory: Record<string, { count: number, value: number }> = {};
    
    inventory.forEach(item => {
      const category = item.category || 'Uncategorized';
      if (!inventoryByCategory[category]) {
        inventoryByCategory[category] = { count: 0, value: 0 };
      }
      inventoryByCategory[category].count += 1;
      inventoryByCategory[category].value += (item.quantity || 0) * (item.costPerUnit || 0);
    });
    
    // Identify critical materials
    const criticalMaterials = inventory.filter(item => {
      const minStock = item.minStock || 0;
      const currentStock = item.quantity || 0;
      const consumptionRate = item.dailyConsumption || 0;
      
      // Critical if stock will run out in less than 3 days
      return currentStock <= minStock + (consumptionRate * 3);
    });
    
    // Identify slow-moving materials
    const slowMovingMaterials = inventory.filter(item => {
      const turnover = item.turnoverRate || 0;
      return turnover < 0.1; // Less than 10% monthly turnover
    });
    
    return {
      summary: {
        totalItems,
        inStockItems,
        outOfStockItems,
        expiringItems,
        totalInventoryValue: Math.round(totalInventoryValue),
        turnoverRate: Math.round(turnoverRate * 100) / 100,
        stockoutFrequency: Math.round(stockoutFrequency * 100) / 100,
        criticalMaterials: criticalMaterials.length,
        slowMovingMaterials: slowMovingMaterials.length
      },
      inventory: inventory.map(item => {
        const minStock = item.minStock || 0;
        const currentStock = item.quantity || 0;
        const maxStock = item.maxStock || Infinity;
        const stockStatus = currentStock === 0 ? 'OUT_OF_STOCK' :
                           currentStock <= minStock * 1.2 ? 'LOW_STOCK' :
                           currentStock >= maxStock * 0.9 ? 'OVERSTOCKED' : 'ADEQUATE';
        
        let stockColor = 'text-emerald-600';
        if (stockStatus === 'OUT_OF_STOCK') {
          stockColor = 'text-red-600';
        } else if (stockStatus === 'LOW_STOCK') {
          stockColor = 'text-amber-600';
        } else if (stockStatus === 'OVERSTOCKED') {
          stockColor = 'text-blue-600';
        }
        
        return {
          ...item,
          stockStatus,
          stockColor,
          currentValue: Math.round((currentStock * (item.costPerUnit || 0))),
          turnoverRate: item.turnoverRate || 0,
          stockouts: item.stockouts || 0,
          lastUpdated: item.lastUpdated || new Date().toISOString()
        };
      }).sort((a, b) => {
        // Sort by stock status and value
        const statusOrder = { 
          'OUT_OF_STOCK': 4, 
          'LOW_STOCK': 3, 
          'OVERSTOCKED': 2, 
          'ADEQUATE': 1 
        };
        
        const statusDiff = (statusOrder[b.stockStatus as keyof typeof statusOrder] || 0) - 
                          (statusOrder[a.stockStatus as keyof typeof statusOrder] || 0);
        
        if (statusDiff !== 0) return statusDiff;
        
        return b.currentValue - a.currentValue;
      }),
      categories: inventoryByCategory,
      criticalMaterials: criticalMaterials.slice(0, 10),
      slowMovingMaterials: slowMovingMaterials.slice(0, 10),
      generatedAt: new Date().toISOString()
    };
  },
  
  // Suggest materials improvements
  suggestMaterialsImprovements: (inventory: any[], projects: any[], suppliers: any[]) => {
    const improvements: any[] = [];
    
    // Expiry management improvements
    const expiringSoon = inventory.filter(item => {
      if (item.expiryDate) {
        const expiryDate = new Date(item.expiryDate);
        const daysUntilExpiry = Math.ceil(
          (expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
        );
        return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
      }
      return false;
    });
    
    if (expiringSoon.length > 0) {
      improvements.push({
        id: `expiry-improvement-${Date.now()}`,
        type: 'EXPIRY_MANAGEMENT',
        priority: expiringSoon.length > 5 ? 'HIGH' : 'MEDIUM',
        title: 'Manage Expiring Materials',
        description: `${expiringSoon.length} materials expiring within 30 days`,
        actionItems: expiringSoon.map(item => 
          `Dispose of or use ${item.name} (${item.quantity} ${item.unit}) before ${new Date(item.expiryDate).toLocaleDateString()}`
        ),
        estimatedCost: 0,
        roi: 'Prevent material waste and associated losses'
      });
    }
    
    // Stock level improvements
    const lowStock = inventory.filter(item => {
      const minStock = item.minStock || 0;
      const currentStock = item.quantity || 0;
      return currentStock <= minStock * 1.2; // 20% buffer
    });
    
    if (lowStock.length > 0) {
      improvements.push({
        id: `stock-improvement-${Date.now()}`,
        type: 'STOCK_LEVEL_OPTIMIZATION',
        priority: lowStock.length > 10 ? 'HIGH' : 
                 lowStock.length > 5 ? 'MEDIUM' : 'LOW',
        title: 'Reorder Low Stock Materials',
        description: `${lowStock.length} materials below minimum stock levels`,
        actionItems: lowStock.map(item => 
          `Reorder ${item.name} - Current: ${item.quantity}, Minimum: ${item.minStock}`
        ),
        estimatedCost: lowStock.reduce((sum, item) => 
          sum + ((item.minStock - item.quantity) * (item.costPerUnit || 0)), 0
        ),
        roi: 'Prevent project delays due to material shortages'
      });
    }
    
    // Supplier reliability improvements
    const unreliableSuppliers = suppliers.filter(supplier => 
      supplier.reliabilityRating && supplier.reliabilityRating < 75
    );
    
    if (unreliableSuppliers.length > 0) {
      improvements.push({
        id: `supplier-improvement-${Date.now()}`,
        type: 'SUPPLIER_RELIABILITY',
        priority: unreliableSuppliers.length > 2 ? 'HIGH' : 'MEDIUM',
        title: 'Evaluate Unreliable Suppliers',
        description: `${unreliableSuppliers.length} unreliable suppliers identified`,
        actionItems: unreliableSuppliers.map(supplier => 
          `Review contract with ${supplier.name} (Reliability: ${supplier.reliabilityRating}%)`
        ),
        estimatedCost: 0,
        roi: 'Improve supply chain reliability and reduce delays'
      });
    }
    
    // Quality improvements
    const qualityIssues = inventory.filter(item => 
      item.qualityRating && item.qualityRating < 70
    );
    
    if (qualityIssues.length > 0) {
      improvements.push({
        id: `quality-improvement-${Date.now()}`,
        type: 'QUALITY_IMPROVEMENT',
        priority: qualityIssues.length > 3 ? 'HIGH' : 'MEDIUM',
        title: 'Address Quality Issues',
        description: `${qualityIssues.length} materials with poor quality ratings`,
        actionItems: qualityIssues.map(item => 
          `Inspect and replace ${item.name} with quality rating of ${item.qualityRating}%`
        ),
        estimatedCost: qualityIssues.reduce((sum, item) => 
          sum + (item.quantity * item.costPerUnit * 0.2), 0 // 20% replacement cost
        ),
        roi: 'Reduce defects and rework costs'
      });
    }
    
    // Storage optimization improvements
    const overstocked = inventory.filter(item => {
      const maxStock = item.maxStock || Infinity;
      const currentStock = item.quantity || 0;
      return currentStock >= maxStock * 0.9; // 90% of max
    });
    
    if (overstocked.length > 0) {
      improvements.push({
        id: `storage-improvement-${Date.now()}`,
        type: 'STORAGE_OPTIMIZATION',
        priority: overstocked.length > 5 ? 'HIGH' : 'MEDIUM',
        title: 'Optimize Storage Space',
        description: `${overstocked.length} overstocked materials`,
        actionItems: overstocked.map(item => 
          `Reduce orders for ${item.name} - Current: ${item.quantity}, Maximum: ${item.maxStock || '∞'}`
        ),
        estimatedCost: 0,
        roi: 'Free up storage space and reduce carrying costs'
      });
    }
    
    return improvements.sort((a, b) => {
      // Sort by priority
      const priorityOrder = { 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };
      return (priorityOrder[b.priority as keyof typeof priorityOrder] || 0) - 
             (priorityOrder[a.priority as keyof typeof priorityOrder] || 0);
    });
  }
};

export default MATERIALS_MANAGEMENT_RULES;
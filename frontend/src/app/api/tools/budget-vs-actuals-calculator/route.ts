import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const {
      budgetedMaterials,
      actualMaterials,
      budgetedLabor,
      actualLabor,
      budgetedSubcontractors,
      actualSubcontractors,
      budgetedEquipment,
      actualEquipment,
      budgetedOverhead,
      actualOverhead,
      projectName,
      deadline,
      contractorId
    } = await request.json();

    // Input validation
    if (
      typeof budgetedMaterials !== 'number' || budgetedMaterials < 0 ||
      typeof actualMaterials !== 'number' || actualMaterials < 0 ||
      typeof budgetedLabor !== 'number' || budgetedLabor < 0 ||
      typeof actualLabor !== 'number' || actualLabor < 0 ||
      typeof budgetedSubcontractors !== 'number' || budgetedSubcontractors < 0 ||
      typeof actualSubcontractors !== 'number' || actualSubcontractors < 0 ||
      typeof budgetedEquipment !== 'number' || budgetedEquipment < 0 ||
      typeof actualEquipment !== 'number' || actualEquipment < 0 ||
      typeof budgetedOverhead !== 'number' || budgetedOverhead < 0 ||
      typeof actualOverhead !== 'number' || actualOverhead < 0
    ) {
      return NextResponse.json({ error: 'Invalid input parameters.' }, { status: 400 });
    }

    // Calculate variances
    const materialsVariance = budgetedMaterials - actualMaterials;
    const laborVariance = budgetedLabor - actualLabor;
    const subcontractorsVariance = budgetedSubcontractors - actualSubcontractors;
    const equipmentVariance = budgetedEquipment - actualEquipment;
    const overheadVariance = budgetedOverhead - actualOverhead;

    const totalBudgeted = budgetedMaterials + budgetedLabor + budgetedSubcontractors + budgetedEquipment + budgetedOverhead;
    const totalActual = actualMaterials + actualLabor + actualSubcontractors + actualEquipment + actualOverhead;
    const totalVariance = totalBudgeted - totalActual;
    const variancePercentage = totalBudgeted > 0 ? (totalVariance / totalBudgeted) * 100 : 0;

    const resultId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const timestamp = new Date().toISOString();

    // --- Storage for CRM Integration ---
    const resultsDir = path.join(process.cwd(), 'data', 'crm_integration');
    await fs.mkdir(resultsDir, { recursive: true });
    const toolResultsFilePath = path.join(resultsDir, 'budget-vs-actuals-calculator.json');

    let existingResults = [];
    try {
      const data = await fs.readFile(toolResultsFilePath, 'utf-8');
      existingResults = JSON.parse(data);
    } catch (readError) {
      if ((readError as any).code !== 'ENOENT') {
        console.error('Error reading existing tool results:', readError);
      }
    }

    const newResult = {
      id: resultId,
      timestamp,
      inputs: {
        budgetedMaterials,
        actualMaterials,
        budgetedLabor,
        actualLabor,
        budgetedSubcontractors,
        actualSubcontractors,
        budgetedEquipment,
        actualEquipment,
        budgetedOverhead,
        actualOverhead
      },
      outputs: {
        materialsVariance,
        laborVariance,
        subcontractorsVariance,
        equipmentVariance,
        overheadVariance,
        totalBudgeted,
        totalActual,
        totalVariance,
        variancePercentage
      },
      projectInfo: {
        name: projectName,
        deadline: deadline,
        contractorId: contractorId
      },
      status: 'created',
      updates: []
    };
    existingResults.push(newResult);
    await fs.writeFile(toolResultsFilePath, JSON.stringify(existingResults, null, 2));

    // --- Analytics Logging ---
    const analyticsLogFilePath = path.join(process.cwd(), 'data', 'analytics_events.log');
    await fs.mkdir(path.dirname(analyticsLogFilePath), { recursive: true });

    const analyticsEvent = {
      event: 'ToolSubmittedWithCRMIntegration',
      tool_slug: 'budget-vs-actuals-calculator',
      timestamp,
      input_data: {
        budgetedMaterials,
        actualMaterials,
        budgetedLabor,
        actualLabor,
        budgetedSubcontractors,
        actualSubcontractors,
        budgetedEquipment,
        actualEquipment,
        budgetedOverhead,
        actualOverhead
      },
      project_info: {
        name: projectName,
        deadline: deadline,
        contractorId: contractorId
      },
      user_agent: request.headers.get('user-agent'),
      ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '',
    };

    await fs.appendFile(analyticsLogFilePath, JSON.stringify(analyticsEvent) + '\n');

    return NextResponse.json({
      resultId,
      totalVariance,
      variancePercentage
    });

  } catch (error) {
    console.error('API Error:', error);
    // Log ErrorEvent
    const analyticsLogFilePath = path.join(process.cwd(), 'data', 'analytics_events.log');
    const errorEvent = {
      event: 'ErrorEvent',
      error_code: 'BUDGET_CALC_FAILED',
      message: (error as Error).message,
      severity: 'high',
      timestamp: new Date().toISOString(),
      context: { tool_slug: 'budget-vs-actuals-calculator' },
      user_agent: request.headers.get('user-agent'),
      ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '',
    };
    await fs.appendFile(analyticsLogFilePath, JSON.stringify(errorEvent) + '\n');

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Endpoint to update contractor status for a specific project
export async function PUT(request: Request) {
  try {
    const { resultId, taskId, status, notes } = await request.json();

    if (!resultId || !taskId || !status) {
      return NextResponse.json({ error: 'resultId, taskId, and status are required.' }, { status: 400 });
    }

    const resultsDir = path.join(process.cwd(), 'data', 'crm_integration');
    const toolResultsFilePath = path.join(resultsDir, 'budget-vs-actuals-calculator.json');

    let existingResults = [];
    try {
      const data = await fs.readFile(toolResultsFilePath, 'utf-8');
      existingResults = JSON.parse(data);
    } catch (readError) {
      if ((readError as any).code !== 'ENOENT') {
        console.error('Error reading existing tool results:', readError);
        return NextResponse.json({ error: 'Failed to read existing results' }, { status: 500 });
      }
    }

    const resultIndex = existingResults.findIndex((result: any) => result.id === resultId);
    if (resultIndex === -1) {
      return NextResponse.json({ error: 'Result not found' }, { status: 404 });
    }

    // Add the update to the result's updates array
    const update = {
      id: Math.random().toString(36).substring(2, 15),
      taskId,
      status,
      notes: notes || '',
      timestamp: new Date().toISOString()
    };

    existingResults[resultIndex].updates.push(update);
    
    // Update the overall project status based on task statuses
    existingResults[resultIndex].status = 'in-progress'; // Or calculate based on all task statuses
    
    await fs.writeFile(toolResultsFilePath, JSON.stringify(existingResults, null, 2));

    // Log the update event
    const analyticsLogFilePath = path.join(process.cwd(), 'data', 'analytics_events.log');
    const updateEvent = {
      event: 'ContractorUpdateSubmitted',
      tool_slug: 'budget-vs-actuals-calculator',
      result_id: resultId,
      task_id: taskId,
      status,
      timestamp: new Date().toISOString(),
      user_agent: request.headers.get('user-agent'),
      ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '',
    };
    await fs.appendFile(analyticsLogFilePath, JSON.stringify(updateEvent) + '\n');

    return NextResponse.json({ 
      message: 'Update submitted successfully',
      updateId: update.id 
    });

  } catch (error) {
    console.error('Update API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error for update' }, { status: 500 });
  }
}
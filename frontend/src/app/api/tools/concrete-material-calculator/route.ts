import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const {
      calcType,
      units,
      concreteGrade,
      volume,
      cementBags,
      sandCFT,
      aggregateCFT,
      dryVolume,
      projectName,
      deadline,
      contractorId
    } = await request.json();

    // Input validation
    if (
      typeof volume !== 'number' || volume < 0 ||
      typeof cementBags !== 'number' || cementBags < 0 ||
      typeof sandCFT !== 'number' || sandCFT < 0 ||
      typeof aggregateCFT !== 'number' || aggregateCFT < 0 ||
      typeof dryVolume !== 'number' || dryVolume < 0 ||
      !calcType || !units || !concreteGrade
    ) {
      return NextResponse.json({ error: 'Invalid input parameters.' }, { status: 400 });
    }

    const resultId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const timestamp = new Date().toISOString();

    // --- Storage for CRM Integration ---
    const resultsDir = path.join(process.cwd(), 'data', 'crm_integration');
    await fs.mkdir(resultsDir, { recursive: true });
    const toolResultsFilePath = path.join(resultsDir, 'concrete-material-calculator.json');

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
        calcType,
        units,
        concreteGrade
      },
      outputs: {
        volume,
        cementBags,
        sandCFT,
        aggregateCFT,
        dryVolume
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
      tool_slug: 'concrete-material-calculator',
      timestamp,
      input_data: {
        calcType,
        units,
        concreteGrade
      },
      output_data: {
        volume,
        cementBags,
        sandCFT,
        aggregateCFT,
        dryVolume
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
      volume,
      cementBags
    });

  } catch (error) {
    console.error('API Error:', error);
    // Log ErrorEvent
    const analyticsLogFilePath = path.join(process.cwd(), 'data', 'analytics_events.log');
    const errorEvent = {
      event: 'ErrorEvent',
      error_code: 'CONCRETE_CALC_FAILED',
      message: (error as Error).message,
      severity: 'high',
      timestamp: new Date().toISOString(),
      context: { tool_slug: 'concrete-material-calculator' },
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
    const toolResultsFilePath = path.join(resultsDir, 'concrete-material-calculator.json');

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
      tool_slug: 'concrete-material-calculator',
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
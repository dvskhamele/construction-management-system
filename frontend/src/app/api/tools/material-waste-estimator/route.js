import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const { materialType, length, width, thickness, wastePercentage, baseVolume, wasteVolume, wasteCost } = await request.json();

    // Input validation (basic, more robust validation can be added)
    if (
      typeof materialType !== 'string' ||
      typeof length !== 'number' || length <= 0 ||
      typeof width !== 'number' || width <= 0 ||
      typeof wastePercentage !== 'number' || wastePercentage < 0
    ) {
      return NextResponse.json({ error: 'Invalid input parameters.' }, { status: 400 });
    }

    // Perform calculations (B) - these are already done on the frontend for display,
    // but re-calculating here for server-side validation and consistency.
    // In a real app, you might send less data from frontend and do more calculation here.
    const materialPrices = {
      concrete: 120, // $/cubic yard
      lumber: 500,   // $/1000 board feet (approx)
      drywall: 15,   // $/sheet
      tiles: 2,      // $/sq ft
    };

    let calculatedBaseVolume = 0;
    let calculatedWasteVolume = 0;
    let calculatedWasteCost = 0;
    let unit = '';
    let pricePerUnit = materialPrices[materialType];

    switch (materialType) {
      case 'concrete':
        if (typeof thickness !== 'number' || thickness <= 0) {
          return NextResponse.json({ error: 'Invalid thickness for concrete.' }, { status: 400 });
        }
        calculatedBaseVolume = (length * width * thickness) / 27; // Convert cubic feet to cubic yards
        unit = 'cubic yards';
        break;
      case 'lumber':
        calculatedBaseVolume = (length * width) / 144; // Convert sq inches to sq ft, then approx board feet
        unit = 'board feet (approx)';
        break;
      case 'drywall':
        calculatedBaseVolume = (length * width) / 32; // Assume standard 4x8 sheet = 32 sq ft
        unit = 'sheets (approx)';
        break;
      case 'tiles':
        calculatedBaseVolume = length * width; // Square footage
        unit = 'sq ft';
        break;
      default:
        return NextResponse.json({ error: 'Invalid material type selected.' }, { status: 400 });
    }

    calculatedWasteVolume = calculatedBaseVolume * (wastePercentage / 100);
    calculatedWasteCost = calculatedWasteVolume * pricePerUnit;


    const resultId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const timestamp = new Date().toISOString();

    // --- Storage (C) ---
    const resultsDir = path.join(process.cwd(), 'data', 'prelogin_results');
    await fs.mkdir(resultsDir, { recursive: true });
    const toolResultsFilePath = path.join(resultsDir, 'material-waste-estimator.json');

    let existingResults = [];
    try {
      const data = await fs.readFile(toolResultsFilePath, 'utf-8');
      existingResults = JSON.parse(data);
    } catch (readError) {
      if (readError.code !== 'ENOENT') {
        console.error('Error reading existing tool results:', readError);
      }
    }

    const newResult = {
      id: resultId,
      timestamp,
      inputs: { materialType, length, width, thickness, wastePercentage },
      outputs: { estimatedWasteVolume: calculatedWasteVolume, estimatedWasteCost: calculatedWasteCost, unit },
    };
    existingResults.push(newResult);
    await fs.writeFile(toolResultsFilePath, JSON.stringify(existingResults, null, 2));

    // --- Analytics Logging (G) ---
    const analyticsLogFilePath = path.join(process.cwd(), 'data', 'analytics_events.log');
    await fs.mkdir(path.dirname(analyticsLogFilePath), { recursive: true }); // Ensure directory exists

    const analyticsEvent = {
      event: 'ToolSubmitted',
      tool_slug: 'material-waste-estimator',
      timestamp,
      input_data: { materialType, length, width, thickness, wastePercentage }, // Anonymized if sensitive
      user_agent: request.headers.get('user-agent'),
      ip_address: request.headers.get('x-forwarded-for') || request.ip, // Basic IP capture
    };

    return NextResponse.json({
      resultId,
      estimatedWasteVolume: calculatedWasteVolume,
      estimatedWasteCost: calculatedWasteCost,
      unit,
    });

  } catch (error) {
    console.error('API Error:', error);
    // Log ErrorEvent (G)
    const analyticsLogFilePath = path.join(process.cwd(), 'data', 'analytics_events.log');
    const errorEvent = {
      event: 'ErrorEvent',
      error_code: 'WASTE_EST_FAILED',
      message: error.message,
      severity: 'high',
      timestamp: new Date().toISOString(),
      context: { tool_slug: 'material-waste-estimator' },
      user_agent: request.headers.get('user-agent'),
      ip_address: request.headers.get('x-forwarded-for') || request.ip,
    };
    await fs.appendFile(analyticsLogFilePath, JSON.stringify(errorEvent) + '\n');;;;

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// --- Lead Capture Endpoint (E) ---
export async function PUT(request) { // Using PUT for lead capture as it's an update/creation of a lead record
  try {
    const { email, tool_slug, resultId } = await request.json();

    if (!email || !tool_slug) {
      return NextResponse.json({ error: 'Email and tool_slug are required.' }, { status: 400 });
    }

    // Basic email validation (more robust validation needed in production)
    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 });
    }

    const leadsFilePath = path.join(process.cwd(), 'data', 'prelogin_leads', 'leads.json');
    await fs.mkdir(path.dirname(leadsFilePath), { recursive: true });

    let existingLeads = [];
    try {
      const data = await fs.readFile(leadsFilePath, 'utf-8');
      existingLeads = JSON.parse(data);
    } catch (readError) {
      if (readError.code !== 'ENOENT') {
        console.error('Error reading existing leads:', readError);
      }
    }

    // Hash email for privacy (simple hash for demonstration)
    const crypto = require('crypto'); // Node.js crypto module
    const hashedEmail = crypto.createHash('sha256').update(email).digest('hex');

    const newLead = {
      timestamp: new Date().toISOString(),
      tool_slug,
      result_id: resultId,
      email_hash: hashedEmail,
      lead_source: 'material-waste-estimator',
      user_agent: request.headers.get('user-agent'),
      ip_address: request.headers.get('x-forwarded-for') || request.ip,
    };
    existingLeads.push(newLead);
    await fs.writeFile(leadsFilePath, JSON.stringify(existingLeads, null, 2));

    // Log LeadCaptured event (G)
    const analyticsLogFilePath = path.join(process.cwd(), 'data', 'analytics_events.log');
    const analyticsEvent = {
      event: 'LeadCaptured',
      tool_slug,
      timestamp: new Date().toISOString(),
      email: hashedEmail,
      lead_source: 'material-waste-estimator',
      user_agent: request.headers.get('user-agent'),
      ip_address: request.headers.get('x-forwarded-for') || request.ip,
    };

    return NextResponse.json({ message: 'Lead captured successfully!' });

  } catch (error) {
    console.error('Lead Capture API Error:', error);
    // Log ErrorEvent (G)
    const analyticsLogFilePath = path.join(process.cwd(), 'data', 'analytics_events.log');
    const errorEvent = {
      event: 'ErrorEvent',
      error_code: 'LEAD_CAPTURE_FAILED',
      message: error.message,
      severity: 'medium',
      timestamp: new Date().toISOString(),
      context: { tool_slug: 'material-waste-estimator' },
      user_agent: request.headers.get('user-agent'),
      ip_address: request.headers.get('x-forwarded-for') || request.ip,
    };
    await fs.appendFile(analyticsLogFilePath, JSON.stringify(errorEvent) + '\n');;;;

    return NextResponse.json({ error: 'Internal Server Error for lead capture' }, { status: 500 });
  }
}

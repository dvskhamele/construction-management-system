import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Helper function to calculate NPV
function calculateNPV(initialInvestment, cashFlows, discountRate) {
  let npv = -initialInvestment;
  for (let i = 0; i < cashFlows.length; i++) {
    npv += cashFlows[i] / Math.pow(1 + discountRate, i + 1);
  }
  return npv;
}

// Helper function to calculate Payback Period (simplified for constant annual cash flow)
function calculatePaybackPeriod(initialInvestment, annualCashFlow) {
  if (annualCashFlow <= 0) return Infinity; // Avoid division by zero or negative cash flow
  return initialInvestment / annualCashFlow;
}

export async function POST(request) {
  try {
    const { projectCost, expectedRevenue, projectDuration, discountRate } = await request.json();

    // Input validation
    if (
      typeof projectCost !== 'number' || projectCost <= 0 ||
      typeof expectedRevenue !== 'number' || expectedRevenue <= 0 ||
      typeof projectDuration !== 'number' || projectDuration <= 0 ||
      typeof discountRate !== 'number' || discountRate < 0
    ) {
      return NextResponse.json({ error: 'Invalid input parameters.' }, { status: 400 });
    }

    // Perform calculations (B)
    const netProfit = expectedRevenue - projectCost;
    const roi = (netProfit / projectCost) * 100;

    // For simplicity, assume annual cash flow is net profit / duration
    const annualCashFlow = netProfit / projectDuration;
    const cashFlows = Array(projectDuration).fill(annualCashFlow);

    const npv = calculateNPV(projectCost, cashFlows, discountRate);
    const paybackPeriod = calculatePaybackPeriod(projectCost, annualCashFlow);

    const resultId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const timestamp = new Date().toISOString();

    // --- Storage (C) ---
    const resultsDir = path.join(process.cwd(), 'data', 'prelogin_results');
    await fs.mkdir(resultsDir, { recursive: true });
    const toolResultsFilePath = path.join(resultsDir, 'construction-project-roi-calculator.json');

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
      inputs: { projectCost, expectedRevenue, projectDuration, discountRate },
      outputs: { roi, npv, paybackPeriod },
    };
    existingResults.push(newResult);
    await fs.writeFile(toolResultsFilePath, JSON.stringify(existingResults, null, 2));

    // --- Analytics Logging (G) ---
    const analyticsLogFilePath = path.join(process.cwd(), 'data', 'analytics_events.log');
    await fs.mkdir(path.dirname(analyticsLogFilePath), { recursive: true }); // Ensure directory exists

    const analyticsEvent = {
      event: 'ToolSubmitted',
      tool_slug: 'construction-project-roi-calculator',
      timestamp,
      input_data: { projectCost, expectedRevenue, projectDuration, discountRate }, // Anonymized if sensitive
      user_agent: request.headers.get('user-agent'),
      ip_address: request.headers.get('x-forwarded-for') || request.ip, // Basic IP capture
    };

    return NextResponse.json({
      resultId,
      roi,
      npv,
      paybackPeriod,
    });

  } catch (error) {
    console.error('API Error:', error);
    // Log ErrorEvent (G)
    const analyticsLogFilePath = path.join(process.cwd(), 'data', 'analytics_events.log');
    const errorEvent = {
      event: 'ErrorEvent',
      error_code: 'ROI_CALC_FAILED',
      message: error.message,
      severity: 'high',
      timestamp: new Date().toISOString(),
      context: { tool_slug: 'construction-project-roi-calculator' },
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
      lead_source: 'construction-project-roi-calculator',
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
      lead_source: 'construction-project-roi-calculator',
      user_agent: request.headers.get('user-agent'),
      ip_address: request.headers.get('x-forwarded-for') || request.ip,
    };
    await fs.appendFile(analyticsLogFilePath, JSON.stringify(analyticsEvent) + '\n');;;

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
      context: { tool_slug: 'construction-project-roi-calculator' },
      user_agent: request.headers.get('user-agent'),
      ip_address: request.headers.get('x-forwarded-for') || request.ip,
    };
    await fs.appendFile(analyticsLogFilePath, JSON.stringify(errorEvent) + '\n');;;;

    return NextResponse.json({ error: 'Internal Server Error for lead capture' }, { status: 500 });
  }
}

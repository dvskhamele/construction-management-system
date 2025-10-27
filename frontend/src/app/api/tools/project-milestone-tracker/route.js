
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto'; // Import crypto module

export async function POST(request) {
  try {
    const { input1 } = await request.json();

    if (typeof input1 !== 'number' || isNaN(input1)) {
      return NextResponse.json({ error: 'Invalid input parameters.' }, { status: 400 });
    }

    // Perform a dummy calculation for demonstration
    const result = input1 * 2;

    const resultId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const timestamp = new Date().toISOString();

    // --- Storage (C) ---
    const resultsDir = path.join(process.cwd(), 'data', 'prelogin_results');
    await fs.mkdir(resultsDir, { recursive: true });
    const toolResultsFilePath = path.join(resultsDir, 'project-milestone-tracker.json');

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
      inputs: { input1 },
      outputs: { result },
    };
    existingResults.push(newResult);
    await fs.writeFile(toolResultsFilePath, JSON.stringify(existingResults, null, 2));

    // --- Analytics Logging (G) ---
    const analyticsLogFilePath = path.join(process.cwd(), 'data', 'analytics_events.log');
    await fs.mkdir(path.dirname(analyticsLogFilePath), { recursive: true });

    const analyticsEvent = {
      event: 'ToolSubmitted',
      tool_slug: 'project-milestone-tracker',
      timestamp,
      input_data: { input1 },
      user_agent: request.headers.get('user-agent'),
      ip_address: request.headers.get('x-forwarded-for') || request.ip,
    };

    return NextResponse.json({
      resultId,
      result,
    });

  } catch (error) {
    console.error('API Error:', error);
    const analyticsLogFilePath = path.join(process.cwd(), 'data', 'analytics_events.log');
    const errorEvent = {
      event: 'ErrorEvent',
      error_code: 'PROJECT-MILESTONE-TRACKER_CALC_FAILED',
      message: error.message,
      severity: 'high',
      timestamp: new Date().toISOString(),
      context: { tool_slug: 'project-milestone-tracker' },
      user_agent: request.headers.get('user-agent'),
      ip_address: request.headers.get('x-forwarded-for') || request.ip,
    };
    await fs.appendFile(analyticsLogFilePath, JSON.stringify(errorEvent) + '\n');;;;

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { email, tool_slug, resultId } = await request.json();

    if (!email || !tool_slug) {
      return NextResponse.json({ error: 'Email and tool_slug are required.' }, { status: 400 });
    }

    if (!/S+@S+.S+/.test(email)) {
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

    const hashedEmail = crypto.createHash('sha256').update(email).digest('hex');

    const newLead = {
      timestamp: new Date().toISOString(),
      tool_slug,
      result_id: resultId,
      email_hash: hashedEmail,
      lead_source: 'project-milestone-tracker',
      user_agent: request.headers.get('user-agent'),
      ip_address: request.headers.get('x-forwarded-for') || request.ip,
    };
    existingLeads.push(newLead);
    await fs.writeFile(leadsFilePath, JSON.stringify(existingLeads, null, 2));

    const analyticsLogFilePath = path.join(process.cwd(), 'data', 'analytics_events.log');
    const analyticsEvent = {
      event: 'LeadCaptured',
      tool_slug,
      timestamp: new Date().toISOString(),
      email: hashedEmail,
      lead_source: 'project-milestone-tracker',
      user_agent: request.headers.get('user-agent'),
      ip_address: request.headers.get('x-forwarded-for') || request.ip,
    };
    await fs.appendFile(analyticsLogFilePath, JSON.stringify(analyticsEvent) + '\n');

    return NextResponse.json({ message: 'Lead captured successfully!' });

  } catch (error) {
    console.error('Lead Capture API Error:', error);
    const analyticsLogFilePath = path.join(process.cwd(), 'data', 'analytics_events.log');
    const errorEvent = {
      event: 'ErrorEvent',
      error_code: 'LEAD_CAPTURE_FAILED',
      message: error.message,
      severity: 'medium',
      timestamp: new Date().toISOString(),
      context: { tool_slug: 'project-milestone-tracker' },
      user_agent: request.headers.get('user-agent'),
      ip_address: request.headers.get('x-forwarded-for') || request.ip,
    };
    await fs.appendFile(analyticsLogFilePath, JSON.stringify(errorEvent) + '\n');

    return NextResponse.json({ error: 'Internal Server Error for lead capture' }, { status: 500 });
  }
}

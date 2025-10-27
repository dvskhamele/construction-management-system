import { promises as fs } from 'fs';
import path from 'path';

console.log("AutoReport: Generating weekly report...");

async function runAutoReport() {
  const projectRoot = process.cwd();
  const today = new Date();
  const date = today.toISOString().slice(0, 10);
  const reportFilePath = path.join(projectRoot, 'auto_reports', `weekly_report_${date}.md`);

  let reportContent = `# Weekly Report - ${date}\n\n`;

  try {
    // --- 1. Collect data from analytics logs ---
    const analyticsLogFilePath = path.join(projectRoot, 'data', 'analytics_events.log');
    let analyticsEvents = [];
    try {
      const logContent = await fs.readFile(analyticsLogFilePath, 'utf-8');
      analyticsEvents = logContent.split('\n').filter(Boolean).map(JSON.parse);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.error('Error reading analytics log:', error);
      }
    }

    // --- 2. Collect data from lead captures ---
    const leadsFilePath = path.join(projectRoot, 'data', 'prelogin_leads', 'leads.json');
    let leads = [];
    try {
      const leadsContent = await fs.readFile(leadsFilePath, 'utf-8');
      leads = JSON.parse(leadsContent);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.error('Error reading leads data:', error);
      }
    }

    // --- 3. Collect data from tool audits ---
    const auditFiles = (await fs.readdir(projectRoot)).filter(file => file.endsWith('.audit.json'));
    let builtTools = [];
    for (const file of auditFiles) {
      try {
        const auditContent = await fs.readFile(path.join(projectRoot, file), 'utf-8');
        builtTools.push(JSON.parse(auditContent));
      } catch (error) {
        console.error(`Error reading audit file ${file}:`, error);
      }
    }

    // --- Process data and generate report sections ---

    // Overview
    reportContent += `## Overview\n\n`;
    reportContent += `- Number of tools built: ${builtTools.length}\n`;
    reportContent += `- Number of pages generated: ${analyticsEvents.filter(e => e.event === 'PageGenerated').length}\n`;
    reportContent += `- Total analytics events: ${analyticsEvents.length}\n`;
    reportContent += `- Total leads captured: ${leads.length}\n\n`;

    // Performance Metrics
    reportContent += `## Performance Metrics\n\n`;
    const toolSubmissions = analyticsEvents.filter(e => e.event === 'ToolSubmitted');
    const toolOpened = analyticsEvents.filter(e => e.event === 'ToolOpened');
    const leadCaptures = analyticsEvents.filter(e => e.event === 'LeadCaptured');
    const errorEvents = analyticsEvents.filter(e => e.event === 'ErrorEvent');

    reportContent += `### Tool Usage\n`;
    const toolUsage = toolSubmissions.reduce((acc, event) => {
      acc[event.tool_slug] = (acc[event.tool_slug] || 0) + 1;
      return acc;
    }, {});
    for (const tool_slug in toolUsage) {
      reportContent += `- ${tool_slug}: ${toolUsage[tool_slug]} submissions\n`;
    }
    if (Object.keys(toolUsage).length === 0) reportContent += `- No tool submissions recorded.\n`;
    reportContent += `\n`;

    reportContent += `### Lead Capture Rates\n`;
    if (toolSubmissions.length > 0) {
      const conversionRate = (leadCaptures.length / toolSubmissions.length) * 100;
      reportContent += `- Overall Lead Conversion Rate: ${conversionRate.toFixed(2)}%\n`;
    } else {
      reportContent += `- No tool submissions to calculate conversion rate.\n`;
    }
    reportContent += `\n`;

    reportContent += `### Error Summary\n`;
    if (errorEvents.length > 0) {
      const errorCounts = errorEvents.reduce((acc, event) => {
        acc[event.error_code] = (acc[event.error_code] || 0) + 1;
        return acc;
      }, {});
      for (const errorCode in errorCounts) {
        reportContent += `- ${errorCode}: ${errorCounts[errorCode]} occurrences\n`;
      }
    } else {
      reportContent += `- No errors recorded.\n`;
    }
    reportContent += `\n\n`;


    // Recommendations
    reportContent += `## Recommendations\n\n`;
    reportContent += `- Based on current data, focus on building tools that address high-demand pain points identified in 
- Monitor lead capture rates for individual tools and optimize UI/UX for better conversion.
- Investigate and resolve any recurring error events to improve tool stability.

`;

    // Save the report
    await fs.writeFile(reportFilePath, reportContent);
    console.log(`AutoReport: Weekly report saved to ${reportFilePath}`);

  } catch (error) {
    console.error("AutoReport: Error running scheduler:", error);
  }
}

runAutoReport();

console.log("AutoReport: Weekly report generation complete.");
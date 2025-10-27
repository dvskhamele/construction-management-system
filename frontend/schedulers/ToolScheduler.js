const fs = require('fs');
const path = require('path');

const TOOLS_DIR = path.join(__dirname, '../src/pages/tools');
const AUDIT_DIR = path.join(process.cwd(), 'frontend'); // Audit files are in frontend/
const TOOL_SPECS_PATH = path.join(process.cwd(), 'frontend', 'public', 'blogs', 'tool_specs.html');
const API_DIR = path.join(__dirname, '../src/pages/api');
const DATA_DIR = path.join(__dirname, '../data');
const COMPONENTS_DIR = path.join(__dirname, '../src/components');
const APP_DIR = path.join(__dirname, '../src/app');
const TEMPLATES_DIR = path.join(__dirname, './templates');

async function getExistingToolSlugs() {
    try {
        const auditFiles = await fs.promises.readdir(AUDIT_DIR, { withFileTypes: true });
        return auditFiles
            .filter(dirent => dirent.isFile() && dirent.name.endsWith('.audit.json'))
            .map(dirent => dirent.name.replace('.audit.json', ''));
    } catch (error) {
        console.error('Error reading existing tool audit files:', error);
        return [];
    }
}

async function getToolSpecs() {
    try {
        const htmlContent = await fs.promises.readFile(TOOL_SPECS_PATH, 'utf8');
        const toolSpecs = [];

        const specBlocks = htmlContent.split('<div class="tool-spec">').slice(1);

        for (const block of specBlocks) {
            const titleMatch = block.match(/<h2>(.*?)<\/h2>/);
            const descriptionMatch = block.match(/<p><strong>Description:<\/strong>(.*?)<\/p>/);
            const painPointMatch = block.match(/<p><strong>Pain Point Addressed:<\/strong>(.*?)<\/p>/);
            const coreFunctionalityMatch = block.match(/<p><strong>Core Functionality:<\/strong>(.*?)<\/p>/);

            const title = titleMatch ? titleMatch[1].replace(/^\d+\.\s*/, '').trim() : 'Unknown Title';
            const description = descriptionMatch ? descriptionMatch[1].trim() : 'No Description';
            const painPoint = painPointMatch ? painPointMatch[1].trim() : 'No Pain Point';
            const coreFunctionality = coreFunctionalityMatch ? coreFunctionalityMatch[1].trim() : 'No Core Functionality';

            const slug = title.toLowerCase()
                                .replace(/[^a-z0-9\s-]/g, '')
                                .replace(/\s+/g, '-')
                                .replace(/-+/g, '-')
                                .replace(/^-+|-+$/g, '');

            toolSpecs.push({
                title,
                slug,
                description,
                painPoint,
                coreFunctionality,
            });
        }
        return toolSpecs;
    } catch (error) {
        console.error('Error reading tool specifications:', error);
        return [];
    }
}

async function generateTool(toolSpec) {
    console.log(`Generating tool: ${toolSpec.title} (${toolSpec.slug})`);

    const toolDir = path.join(TOOLS_DIR, toolSpec.slug);
    await fs.promises.mkdir(toolDir, { recursive: true });

    const toolComponentName = toolSpec.slug.replace(/-/g, '').split('').map((char, i) => i === 0 ? char.toUpperCase() : char).join('');

    // A. UI Form (index.tsx) & B. JS Logic (within index.tsx) & G. Analytics Log (ToolOpened, ToolSubmitted)
    let indexTsxContent = await fs.promises.readFile(path.join(TEMPLATES_DIR, 'index.tsx.template'), 'utf8');
    indexTsxContent = indexTsxContent.replace(/{{ToolComponentName}}/g, toolComponentName);
    indexTsxContent = indexTsxContent.replace(/{{tool_slug}}/g, toolSpec.slug);
    indexTsxContent = indexTsxContent.replace(/{{tool_title}}/g, toolSpec.title);
    indexTsxContent = indexTsxContent.replace(/{{tool_description}}/g, toolSpec.description);
    await fs.promises.writeFile(path.join(toolDir, 'index.tsx'), indexTsxContent);

    // C. Storage (API route for saving results)
    let saveResultApiContent = await fs.promises.readFile(path.join(TEMPLATES_DIR, 'save-result.ts.template'), 'utf8');
    saveResultApiContent = saveResultApiContent.replace(/{{tool_slug}}/g, toolSpec.slug);
    await fs.promises.writeFile(path.join(API_DIR, `save-${toolSpec.slug}-result.ts`), saveResultApiContent);

    // D. Result Page (dynamic route + API route) & E. Lead Capture (API route + integration) & G. Analytics Log (ToolResultViewed, LeadCaptured)
    let resultPageContent = await fs.promises.readFile(path.join(TEMPLATES_DIR, 'result-page.tsx.template'), 'utf8');
    resultPageContent = resultPageContent.replace(/{{ToolComponentName}}/g, toolComponentName);
    resultPageContent = resultPageContent.replace(/{{tool_slug}}/g, toolSpec.slug);
    resultPageContent = resultPageContent.replace(/{{tool_title}}/g, toolSpec.title);
    resultPageContent = resultPageContent.replace(/{{tool_description}}/g, toolSpec.description);
    await fs.promises.mkdir(path.join(TOOLS_DIR, 'results', toolSpec.slug), { recursive: true });
    await fs.promises.writeFile(path.join(TOOLS_DIR, 'results', toolSpec.slug, '[id].tsx'), resultPageContent);

    // D. Result Page (API route for fetching results)
    let getResultApiContent = await fs.promises.readFile(path.join(TEMPLATES_DIR, 'get-result.ts.template'), 'utf8');
    getResultApiContent = getResultApiContent.replace(/{{tool_slug}}/g, toolSpec.slug);
    await fs.promises.mkdir(path.join(API_DIR, `get-${toolSpec.slug}-result`), { recursive: true });
    await fs.promises.writeFile(path.join(API_DIR, `get-${toolSpec.slug}-result`, '[id].ts'), getResultApiContent);

    // F. Audit File (tool_slug.audit.json)
    const auditContent = {
        tool_slug: toolSpec.slug,
        audit_date: new Date().toISOString().split('T')[0],
        seo_audit: {
            title_tag: `${toolSpec.title} - Calculator`,
            meta_description: toolSpec.description,
            keywords: `${toolSpec.slug.replace(/-/g, ', ')}, calculator, estimator`,
            h1_present: true,
            url_structure: `/tools/${toolSpec.slug}`,
            canonical_tag: `https://yourdomain.com/tools/${toolSpec.slug}`
        },
        cro_audit: {
            cta_clarity: "To be assessed",
            form_ease_of_use: "To be assessed",
            mobile_responsiveness: "Assumed High - Using Tailwind CSS for responsive design.",
            page_load_speed_estimate: "Good - Minimal assets, client-side calculation."
        },
        ux_audit: {
            intuitive_navigation: "To be assessed",
            feedback_mechanisms: "To be assessed",
            visual_appeal: "Basic - Tailwind CSS default styling.",
            accessibility_considerations: "Basic - Standard HTML elements, no specific ARIA attributes yet."
        },
        marketing_suggestions: [
            `Promote ${toolSpec.title} on relevant industry platforms.`,
            `Create blog content around "${toolSpec.painPoint}" linking to the tool.`
        ]
    };
    await fs.promises.writeFile(path.join(AUDIT_DIR, `${toolSpec.slug}.audit.json`), JSON.stringify(auditContent, null, 2));

    // H. Integration (Footer + Header/Menu)
    // Update Footer.tsx
    const footerPath = path.join(COMPONENTS_DIR, 'Footer.tsx');
    let footerContent = await fs.promises.readFile(footerPath, 'utf8');
    const footerLink = `              <li><Link href="/tools/${toolSpec.slug}" className="hover:text-white transition">${toolSpec.title}</Link></li>`;
    const footerToolsSectionRegex = /(<h3 className="text-white font-semibold mb-4">Tools<\/h3>\n\s*<ul className="space-y-2">)/;
    if (!footerContent.includes(footerLink)) {
        footerContent = footerContent.replace(footerToolsSectionRegex, `$1\n${footerLink}`);
        await fs.promises.writeFile(footerPath, footerContent);
    }

    // Update app/page.tsx (homepage pre-login menu)
    const homepagePath = path.join(APP_DIR, 'page.tsx');
    let homepageContent = await fs.promises.readFile(homepagePath, 'utf8');
    const homepageLink = `                  <Link href="/tools/${toolSpec.slug}" className="inline-block bg-white text-teal-600 border-2 border-teal-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-teal-50 transition">
                    ${toolSpec.title}
                  </Link>`;
    const homepageBlogLinkSectionRegex = /(<div className="flex flex-col sm:flex-row justify-center gap-4">\n\s*<Link href="\/blog" className="inline-block bg-teal-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-teal-700 shadow-lg transform hover:-translate-y-1 transition">\n\s*Browse Blog\n\s*<\/Link>\n\s*<Link href="\/blog\/post" className="inline-block bg-white text-teal-600 border-2 border-teal-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-teal-50 transition">\n\s*Read Latest Post\n\s*<\/Link>)/;
    if (!homepageContent.includes(homepageLink)) {
        homepageContent = homepageContent.replace(homepageBlogLinkSectionRegex, `$1\n${homepageLink}`);
        await fs.promises.writeFile(homepagePath, homepageContent);
    }

    console.log(`Generated all files and integrated for ${toolSpec.title}`);

    // Remove the built tool from tool_specs.html
    let toolSpecsHtmlContent = await fs.promises.readFile(TOOL_SPECS_PATH, 'utf8');
    // Escape special characters in the title for regex
    const escapedTitle = toolSpec.title.replace(/[.*+?^${}()|[\\]/g, '\\$&');
    const regex = new RegExp(`\s*<div class="tool-spec">\s*<h2>\d+\.\s*${escapedTitle}<\/h2>.*?<\/div>\s*`, 's');
    toolSpecsHtmlContent = toolSpecsHtmlContent.replace(regex, '');
    await fs.promises.writeFile(TOOL_SPECS_PATH, toolSpecsHtmlContent);
    console.log(`Removed ${toolSpec.title} from tool_specs.html`);
}

async function runToolScheduler() {
    console.log('Running ToolScheduler...');

    const existingToolSlugs = await getExistingToolSlugs();
    console.log('Existing Tool Slugs:', existingToolSlugs);
    const toolSpecs = await getToolSpecs();
    console.log('Tool Specs Slugs:', toolSpecs.map(spec => spec.slug));

    const unbuiltTools = toolSpecs.filter(spec => !existingToolSlugs.includes(spec.slug));

    if (unbuiltTools.length > 0) {
        const nextToolToBuild = unbuiltTools[0];
        console.log(`Found next tool to build: ${nextToolToBuild.title}`);
        await generateTool(nextToolToBuild);
    } else {
        console.log('All tools from specifications have been built.');
    }

    console.log('ToolScheduler finished.');
}

runToolScheduler();


const fsSync = require('fs');
const fs = require('fs/promises');
const path = require('path');

// List of tool ideas based on existing blog posts


class ToolScheduler {
    constructor() {
        this.toolsDirectory = path.join(__dirname, '../tools');
        this.blogsDirectory = path.join(__dirname, '../blogs');
        this.resultsDirectory = path.join(__dirname, '../tools/results');
        this.leadsFilePath = path.join(__dirname, '../data/prelogin_leads/leads.json');
        this.dynamicToolIdeas = []; // Initialize dynamic tool ideas
    }

    async integrateAllExistingTools() {
        console.log('Integrating all existing tools into homepage and footer...');
        const existingToolSlugs = fsSync.readdirSync(this.toolsDirectory, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

        for (const slug of existingToolSlugs) {
            await this.integrateTool(slug);
        }
        console.log('Finished integrating all existing tools.');
    }

    async generateNewToolIdeas() {
        console.log('Generating new tool ideas from blog posts...');
        const blogFiles = await fs.readdir(this.blogsDirectory);
        let potentialKeywords = new Set();

        for (const file of blogFiles) {
            if (file.endsWith('.html')) {
                const filePath = path.join(this.blogsDirectory, file);
                const content = await fs.readFile(filePath, 'utf8');
                // Simple regex to extract potential keywords from titles or headings
                const matches = content.match(/<h[1-3][^>]*>(.*?)<\/h[1-3]>/g);
                if (matches) {
                    matches.forEach(match => {
                        const text = match.replace(/<h[1-3][^>]*>|<\/h[1-3]>/g, '').trim();
                        if (text.length > 5 && !text.includes('Tool Alert') && !text.includes('Progress Report')) {
                            potentialKeywords.add(this.toSlug(text));
                        }
                    });
                }
            }
        }

        // Filter out existing tools
        const existingToolSlugs = fsSync.readdirSync(this.toolsDirectory, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

        this.dynamicToolIdeas = Array.from(potentialKeywords).filter(idea => !existingToolSlugs.includes(idea));
        console.log(`Generated ${this.dynamicToolIdeas.length} new tool ideas.`);
    }

    toSlug(text) {
        return text.toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric chars
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(/^-+|-+$/g, ''); // Trim - from start and end
    }

    async generateTool() {
        if (this.dynamicToolIdeas.length === 0) {
            await this.generateNewToolIdeas();
        }
        const toolSlug = this.getNextToolSlug();
        if (!toolSlug) {
            console.log('All tools have been created or no new ideas generated.');
            return;
        }

        console.log(`Generating tool: ${toolSlug}`);

        this.generateToolUI(toolSlug);
        this.generateToolLogic(toolSlug);
        this.generateResultPage(toolSlug);
        this.generateAuditBlog(toolSlug);
        await this.integrateTool(toolSlug);
    }

    getNextToolSlug() {
        // Logic to determine the next tool to create from dynamic ideas
        if (this.dynamicToolIdeas.length > 0) {
            const nextTool = this.dynamicToolIdeas.shift(); // Get and remove the first idea
            const toolPath = path.join(this.toolsDirectory, nextTool);
            if (!fsSync.existsSync(toolPath)) {
                return nextTool;
            }
        }
        return null;
    }

    generateToolUI(slug) {
        const toolPath = path.join(this.toolsDirectory, slug);
        if (!fsSync.existsSync(toolPath)) {
            fsSync.mkdirSync(toolPath, { recursive: true });
        }
        const uiFilePath = path.join(toolPath, 'index.html');
        const content = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.toTitleCase(slug)}</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <h1>${this.toTitleCase(slug)}</h1>
    <form id="tool-form">
        <!-- Input fields will be added here -->
        <button type="submit">Calculate</button>
    </form>
    <script src="${slug}/script.js"></script>
</body>
</html>`;
        fsSync.writeFileSync(uiFilePath, content);
        console.log(`Generated UI for ${slug}`);
    }

    generateToolLogic(slug) {
        const toolPath = path.join(this.toolsDirectory, slug);
        const logicFilePath = path.join(toolPath, 'script.js');
        const content = `
document.getElementById('tool-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Logic will be added here
    console.log('Form submitted for ${slug}');
    // Redirect to results page
    window.location.href = '/tools/results/${slug}-result.html';
});
`;
        fsSync.writeFileSync(logicFilePath, content);
        console.log(`Generated logic for ${slug}`);
    }

    generateResultPage(slug) {
        if (!fsSync.existsSync(this.resultsDirectory)) {
            fs.mkdirSync(this.resultsDirectory, { recursive: true });
        }
        const resultFilePath = path.join(this.resultsDirectory, `${slug}-result.html`);
        const content = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Result for ${this.toTitleCase(slug)}</title>
    <meta name="description" content="Calculation results for ${this.toTitleCase(slug)}.">
    <meta property="og:title" content="Result for ${this.toTitleCase(slug)}">
    <meta property="og:description" content="Calculation results for ${this.toTitleCase(slug)}.">
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <h1>Result</h1>
    <div id="result-container">
        <!-- Results will be displayed here -->
    </div>
    <div id="lead-capture">
        <h2>Get more tools like this</h2>
        <form id="lead-form">
            <input type="email" id="email" placeholder="Enter your email" required>
            <button type="submit">Subscribe</button>
        </form>
    </div>
    <script>
        document.getElementById('lead-form').addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            // Save lead
            console.log('Lead captured:', email);
        });
    </script>
</body>
</html>`;
        fsSync.writeFileSync(resultFilePath, content);
        console.log(`Generated result page for ${slug}`);
    }

    generateAuditBlog(slug) {
        const blogFilePath = path.join(this.blogsDirectory, `${slug}-tool-audit.html`);
        const content = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Tool: ${this.toTitleCase(slug)}</title>
    <meta name="description" content="Learn about our new ${this.toTitleCase(slug)} tool for construction professionals.">
</head>
<body>
    <h1>New Tool Alert: ${this.toTitleCase(slug)}</h1>
    <p>We've just launched a new tool to help you with your construction calculations: the ${this.toTitleCase(slug)}.</p>
    <p>This tool is designed to solve [problem] for [target audience]. You can use it to...</p>
    <a href="/tools/${slug}/index.html">Try it now!</a>
</body>
</html>`;
        fsSync.writeFileSync(blogFilePath, content);
        console.log(`Generated audit blog for ${slug}`);
    }

    async integrateTool(slug) {
        const footerPath = path.join(__dirname, '../frontend/src/components/Footer.tsx');
        const homePagePath = path.join(__dirname, '../frontend/src/app/page.tsx');
        const toolTitle = this.toTitleCase(slug);
        const toolLink = `/tools/${slug}/index.html`;

        // Update Footer.tsx
        let footerContent = await fs.readFile(footerPath, 'utf8');
        const footerLinkHtml = `              <li><Link href="${toolLink}" className="hover:text-white transition">${toolTitle}</Link></li>`;
        const footerToolsSectionRegex = /(<h3 className="text-white font-semibold mb-4">Tools<\/h3>\n\s*<ul className="space-y-2">)/;
        if (!footerContent.includes(footerLinkHtml)) {
            footerContent = footerContent.replace(footerToolsSectionRegex, `$1\n${footerLinkHtml}`);
            await fs.writeFile(footerPath, footerContent);
            console.log(`Integrated ${slug} into Footer.tsx`);
        } else {
            console.log(`${slug} already integrated into Footer.tsx`);
        }

        // Update app/page.tsx (homepage pre-login menu)
        let homePageContent = await fs.readFile(homePagePath, 'utf8');
        const toolCardHtml = `
              <div className="bg-slate-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">${toolTitle}</h3>
                <p className="mb-4">Estimate various aspects for your construction projects.</p>
                <Link href="${toolLink}" className="text-teal-600 font-medium">
                  Use Calculator →
                </Link>
              </div>`;
        const homePageToolsSectionRegex = /(<div className="my-16">\n\s*<h2 className="text-3xl font-bold text-center mb-8">Free Tools for Contractors<\/h2>\n\s*<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">)/;
        
        if (!homePageContent.includes(toolCardHtml)) {
            // Find the closing div of the first grid and insert before it
            const closingDivRegex = /(<\/div>\n\s*<\/div>\n\s*<\/div>\n\s*<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">)/;
            homePageContent = homePageContent.replace(closingDivRegex, `${toolCardHtml}\n              $1`);
            await fs.writeFile(homePagePath, homePageContent);
            console.log(`Integrated ${slug} into app/page.tsx`);
        } else {
            console.log(`${slug} already integrated into app/page.tsx`);
        }
    }

    toTitleCase(str) {
        return str.replace(/-/g, ' ').replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
}

// This would be run by a cron job
const scheduler = new ToolScheduler();
scheduler.generateTool();
scheduler.integrateAllExistingTools();

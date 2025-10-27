
const fs = require('fs');
const path = require('path');

class PSEOEngine {
    constructor() {
        this.blogsDirectory = path.join(__dirname, '../blogs');
        this.toolsDirectory = path.join(__dirname, '../tools');
    }

    run() {
        console.log('Running PSEO Engine...');
        const blogFiles = fs.readdirSync(this.blogsDirectory).filter(file => file.endsWith('.html'));
        const availableTools = this.getAvailableTools();

        for (const blogFile of blogFiles) {
            this.addRelatedToolsSection(blogFile, availableTools);
        }
    }

    getAvailableTools() {
        if (!fs.existsSync(this.toolsDirectory)) {
            return [];
        }
        const toolDirs = fs.readdirSync(this.toolsDirectory, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
        return toolDirs;
    }

    addRelatedToolsSection(blogFile, availableTools) {
        const blogFilePath = path.join(this.blogsDirectory, blogFile);
        let content = fs.readFileSync(blogFilePath, 'utf8');

        if (content.includes('<h2>Related Tools</h2>')) {
            console.log(`Skipping ${blogFile}, already has related tools section.`);
            return;
        }

        if (availableTools.length === 0) {
            return;
        }

        let relatedToolsHtml = '\n<h2>Related Tools</h2>\n<ul>';
        for (const tool of availableTools) {
            const toolName = this.toTitleCase(tool);
            relatedToolsHtml += `<li><a href="/tools/${tool}/index.html">${toolName}</a></li>`;
        }
        relatedToolsHtml += '</ul>';

        // Add before the closing body tag
        content = content.replace('</body>', `${relatedToolsHtml}\n</body>`);

        fs.writeFileSync(blogFilePath, content);
        console.log(`Added related tools section to ${blogFile}`);
    }

    toTitleCase(str) {
        return str.replace(/-/g, ' ').replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
}

const engine = new PSEOEngine();
engine.run();

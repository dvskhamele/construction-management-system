
const fs = require('fs');
const path = require('path');

class AutoReport {
    constructor() {
        this.blogsDirectory = path.join(__dirname, '../blogs');
        this.toolsDirectory = path.join(__dirname, '../tools');
        this.pagesDirectory = path.join(__dirname, '../frontend/pages');
    }

    run() {
        console.log('Running Auto Report...');
        const today = new Date();
        const dateStr = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
        const reportTitle = `Weekly Progress Report - ${dateStr}`;
        const reportSlug = `weekly-progress-report-${dateStr}`;
        const reportFilePath = path.join(this.blogsDirectory, `${reportSlug}.html`);

        const createdTools = this.getCreatedTools();
        const createdPages = this.getCreatedPages();
        const createdBlogs = this.getCreatedBlogs();

        let reportContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${reportTitle}</title>
    <meta name="description" content="Weekly progress report for the autonomous engineering agent.">
</head>
<body>
    <h1>${reportTitle}</h1>
    
    <h2>New Tools Created</h2>
    ${this.generateList(createdTools)}

    <h2>New Pages Generated</h2>
    ${this.generateList(createdPages)}

    <h2>New Blog Posts Created</h2>
    ${this.generateList(createdBlogs)}

</body>
</html>`;

        fs.writeFileSync(reportFilePath, reportContent);
        console.log(`Generated report: ${reportSlug}.html`);
    }

    getCreatedTools() {
        if (!fs.existsSync(this.toolsDirectory)) {
            return [];
        }
        return fs.readdirSync(this.toolsDirectory, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
    }

    getCreatedPages() {
        if (!fs.existsSync(this.pagesDirectory)) {
            return [];
        }
        return fs.readdirSync(this.pagesDirectory)
            .filter(file => file.endsWith('.html'))
            .map(file => file.replace('.html', ''));
    }

    getCreatedBlogs() {
        if (!fs.existsSync(this.blogsDirectory)) {
            return [];
        }
        return fs.readdirSync(this.blogsDirectory)
            .filter(file => file.endsWith('.html'))
            .map(file => file.replace('.html', ''));
    }

    generateList(items) {
        if (items.length === 0) {
            return '<p>None</p>';
        }
        let listHtml = '<ul>';
        for (const item of items) {
            listHtml += `<li>${item}</li>`;
        }
        listHtml += '</ul>';
        return listHtml;
    }
}

const reporter = new AutoReport();
reporter.run();

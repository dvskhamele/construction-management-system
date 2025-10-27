
const fs = require('fs');
const path = require('path');

// Seed keywords for landing pages
const seedKeywords = [
    'construction-project-management-software',
    'construction-bidding-software',
    'construction-accounting-software',
    'construction-crm-software',
    'construction-scheduling-software'
];

class PageScheduler {
    constructor() {
        this.pagesDirectory = path.join(__dirname, '../frontend/pages');
    }

    run() {
        console.log('Running Page Scheduler...');
        if (!fs.existsSync(this.pagesDirectory)) {
            fs.mkdirSync(this.pagesDirectory, { recursive: true });
        }

        for (const keyword of seedKeywords) {
            this.generatePage(keyword);
        }
    }

    generatePage(keyword) {
        const pagePath = path.join(this.pagesDirectory, `${keyword}.html`);

        if (fs.existsSync(pagePath)) {
            console.log(`Skipping ${keyword}, page already exists.`);
            return;
        }

        const title = this.toTitleCase(keyword);
        const content = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="Learn more about ${title} and how it can help your construction business.">
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <h1>${title}</h1>
    <p>This page is about ${title}. We will be adding more content here soon.</p>
</body>
</html>`;

        fs.writeFileSync(pagePath, content);
        console.log(`Generated page for ${keyword}`);
    }

    toTitleCase(str) {
        return str.replace(/-/g, ' ').replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
}

const scheduler = new PageScheduler();
scheduler.run();

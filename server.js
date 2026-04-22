const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 8000;

const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
};

// Map of available datasets (LOCAL PATHS NOW)
const DATASETS = {
    'molecular': './roboBohr.csv',
    'solutions': './solution.csv',
    'healthcare': 'C:\\Users\\ayush\\Downloads\\healthcare_noshows.csv',
    'admission': 'C:\\Users\\ayush\\Downloads\\HDHI Admission data.csv',
    'insurance': 'C:\\Users\\ayush\\Downloads\\insurance.csv'
};

http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    
    // DYNAMIC API ENDPOINT
    if (parsedUrl.pathname === '/api/data') {
        const type = parsedUrl.query.type || 'molecular';
        const csvPath = DATASETS[type];

        if (!csvPath) {
            res.writeHead(400);
            return res.end(JSON.stringify({ error: "Invalid dataset type" }));
        }

        fs.readFile(csvPath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end(JSON.stringify({ error: "Dataset file not found" }));
            }
            const rows = data.split('\n').slice(0, 51).map(line => line.split(','));
            res.writeHead(200, { 
                'Content-Type': 'application/json', 
                'Access-Control-Allow-Origin': '*' 
            });
            res.end(JSON.stringify({ headers: rows[0], data: rows.slice(1) }));
        });
        return;
    }

    let filePath = req.url === '/' || req.url === '' ? './index.html' : '.' + req.url;
    if (filePath.includes('?')) filePath = filePath.split('?')[0];

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(500);
                res.end('Server error: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
}).listen(PORT);

console.log(`Nexus AI Server running at http://localhost:${PORT}/`);

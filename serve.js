const http = require('http');
const fs = require('fs');
const path = require('path');

const sourceDir = process.env.SOURCE_DIR || './';
const _port = process.env.PORT || '';
const port = /[1-9][0-9]*/.test(_port) ? parseInt(_port, 10) : 3000;

const headers = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Request-Method': '*',
	'Access-Control-Allow-Methods': 'OPTIONS, HEAD, GET, POST',
	'Access-Control-Allow-Headers': '*'
};

const server = http.createServer((req, res) => {
	for (const [header, value] of Object.entries(headers)) {
		res.setHeader(header, value);
	}
	if (req.method === 'OPTIONS') {
		res.writeHead(200);
		res.end();
	} else if (req.method === 'GET') {
		try {
			const filePath = path.join(sourceDir, path.dirname(req.url), path.basename(req.url) || 'index.html');
			fs.access(filePath, fs.constants.F_OK | fs.constants.R_OK, (error) => {
				if (error) {
					res.writeHead(404);
					res.end();
				} else {
					res.writeHead(200);
					fs.createReadStream(filePath).pipe(res);
				}
			});
		} catch (e) {
			res.writeHead(404);
			res.end();
		}
	} else {
		res.writeHead(405);
		res.end();
	}
});

server.listen(port, '0.0.0.0');

const http = require('http');
const https = require('https');

function get(url) {
	return new Promise(function (resolve, reject) {
		const request = http.request(
			url,
			{},
			(response) => {
				// console.log(url, 'connect');
				const bulk = [];
				response.on('error', (error) => {
					reject(error);
				});
				response.on('data', (data) => {
					bulk.push(data);
				});
				response.on('end', () => {
					// console.log(url, 'end');
					const {statusCode, statusMessage} = response;
					if (typeof statusCode === 'number' && 200 <= statusCode && statusCode < 300) {
						resolve(JSON.parse(Buffer.concat(bulk).toString('utf8')));
					} else {
						const error = new Error('Request failed');
						error.statusCode = statusCode;
						error.statusMessage = statusMessage;
						error.details = JSON.parse(Buffer.concat(bulk).toString('utf8'));
						reject(error);
					}
				});
			}
		);

		request.on('error', function(error) {
			reject(error);
		});

		request.end();
	})
}

Promise.all([
	get('http://openapi.justin.ua/branch_types'),
	get('http://openapi.justin.ua/tracking_history/201810166'),
	get('http://openapi.justin.ua/tracking_history1/201810167'),
	get('http://openapi.justin.ua/tracking_history/201810168'),
	get('http://127.0.0.1:3010/comments111'),
]).then(
	(results) => {
		console.log('All result', results);
		// console.log('Types', branchTypes);
		// console.log('History', trackingHistory);
	},
	(error) => {
		console.log('All failed', error);
	},
);

Promise.race([
	get('http://openapi.justin.ua/branch_types'),
	get('http://openapi.justin.ua/tracking_history/201810168'),

]).then(
	(results) => {
		console.log('Race result', results);
		// console.log('Types', branchTypes);
		// console.log('History', trackingHistory);
	},
	(error) => {
		console.log('Race failed', error);
	},
);



let branchTypes;
let trackingHistory;
get('http://openapi.justin.ua/branch_types')
	.then((_branchTypes) => {
		branchTypes = _branchTypes;
		return get('http://openapi.justin.ua/tracking_history/201810168');
	})
	.then((_trackingHistory) => {
		trackingHistory = _trackingHistory;
	})
	.then(() => {
		console.log(branchTypes, trackingHistory);
	});


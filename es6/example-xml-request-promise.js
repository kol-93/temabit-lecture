const http = require('http');

function get(url) {
	return new Promise((resolve, reject) => {
		const request = http.request(url, {
			headers: {
				'Accept': 'application/json'
			}
		}, (res) => {
			const bulk = [];
			res.on('data', (data) => {
				bulk.push(data);
			});
			res.on('end', () => {
				let data;
				const {statusCode, statusMessage, headers} = res;
				try {
					data = JSON.parse(Buffer.concat(bulk).toString('utf8'));
				} catch (e) {
					reject(e);
					return;
				}
				if (typeof statusCode === 'number' && 200 <= statusCode && statusCode < 300) {
					resolve(data);
				} else {
					const error = new Error(statusMessage);
					error.statusCode = statusCode;
					error.headers = headers;
					error.body = data;
					reject(error);
				}
			});
			res.on('error', (error) => {
				reject(error)
			});
		});

		request.on('error', (error) => {
			reject(error);
		});
		request.end();
	});
}

Promise.all([
	get('http://openapi.justin.ua/tracking_history/201810165'),
	get('http://openapi.justin.ua/tracking_history/201810166'),
	get('http://openapi.justin.ua/tracking_history/201810167'),
	get('http://openapi.justin.ua/tracking_history/201810168')
	])
.then(
	(result) => {
		console.log('result', JSON.stringify(result, null, 2));
	},
	(error) => {
		console.log('error', error);
	}
)


get('http://openapi.justin.ua/tracking_history/201810165')
	.then((result) => {
		console.log(result);
		return get('http://openapi.justin.ua/tracking_history/201810166');
	})
	.then((result) => {
		console.log(result);
		return get('http://openapi.justin.ua/tracking_history/201810167');
	})
	.then((result) => {
		console.log(result);
		return get('http://openapi.justin.ua/tracking_history/201810168');
	})
	.then((result) => {
		console.log(result);
		return get('http://openapi.justin.ua/branches/220');
	})
	.then((result) => console.log(result));


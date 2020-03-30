const http = require('http');

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

function delay(timeout, value) {
	return new Promise((resolve) => {
		setTimeout(resolve, timeout, value);
	})
}


function* someAsyncFunction(orders) {
	try {
		throw new Error('Hello');
	} catch (e) {
		console.log('First', e);
	} finally {
		console.log('First finally');
	}

	try {
		yield Promise.reject(new Error('Hi'));
	} catch (e) {
		console.log('Second', e);
	} finally {
		console.log('Second finally');
	}

	yield Promise.resolve(42);
	for (const order of orders) {
		try {
			if (order % 3 === 0) {
				throw new Error('FAAAAILEEED');
			}
			if (order % 2 === 0) {
				yield Promise.reject('FAILED2');
			}
			const history = yield get(`http://openapi.justin.ua/tracking_history/${order}`);
			console.log(history);
			yield delay(1000);
		} catch (e) {
			console.warn('Catch', e);
		}
	}
	return Promise.reject(100500);
}

// const it = someAsyncFunction([1,2,3,4, 5])[Symbol.iterator]();

function wrapAsync(generator, args) {
	try {
		const it = generator.apply(null, args)[Symbol.iterator]();
		let resolve, reject;
		const result = new Promise((_resolve, _reject) => {
			resolve = _resolve;
			reject = _reject;
		});

		let value = undefined;
		let failure = undefined;

		function step() {
			try {
				const state = (failure ? it.throw(failure) : it.next(value));
				failure = undefined;
				if (state.done) {
					const newValue = state.value;
					(newValue instanceof Promise ? newValue : Promise.resolve(newValue))
						.then(resolve, reject);
				} else {
					const newValue = state.value;
					(newValue instanceof Promise ? newValue : Promise.resolve(newValue))
						.then(
							(_value) => {
								value = _value;
								process.nextTick(step);
							},
							(error) => {
								value = undefined;
								failure = error;
								process.nextTick(step);
							},
						);
				}
			} catch (error) {
				value = undefined;
				failure = error;
				process.nextTick(step);
				// console.log('ERROR', error);
			}
		}

		process.nextTick(step);
		return result;
	} catch (e) {
		return Promise.reject(e);
	}
}


const result = wrapAsync(someAsyncFunction, [[1,2,3,4,5]]);
result.then(
	(result) => {
		console.log('Result', result);
	},
	(error) => {
		console.log('Error', error);
	}
);

async function someAsyncFunction() {
	for (const x of [1,2,3,4]) {
		const v = await new Promise((resolve) => setTimeout(resolve, 100, x * x));
		console.log('internal', v);
	}
}

function* someAsyncGenerator() {
	try {
		for (const x of [1,2,3,4]) {
			yield x;
			const v = yield new Promise((resolve) => setTimeout(resolve, 100, x * x))
			console.log('internal', v);
		}
		try {
			yield new Promise((resolve, reject) => {
				setTimeout(reject, 100, new Error('error in promise'));
			});
		} catch (e) {
			console.log('in generator', e);
		}
		// throw new Error('Bye bye');
		return new Promise((resolve) => setTimeout(resolve, 1000, 'Hello, world'));
	} finally {
		console.log('Finally');
	}
}

function wrapState(state, step, onerror, resolve, reject) {
	const result = state.value instanceof Promise ? state.value : Promise.resolve(state.value);
	if (state.done) {
		result.then(resolve, reject);
	} else {
		result.then(step, onerror);
	}
}

function wrapGenerator(generator, ...args) {
	return new Promise((resolve, reject) => {
		const iterator = generator(...args)[Symbol.iterator]();
		function onerror(error) {
			try {
				wrapState(iterator.throw(error), step, onerror, resolve, reject);
			} catch (e) {
				reject(e);
			}
		}

		function step(value) {
			try {
				wrapState(iterator.next(value), step, onerror, resolve, reject);
			} catch (e) {
				reject(e);
			}
		}
		Promise.resolve().then(step);
	});
}

wrapGenerator(someAsyncGenerator)
	.then(
		(result) => {
			console.log('DONE', result);
		},
		(error) => {
			console.log('ERROR', error);
		}
	);

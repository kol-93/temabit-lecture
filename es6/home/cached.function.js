function cached(f) {
	const map = new Map();
	return function (n) {
		const result = map.get(n);
		if (result) {
			const {error, value} = result;
			if (error) {
				throw error;
			} else  {
				return value;
			}
		} else {
			try {
				const result = f(n);
				map.set(n, {
					value: result
				});
				return result;
			} catch (e) {
				map.set(n, {
					error: e
				});
				throw e;
			}
		}
	}
}


function cached2(f) {
	const map = new Map();
	return function (n) {
		const result = map.get(n);
		if (typeof result === 'function') {
			return result();
		} else {
			try {
				const result = f(n);
				map.set(n, () => result);
				return result;
			} catch (e) {
				map.set(n, () => {
					throw e;
				});
				throw e;
			}
		}
	}
}


const fi = cached2(
	function (n) {
		if (typeof n !== 'number') {
			throw new TypeError('Number expected');
		}
		if (!Number.isSafeInteger(n)) {
			throw new TypeError('Integer expected');
		}
		if (n < 0) {
			throw new TypeError('Non-negative integer expected');
		}
		if (n === 0 || n === 1) {
			return n;
		} else {
			return fi(n-2) + fi(n-1);
		}
	},
);

// console.log(fi(50));


function testfi(n) {
	try {
		console.log('fi(%o) = %o', n, fi(n));
	} catch (e) {
		console.log('fi(%o) throws %o', n, e);
	}
}


for (const n of [-1, -1, 1, 100, 1.5, 1.5]) {
	testfi(n);
}

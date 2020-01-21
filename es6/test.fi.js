
const cache = new Map();

function fi(n) {
	if (n === 0 || n === 1) {
		return n;
	} else if (cache.has(n)) {
		return cache.get(n);
	} else {
		const result = fi(n-2) + fi(n-1);
		cache.set(n, result);
		return result;
	}
}

for (let i = 0; i !== 100; ++i) {
	const n = 50;
	console.log(n, fi(n));
}


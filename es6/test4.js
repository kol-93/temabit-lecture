function* range(start, stop, step) {
	for (let current = start; current < stop === start < stop; current += step) {
		yield current;
	}
}

function* map(operator, iterable) {
	for (let value of iterable) {
		yield operator(value);
	}
}

const M = new Map(
	map(
		function (x) {
			return [x, x + 1];
		},
		range(9, -1, -1.5)
	)
);

for (const a of M) {
	console.log('pair', a);
}

for (const key of M.keys()) {
	console.log('key', key);
}

for (const value of M.values()) {
	console.log('value', value);
}

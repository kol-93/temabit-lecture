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


function reduce(operator, iterable, initial) {
	let current = initial;
	for (let value of iterable) {
		current = operator(current, value);
	}
	return current;
}

const A = map(
	function (e) {
		return e * e;
	},
	range(0, 10000000000, 1)
);

console.log(
	reduce(
		function (acc, e) {
			return acc + e;
		},
		A,
		0
	),
);

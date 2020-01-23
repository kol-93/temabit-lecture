function* zip(...iterables) {
	const iterators = iterables.map((iterable) => iterable[Symbol.iterator]());
	while (true) {
		let anyDone = iterators.length === 0;
		const states = iterators.map((iterator) => iterator.next());
		for (const {done} of states) {
			if (done) {
				anyDone = done;
				break;
			}
		}
		if (anyDone) {
			return;
		}
		yield states.map(({value}) => value);
	}
}

function* generate(value) {
	while (true) {
		yield value;
	}
}

function* range(start, stop, step) {                                                // Оголошення функції-генератора
	for (let current = start; current < stop === start < stop; current += step) {
		yield current;                                                              // Видача "поточного" значення
	}
}

const iterable = ['a', 'b', 'c'];

function* starMap(operator, ...iterables) {
	const iterable = zip(...iterables);
	for (const value of iterable) {
		yield operator.apply(null, value);
	}
}

console.log(Array.from(
	starMap(
		(value, index, array) => {
			console.log('it', value, index, array);
			return value + value;
		},
		iterable,
		range(0, +Infinity, 1),
		generate(iterable)
	),
));

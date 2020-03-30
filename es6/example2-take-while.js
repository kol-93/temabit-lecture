const A = [1,3,3,5,6,7,889];

function* map(operator, iterable) {
	for (let value of iterable) {
		yield operator(value);
	}
}

function* takeWhile(operator, iterable) {
	for (let value of iterable) {
		if (operator(value)) {
			yield value;
		} else {
			break;
		}
	}
}

const takeCondition = (x) => x % 2 === 1;
const mapping = (x) => { console.log('mapping', x); return x * x; };

const newA =
	map(
		mapping,
		takeWhile(
			takeCondition,
			A
		)
	);

for (const value of newA) {
	console.log('result', value);
}

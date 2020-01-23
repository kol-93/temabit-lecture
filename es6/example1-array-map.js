const A = [1,2,3,3,5,6,7,889];
/*
A.map(
	function (x, index, array) {
		return x * x;
	},
	null,
);
*/

function map(array, operator, thisArg) {
	const result = [];
	thisArg = thisArg !== undefined ? thisArg : this;
	for (let i = 0; i !== array.length; ++i) {
		const item = array[i];
		const newItem = operator.call(thisArg, item, i, array);
		result.push(newItem);
	}
	return result;
}

function filter(array, operator, thisArg) {
	const result = [];
	thisArg = thisArg !== undefined ? thisArg : this;
	for (let i = 0; i !== array.length; ++i) {
		const item = array[i];
		if (operator.call(thisArg, item, i, array)) {
			result.push(item);
		}
	}
	return result;
}

function reduce(array, operator, initialValue, thisArg) {
	let value = initialValue;
	thisArg = thisArg !== undefined ? thisArg : this;
	for (let i = 0; i !== array.length; ++i) {
		const item = array[i];
		value = operator.call(thisArg, value, item);
	}
	return value;
}

function slice(array, from, to) {
	function operator(item, index, array) {
		return from <= index && index < to;
	}
	return filter(array, operator);
}

function splice(array, from, to) {
	const sub = [];
	for (let i = array.length - 1; i >= from; --i) {
		if (to <= i) {
			sub.push(array.pop());
		} else {
			array.pop();
		}
	}
	while (sub.length) {
		array.push(sub.pop());
	}
}

function* map(operator, iterable) {
	for (let value of iterable) {
		yield operator(value);
	}
}

const newA = map((x) => {
	console.log(x);
	return x * x;
}, A);

for (const value of newA) {
	console.log(value);
	break;
}

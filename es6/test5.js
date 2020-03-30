function* map(operator, ...iterables) {
	for (let value of iterables) {

	}
}

const result = map(
	function (a, b, c) {
		return (a + b) *c;
	},
	[1,   2,  3,  4,  5, 6],
	[10, 20, 30, 40, 50, 7],
	[1,  -1,  1, -2,  3]
);

console.log(Array.from(result));
// [11, -22, 33, -88, 165]

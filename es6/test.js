const X = {
	a: 1,
	b: 2,
	c: 3,
};

const Y = Object.create(X);
Y.d = 4;
Y.a = 111;

for (const y in Y) {
	console.log(y, Y[y]);
}

const A = ['a', 'b', 'c', 'd', 'e'];
for (const a in A) {
	console.log(a, A[a]);
}

for (const x of A) {
	console.log(x);
}

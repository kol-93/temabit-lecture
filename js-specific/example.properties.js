function logAndEval(code) { console.log('%s ===> %o', code, eval(code)); }

const X = { x: 10, y: 20, };
const Y = { y: 20, x: 10, };
X[0] = 0;
X[2] = 0;

Y[1] = 42;
Y[0] = 43;
Y[Symbol('bla')] = 'bla';

Object.defineProperty(X, 'z', {
	value: 'z',
	enumerable: false,
	configurable: false,
	writable: true,
});

Object.defineProperties(Y, {
	z: {
		value: 'z',
		enumerable: false,
		configurable: true,
		writable: false,
	},
	a: {
		enumerable: false,
		configurable: true,
		get() {
			return this.x + ' ' + this.y;
		},
		set(value) {
			var subvalues = ('' + value).split(' ');
			this.x  = subvalues[0];
			this.y = subvalues.slice(1).join(' ');
		}
	}
});

for (let prop in X) {
	console.log('X has %s', prop);
}
for (let prop in Y) {
	console.log('Y has %s', prop);
}
logAndEval('X.z');
logAndEval('Y.z');
logAndEval('X.z = 10');
logAndEval('Y.z = 10');
logAndEval('X.z');
logAndEval('Y.z');
logAndEval('delete X.z');
logAndEval('delete Y.z');
logAndEval('X.z');
logAndEval('Y.z');
logAndEval('Y.a');
logAndEval('Y.a = "10 basd"');
logAndEval('Y.a');
logAndEval('Y.x');
logAndEval('Y.y');
for (let prop in X) {
	console.log('X has %s', prop);
}
for (let prop in Y) {
	console.log('Y has %s', prop);
}

logAndEval('Object.getOwnPropertyDescriptors(Y)');
logAndEval('Object.getOwnPropertyDescriptor(Y, "a")');
logAndEval('Object.entries(Y)');
logAndEval('Object.freeze(Y), Object.getOwnPropertyDescriptors(Y)');

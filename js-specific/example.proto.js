function logAndEval(code) { console.log('%s ===> %j', code, eval(code)); }

const Prototype = {
	fieldA: 'hello',
	fieldB: 'world',
	someMethod() {
		return this.fieldA + ' ' + this.fieldB;
	}
};

const X = Object.create(Prototype);
X.fieldA = 'Bla bla bla';
X.someMethod1 = function someMethod1() {
	return this.fieldA + '+' + this.fieldB;
};
X.someMethod = function someMethod() {
	return 'X says: ' + Object.getPrototypeOf(this).someMethod.call(this);
};

const Y = Object.create(Prototype);
Y.fieldA = 'This is Y';
Y.someMethod = function someMethod() {
	return 'Y says: ' + this.__proto__.someMethod.call(this);
};

const Z = Object.create(Prototype);
Z.fieldA = 'This is Z';

logAndEval('Prototype.fieldA');
logAndEval('X.fieldA');
logAndEval('X.someMethod()');
logAndEval('Y.someMethod()');
logAndEval('Z.someMethod()');

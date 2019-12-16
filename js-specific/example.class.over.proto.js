function logAndEval(code) { console.log('%s ===> %o', code, eval(code)); }

var Base = (function (BaseClass) {
	function Class() {
		if (!(this instanceof Class)) {
			throw new TypeError('Base() must be called with new operator');
		}
		BaseClass.apply(this, arguments);
	}

	Class.someStaticMethod = function someStaticMethod() {
		return 'Hello, world! ' + this.staticField;
	};

	Class.staticField = 42;
	Object.setPrototypeOf(Class, BaseClass);
	Class.prototype = Object.create(BaseClass.prototype);

	Class.prototype.someMethod = function someMethod() {
		return this.fieldA + ' ' + this.fieldB;
	};
	Class.prototype.fieldA = 'hello';
	Class.prototype.fieldB = 'world';
	return Class;
})(Object);

function Derived() {
	if (!(this instanceof Derived)) {
		throw new TypeError('Derived() must be called with new operator');
	}
	Base.call(this);
}

Object.setPrototypeOf(Derived, Base);
Derived.someStaticMethod = function someStaticMethod() {
	return 'Derived static: ' + Object.getPrototypeOf(this).someStaticMethod.call(this);
};
Derived.prototype = Object.create(Base.prototype);
Derived.prototype.someMethod = function someMethod() {
	return 'Derived says: ' + Object.getPrototypeOf(Object.getPrototypeOf(this)).someMethod.call(this);
};

Derived.prototype.someMethod2 = function() {
	return 'Some method 2: ' + Object.getPrototypeOf(Object.getPrototypeOf(this)).fieldA;
};

Derived.prototype.someMethod3 = function () {
	return 'Some method 3: ' + Object.getPrototypeOf(Object.getPrototypeOf(this)).fieldA;
};

const A = new Base();
const B = new Derived();
B.fieldA = 'This is B: ';
const C = Object.create(Derived.prototype);
Derived.call(C);


// logAndEval('Object.getOwnPropertyDescriptors(Base)');
// logAndEval('Object.getOwnPropertyDescriptors(Base.prototype)');
logAndEval('Object.getPrototypeOf(Base) === Object');
logAndEval('Object.getPrototypeOf(Base.prototype) === Object.prototype');
logAndEval('Derived.someStaticMethod()');
logAndEval('A.someMethod()');
logAndEval('B.someMethod()');
logAndEval('B.someMethod2()');
logAndEval('B.someMethod3()');
logAndEval('C.someMethod()');
logAndEval('C.someMethod2()');
logAndEval('C.someMethod3()');
logAndEval('A instanceof Object');
logAndEval('A instanceof Base');
logAndEval('A instanceof Derived');
logAndEval('B instanceof Object');
logAndEval('B instanceof Base');
logAndEval('B instanceof Derived');
logAndEval('C instanceof Object');
logAndEval('C instanceof Base');
logAndEval('C instanceof Derived');


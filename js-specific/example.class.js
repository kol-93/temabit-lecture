function logAndEval(code) { console.log('%s ===> %j', code, eval(code)); }

class Base {
	static someStaticMethod() {
		return 'Hello, world! ' + this.staticField;
	}

	constructor() {
	}

	someMethod() {
		return  this.fieldA + ' ' + this.fieldB;
	}
}
Base.staticField = 42;
Base.prototype.fieldA = 'hello';
Base.prototype.fieldB = 'world';

class Derived extends Base {

	static someStaticMethod() {
		return 'Derived static: ' + super.someStaticMethod();
	}

	constructor() {
		super();
	}

	someMethod() {
		return 'Derived says: ' + super.someMethod();
	}

	someMethod2() {
		return 'Some method 2: ' + Object.getPrototypeOf(this).fieldA;
	}

	someMethod3() {
		return 'Some method 3: ' + super.fieldA;
	}
}

const A = new Base();
const B = new Derived();
const C = Object.create(Derived.prototype);
Derived.call(C);
B.fieldA = 'This is B: ';
logAndEval('Derived.someStaticMethod()');
logAndEval('A.someMethod()');
logAndEval('B.someMethod()');
logAndEval('B.someMethod2()');
logAndEval('B.someMethod3()');
logAndEval('A instanceof Object');
logAndEval('A instanceof Base');
logAndEval('A instanceof Derived');
logAndEval('B instanceof Object');
logAndEval('B instanceof Base');
logAndEval('B instanceof Derived');

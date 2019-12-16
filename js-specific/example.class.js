function logAndEval(code) { console.log('%s ===> %j', code, eval(code)); }

class Base {
	static someStaticMethod() {
		return 'Hello, world! ' + this.staticField;
	}

	constructor() {
		this.X = 10;
	}

	someMethod() {
		return this.fieldA + ' ' + this.fieldB;
	}

	get fieldC() {
		return this.fieldA + '+' + this.fieldB;
	}

	set fieldC(value) {
		var values = ('' + value).split('+');
		this.fieldA = values[0];
		this.fieldB = values[1];
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

	someMethod4() {
		return this.constructor.someStaticMethod();
	}

	someMethod5() {
		return Derived.someStaticMethod();
	}
}

class MoreDerived extends Derived {
	static someStaticMethod() {
		return 'More Derived static: ' + super.someStaticMethod();
	}
}

Derived.prototype.fieldA = 'Prototype of Derived';

const A = new Base();
logAndEval('A.fieldC');
logAndEval('A.fieldC = "A + B"');
logAndEval('A.fieldA');
logAndEval('A.fieldB');

const B = new Derived();

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

const C = new MoreDerived();
logAndEval('C.someMethod4()');
logAndEval('C.someMethod5()');

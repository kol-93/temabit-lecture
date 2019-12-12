function logAndEval(code) { console.log('%s ===> %o', code, eval(code)); }

function isInstanceOf(instance, BaseClass) {
	for (var proto = Object.getPrototypeOf(instance); proto !== null; proto = Object.getPrototypeOf(proto)) {
		if (proto === BaseClass.prototype) {
			return true;
		}
	}
	return false;
}

class Base {
	static [Symbol.hasInstance](instance) {
		return true;
	}
}

class Derived extends Base {

}

logAndEval('[] instanceof Array');
logAndEval('isInstanceOf([], Array)');
logAndEval('[] instanceof Function');
logAndEval('isInstanceOf([], Function)');
logAndEval('({}) instanceof Function');
logAndEval('isInstanceOf({}, Function)');
logAndEval('(new Derived) instanceof Base');
logAndEval('isInstanceOf(new Derived, Base)');
logAndEval('({}) instanceof Base');

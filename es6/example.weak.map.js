
// const _Person = new WeakMap();
const Person = (function () {
	const PersonFirstName = Symbol('firstName');
	const PersonLastName = Symbol('lastName');

	class Person {
		constructor(firstName, lastName) {
			this[PersonFirstName] = firstName;
			this[PersonLastName] = lastName;
		}

		get firstName() {
			return this[PersonFirstName];
		}

		get lastName() {
			return this[PersonLastName];
		}

		get fullName() {
			return this.firstName + ' ' + this.lastName;
		}
	}
	return Person;
})();


const StrongPerson = (function () {
	const _storage = new WeakMap();
	class Person {
		constructor(firstName, lastName) {
			_storage.set(this, {
				firstName,
				lastName,
			});
		}

		get firstName() {
			return _storage.get(this).firstName;
		}

		get lastName() {
			return _storage.get(this).lastName;
		}

		get fullName() {
			return this.firstName + ' ' + this.lastName;
		}
	}
	return Person;
})();


const p = new Person('Vasya', 'Pupkin');

console.log(Object.keys(p));
p.firstName = 'Tolya';
console.log(p.firstName);
console.log(p.lastName);
console.log(p.fullName);
console.log(Object.getOwnPropertySymbols(p).reduce((acc, symbol) => {
	acc[symbol] = p[symbol];
	return acc;
}, {}));


Object.getOwnPropertySymbols(p).forEach((symbol) => {
	p[symbol] = 'Blablabla';
});
console.log(p.firstName);
console.log(p.lastName);
console.log(p.fullName);


const p2 = new StrongPerson('Vasya', 'Pupkin');
Object.getOwnPropertySymbols(p2).forEach((symbol) => {
	p2[symbol] = 'Blablabla';
});
console.log(p2.firstName);
console.log(p2.lastName);
console.log(p2.fullName);

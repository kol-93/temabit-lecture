class BaseError extends Error {
	constructor(message, name) {
		super(message);
		this.name = name || this.constructor.name;
	}
}

class NotImplemented extends BaseError {
	constructor(what) {
		super(what + ' is not fully implemented');
		this.what = what;
	}
}

const PropertiesMeta = Symbol('properties');

class AShape {
	constructor(name) {
		if (this.constructor === AShape) {
			throw new NotImplemented('class ' + this.constructor.name);
		}
		this.name = name;
	}

	get [PropertiesMeta]() {
		const propsMeta = {};
		for (let proto = Object.getPrototypeOf(this); proto; proto = Object.getPrototypeOf(proto)) {
			const descriptors = Object.getOwnPropertyDescriptors(proto);
			for (let name in descriptors) {
				if (typeof name === 'symbol') {
					continue;
				}
				if (propsMeta.hasOwnProperty(name)) {
					continue;
				}
				const desc = descriptors[name];
				if (typeof desc.value === 'function') {
					continue;
				}
				if (typeof desc.get === 'function' || typeof desc.set === 'function') {
					propsMeta[name] = {
						get: typeof desc.get === 'function',
						set: typeof desc.set === 'function',
					};
				} else {
					propsMeta[name] = {
						get: true,
						set: desc.writable,
					};
				}
			}
			return propsMeta;
		}
	}

	get area() {
		throw new NotImplemented(this.constructor.name + '.draw');
	}

	get perimeter() {
		throw new NotImplemented(this.constructor.name + '.draw');
	}

	draw(context) {
		throw new NotImplemented(this.constructor.name + '.draw');
	}

	isPointInShape(context, x, y) {
		throw new NotImplemented(this.constructor.name + '.isPointInShape');
	}

	isPointInStroke(context, x, y) {
		throw new NotImplemented(this.constructor.name + '.isPointInStroke');
	}
}

class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

class Triangle extends AShape {
	constructor(name, points) {
		super(name);
		this.pointA = points[0];
		this.pointB = points[1];
		this.pointC = points[2];
	}

	get pointA() {
		return this._pointA;
	}

	get pointB() {
		return this._pointB;
	}

	get pointC() {
		return this._pointC;
	}

	set pointA(value) {
		if (!(value instanceof Point)) {
			throw new TypeError('value must be instance of Point');
		}
		this._pointA = value;
	}

	set pointB(value) {
		if (!(value instanceof Point)) {
			throw new TypeError('value must be instance of Point');
		}
		this._pointB = value;
	}

	set pointC(value) {
		if (!(value instanceof Point)) {
			throw new TypeError('value must be instance of Point');
		}
		this._pointC = value;
	}

	get area() {
		/// (x1, y1), (x2, y2), (x3, y3)

		// v1: (x2-x1, y2-y1)
		// v2: (x3-x1, y3-y1)

		// v1 * v2 = (x2-x1)*(y3-y1) - (x3-x1)*(y2-y1)
		// Math.abs((x2-x1)*(y3-y1) - (x3-x1)*(y2-y1)) / 2
	}
}

class Class {

}

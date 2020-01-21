/**
 * Перетворення простору - застосування деякого оператора (функції)
 *     f(x, y) => (fx(x, y), fy(x, y)) => (x1, y1)
 *     над кожною точкою (x, y) простору.
 * Лінійне перетворення простору - перетворення простору, для якого
 *     fx(x, y) = a11*x + a12*y + a13
 *     fy(x, y) = a21*x + a22*y + a23
 * Лінійне перетворення можна задати матрицею коефіцієнтів перетворення:
 *     a11 a12 a13
 *     a21 a22 a23
 * Типи лінійних перетворень:
 *     1. Зсув на dx (по осі X) і dy (по осі Y)
 *         fx(x, y) = x + dx = 1*x + 0*y + dx
 *         fy(x, y) = y + dy = 0*x + 1*y + dx
 *        Матриця:
 *            1 0 dx
 *            0 1 dy
 *     2. Маштабування с коефіцієнтами sx (по осі X) і sy (по осі Y) відносно початку координат (0, 0)
 *         fx(x, y) = sx * x = sx*x + 0*y + 0
 *         fy(x, y) = sy * y = 0*x + sy*y + 0
 *        Матриця:
 *            sx 0 0
 *            0 sy 0
 *     3. Поворот на кут alpha відносно початку координат (0, 0)
 *         Приклади:
 *             (x, 0) => (x*cos(alpha), x*sin(alpha))
 *             (0, y) => (y*cos(alpha + 90), y*sin(alpha + 90)) => (-y*sin(alpha), y*cos(alpha))
 *         fx(x, y) = x*cos(alpha) + (-y)*sin(alpha) = cos(alpha)*x + (-sin(alpha))*y + 0
 *         fy(x, y) = x*sin(alpha) + y*cos(alpha) = sin(alpha)*x + cos(alpha)*y + 0
 *        Матриця:
 *            cos(alpha) -sin(alpha) 0
 *            sin(alpha) cos(alpha)  0
 */

class AShape {
	constructor(context, props) {
		if (this.constructor === AShape) {
			throw new Error('Not implemented');
		}
		this.context = context;
		this.strokeStyle = props.strokeStyle;
		this.fillStyle = props.fillStyle;
		this.name = props.name;
	}

	get area() {
		throw new Error('Not implemented');
	}

	get perimeter() {
		throw new Error('Not implemented');
	}

	transform(
		a11, a12, a13,
		a21, a22, a23
	) {
		throw new Error('Not implemented');
	}

	scale(s, x0 = 0, y0 = 0) {
		if (s === 0) {
			throw new Error('Finite transformation');
		}
		if (Number.isNaN(s) || !Number.isFinite(s)) {
			throw new Error('Unexpected scale coefficient');
		}
		this.translate(-x0, -y0);
		this.transform(
			s, 0, 0,
			0, s, 0
		);
		this.translate(x0, y0);
	}

	translate(dx, dy) {
		if (Number.isNaN(dx) || !Number.isFinite(dx) || Number.isNaN(dy) || !Number.isFinite(dy)) {
			throw new Error('Unexpected translate coefficient');
		}
		if (!(dx === 0 && dy === 0)) {
			this.transform(
				1, 0, dx,
				0, 1, dy
			);
		}
	}

	rotate(alpha, x0 = 0, y0 = 0) {
		if (Number.isNaN(alpha) || !Number.isFinite(alpha)) {
			throw new Error('Unexpected rotation angle');
		}
		if (!(alpha === 0)) {
			this.translate(-x0, -y0);
			const ca = Math.cos(alpha);
			const sa = Math.sin(alpha);
			this.transform(
				ca, -sa, 0,
				sa, ca, 0
			);
			this.translate(x0, y0);
		}
	}

	path() {
		throw new Error('Not implemented');
	}

	draw(isSelected = false) {
		this.path();
		this.context.strokeStyle = this.strokeStyle;
		this.context.fillStyle = this.fillStyle;
		if (isSelected) {
			context.shadowColor = 'rgba(0, 0, 0, 0.95)';
			context.shadowOffsetX = 0;
			context.shadowOffsetY = 0;
			context.shadowBlur = 10;
		} else {
			context.shadowColor = 'transparent';
			context.shadowOffsetX = 0;
			context.shadowOffsetY = 0;
			context.shadowBlur = 0;
		}
		this.context.fill();
		this.context.stroke();
	}

	isPointInShape(x, y) {
		this.path();
		return this.context.isPointInStroke(x, y) || this.context.isPointInPath(x, y);
	}
}

function distance(a, b) {
	return Math.hypot(a.x - b.x, a.y - b.y);
}

function transform(
	p,
	a11, a12, a13,
	a21, a22, a23,
) {
	const x = p.x;
	const y = p.y;
	return {
		x: a11*x + a12*y + a13,
		y: a21*x + a22*y + a23,
	}
}

/**
 * props = {
 *   a: { x, y }
 *   b: { x, y }
 * }
 */
class Line extends AShape {
	constructor(context, props) {
		super(context, props);
		this.a = props.a;
		this.b = props.b;
	}

	get area() {
		return 0;
	}

	get perimeter() {
		return distance(this.a, this.b);
	}

	transform(a11, a12, a13, a21, a22, a23) {
		this.a = transform(this.a, a11, a12, a13, a21, a22, a23);
		this.b = transform(this.b, a11, a12, a13, a21, a22, a23);
	}

	path() {
		const context = this.context;
		const a = this.a;
		const b = this.b;
		context.beginPath();
		context.moveTo(a.x, a.y);
		context.lineTo(b.x, b.y);
	}
}

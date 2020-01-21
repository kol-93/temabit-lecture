/**
 * Лінійне перетворення простору:
 *  точка простору - геометрична точка, задана координатами в декартовій системі координат (x, y)
 *  Перетворення простору - застосування функції
 *    f(x, y) => (x1, y1) на кожні точці простору (x, y)
 *  Лінійне перетворення простору - перетворення простору, для якого
 *     (x)      (a11*x + a12*y + a13)
 *    f( )  =>
 *     (y)      (a21*x + a22*y + a23)
 *  Лінійне перетворення задається матрицею:
 *  (a11 a12 a13)
 *  (a21 a22 a23)
 * Елементарні лінійні перетворення:
 *  - зсув (dx, dy)
 *    матриця:
 *         (1 0 dx)
 *         (0 1 dy)
 *    f(x, y) = (x + dx, y + dy)
 *  - маштабування (sx, sy)
 *    матриця:
 *         (sx 0 0)
 *         (0 sy 0)
 *    f(x, y) = (x * sx, y*sy)
 *  - маштабування (sx, sy) відносно точки (x0, y0)
 *    декомпозиція:
 *      1. зсув координат таким чином, щоб відображення точки (x0, y0) => (0, 0)
 *           (1 0 -x0)
 *           (0 1 -y0)
 *      2. матриця:
 *           (sx 0 0)
 *           (0 sy 0)
 *      3. зсув зворотній до кроку 1:
 *           (1 0 x0)
 *           (0 1 y0)
 *  - поворот на кут alpha проти часової стрілки відносно початку координат
 *      матриця
 *          (cos(alpha) sin(alpha)  0)
 *          (-sin(alpha) cos(alpha) 0)
 *      f(x, y) = (x*cos(alpha) + y*sin(alpha), x*sin(alpha) - y*cos(alpha))
 */

class AShape {
	constructor(context, props) {
		if (this.constructor === AShape) {
			throw new Error('Can not create abstract class AShape');
		}
		this.context = context;
		this.name = props.name;
		this.strokeColor = props.strokeColor;
		this.fillColor = props.fillColor;
	}

	get area() {
		throw new Error('Not implemented');
	}

	get perimeter() {
		throw new Error('Not implemented');
	}

	transform(a11, a12, a13, a21, a22, a23) {
		throw new Error('Not implemented');
	}

	scale(s, x0 = 0, y0 = 0) {
		if (!(s !== 0 && Number.isFinite(s))) {
			throw new Error('Illegal usage');
		}
		if (!(x0 === 0 && y0 === 0)) {
			this.translate(-x0, -y0)
		}
		this.transform(s, 0, 0, 0, s, 0);
		if (!(x0 === 0 && y0 === 0)) {
			this.translate(x0, y0)
		}
	}

	rotate(alpha, x0 = 0, y0 = 0) {
		if (!Number.isFinite(alpha)) {
			throw new Error('Illegal usage');
		}
		const ca = Math.cos(alpha);
		const sa = Math.sin(alpha);
		if (!(x0 === 0 && y0 === 0)) {
			this.translate(-x0, -y0)
		}
		this.transform(ca, sa, 0, -sa, ca, 0);
		if (!(x0 === 0 && y0 === 0)) {
			this.translate(x0, y0)
		}
	}

	translate(dx, dy) {
		if (!(Number.isFinite(dx) && Number.isFinite(dy))) {
			throw new Error('Illegal usage');
		}
		return this.transform(1, 0, dx, 0, 1, dy);
	}

	isPointInShape(x, y) {
		throw new Error('Not implemented');
	}

	_draw() {
		throw new Error('Not implemented');
	}

	draw(isSelected) {
		const context = this.context;
		context.beginPath();
		this._draw();
		context.strokeStyle = this.strokeColor;
		context.fillStyle = this.fillColor;
		if (isSelected) {
			context.shadowColor = 'rgba(0, 0, 0, 0.75)';
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
}


/**
 * {
 *   radius: number
 *   x0: number,
 *   y0: number
 * }
 */
class Circle extends AShape {
	constructor(context, props) {
		super(context, props);
		if (!(Number.isFinite(props.x0) && Number.isFinite(props.y0) && Number.isFinite(props.radius))) {
			throw new Error('Illegal usage');
		}
		this.x0 = props.x0;
		this.y0 = props.y0;
		this.radius = props.radius;
	}

	get area() {
		return Math.PI * (this.radius * this.radius);
	}

	get perimeter() {
		return Math.PI * this.radius * 2;
	}

	transform(
		a11, a12, a13,
		a21, a22, a23
	) {
		const x0 = this.x0;
		const y0 = this.y0;
		const r = this.radius;
		const x1 = x0 + r;
		const y1 = y0;
		const x0_new = a11*x0 + a12*y0 + a13;
		const y0_new = a21*x0 + a22*y0 + a23;
		const x1_new = a11*x1 + a12*y1 + a13;
		const y1_new = a21*x1 + a22*y1 + a23;
		this.x0 = x0_new;
		this.y0 = y0_new;
		this.radius = Math.hypot(x1_new - x0_new, y1_new - y0_new);
	}

	isPointInShape(x, y) {
		// (x-x0)^2 + (y-y0)^2 <= r^2
		const x0 = this.x0;
		const y0 = this.y0;
		const r = this.radius;
		return Math.pow(x-x0, 2) + Math.pow(y-y0, 2) <= Math.pow(r, 2);
	}

	_draw() {
		this.context.moveTo(this.x0 + this.radius, this.y0);
		this.context.arc(this.x0, this.y0, this.radius, 0, 2 * Math.PI);
	}
}

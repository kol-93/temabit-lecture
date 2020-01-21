function logAndEval(code) {
	try {
		console.log('OK: %s ===> %o', code, eval(code));
	} catch (exception) {
		console.log('ERROR: %s ===> %s', code, exception.stack);
	}
}

function range(start, stop, step) {                     // Генератор
	console.log('range(%o, %o, %o)', start, stop, step);
	var current = start;
	return {                                            // "Ітерабельний ітератор"
		[Symbol.iterator]() {                           // Ітерабельний, бо має метод [Symbol.iterator], який повертає сам об'єкт
			console.log('range(%o, %o, %o)[Symbol.iterator]()', start, stop, step);
			return this;
		},
		next() {                                        // Ітератор, бо має метод `next`, який повертає стан ітератора
			console.log('range(%o, %o, %o)[Symbol.iterator]().next()', start, stop, step);
			if ((current < stop) === (start < stop)) {
				var value = current;
				current += step;
				return {
					value,
					done: false,
				};
			} else {
				return {
					done: true,
				};
			}
		}
	}
}

for (const value of range(0, +Infinity, 1.5)) {
	console.log(value);
	if (Math.random() < 0.5) {
		break;
	}
}

{
	let iterable = range(0, +Infinity, 1.5);
	let iterator = iterable[Symbol.iterator]();
	for (let it = iterator.next(); !it.done; it = iterator.next()) {
		const value = it.value;
		console.log(value);
		if (Math.random() < 0.5) {
			break;
		}
	}
}


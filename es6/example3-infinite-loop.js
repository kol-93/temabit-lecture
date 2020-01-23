function* range(start, stop, step) {                                                // Оголошення функції-генератора
	for (let current = start; current < stop === start < stop; current += step) {
		yield current;                                                              // Видача "поточного" значення
	}
}

for (const value of range(0, +Infinity, Math.pow(2, 50))) {
	console.log('result', value);
	if (!Number.isSafeInteger(value)) {
		break;
	}
}

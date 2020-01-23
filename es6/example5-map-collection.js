
const m = new Map();
m.set({ key: 'string' }, { value: 'value' })
m.set(1, 'a');
m.set(0, 'b');
m.set(100500, 'c');

for (const x of m) {
	console.log('iterate', x);
}

for (const key of m.keys()) {
	console.log('key', key);
}

for (const value of m.values()) {
	console.log('value', value);
}


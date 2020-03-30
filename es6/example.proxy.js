const obj = (function () {
	const _storage = {

	};

	return new Proxy(_storage, {
		get(target, name) {
			console.log('GET %j', name);
			return target[name];
		},
		set(target, name, value) {
			const old = target[name];
			console.log('SET %j = %o (OLD %o)', name, value, old);
			target[name] = value;
		},
		has(target, name) {
			console.log('HAS %j', name);
			return Object.hasOwnProperty(target, name);
		},
		deleteProperty(target, name) {
			console.log('DELETE %j', name);
			delete target[name];
		}
	})
})();


obj.x = 10;
obj.x = 11;
obj.y = 20;
delete obj.y;
'y' in obj;
obj.x;


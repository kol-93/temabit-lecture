const fi = function (n) {
	if (n === 0 || n === 1) {
		return n;
	} else {
		return fi(n-2) + fi(n-1);
	}
};

console.log(fi(50));

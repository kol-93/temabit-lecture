const A = [];
for (let i = 0; i !== 10000000000; ++i) {
	A.push(i * i);
}


console.log(A.reduce(function (acc, e) { return acc + e; }, 0));

function delayAndCall(timeout, operator) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			try {
				resolve(operator());
			} catch (error) {
				reject(error);
			}
		}, timeout);
	});
}

function logResult(title, p) {
	p.then(
		(value) => console.log(title, 'result', value),
		(error) => console.log(title, 'error', error),
	);
}

const p1 = delayAndCall(1, () => 42).then(
	(result) => {
		return result * result;
	},
	(error) => {
		return error + 1;
	}
);

logResult('p1', p1);

const p2 = delayAndCall(1, () => 43).then(
	(value) => {
		throw new Error('Hello');
	}
);
logResult('p2', p2);


const p3 = delayAndCall(1, () => 44).then(
	(value) => delayAndCall(1000, () => value * value)
);

logResult('p3', p3);

const p4 = delayAndCall(1, () => 44).then(
	(value) => delayAndCall(1000, () => { throw new Error('44'); })
);

logResult('p4', p4);

const p5 = delayAndCall(1, () => { throw new Error('45'); }).then((x) => x+1);
logResult('p5', p5);

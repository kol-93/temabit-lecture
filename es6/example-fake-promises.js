setTimeout(() => {
	console.log('timeout 0');
}, 0);

Promise.resolve('promise')
	.then((value) => {
		console.log(value);
	});

// Promise.reject(new Error('Hello from promise'))
// 	.catch((error) => {
// 		console.log('Promise failed', error.message);
// 	});

console.log('synchronous');
//
// function delay(timeout, value) {
// 	return new Promise((resolve) => {
// 		setTimeout(resolve, timeout, value);
// 	})
// }
//
// function delayAndCall(timeout, operator) {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			try {
// 				resolve(operator());
// 			} catch (error) {
// 				reject(error);
// 			}
// 		}, timeout);
// 	});
// }
//
// const promiseAfterTimeout = delay(100, 'Hello in promise after 100milliseconds');
//
// const promiseAfter2 = delayAndCall(200, () => {
// 	throw new Error('Blablabla');
// });
//
// promiseAfterTimeout.then((result) => {
// 	console.log(result);
// });
//
// promiseAfter2.catch((error) => {
// 	console.log(error);
// });
//

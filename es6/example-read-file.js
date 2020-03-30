const { createReadStream, createWriteStream, open, close, read } = require('fs');
const { createInterface } = require('readline');
const {promisify} = require('util');
const BLOCK_SIZE = 65536;

async function* readFileAsFD(filePath) {
	const NEXT_LINE = ('\n').charCodeAt(0);
	const fd = await promisify(open)(filePath, 'r');
	// const fd = await new Promise((resolve, reject) => {
	// 	open(filePath, 'r', (error, fd) => {
	// 		if (error) {
	// 			reject(error);
	// 		} else {
	// 			resolve(fd);
	// 		}
	// 	});
	// });
	try {
		let buffer = Buffer.alloc(BLOCK_SIZE);
		let usedSize = 0;

		let closed = false;

		while (!closed) {
			// console.log('FREE BYTES %j', buffer.length - offset);
			// console.log('BLOCK SIZE %j', BLOCK_SIZE);
			// console.log('TRY TO READ %j BYTES', Math.min(buffer.length - offset, BLOCK_SIZE));
			if (buffer.length - usedSize < BLOCK_SIZE) {
				const newBuffer = Buffer.alloc(buffer.length * 2);
				buffer.copy(newBuffer, 0, 0, usedSize);
				buffer = newBuffer;
			}
			const {bytesRead} = await promisify(read)(fd, buffer, usedSize, BLOCK_SIZE, null);
			// console.log('BYTES READ %j', bytesRead);
			if (bytesRead === 0) {
				closed = true;
			} else {
				let startIndex = usedSize;
				usedSize += bytesRead;
				let start, index;
				const sub = buffer.subarray(0, usedSize);
				for (
					start = 0, index = sub.indexOf(NEXT_LINE, start || startIndex);
					0 <= index && index < usedSize;
					start = index + 1, index = sub.indexOf(NEXT_LINE, start)
				) {
					// console.log('FOUND NEXT LINE AT %j', index);
					const line = buffer.toString('utf8', start, index);
					// console.log('READ LINE %j', line);
					yield line;
				}
				// console.log('START=%j INDEX=%j LENGTH=%j', start, index, offset);
				/// XXXXXXXXXXXNXXXXEEEEEEEE
				///             ^   ^
				///      start  |   | offset
				if (start !== 0) {
					buffer.copy(buffer, 0, start, usedSize);
					usedSize = usedSize - start;
				}
			}
		}
		yield buffer.toString('utf8', 0, usedSize);
	} finally {
		await promisify(close)(fd).catch((error) => {
			console.warn('Can not close fd=%j. Reason: %s', fd, error.message);
		});
	}
}


async function test1(filePath) {

	const stream = createReadStream(filePath, { highWaterMark: BLOCK_SIZE });
	const rl = createInterface(stream);
	let cnt = 0;
	rl.on('line', (line) => {
		cnt += 1;
	});
	await new Promise((resolve, reject) => {
		stream.once('error', reject);
		rl.once('close', resolve);
	});
	return cnt;
}

async function test2(filePath) {
	let cnt = 0;
	for await (const line of readFileAsFD(filePath)) {
		cnt += 1;
	}
	return cnt;
}


async function doTest(test, filePath, tries = 1000) {
	console.time(test.name);
	for (let tryN = 0; tryN !== tries; ++tryN) {
		try {
			const result = await test(filePath);
			console.log(test.name, result);
		} catch (e) {
			console.log(test.name, e);
		}
	}
	console.timeEnd(test.name)
}

async function main() {
	await doTest(test1, '/home/kol/allCountries.txt', 3);
	await doTest(test2, '/home/kol/allCountries.txt', 3);
}

main();
// let buffer = '';
//
// stream.on('data', (data) => {
// 	buffer += data;
// 	let index = 0;
// 	while ((index = buffer.indexOf('\n')) >= 0) {
// 		const line = buffer.slice(0, index);
// 		console.log('LINE %j', line);
// 		buffer = buffer.slice(index + 1);
// 	}
// });



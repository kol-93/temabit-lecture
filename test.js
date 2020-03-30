const { createReadStream, createWriteStream, open, close, read } = require('fs');
const {promisify} = require('util');
const BLOCK_SIZE = 65536;

async function* readFileAsFD(filePath, blockSize = BLOCK_SIZE) {
	const fd = await promisify(open)(filePath, 'r');

	try {
		let closed = false;

		while (!closed) {
			const buffer = Buffer.alloc(blockSize);
			const {bytesRead} = await promisify(read)(fd, buffer, 0, blockSize, null);
			if (bytesRead === 0) {
				closed = true;
			} else {
				blockSize = yield buffer.subarray(0, bytesRead);
			}
		}
	} finally {
		await promisify(close)(fd).catch((error) => {
			console.warn('Can not close fd=%j. Reason: %s', fd, error.message);
		});
	}
}

function getRandomSize(maxSize = BLOCK_SIZE) {
	return Math.floor(Math.random() * maxSize) + 1;
}

async function main() {
	const it = readFileAsFD('/home/kol/allCountries.txt', getRandomSize())[Symbol.asyncIterator]();
	for (
		let state = await it.next(getRandomSize());
		!state.done;
		state = await it.next(getRandomSize())
	) {
		console.log(state.value.length);
	}
}

main();

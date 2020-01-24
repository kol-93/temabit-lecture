const request1 = new XMLHttpRequest();
request1.onload = function () {
	const request2 = new XMLHttpRequest();

	request2.onload = function() {
		const request3 = new XMLHttpRequest();

		request3.onload = function() {

		}
	};
};

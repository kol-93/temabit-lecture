try {
	const request = new XMLHttpRequest();
	request.onerror = function () {
		alert('ERROR');
	};
	request.onload = function() {
		alert('LOAD');
	};
	request.open('GET', 'http://openapi.justin.ua/branches/220');
	request.send();
} catch (e) {
	alert('CORS');
}

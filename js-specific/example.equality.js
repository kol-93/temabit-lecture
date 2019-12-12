function logAndEval(code) { console.log('%s ===> %o', code, eval(code)); }

const X = {
	toString() {
		return "10";
	},
	valueOf() {
		return 42;
	}
};

const Y = {
	toString() {
		return "10";
	},
	valueOf() {
		return { x: 42 };
	}
};

const Z = {
	toString() {
		console.log('toString(%o)', this);
		return { x: "10" };
	},
	valueOf() {
		console.log('valueOf(%o)', this);
		return { x: 42 };
	}
};


logAndEval('"" == 0');
logAndEval('Number("")');
logAndEval('Number("") == 0');
logAndEval('"" == false');
logAndEval('Number(false)');
logAndEval('"" == Number(false)');
logAndEval('"1" == true');
logAndEval('Number(true)');
logAndEval('"1" == Number(true)');
logAndEval('X == 10');
logAndEval('X == 42');
logAndEval('Y == 10');
logAndEval('Y == 42');
logAndEval('Z == "10"');
logAndEval('Z == 42');

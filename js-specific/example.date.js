function logAndEval(code) { console.log('%s ===> %o', code, eval(code)); }

logAndEval('Date()');
logAndEval('new Date()');
logAndEval('new Date(0)');
logAndEval('new Date(1000 * 60 * 60 * 24)');

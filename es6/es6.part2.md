# ES6 (частина 2)

## Посилання:
 - [MDN: Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
 - [ES6 Features: Promise](http://es6-features.org/#PromiseUsage)
 - [Habrahabr: Путеводитель по JavaScript Promise для новичков](https://habr.com/company/zerotech/blog/317256/)
 - [Habrahabr: Promises 101](https://habr.com/post/312670/)
 - [Sitepoint: A Deeper Dive Into JavaScript Promises](https://www.sitepoint.com/deeper-dive-javascript-promises/) 

## Обіцянки - `Promise`
Обіцянка - `Promise` - проміжний об'єкт для асинхронної роботи зі значенням, яке на момент створення об'єкта є невідомим.
Він дає можливість встановити окремі функції для асинхронної обробки як очікуваного значення, так і виключних ситуацій.

`Promise` може бути в одному із цих станів:
 - `pending`: в очікуванні, початковий стан, Ні виконаний, ні відкинутий.
 - `fulfilled`: завершений, тобто операція завершилася вдало.
 - `rejected`: означає, що операція завершилася помилкою. 

### Конструктор `new Promise(executor)`
Для створення нового об'єкта обіцянки використовують конструктор, в який єдиним аргументом передається функція-виконавець - `executor`.
Функцію-виконавець буде виконано одразу ж з передачею в неї двох функцій зворотнього зв'язку: `resolve` та `reject`.

Функцію зворотнього зв'язку `resolve` необхідно виконати (з передачею в неї необхідного вам результату) у тому випадку і в той момент, коли запланована вами операція завершилася успішно.

Функцію зворотнього зв'язку `reject` необхідно виконати (з передачею в неї необхідного вам об'єкта виключення - `Exception/Error`) у тому випадку і в той момент, коли запланована вами операція завершилася невдачею або виключною ситуацією.

Приклад використання:
```ecmascript 6
const positivePromise = new Promise(function (resolve, reject) {
    setTimeout(resolve, 100, 42);
});

const negativePromise = new Promise(function (resolve, reject) {
    setTimeout(reject, 200, new Error('Shit happens'));
});
``` 

### Метод `Promise.prototype.then(onFullfilled, [onRejected])`
Метод `Promise.prototype.then()` використовується для встановлення функцій-обробників для успішного значення - `onFullfilled` та, опціонально, - для виключної ситуації - `onRejected`.
Метод повертає новий об'єкт обцянки, який буде завершено (позитивно або помилкою) після виконання однієї із переданих функцій (або обіцянки, якщо результатом функції є обіцянка).

В момент вирішення обіцянки буде виконано відповідну функцію-обробник із результатом виконання обіцянки.
Обіцянка, яка повертається в результаті виконання методу буде визначена
 - результатом виконання будь-якого із обробників, якщо виконання було успішним, а значення не є екземпляром обіцянки
 - результатом визначення обіцянки, яка є результатом відповідного обробника була обіцянка
 - помилкою, якщо в резульаті виконання відповідного обробника було викликано ключове слово `throw`.

Таким чином можна:
 - утворювати послідовні "ланцюжки" з обробників поступово передаючи результат одного обробника іншому
 - утворювати розгалуження, додаючи нові обробники до однієї і тієї ж обіцянки.
 - генерувати помилки або примусово їх стримувати

Приклад:
```ecmascript 6
function delay(timeout, value) {
    return new Promise(function (resolve, reject) {
        if (value instanceof Error) {
            setTimeout(reject, timeout, value);
        } else {
            setTimeout(resolve, timeout, value);
        }
    });
}

const positive = delay(100, 42)
    .then(function (value) { return value * value; })
    .then(function (value) { console.log('Chain 1 is successful:', value); }, function (error) { console.log('Chain 1 is failed:', error); });

const negative = delay(100, new Error('Shit happens'))
    .then(function (value) { return value * value; })
    .then(function (value) { console.log('Chain 2 is successful:', value); }, function (error) { console.log('Chain 2 is failed:', error); });

const root = delay(100, 42);
const branch1 = root
    .then(function (value) { return delay(100, new Error('Shit happens in branch 1')); })
    .then(function (value) { console.log('Branch 1 is successful:', value); }, function (error) { console.log('Branch 1 is failed:', error); });

const branch2 = root
    .then(function (value) { return delay(100, value * value); })
    .then(function (value) { console.log('Branch 2 is successful:', value); }, function (error) { console.log('Branch 2 is failed:', error); });

const suppressed = delay(100, new Error('Shit happens'))
    .then(function (){}, function (error) { return 42; })
    .then(function (value) { console.log('Branch 3 is successful:', value); }, function (error) { console.log('Branch 3 is failed:', error); });
```

**Результат виконання:**
```text
Chain 1 is successful: 1764
Chain 2 is failed: Error: Shit happens
    at Object.<anonymous> (/home/kol/projects/lecture.node/es6.js:55:29)
    at Module._compile (module.js:652:30)
    at Object.Module._extensions..js (module.js:663:10)
    at Module.load (module.js:565:32)
    at tryModuleLoad (module.js:505:12)
    at Function.Module._load (module.js:497:3)
    at Function.Module.runMain (module.js:693:10)
    at startup (bootstrap_node.js:191:16)
    at bootstrap_node.js:612:3
Branch 3 is successful: 42
Branch 1 is failed: Error: Shit happens in branch 1
    at /home/kol/projects/lecture.node/es6.js:61:48
    at <anonymous>
Branch 2 is successful: 1764
```

### Метод `Promise.prototype.catch(onRejected)`
Виклик метода `promise.catch(onRejected)` аналогічний виклику 
```ecmascript 6
promise.then(function (value) { return value; }, onRejected);
```

### Метод `Promise.prototype.finally(onFinally)`
Виклик метода `promise.finally(onFinally)` аналогічний виклику
```ecmascript 6
promise
    .then(function (value) { return onFinally(); }, function (error) { return onFinally(); })
```

### Статичний метод `Promise.all(iterable)`
Повертає обіцянку, яка буде визначена масивом резульатів в момент успішного виконання усіх обіцянок із ітерабельного аргумента або визначена помилкою першої обіцянки, що завершиться помилкою.

### Статичний метод `Promise.race(iterable)`
Повертає обіцянку, яка буде визначена резульатом тієї обіцянки із ітерабельного аргументу, яка завершиться (успішно або помилкою) раніше за всіх інших.

### Статичний метод `Promise.reject(reason)`
Повертає обіцянку, одразу визначену помилкою `reason`

### Статичний метод `Promise.resolve(value)`
Повертає обіцянку, одразу визначену результатом `value`


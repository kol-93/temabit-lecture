# ES6 (Частина 1)

## Класичні змінні
Область видимості класичних змінних, оголошених через ключове слово **var** розповсюджується в межах контексту (тіла функції), в якому вони оголошені (від початку контексту, до його кінця).

**Приклад:**
```ecmascript 6
var x = 0;                                  // Оголошуємо змінну `x` на рівні модуля
(function f() {
    if (true) {
        console.log('local x = %o', x);     // Використовуємо змінну `x` на рівні функції `f`, оголошену в блоці `else`
    } else {
        var x = 2;                          // Оголошуємо змінну `x` на рівні функції `f`. Оголошення "спливає", але значення буде присвоєне лише в даній точці коду
        console.log('local x = %o', x);     // Використовуємо змінну `x` на рівні функції `f`
    }
})();
console.log('global x = %o', x);            // Використовуємо змінну `x` на рівні модуля
```

**Результат виконання:**
```text
local x = undefined
global x = 0
```

## Контекстні змінні
Контекстні змінні - змінні, доступні з моменту їх оголошення до кінця блоку, в якому вони були оголошені

**Приклад:**
```ecmascript 6
let x = 0;                                  // Оголошуємо змінну `x` на рівні модуля
(function f() {
    if (true) {
        console.log('local x = %o', x);     // Використовуємо змінну `x` на рівні модуля
    } else {
        let x = 2;                          // Оголошуємо і присвоюємо змінну `x` на рівні блока `else`
        console.log('local x = %o', x);     // Використовуємо змінну `x` на рівні блока `else`
    }
})();
console.log('global x = %o', x);            // Використовуємо змінну `x` на рівні модуля
```

**Результат виконання:**
```text
local x = 0
global x = 0
```

## Константи
Константи (*constant*, *immutable variable*) - Контекстні змінні, які повинні бути присвоєні рівно один раз в момент оголошення.

**Приклад 1:**
```ecmascript 6
const A = 2;            // Оголошення "константи"
A = 3;                  // <== TypeError: Assignment to constant variable.
```

**Результат виконання:**
```text
/home/kol/projects/lecture.node/es6.js:2
A = 3;
  ^

TypeError: Assignment to constant variable.
    at Object.<anonymous> (/home/kol/projects/lecture.node/es6.js:2:3)
    at Module._compile (module.js:652:30)
    at Object.Module._extensions..js (module.js:663:10)
    at Module.load (module.js:565:32)
    at tryModuleLoad (module.js:505:12)
    at Function.Module._load (module.js:497:3)
    at Function.Module.runMain (module.js:693:10)
    at startup (bootstrap_node.js:191:16)
    at bootstrap_node.js:612:3
```

**Приклад 2:**
```ecmascript 6
const A;                // <== SyntaxError: Missing initializer in const declaration
```

**Результат виконання:**
```text
/home/kol/projects/lecture.node/es6.js:2
const A;
      ^

SyntaxError: Missing initializer in const declaration
    at createScript (vm.js:80:10)
    at Object.runInThisContext (vm.js:139:10)
    at Module._compile (module.js:616:28)
    at Object.Module._extensions..js (module.js:663:10)
    at Module.load (module.js:565:32)
    at tryModuleLoad (module.js:505:12)
    at Function.Module._load (module.js:497:3)
    at Function.Module.runMain (module.js:693:10)
    at startup (bootstrap_node.js:191:16)
    at bootstrap_node.js:612:3
```

## Ітератори. Протокол ітерування
**Ітератором** називається об'єкт, в якого доступний метод **`next`**, який повертає об'єкт з наступними полями:
 - *`done`*:**boolean** - індикатор завершеності ітератора.
 - *`[value]`* - поточне значення ітератора.
Об'єкт, який повертається методом **`next`** називають поточним станом ітератора.

**Ітерабельним** називається об'єкт, в якого доступний нуль-арний (той, що не вимагає жодного аргумента) метод **`[Symbol.iterator]`**, що повертає **ітератор**.

**Генератором** називається функція, результат якої є одночасно **ітератором** та **ітерабельним**.

**Приклад:**
```ecmascript 6
function logAndEval(code) {
    try {
        console.log('OK: %s ===> %o', code, eval(code));
    } catch (exception) {
        console.log('ERROR: %s ===> %s', code, exception.stack);
    }
}

function range(start, stop, step) {                     // Генератор
    var current = start;
    return {                                            // "Ітерабельний ітератор"
        [Symbol.iterator]() {                           // Ітерабельний, бо має метод [Symbol.iterator], який повертає сам об'єкт
            return this;
        },
        next() {                                        // Ітератор, бо має метод `next`, який повертає стан ітератора
            if ((current < stop) === (start < stop)) {
                var value = current;
                current += step;
                return {
                    value,
                    done: false,
                };
            } else {
                return {
                    done: true,
                };
            }
        }
    }
}

const iterableIterator = range(0, 10, 1.5);             // Виклик генератора: результат - ітерабельний ітератор
const iterator = iterableIterator[Symbol.iterator]();   // Виклик метода ітерабельного об'єкта: результат - ітератор
logAndEval(`iterableIterator.next()`);
logAndEval(`iterator.next()`);
logAndEval(`iterator.next()`);
logAndEval(`iterableIterator.next()`);
logAndEval(`iterableIterator.next()`);
logAndEval(`iterator.next()`);
logAndEval(`iterator.next()`);
logAndEval(`iterator.next()`);
logAndEval(`iterator.next()`);
```

**Результат виконання:**
```text
OK: iterableIterator.next() ===> { value: 0, done: false }
OK: iterator.next() ===> { value: 1.5, done: false }
OK: iterator.next() ===> { value: 3, done: false }
OK: iterableIterator.next() ===> { value: 4.5, done: false }
OK: iterableIterator.next() ===> { value: 6, done: false }
OK: iterator.next() ===> { value: 7.5, done: false }
OK: iterator.next() ===> { value: 9, done: false }
OK: iterator.next() ===> { done: true }
OK: iterator.next() ===> { done: true }
```

## Ітератори. Цикл for...of
Цикл **for...of** використовується для перебору значень ітерабельного об'єкта.
**Синтаксис:**
```ecmascript 6
for (var value2 of iterable2)
    doSomething(value2)
// Або
for (const value2 of iterable2)
    doSomething(value2)
// Або
for (let value1 of iterable1)
    doSomething(value1)
```

**Приклад:**
```ecmascript 6
function logAndEval(code) {
    try {
        console.log('OK: %s ===> %o', code, eval(code));
    } catch (exception) {
        console.log('ERROR: %s ===> %s', code, exception.stack);
    }
}

function range(start, stop, step) {                     // Генератор
    var current = start;
    return {                                            // "Ітерабельний ітератор"
        [Symbol.iterator]() {                           // Ітерабельний, бо має метод [Symbol.iterator], який повертає сам об'єкт
            return this;
        },
        next() {                                        // Ітератор, бо має метод `next`, який повертає стан ітератора
            if ((current < stop) === (start < stop)) {
                var value = current;
                current += step;
                return {
                    value,
                    done: false,
                };
            } else {
                return {
                    done: true,
                };
            }
        }
    }
}

for (const value of range(0, 10, 1.5)) {
    console.log(value);
}
```

**Результат виконання:**
```text
0
1.5
3
4.5
6
7.5
9
```

**Аналогічний код на псевдо-ES5**:
```ecmascript 6
function logAndEval(code) {
    try {
        console.log('OK: %s ===> %o', code, eval(code));
    } catch (exception) {
        console.log('ERROR: %s ===> %s', code, exception.stack);
    }
}

function range(start, stop, step) {                     // Генератор
    var current = start;
    return {                                            // "Ітерабельний ітератор"
        [Symbol.iterator]() {                           // Ітерабельний, бо має метод [Symbol.iterator], який повертає сам об'єкт
            return this;
        },
        next() {                                        // Ітератор, бо має метод `next`, який повертає стан ітератора
            if ((current < stop) === (start < stop)) {
                var value = current;
                current += step;
                return {
                    value,
                    done: false,
                };
            } else {
                return {
                    done: true,
                };
            }
        }
    }
}

(function (){
    var iterable = range(0, 10, 1.5);
    var iterator = iterable[Symbol.iterator]();
    for (var state = iterator.next(), value = state.value; !state.done; state = iterator.next(), value = state.value) {
        console.log(value);
    }
})();
```

## Ітератори. Функція-генератор (function*)
**Приклад:**
```ecmascript 6
function* range(start, stop, step) {                                                // Оголошення функції-генератора
    for (let current = start; current < stop === start < stop; current += step) {
        yield current;                                                              // Видача "поточного" значення
    }
}

for (let value of range(0, 10, 1.5)) {
    console.log(value);
}
```

## Функції-генератори. Приклади з типового набору функціональної обробки даних
```ecmascript 6
/**
 * Генерує послідовність чисел типу start, start + step, start + 2*step, ... (stop). stop - невключно
 */
function* range(start, stop, step) {
    for (let current = start; current < stop === start < stop; current += step) {
        yield current;
    }
}

/**
 * Перетворює послідовність I_1, I_2, ..., I_n на послідовність operator(I_1), operator(I_2), ..., operator(I_n)
 */
function* map(operator, iterable) {
    for (let value of iterable) {
        yield operator(value);
    }
}

/**
 * Фільтрує послідовність I_1, I_2, ..., I_n, залишаючи лише такі I_i, що operator(I_i) набуває позитивних значень
 */
function* filter(operator, iterable) {
    for (let value of iterable) {
        if (operator(value)) {
            yield value;
        }
    }
}

/**
 * Перетворює послідовність I_1, I_2, ..., I_n на I_1, I_2, ..., I_k, таку, що, operator(I_i) набуває позитивних значень в діапазоні I_{1, k} і негативного для I_{k+1}
 */
function* takeWhile(operator, iterable) {
    for (let value of iterable) {
        if (operator(value)) {
            yield value;
        } else {
            break;
        }
    }
}

/**
 * Перетворює послідовність I_1, I_2, ..., I_n на I_{k+1}, I_{k+2}, ..., I_n, таку, що, operator(I_i) набуває негативних значень в діапазоні I_{1, k} і позитивного для I_{k+1}
 */
function* dropWhile(operator, iterable) {
    let drop = true;
    for (let value of iterable) {
        drop = drop && operator(value);
        if (!drop) {
            yield value;
        }
    }
}
```

## Функції вищого порядку. Приклади з типового набору функціональної обробки даних
```ecmascript 6
/**
 * Обчислює вираз operator(operator(operator(initial, I_1), I_2)..., I_n)
 */
function reduce(operator, iterable, initial) {
    let current = initial;
    for (let value of iterable) {
        current = operator(current, value);
    }
    return current;
}

/**
 * Обчислює I_1 + I_2 + ... + I_n
 */
function sum(iterable) {
    return reduce((current, value) => current + value, iterable, 0);
}

/**
 * Обчислює I_1 * I_2 * ... * I_n
 */
function product(iterable) {
    return reduce((current, value) => current * value, iterable, 1);
}
```

## Клас "Множина" (Set)
Екземпляри класу "множина" дозволяють зберігати унікальний набір значень. [MDN: Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
 - Порівняння значень відбувається за правилами функції `Object.is()` [MDN: Object.is()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)
 - Об'єкт множини є ітерабельним.
 - Порядок значень під час ітерування множини відповідає порядку, в якому значення додавалися у мнложину.

### new Set(\[values])
Конструктор приймає необов'язковий параметр `values`, у якому дозволяється передача початкового списка значень, які необхідно включити у множину після створення.

**Приклад:**
```ecmascript 6
function logAndEval(code) {
    try {
        console.log('OK: %s ===> %o', code, eval(code));
    } catch (exception) {
        console.log('ERROR: %s ===> %s', code, exception.stack);
    }
}

logAndEval('new Set()');
logAndEval('new Set([1, 2, 3, 4, 5, 2, 3, 5])');
```

**Результат виконання:**
```text
OK: new Set() ===> Set {}
OK: new Set([1, 2, 3, 4, 5, 2, 3, 5]) ===> Set { 1, 2, 3, 4, 5, [size]: 5 }
```

### Set.prototype.add()
Метод `Set.prototype.add(value)` додає значення `value` до множини та повертає екземпляр множини. [MDN: Set.prototype.add()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add)

**Приклад:**
```ecmascript 6
function logAndEval(code) {
    try {
        console.log('OK: %s ===> %o', code, eval(code));
    } catch (exception) {
        console.log('ERROR: %s ===> %s', code, exception.stack);
    }
}

logAndEval('(new Set()).add(3).add(4)');
logAndEval('(new Set([1, 2, 3, 4, 5, 2, 3, 5])).add(0).add(1)');
```

**Результат виконання:**
```text
OK: (new Set()).add(3).add(4) ===> Set { 3, 4, [size]: 2 }
OK: (new Set([1, 2, 3, 4, 5, 2, 3, 5])).add(0).add(1) ===> Set { 1, 2, 3, 4, 5, 0, [size]: 6 }
```

### Set.prototype.delete()
Метод `Set.prototype.delete(value)` видаляє значення `value` з множини. [MDN: Set.prototype.delete()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete)
Метод повертає `true`, якщо значення `value` було присутнє у множині та `false`, - якщо ні.

**Приклад:**
```ecmascript 6
function logAndEval(code) {
    try {
        console.log('OK: %s ===> %o', code, eval(code));
    } catch (exception) {
        console.log('ERROR: %s ===> %s', code, exception.stack);
    }
}

logAndEval('(new Set([1, 2, 3, 4, 5])).delete(0)');
logAndEval('(new Set([1, 2, 3, 4, 5])).delete(1)');
```

**Результат виконання:**
```text
OK: (new Set([1, 2, 3, 4, 5])).delete(0) ===> false
OK: (new Set([1, 2, 3, 4, 5])).delete(1) ===> true
```

### Set.prototype.clear()
Метод `Set.prototype.clear()` видаляє всі значення з множини. [MDN: Set.prototype.clear()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear)

**Приклад:**
```ecmascript 6
function logAndEval(code) {
    try {
        console.log('OK: %s ===> %o', code, eval(code));
    } catch (exception) {
        console.log('ERROR: %s ===> %s', code, exception.stack);
    }
}

const s = new Set([1, 2, 3, 4]);
logAndEval('s');
s.clear();
logAndEval('s');
```

**Результат виконання:**
```text
OK: s ===> Set { 1, 2, 3, 4, [size]: 4 }
OK: s ===> Set {}
```

### Set.prototype.has()
Метод `Set.prototype.has(value)` повертає `true`, якщо значення `value` присутнє у множині та `false`, - якщо ні. [MDN: Set.prototype.has()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has)

**Приклад:**
```ecmascript 6
function logAndEval(code) {
    try {
        console.log('OK: %s ===> %o', code, eval(code));
    } catch (exception) {
        console.log('ERROR: %s ===> %s', code, exception.stack);
    }
}

logAndEval('(new Set([1, 2, 3, 4, 5])).has(0)');
logAndEval('(new Set([1, 2, 3, 4, 5])).has(1)');
```

**Результат виконання:**
```text
OK: (new Set([1, 2, 3, 4, 5])).has(0) ===> false
OK: (new Set([1, 2, 3, 4, 5])).has(1) ===> true
```

### Set.prototype.size
Властивість `Set.prototype.size` доступна лише для читання і зберігає кількість елементів в множині.

**Приклад:**
```ecmascript 6
function logAndEval(code) {
    try {
        console.log('OK: %s ===> %o', code, eval(code));
    } catch (exception) {
        console.log('ERROR: %s ===> %s', code, exception.stack);
    }
}

logAndEval('(new Set()).size');
logAndEval('(new Set([])).size');
logAndEval('(new Set([1, 2, 3, 4, 5])).size');
```

**Результат виконання:**
```text
OK: (new Set()).size ===> 0
OK: (new Set([])).size ===> 0
OK: (new Set([1, 2, 3, 4, 5])).size ===> 5
```

## Клас "Відображення" (Map)
Екземпляри класу "відображення" дозволяють встановлювати та зберігати прямий зв'язок між елементами множини ключів та набору відповідних їм значень. [MDN: Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
 - Порівняння ключів відбувається за правилами функції `Object.is()` [MDN: Object.is()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)
 - Об'єкт відображення є ітерабельним по парам "ключ-значення".
 - Порядок пар "ключ-значення" під час ітерування відображення відповідає порядку, в якому ключі додавалися у відображення.

### new Map(\[items])
Конструктор приймає необов'язковий параметр `items`, у якому дозволяється передача початкового списка пар "ключ-значення", зв'язок між якими необхідно зафіксувати після створення відображення.

**Приклад:**
```ecmascript 6
function logAndEval(code) {
    try {
        console.log('OK: %s ===> %o', code, eval(code));
    } catch (exception) {
        console.log('ERROR: %s ===> %s', code, exception.stack);
    }
}

logAndEval('new Map()');
logAndEval('new Map([[1, 2], ["key", "value"], ["another", { value: "object" }], [{}, "hello"]])');
```

**Результат виконання:**
```text
OK: new Map() ===> Map {}
OK: new Map([[1, 2], ["key", "value"], ["another", { value: "object" }], [{}, "hello"]]) ===> Map {
  1 => 2,
  'key' => 'value',
  'another' => { value: 'object' },
  {} => 'hello',
  [size]: 4 }
```

### Map.prototype.set()
Метод `Map.prototype.set(key, value)` встановлює прямий зв'язок між ключем `key` та його значенням `value` та повертає екземпляр відображення. [MDN: Map.prototype.set()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set)

**Приклад:**
```ecmascript 6
function logAndEval(code) {
    try {
        console.log('OK: %s ===> %o', code, eval(code));
    } catch (exception) {
        console.log('ERROR: %s ===> %s', code, exception.stack);
    }
}

logAndEval('(new Map()).set(true, { value: "true" }).set(false, { value: "false"})');
logAndEval('(new Map([[true, true], [false, false]])).set(true, { value: "true" }).set(false, { value: "false"})');
```

**Результат виконання:**
```text
OK: (new Map()).set(true, { value: "true" }).set(false, { value: "false"}) ===> Map {
  true => { value: 'true' },
  false => { value: 'false' },
  [size]: 2 }
OK: (new Map([[true, true], [false, false]])).set(true, { value: "true" }).set(false, { value: "false"}) ===> Map {
  true => { value: 'true' },
  false => { value: 'false' },
  [size]: 2 }
```

### Map.prototype.delete()
Метод `Map.prototype.delete(key)` видаляє зв'язок для ключа `key` з відображення. [MDN: Map.prototype.delete()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete)
Метод повертає `true`, якщо ключ `key` був присутній у множині та `false`, - якщо ні.

**Приклад:**
```ecmascript 6
function logAndEval(code) {
    try {
        console.log('OK: %s ===> %o', code, eval(code));
    } catch (exception) {
        console.log('ERROR: %s ===> %s', code, exception.stack);
    }
}

logAndEval('(new Map([[1, 1]])).delete(0)');
logAndEval('(new Map([[1, 1]])).delete(1)');
```

**Результат виконання:**
```text
OK: (new Map([[1, 1]])).delete(0) ===> false
OK: (new Map([[1, 1]])).delete(1) ===> true
```

### Map.prototype.clear()
Метод `Map.prototype.clear()` видаляє всі зв'язки із відображення. [MDN: Map.prototype.clear()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear)

**Приклад:**
```ecmascript 6
function logAndEval(code) {
    try {
        console.log('OK: %s ===> %o', code, eval(code));
    } catch (exception) {
        console.log('ERROR: %s ===> %s', code, exception.stack);
    }
}

const m = new Map([[1, 2], [3, 5]]);
logAndEval('m');
m.clear();
logAndEval('m');
```

**Результат виконання:**
```text
OK: m ===> Map { 1 => 2, 3 => 5, [size]: 2 }
OK: m ===> Map {}
```

### Map.prototype.has()
Метод `Map.prototype.has(key)` повертає `true`, якщо ключ `key` присутній у відображенні та `false`, - якщо ні. [MDN: Map.prototype.has()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has)

**Приклад:**
```ecmascript 6
function logAndEval(code) {
    try {
        console.log('OK: %s ===> %o', code, eval(code));
    } catch (exception) {
        console.log('ERROR: %s ===> %s', code, exception.stack);
    }
}

logAndEval('(new Map([[1, 1]])).has(0)');
logAndEval('(new Map([[1, 1]])).has(1)');
```

**Результат виконання:**
```text
OK: (new Map([[1, 1]])).has(0) ===> false
OK: (new Map([[1, 1]])).has(1) ===> true
```

### Map.prototype.get()
Метод `Map.prototype.get(key)` повертає значення, що зв'язане з ключем `key`, якщо таке існує, або `undefined` в іншому випадку. [MDN: Map.prototype.get()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get)

**Приклад:**
```ecmascript 6
function logAndEval(code) {
    try {
        console.log('OK: %s ===> %o', code, eval(code));
    } catch (exception) {
        console.log('ERROR: %s ===> %s', code, exception.stack);
    }
}

logAndEval('(new Map([[1, 1]])).get(0)');
logAndEval('(new Map([[1, 1]])).get(1)');
```

**Результат виконання:**
```text
OK: (new Map([[1, 1]])).get(0) ===> undefined
OK: (new Map([[1, 1]])).get(1) ===> 1
```


### Map.prototype.size
Властивість `Map.prototype.size` доступна лише для читання і зберігає кількість встановлених у відображенні зв'язків.

**Приклад:**
```ecmascript 6
function logAndEval(code) {
    try {
        console.log('OK: %s ===> %o', code, eval(code));
    } catch (exception) {
        console.log('ERROR: %s ===> %s', code, exception.stack);
    }
}

logAndEval('(new Map()).size');
logAndEval('(new Map([])).size');
logAndEval('(new Map([[1, 1], [2, 2]])).size');
```

**Результат виконання:**
```text
OK: (new Map()).size ===> 0
OK: (new Map([])).size ===> 0
OK: (new Map([[1, 1], [2, 2]])).size ===> 2
```

### Map.prototype.keys()
Метод `Map.prototype.keys()` повертає ітератор ключів, присутніх у відображенні.

**Приклад:**
```ecmascript 6
for (let key of (new Map([[{}, {}], [0, 0], [true, {}]])).keys()) {
    console.log(key);
}
```

**Результат виконання:**
```text
{}
0
true
```

### Map.prototype.values()
Метод `Map.prototype.values()` повертає ітератор значень, присутніх у відображенні.

**Приклад:**
```ecmascript 6
for (let value of (new Map([[0, { value: "hello" }], [1, { value: "world" }]])).values()) {
    console.log(value);
}
```

**Результат виконання:**
```text
{ value: 'hello' }
{ value: 'world' }
```

xsxsaxas
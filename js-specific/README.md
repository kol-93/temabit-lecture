# Особливості мови програмування JavaScript

## References:
 - [Специфікація ECMA-262](http://www.ecma-international.org/ecma-262)
 - [MDN: JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Типи даних
 1. **< primitive >**
    1. undefined
    1. boolean
    1. number
    1. string
    1. symbol
    1. null
 1. **< object >**
    1. Object
        1. Array
        1. Function
        1. Об'єкти-обгортки:
            1. Boolean
            1. Number
            1. String
            1. Symbol

### Тип даних визначається за допомою оператора *typeof*

## Таблиця результатів оператора *typeof*:
| Тип даних        | Значення результату           |
| ---------------- |:-----------------------------:|
| undefined        | "undefined"                   |
| null             | "object"                      |
| boolean          | "boolean"                     |
| number           | "number"                      |
| string           | "string"                      |
| symbol           | "symbol"                      |
| Function         | "function"                    |
| Object           | "object"                      |

Приклад використання:
```ecmascript 6
function logAndEval(code) { console.log('%s ===> %j', code, eval(code)); }

logAndEval('typeof undefined');
logAndEval('typeof 10');
logAndEval('typeof 0.');
logAndEval('typeof NaN');
logAndEval('typeof true');
logAndEval('typeof false');
logAndEval('typeof "10"');
logAndEval('typeof "true"');
logAndEval('typeof "false"');
logAndEval('typeof null');
logAndEval('typeof {}');
logAndEval('typeof (new Boolean(true))');
logAndEval('typeof (new Number(10))');
logAndEval('typeof (new String("qwerty"))');
logAndEval('typeof []');
logAndEval('typeof (function(){})');
```

Результат виконнання коду:
```text
typeof undefined ===> "undefined"
typeof 10 ===> "number"
typeof 0. ===> "number"
typeof NaN ===> "number"
typeof true ===> "boolean"
typeof false ===> "boolean"
typeof "10" ===> "string"
typeof "true" ===> "string"
typeof "false" ===> "string"
typeof null ===> "object"
typeof {} ===> "object"
typeof (new Boolean(true)) ===> "object"
typeof (new Number(10)) ===> "object"
typeof (new String("qwerty")) ===> "object"
typeof [] ===> "object"
typeof (function(){}) ===> "function"
typeof Symbol("test") ===> "symbol"
```

### Прототипи, класи і наслідування
В JavaScript наслідування реалізоване через, так звані, **ланцюжки прототипів**.
Якщо на етапі доступу до деякого поля **X** в об'єкті **O** (*Вираз:* **O.X** або **O["X"]**) дане поле не було знайдено в об'єкті **O**, то пошук буде продовжено у об'єкті-прототипі об'єкта **O**.

Приклад:
```ecmascript 6
function logAndEval(code) { console.log('%s ===> %j', code, eval(code)); }

logAndEval('typeof ({}).toString');
```

Результат виконнання коду:
```text
typeof ({}).toString ===> function
```

#### Робота з прототипом
Функції для роботи з прототипом об'єктів:
 - `Object.create(proto = Object.prototype, propertiesObject = {})` - Створює новий об'єкт із прототипом `x`. [MDN: Object.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)


### Перевірка приналежності об'єкта класу перевіряється за допомогою оператора *instanceof*
Приклад використання:
```ecmascript 6
function logAndEval(code) { console.log('%s ===> %j', code, eval(code)); }

logAndEval('[] instanceof Array');
logAndEval('[] instanceof Object');
logAndEval('[] instanceof Function');

logAndEval('({}) instanceof Array');
logAndEval('({}) instanceof Object');
logAndEval('({}) instanceof Function');

logAndEval('(function (){}) instanceof Array');
logAndEval('(function (){}) instanceof Object');
logAndEval('(function (){}) instanceof Function');
```

Результат виконнання коду:
```text
[] instanceof Array ===> true
[] instanceof Object ===> true
[] instanceof Function ===> false
({}) instanceof Array ===> false
({}) instanceof Object ===> true
({}) instanceof Function ===> false
(function (){}) instanceof Array ===> false
(function (){}) instanceof Object ===> true
(function (){}) instanceof Function ===> true
```


## Оператори порівняння
 1. Оператор "**loose equality**" ***(слабкої рівності)*** (**==**)
 1. Оператор "**strict equality**" ***(сильної рівності)*** (**===**)
 1. Оператор "**not equal to**" (**!=**)
 1. Оператор "**not strict equal to**" (**!==**)

Приклад використання:
```ecmascript 6
function logAndEval(code) { console.log('%s ===> %j', code, eval(code)); }

logAndEval('1 === 1');
logAndEval('1 == 1');
logAndEval('1 === "1"');
logAndEval('1 == "1"');

logAndEval('true === true');
logAndEval('true == true');
logAndEval('true === "true"');
logAndEval('true == "true"');

logAndEval('"abc" === "abc"');
logAndEval('"abc" == "abc"');

var x = {
    value: {
        value: "10",
        toString: function () {
            console.log('x.value.toString()');
            return this.value;
        }
    },
    toString: function() {
        console.log('x.toString()');
        return this.value;
    }
};
var y = {
    value: 10,
    toString: function() {
        console.log('y.toString()');
        return this.value.toString();
    }
};

logAndEval('10 === y');
logAndEval('10 == y');
logAndEval('y == 10');

logAndEval('x === y');
logAndEval('x == y');

logAndEval('10 === x');
logAndEval('10 == x');
```

Результат виконнання коду:
```text
1 === 1 ===> true
1 == 1 ===> true
1 === "1" ===> false
1 == "1" ===> true
true === true ===> true
true == true ===> true
true === "true" ===> false
true == "true" ===> false
"abc" === "abc" ===> true
"abc" == "abc" ===> true
10 === y ===> false
y.toString()
10 == y ===> true
y.toString()
y == 10 ===> true
x === y ===> false
x == y ===> false
10 === x ===> false
x.toString()
undefined:1
10 == x
   ^

TypeError: Cannot convert object to primitive value
    at eval (eval at logAndEval (/home/kol/projects/lecture.node/test.js:1:123), <anonymous>:1:4)
    at logAndEval (/home/kol/projects/lecture.node/test.js:1:123)
    at Object.<anonymous> (/home/kol/projects/lecture.node/test.js:45:1)
    at Module._compile (module.js:652:30)
    at Object.Module._extensions..js (module.js:663:10)
    at Module.load (module.js:565:32)
    at tryModuleLoad (module.js:505:12)
    at Function.Module._load (module.js:497:3)
    at Function.Module.runMain (module.js:693:10)
    at startup (bootstrap_node.js:191:16)
```

**Задача**
```ecmascript 6
function assert(value, message) {
    if (!value) {
        throw new Error(message);
    }
}

function test(x) {
    assert(x == 2 && x == 3, 'Invalid value');
}

var x = undefined; /// <== Підібрати коректне значення змінної
test(x);
```

## Об'єкти і їх властивості
Порядок доступу до властивостей об'єкта:
 1. властивості-дескриптори
 1. власні властивості
 1. властивості прототипа

Функції для роботи розширеної взаємодії з властивостями об'єктів:
 - `Object.keys(x)` - повертає список імен власних перераховуваних властивостей та дескрипторів об'єкта `x`. [MDN: Object.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
 - `Object.values(x)` - повертає список значень власних перераховуваних властивостей та дескрипторів об'єкта `x`. [MDN: Object.values()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)
 - `Object.entries(x)` - повертає список пар ім'я-значення власних перераховуваних властивостей та дескрипторів об'єкта `x`. [MDN: Object.entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
 - `Object.defineProperty(x, name, descriptor)` - встановлює або заміняє дескриптор для властивості `name` об'єкта `x` вказаним у `descriptor`. [MDN: Object.defineProperty()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
 - `Object.defineProperties(x, props)` - встановлює або замінює дескриптори об'єкта `x`, вказаними у об'єкті `props`. (Аналогічно виконанню `Object.defineProperty(x, name, prop)` для кожного `[name, prop]` із `Object.entries(props)`) [MDN: Object.defineProperties()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)
 - `Object.getOwnPropertyDescriptor(x, name)` - повертає об'єкт дескриптора властивості `name` об'єкта `x` (якщо дана властивість існує). [MDN: Object.getOwnPropertyDescriptor()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor)
 - `Object.getOwnPropertyDescriptors(x)` - повертає об'єкт у форматі `{ [name]: prop }`, наповнений дескрипторами об'єкта `x`. [MDN: Object.getOwnPropertyDescriptors()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors)
 - `Object.freeze(x)` - "заморожує" об'єкт `x` - забороняє зміну та видалення існуючих властивостей об'єкта та додавання нових. [MDN: Object.freeze()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
 - `Object.seal(x)` - "опечатує" об'єкт `x` - забороняє додавання нових та видалення старих властивостей об'єкта. [MDN: Object.seal()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)
 - `Object.preventExtensions(x)` - забороняє додавання нових властивостей до об'єкта `x`. [MDN: Object.preventExtensions()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)
 - `Object.isFrozen(x)` - визначає, чи `x` "заморожений". [MDN: Object.isFrozen()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen)
 - `Object.isSealed(x)` - визначає, чи `x` "опечатаний". [MDN: Object.isSealed()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed)
 - `Object.isExtensible(x)` - визначає, чи до `x` можна додавати нові властивості. [MDN: Object.isExtensible()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)

Приклад використання властивостей та їх дескрипторів:
```ecmascript 6
function logAndEval(code) { console.log('%s ===> %o', code, eval(code)); }

var X = {}; // Створюємо новий об'єкт

X.x  = 10; // Явно задаємо властивість x
Object.defineProperty(X, 'y', { // Явно задаємо дескриптор для властивості y
    value: 42,                  // значення
    writable: false,            // незмінювана властивість
    configurable: false,        // забороняємо виконання інструкції delete X.y
    enumerable: false,          // властивість не буде з'являтися у стандартному переліку
});
Object.defineProperty(X, 'z', { // Явно задаємо дескриптор для властивості z
    value: 42,                  // значення
    writable: true,             // змінювана властивість
    configurable: false,        // забороняємо виконання інструкції delete X.z
    enumerable: true,           // властивість буде з'являтися у стандартному переліку
});
Object.defineProperty(X, 'a', { // Явно задаємо дескриптор для властивості a
    get: function getA() {      // функція, що буде викликатися при кожній спробі отримати значення властивості
        console.log('GET X.a');
        return 42;
    },
    set: function setA(value) { // функція, що буде викликатися при кожній спробі встановити значення властивості
        console.log('SET X.a = %o', value);
    },
    configurable: false,        // забороняємо виконання інструкції delete X.a
    enumerable: false,          // властивість не буде з'являтися у стандартному переліку
});

logAndEval('Object.keys(X)');
logAndEval('Object.values(X)');
logAndEval('Object.entries(X)');
logAndEval('Object.getOwnPropertyNames(X)');
logAndEval('Object.getOwnPropertyDescriptors(X)');
logAndEval('X.x = 20');
logAndEval('X.x');
logAndEval('X.y = 20');
logAndEval('X.y');
logAndEval('X.z = 20');
logAndEval('X.z');
logAndEval('X.a = 20');
logAndEval('X.a');
```

Результат виконання коду:
```text
Object.keys(X) ===> [ 'x', 'z', [length]: 2 ]
Object.values(X) ===> [ 10, 42, [length]: 2 ]
Object.entries(X) ===> [ [ 'x', 10, [length]: 2 ],
  [ 'z', 42, [length]: 2 ],
  [length]: 2 ]
Object.getOwnPropertyNames(X) ===> [ 'x', 'y', 'z', 'a', [length]: 4 ]
Object.getOwnPropertyDescriptors(X) ===> { x:
   { value: 10,
     writable: true,
     enumerable: true,
     configurable: true },
  y:
   { value: 42,
     writable: false,
     enumerable: false,
     configurable: false },
  z:
   { value: 42,
     writable: true,
     enumerable: true,
     configurable: false },
  a:
   { get:
      { [Function: getA]
        [length]: 0,
        [name]: 'getA',
        [arguments]: null,
        [caller]: null,
        [prototype]: getA { [constructor]: [Circular] } },
     set:
      { [Function: setA]
        [length]: 1,
        [name]: 'setA',
        [arguments]: null,
        [caller]: null,
        [prototype]: setA { [constructor]: [Circular] } },
     enumerable: false,
     configurable: false } }
X.x = 20 ===> 20
X.x ===> 20
X.y = 20 ===> 20
X.y ===> 42
X.z = 20 ===> 20
X.z ===> 20
SET X.a = 20
X.a = 20 ===> 20
GET X.a
X.a ===> 42
```

Приклади використання "заморозки", "опечатування" та заборони розширення:
```ecmascript 6
function logAndEval(code) { console.log('%s ===> %o', code, eval(code)); }

var frozen = {
    a: 1,
    b: 2,
    c: {
        x: 1
    }
};
var sealed = {
    a: 1,
    b: 2,
    c: {
        x: 1
    }
};
var notExtensible = {
    a: 1,
    b: 2,
    c: {
        x: 1
    }
};
Object.freeze(frozen);
Object.seal(sealed);
Object.preventExtensions(notExtensible);

logAndEval('[Object.isFrozen(frozen), Object.isSealed(frozen), Object.isExtensible(frozen)]');
logAndEval('[Object.isFrozen(sealed), Object.isSealed(sealed), Object.isExtensible(sealed)]');
logAndEval('[Object.isFrozen(notExtensible), Object.isSealed(notExtensible), Object.isExtensible(notExtensible)]');

logAndEval('(frozen.a = 42, frozen)');                  // frozen "заморожений", його властивість не зміниться
logAndEval('(sealed.a = 42, sealed)');                  // sealed "опечатаний", зміна значень існуючих властивостей дозволена
logAndEval('(notExtensible.a = 42, notExtensible)');    // notExtensible забороняє лише додавання нових властивостей

logAndEval('(frozen.c.x = 42, frozen)');                // на вкладені об'єкти заборони не діють
logAndEval('(sealed.c.x = 42, sealed)');                // на вкладені об'єкти заборони не діють
logAndEval('(notExtensible.c.x = 42, notExtensible)');  // на вкладені об'єкти заборони не діють

logAndEval('(frozen.x = 42, frozen)');                  // frozen "заморожений", додавання нових властивостей заборонене
logAndEval('(sealed.x = 42, sealed)');                  // sealed "опечатаний", додавання нових властивостей заборонене
logAndEval('(notExtensible.x = 42, notExtensible)');    // notExtensible забороняє додавання нових властивостей

logAndEval('(delete frozen.a, frozen)');                // frozen "заморожений", видалення властивостей заборонене
logAndEval('(delete sealed.a, sealed)');                // sealed "опечатаний", видалення властивостей заборонене
logAndEval('(delete notExtensible.a, notExtensible)');  // notExtensible забороняє лише додавання нових властивостей

logAndEval('"use strict";(frozen.a = 42, frozen)');     // у строгому режимі всі заборони призводять до TypeError
```

Результат виконання коду:
```text
[Object.isFrozen(frozen), Object.isSealed(frozen), Object.isExtensible(frozen)] ===> [ true, true, false, [length]: 3 ]
[Object.isFrozen(sealed), Object.isSealed(sealed), Object.isExtensible(sealed)] ===> [ false, true, false, [length]: 3 ]
[Object.isFrozen(notExtensible), Object.isSealed(notExtensible), Object.isExtensible(notExtensible)] ===> [ false, false, false, [length]: 3 ]
(frozen.a = 42, frozen) ===> { a: 1, b: 2, c: { x: 1 } }
(sealed.a = 42, sealed) ===> { a: 42, b: 2, c: { x: 1 } }
(notExtensible.a = 42, notExtensible) ===> { a: 42, b: 2, c: { x: 1 } }
(frozen.c.x = 42, frozen) ===> { a: 1, b: 2, c: { x: 42 } }
(sealed.c.x = 42, sealed) ===> { a: 42, b: 2, c: { x: 42 } }
(notExtensible.c.x = 42, notExtensible) ===> { a: 42, b: 2, c: { x: 42 } }
(frozen.x = 42, frozen) ===> { a: 1, b: 2, c: { x: 42 } }
(sealed.x = 42, sealed) ===> { a: 42, b: 2, c: { x: 42 } }
(notExtensible.x = 42, notExtensible) ===> { a: 42, b: 2, c: { x: 42 } }
(delete frozen.a, frozen) ===> { a: 1, b: 2, c: { x: 42 } }
(delete sealed.a, sealed) ===> { a: 42, b: 2, c: { x: 42 } }
(delete notExtensible.a, notExtensible) ===> { b: 2, c: { x: 42 } }
undefined:1
"use strict";(frozen.a = 42, frozen)
                       ^

TypeError: Cannot assign to read only property 'a' of object '#<Object>'
    at eval (eval at logAndEval (/home/kol/projects/lecture.node/test.js:45:61), <anonymous>:1:24)
    at logAndEval (/home/kol/projects/lecture.node/test.js:45:61)
    at Object.<anonymous> (/home/kol/projects/lecture.node/test.js:92:1)
    at Module._compile (module.js:652:30)
    at Object.Module._extensions..js (module.js:663:10)
    at Module.load (module.js:565:32)
    at tryModuleLoad (module.js:505:12)
    at Function.Module._load (module.js:497:3)
    at Function.Module.runMain (module.js:693:10)
    at startup (bootstrap_node.js:191:16)
```

**Задача**

Розробити функцію для "рекурсивно-вкладеного" "замороження" властивостей об'єкта.

## Прототипи

Функції для взаємодії з прототипом об'єкта:
 - `Object.getPrototypeOf(x)` - повертає "прототип" об'єкта `x`. [MDN: Object.getPrototypeOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)
 - `Object.setPrototypeOf(x, proto)` - встановлює `proto` як "прототип" об'єкта `x`. (Використання даної функції повинно бути зведене до мінімуму у зв'язку з дуже низькою продуктивністю) [MDN: Object.setPrototypeOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)
 - `Object.create(proto, [properties])` - створює та повертає новий об'єкт з `proto` у якості "прототипа" та вказаним набором дескрипторів властивостей нового об'єкта. [MDN: Object.create()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

Приклад взаємодії з прототипом об'єкта:
```ecmascript 6
function logAndEval(code) { console.log('%s ===> %o', code, eval(code)); }

var proto = {
    x: 1,
    y: 2,
};

var X = Object.create(
    proto,
    {
        y: {
            value: 20,
            writable: true,
            enumerable: true,
            configurable: true,
        },
        z: {
            value: 30,
            writable: true,
            enumerable: true,
            configurable: true,
        },
    },
);

logAndEval('Object.getPrototypeOf(X) === proto');// proto - "прототип" об'єкта X
logAndEval('Object.getOwnPropertyNames(X)');    // власні властивості - X.y та X.z

logAndEval('[X.x, proto.x]');                   // власної властивості X.x не існує, використовується властивість прототипа
logAndEval('[X.y, proto.y]');                   // власна властивість X.y існує, властивість прототипа ігнорується
logAndEval('[X.z, proto.z]');                   // власна властивість X.z існує, властивість прототипа ігнорується

logAndEval('proto.x = "a"');                    // Зміна властивості proto.x відображається на властивості X.x
logAndEval('[X.x, proto.x]');

logAndEval('X.x = -1');                         // Зміна властивості X.x (створюється нова власна властивість) не відображається на властивості proto.x
logAndEval('[X.x, proto.x]');

logAndEval('X.y = -2');                         // Зміна властивості X.y не відображається на властивості proto.y
logAndEval('[X.y, proto.y]');

logAndEval('X.z = -3');                         // Зміна властивості X.z не відображається на властивості proto.z
logAndEval('[X.z, proto.z]');

logAndEval('proto.a = "a"');                    // Зміна властивості proto.a (створення нової властивості) відображається на властивості X.a
logAndEval('[X.a, proto.a]');
```

Результат виконання коду:
```text
Object.getPrototypeOf(X) === proto ===> true
Object.getOwnPropertyNames(X) ===> [ 'y', 'z', [length]: 2 ]
[X.x, proto.x] ===> [ 1, 1, [length]: 2 ]
[X.y, proto.y] ===> [ 20, 2, [length]: 2 ]
[X.z, proto.z] ===> [ 30, undefined, [length]: 2 ]
proto.x = "a" ===> 'a'
[X.x, proto.x] ===> [ 'a', 'a', [length]: 2 ]
X.x = -1 ===> -1
[X.x, proto.x] ===> [ -1, 'a', [length]: 2 ]
X.y = -2 ===> -2
[X.y, proto.y] ===> [ -2, 2, [length]: 2 ]
X.z = -3 ===> -3
[X.z, proto.z] ===> [ -3, undefined, [length]: 2 ]
proto.a = "a" ===> 'a'
[X.a, proto.a] ===> [ 'a', 'a', [length]: 2 ]
```

## Використання функцій як конструктора

Виклик функції як конструктора
```ecmascript 6
function Base() {
    console.log('this === global: %s', this === global);
    console.log('this instanceof Base: %s', this instanceof Base);
}

var x = Base();         /// Під час виклику функції без оператора new, у якості this передається global або window
var y = new Base();     /// Під час виклику функції з оператором new, у якості this новий об'єкт типу Base

var z = Object.create(Base.prototype);
Base.call(z);           /// Аналогом виклику через оператор new є виклик функції з явна перевизначеним this створеним за допомогою Object.create() об'єктом
```

Результат виконання коду:
```text
this === global: true
this instanceof Base: false
this === global: false
this instanceof Base: true
this === global: false
this instanceof Base: true
```

Варіант із забороною виклику без оператора **new**
```ecmascript 6
function Base() {
    if (!(this instanceof Base)) {
        throw new Error('Invalid usage. Operator new expected');
    }
    this.x = 42;
    return 42;
}

var x = new Base();                                         /// резульат виконання функції конструктора ігнорується
console.log('x.x = %s', x.x);                               /// результатом завжди буде новий об'єкт
console.log('x instanceof Base: %s', x instanceof Base);    /// класом якого буде функція-конструктор

var y = Base();                                             /// Виконання без оператора new спричинить помилку
```

Результат виконання коду:
```text
x.x = 42
x instanceof Base: true
/home/kol/projects/lecture.node/test.js:49
        throw new Error('Invalid usage. Operator new expected');
        ^

Error: Invalid usage. Operator new expected
    at Base (/home/kol/projects/lecture.node/test.js:49:15)
    at Object.<anonymous> (/home/kol/projects/lecture.node/test.js:59:9)
    at Module._compile (module.js:652:30)
    at Object.Module._extensions..js (module.js:663:10)
    at Module.load (module.js:565:32)
    at tryModuleLoad (module.js:505:12)
    at Function.Module._load (module.js:497:3)
    at Function.Module.runMain (module.js:693:10)
    at startup (bootstrap_node.js:191:16)
    at bootstrap_node.js:612:3
```

Варіант з примусовим створенням нового екземпляру:
```ecmascript 6
function Base() {
    if (!(this instanceof Base)) {
        return new Base();
    }
    this.x = 42;
}

var x = new Base();                                         /// резульат виконання функції конструктора ігнорується
console.log('x.x = %s', x.x);                               /// результатом завжди буде новий об'єкт
console.log('x instanceof Base: %s', x instanceof Base);    /// класом якого буде функція-конструктор

var y = Base();                                             /// виклик створить новий екземпляр
console.log('y.x = %s', y.x);                               /// результатом завжди буде новий об'єкт
console.log('y instanceof Base: %s', y instanceof Base);    /// класом якого буде функція-конструктор
```

Результат виконання коду:
```text
x.x = 42
x instanceof Base: true
y.x = 42
y instanceof Base: true
```

Варіант використання в ролі класу-обгортки
```ecmascript 6
function Base() {
    if (!(this instanceof Base)) {
        return 42;
    }
    this.value = 42;
}

Base.prototype.valueOf = function valueOf() {
    return this.value;
};

logAndEval('x = new Base(); x.valueOf()');                     // буде створений новий екземпляр класу Base
logAndEval('y = Base(); y');                                   // функція поверне примітивне значення 42
```

Результат виконання коду:
```text
x = new Base(); x.valueOf() ===> 42
y = Base(); y ===> 42
```

Наслідування та перевизначення властивостей в EcmaScript 5:
```ecmascript 6
function logAndEval(code) { console.log('%s ===> %o', code, eval(code)); }

function Base(value) {                                             // передача аргументів в конструктор
    if (!(this instanceof Base)) {
        throw new Error('Invalid usage. Operator new expected');
    }
    this.value = value;
}

Base.value = "static 42";                                           // визначення статичної властивості

Base.s = function s() {                                             // визначення статичного методу
    console.log('Static method Base.s()', this.value);
};

Base.prototype.f = function f() {                                   // визначення методу в базовому класі
    console.log('Method Base.f()', this.value);
};

function Derived() {
    if (!(this instanceof Derived)) {
        throw new Error('Invalid usage. Operator new expected');
    }
    Base.call(this, 42);
}

Derived.prototype = Object.create(Base.prototype);                  // налаштування прототипного наслідування екземплярів
Object.setPrototypeOf(Derived, Base);                               // та статичних частин

Derived.prototype.f = function f() {                                // перевизначення методу в дочірньому класі
    console.log('Method Derived.f()', this.value);
};

Derived.s = function s() {                                          // перевизначення статичного методу в дочірньому класі
    console.log('Static method Derived.s()', this.value);           // виклик статичного методу базового класа не відбувається
};

var b1 = new Base("hello");
var b2 = new Base();
var d = new Derived();

b1.f();
b2.f();
d.f();

logAndEval('b1 instanceof Base');
logAndEval('b2 instanceof Base');
logAndEval('d instanceof Base');

logAndEval('b1 instanceof Derived');
logAndEval('b2 instanceof Derived');
logAndEval('d instanceof Derived');

Base.s();
Derived.s();
```

Результат виконання коду:
```text
Method Base.f() hello
Method Base.f() undefined
Method Derived.f() 42
b1 instanceof Base ===> true
b2 instanceof Base ===> true
d instanceof Base ===> true
b1 instanceof Derived ===> false
b2 instanceof Derived ===> false
d instanceof Derived ===> true
Static method Base.s() static 42
Static method Derived.s() static 42
```

Наслідування та перевизначення властивостей в EcmaScript 6:
```ecmascript 6
function logAndEval(code) { console.log('%s ===> %o', code, eval(code)); }

class Base {
    static s() {
        console.log('Static method Base.s()', this.value);
    }

    constructor(value) {
        this.value = value;
    }

    f() {
        console.log('Method Base.f()', this.value);
    }
}

Base.value = 'static 42';

class Derived extends Base {
    static s() {
        console.log('Static method Derived.s()', this.value);
    }

    constructor() {
        super(42);
    }

    f() {
        console.log('Method Derived.f()', this.value);
        super.f();
    }
}

var b1 = new Base("hello");
var b2 = new Base();
var d = new Derived();

b1.f();
b2.f();
d.f();

logAndEval('b1 instanceof Base');
logAndEval('b2 instanceof Base');
logAndEval('d instanceof Base');

logAndEval('b1 instanceof Derived');
logAndEval('b2 instanceof Derived');
logAndEval('d instanceof Derived');

Base.s();
Derived.s();
```

Результат виконання коду:
```text
Method Base.f() hello
Method Base.f() undefined
Method Derived.f() 42
Method Base.f() 42
b1 instanceof Base ===> true
b2 instanceof Base ===> true
d instanceof Base ===> true
b1 instanceof Derived ===> false
b2 instanceof Derived ===> false
d instanceof Derived ===> true
Static method Base.s() static 42
Static method Derived.s() static 42
```

**Задача**

Розробити клас `FakeDate` для підміни класу `Date` з можливістю підміни реальної дати на зарання вказану. [MDN: Date](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Date)

Відмінності від `Date`:
 - `FakeDate()` - повинен працювати аналогічним чином, але повертати "фейкове" число мілісекунд від 1 січня 1970 року (00:00:00 за UTC).
 - `new FakeDate()` - повинен створювати новий екземпляр з "фейковою" датою.
 - `FakeDate.now()` - повинен працювати аналогічним чином, але повертати "фейкове" число мілісекунд від 1 січня 1970 року (00:00:00 за UTC).
 - `FakeDate.setNow(value)` - повинен вказувати "фейкове" число мілісекунд від 1 січня 1970 року (00:00:00 за UTC).


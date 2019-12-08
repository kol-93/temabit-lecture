# DOM Events

## References:
 1. [W3C UI Events](https://www.w3.org/TR/uievents/)
 1. [Events and the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Events)
 1. [MDN: Event API](https://developer.mozilla.org/ru/docs/Web/API/Event)

## Examples:
 - **example-mouse.html** - приклад, як працює обробка подій, пов'язаних із активністю "миші":
    - фази обробки
    - визначення цільового елемента
    - відміна виконання стандартної дії
    - зупинка руху події по ланцюгу елементів DOM-дерева
    - зупинка руху події по ланцюгу обробників
 - **example.html** - код, який набирався на лекції

## Capturing vs Bubbling
![Event Flow](https://learn.javascript.ru/article/event-bubbling/eventflow@2x.png)

**Фази обробки подій:**
 1. **Перехоплення події** - пошук конкретного елемента в DOM-дереві від кореня (*window*) до конкретного елемента дерева
 1. **Обробка події на цільовому елементі дерева** - створення та налаштування об'єкта події 
 1. **Спливання події** - рух події від цільового елемента до кореня DOM-дерева (*window*)

**Ключові властивості об'єкта події**
 - *[read-only]* *[boolean]* ***Event.prototype***.cancellable - **true** вказує на те, що на об'єкті події дозволено виконувати ***Event.prototype***.preventDefault()
 - *[read-only]* *[boolean]* ***Event.prototype***.defaultPrevented - **true** вказує на те, що на об'єкті події було виконано ***Event.prototype***.preventDefault()
 - *[read-only]* *[boolean]* ***Event.prototype***.isTrusted - **true** вказує на те, що подія була ініційована безпосередньо браузером, а не сценарієм сторінки
 - *[read-only]* *[number/enum]* ***Event.prototype***.eventPhase - поточна фаза обробки даного об'єкта події:
    - **Event.NONE = 0** - обробка ще не починалась, або уже закінчилась
    - **Event.CAPTURING_PHASE = 1** - подія знаходиться на стадії "перехоплення"
    - **Event.AT_TARGET = 2** - подія знаходиться на стадії "цілі"
    - **Event.BUBBLING_PHASE = 3** - подія знаходиться на стадії "спливання"
 - *[read-only]* *[EventTarget | null]* ***Event.prototype***.currentTarget - посилання на той елемент DOM-дерева, на якому було виконано поточний ообробник.
 - *[read-only]* *[EventTarget | null]* ***Event.prototype***.target - посилання на цільовий елемент DOM-дерева.
 - *[read-only]* *[number]* ***Event.prototype***.timeStamp - час створення об'єкта продії в мілісекундах (можна перетворити в дату за допомогою **new Date()**).
 - *[read-only]* *[string]* ***Event.prototype***.type - тип/назва події

**Ключові методи об'єкта події**
 - ***Event.prototype***.preventDefault() - відміняє стандартний обробник браузера для даного об'єкта події
 - ***Event.prototype***.stopImmediatePropagation() - зупиняє рух події по ланцюжку обробників як в межах поточного елемента, так і в межах інших елементів DOM-дерева
 - ***Event.prototype***.stopPropagation() - зупиняє рух події по ланцюжку обробників як лише в межах інших елементів DOM-дерева

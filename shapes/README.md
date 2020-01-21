# Shapes library

## References:
 - [W3 Schools: HTML5 Canvas](https://www.w3schools.com/html/html5_canvas.asp)
 - [W3 Schools: Canvas Drawing](https://www.w3schools.com/graphics/canvas_drawing.asp)
 - [W3 Schools: Canvas Coordinates](https://www.w3schools.com/graphics/canvas_coordinates.asp)
 - [W3 Schools: Canvas Reference](https://www.w3schools.com/tags/ref_canvas.asp)
 - [W3C: Canvas 2-D Context](https://www.w3.org/TR/2dcontext/)
 - [MDN: CanvasRenderingContext2D](https://developer.mozilla.org/uk/docs/Web/API/CanvasRenderingContext2D)

## HTMLCanvasElement
### Властивості
 - *\[number\]* **HTMLCanvasElement.prototype.height** - висота елемента в пікселях
 - *\[number\]* **HTMLCanvasElement.prototype.width** - ширина елемента в пікселях
### Методи
 - **HTMLCanvasElement.prototype.getContext(contextType: *"2d"|"webgl"|"webgl2"|"bitmaprenderer"*, \[contextAttributes\]: *object*): *Context|null*** - повертає об'єкт контекста малювання (в залежності від contextType) або null, якщо вказаний тип контекста не підтримується.
 - **HTMLCanvasElement.prototype.toDataURL(\[type\]: *string*, \[encoderOptions\]: *object*): *string*** - повертає рядок, закодований як Base64 URL, що відповідає малюнку в канві на момент виконання.

## CanvasRenderingContext2D
### Властивості (для огляду)
 - *\[number\]* **CanvasRenderingContext2D.prototype.lineWidth** - поточна товщина лінії
 - *\["butt"|"round"|"square"\]* **CanvasRenderingContext2D.prototype.lineCap** - поточний варіант завершення ліній:
 ![lineCap](https://mdn.mozillademos.org/files/236/Canvas_linecap.png)
     - "butt" - варіант за замовчуванням - лінія малюється як прямокутник із дожиною еквівалентною довжині лінії і шириною, еквівалентною товщині лінії
     - "round" - як "butt" + на кінцях додаються півкруги з діаметром еквівалентним товщині лінії
     - "square" - як "butt" + на кінцях додаються прямокутники з довжиною в половину товщини лінії і шириною еквівалентною товщині лінії
 - *\["round"|"bevel"|"miter"\]* **CanvasRenderingContext2D.prototype.lineJoin** - поточний варіант з'єднання ліній:
 ![lineJoin](https://mdn.mozillademos.org/files/237/Canvas_linejoin.png)
     - "round" - завершує відрізки ліній як "butt", для доповлення малює круг у спільній точці двох відрізків з діаметром еквівалентним товщині лінії
     - "bevel" - завершує відрізки ліній як "butt", для доповнення малює трикутник з вершинами у спільній точці та у точках кінців відрізків
     - "miter" - завершує відрізки ліній як "butt", для доповлення малює ромб з вершинами у спільній точці та у точках кінців відрізків
 - *\[number\]* **CanvasRenderingContext2D.prototype.miterLimit** - максимальна довжина доповнення типу "miter". Якщо необхідна довжина доповнення перевищує вказане значення, довнення відбувається за допомогою "bevel"
 - *\[string\]* **CanvasRenderingContext2D.prototype.fillStyle** - колір заповення
 - *\[string\]* **CanvasRenderingContext2D.prototype.strokeStyle** - колір контурів
 - *\[number\]* **CanvasRenderingContext2D.prototype.shadowBlur** - радіус розмиття тіней фігур
 - *\[string\]* **CanvasRenderingContext2D.prototype.shadowColor** - колір тіней фігур
 - *\[number\]* **CanvasRenderingContext2D.prototype.shadowOffsetX** - зміщення тіні фігури по осі X
 - *\[number\]* **CanvasRenderingContext2D.prototype.shadowOffsetY** - зміщення тіні фігури по осі Y
### Методи (для огляду)
 - **CanvasRenderingContext2D.prototype.beginPath(): *void*** - ініціює створення нового "шляху"
 - **CanvasRenderingContext2D.prototype.closePath(): *void*** - ініціює замикання поточного "шляху"
 - **CanvasRenderingContext2D.prototype.moveTo(x: *number*, y: *number*): *void*** - переносить перо до точки з координатами (x, y)
 - **CanvasRenderingContext2D.prototype.lineTo(x: *number*, y: *number*): *void*** - продовжує шлях до точки з координатами (x, y)
 - **CanvasRenderingContext2D.prototype.arc(x: *number*, y: *number*, radius: *number*, startAngle: *number*, endAngle: *number*, \[anticlockwise\]: *boolean*): *void*** - малює дугу кола з центром в точці з координатами *(x, y)*, радіусом *radius*, від кута *startAngle* до кута *stopAngle* за часовою або проти часової стрілки (в залежності від параметра *anticlockwise*)
 - **CanvasRenderingContext2D.prototype.clearRect(x: *number*, y: *number*, width: *number*, height: *number*): *void*** - виконує очистку канви в межах прямокутної області *(x, y)*, *(x+width,h+height)*
 - **CanvasRenderingContext2D.prototype.fill(): *void*** - заповнює поточний "шлях" поточним кольором заповнення
 - **CanvasRenderingContext2D.prototype.stroke(): *void*** - обводить поточний "шлях" поточним кольором контурів
 - **CanvasRenderingContext2D.prototype.isPointInPath(x: *number*, y: *number*): *void*** - визначає, чи точка *(x, y)* знаходиться в межах поточного шляху
 - **CanvasRenderingContext2D.prototype.isPointInStroke(x: *number*, y: *number*): *void*** - визначає, чи точка *(x, y)* знаходиться на контурі поточного шляху











'use strict';

function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
    if (support == true) {
        document.querySelector('body').classList.add('webp');
    } else {
        document.querySelector('body').classList.add('no-webp');
    }
});


const animItems = document.querySelectorAll(`._anim-items`);

if (animItems.length > 0) {

    function animOnScroll() {
        for (let i = 0; i < animItems.length; i++) {
            const animItem = animItems[i];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = getOffset(animItem).top;
            // Коэффицент того, когда начинается анимация.
            // В нашем случае это тогда, когда мы проскроллим четверть высоты объекта.
            const animStart = 2;

            // Точка, на которой мы должны анимировать элемент
            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            // сам момент проверки, следует ли нам активировать анимацию добавив к нужному элементу класс
            // проверяем не докрутили ли мы до того момента, когда прокрученное расстояние "заходит"
            // на положение элемента - четверть его высоты
            if ((scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight)) {
                animItem.classList.add(`_animated`);
            }
        }
    }

    // Функция вычисляющая положение скролла для конкретного элемента
    function getOffset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.scroollX || document.documentElement.scrollLeft,
            scrollTop = window.scrollY || document.documentElement.scrollTop;
        return {
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft
        }
    }

    animOnScroll();
    window.addEventListener(`scroll`, animOnScroll);
}
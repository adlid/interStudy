
const isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera ||
            isMobile.Windows()
        );
    }
};

if (isMobile.any()) {
    document.body.classList.add('_touch');
    let menuArrows = document.querySelectorAll('.menu__arrow');
    if (menuArrows.length > 0) {
        for (let index = 0; index < menuArrows.length; index++) {
            const menuArrow = menuArrows[index];
            menuArrow.addEventListener('click', (e) => {
                menuArrow.parentElement.classList.toggle('_active');
            })
        }
    }
} else {
    document.body.classList.add('_pc');
}
let menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', onMenuLinkClick)
    })

    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

            if (iconMenu.classList.contains('_active')) {
                document.body.classList.remove('_lock')
                iconMenu.classList.remove('_active')
                menuBody.classList.remove('_active')
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: 'smooth'
            });
            e.preventDefault();
        }
    }
}
const iconMenu = document.querySelector('.menu__icon')
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
    iconMenu.addEventListener('click', (e) => {
        console.log("OK")
        document.body.classList.toggle('_lock')
        iconMenu.classList.toggle('_active')
        menuBody.classList.toggle('_active')
    })
}
AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
    
  
    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 220, // offset (in px) from the original trigger point
    delay: 500, // values from 0 to 3000, with step 50ms
    duration: 700, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
  
  });
new Swiper('.image-slider', {
    // Optional parameters
    loop: true,

    
  

  
    simulateTouch: true,

    //Чувствительность сваипа
   // touchRatio: 1,

    //Уголь срабатывание сваипа/перетаскивание
    //touchAngle: 45,
    autoHeight: true,
    //Курсор перетаскиваие колы шыгы турады мышканы бассан колы жумылады
    grabCursor: true,

    //сурет либо слаид устинен мышкамен бир рет басканда ауысып кетуи ушин
    slideToClickedSlide: true,

    //управление клавишом
    keyboard: {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true
    },

    //артурли размердеги слаидерлар келген кезде высота автоматты турде тендеи болады
    //autoHeight: true,

    //количество слаида в экране
    slidesPerView: 1,

    //Отключение функционала
    //если слаидов меньше чем нужно
    watchOverflow: true,

    //отсупы между слаидами
    spaceBetween: 20,

    //Количество пролиствыемых слайдов
    //slidesPerGroup: 1,

    //Активный слайд по центру
    //centeredSlides: true,

    //Стартовый слаид
    initialSlide: 0,

    //Мультирядность-бир бетте канша слаид катарына туратындыгы туралы истеу. ол ушин автоъэйтти алып тастауымыз керек жане сиэсэсте бираз жумыс жасауымых керек
    //slidesPerColumn: 2

    //Бесконечный слаидер. Нюансы мультирядностты оширу керек жане скролды оширу керек

    //Кол-во дублирующих слайдов
    //loopedSlides: 2,

    //Свободный режим
    //freeMode: true,

    //автопрокрутка
    autoplay: {
        //пауза между прокруткои
        delay: 2000,
        //Закончить на последном слаиде
        //stopOnLastSlide: true,
        //Отключить после ручного переключение
        disableOnInteraction: false
    },

    //Скорость
    speed: 3500,

    //Эффекты переключение слайда
    //Листание
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    centeredSlides: true,
    //смена прозрачность
    /* effect: 'fade',
     fadeEffect: {
         crossFade: true
     },*/
    //Переворот
    /*effect: 'flip',
    flipEffect: {
        //Тень
        slideShadows: true,
        //Показ только автивного слаида
        limitRotation: true
    },*/
    //Куб
    /*effect: 'cube',
    cubeEffect: {
        slideShadows: true,
        shadow: true,
        shadowOffset: 20,
        shadowScale: 0.94
    }*/
    //Эффект  потоко
    /*effect: 'coverflow',
    coverflowEffect: {
        rotate: 10,
        stretch: 10,
        slideShadows: false
    }*/
});
let CommentsSlider = new Swiper('.reviews-slider', {
    slidesPerView: 1,
    loop: true,
    spaceBetween: 20,
    autoHeight: true,
    navigation: {
        prevEl: '.reviews-slider-nav-prev',
        nextEl: '.reviews-slider-nav-next',
    },
    pagination: {
        el: '.review-block__pagination',
        clickable: true,
        type: 'bullets'
    },
    breakpoints: {
        699: {
            slidesPerView: 2
        }
    }
});
let ServiceSlider = new Swiper('.services__slider', {
    slidesPerView: 2,
    loop: true,
    spaceBetween: 20,
    autoHeight: true,
    slidesPerGroup: 1,
    freeMode: true,
    breakpoints: {
        699: {
            slidesPerView: 2
        }
    },
    touchRatio: 1,
    grabCursor: true,
    loopedSlides: 2,
    autoplay: {
        //пауза между прокруткои
        delay: 2000,
        //Закончить на последном слаиде
        stopOnLastSlide: true,
        //Отключить после ручного переключение
        disableOnInteraction: false
    },
    speed: 4500,
});

let TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
    let i = this.loopNum % this.toRotate.length;
    let fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    let that = this;
    let delta = 300 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    let elements = document.getElementsByClassName('txt-rotate');
    for (let i = 0; i < elements.length; i++) {
        let toRotate = elements[i].getAttribute('data-rotate');
        let period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    let css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
};
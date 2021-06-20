
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
    disable: false, 
    startEvent: 'DOMContentLoaded', 
    initClassName: 'aos-init', 
    animatedClassName: 'aos-animate',
    useClassNames: false, 
    disableMutationObserver: false,
    debounceDelay: 50,
    throttleDelay: 99,  
    offset: 120,
    delay: 500, 
    duration: 700, 
    easing: 'ease', 
    once: false, 
    mirror: false, 
    anchorPlacement: 'top-bottom',
  
  });
new Swiper('.image-slider', {
    loop: true,
    simulateTouch: true,
    autoHeight: true,
    grabCursor: true,
    slideToClickedSlide: true,
    keyboard: {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true
    },
    slidesPerView: 1,
    watchOverflow: true,
    spaceBetween: 20,
    initialSlide: 0,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false
    },
    speed: 3500,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    centeredSlides: true,
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
        },
        320: {
            slidesPerView: 1,
            loopedSlides: 1,
        }
    },
    touchRatio: 1,
    grabCursor: true,
    loopedSlides: 2,
    autoplay: {
        delay: 2000,
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
function bindModals(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
    const trigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector),
        close = document.querySelector(closeSelector),
        windows = document.querySelectorAll('[data-modal]');
    trigger.forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target) {
                e.preventDefault();
            }
            windows.forEach(item => {
                item.style.display = 'none';
            });
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    close.addEventListener('click', () => {
        windows.forEach(item => {
            item.style.display = 'none';
        });
        modal.style.display = 'none';
        document.body.style.overflow = "";
    });
    modal.addEventListener('click', (e) => {

        if (e.target === modal && closeClickOverlay) {
            windows.forEach(item => {
                item.style.display = 'none';
            });

            modal.style.display = 'none';
            document.body.style.overflow = "";
        }
    });
}
bindModals('.leave-request__btn', '.popup', '.popup_close');
bindModals('.btn', '.popup', '.popup_close');
const arrLang = {
    'en':{
        'about':'About us',
        'services': 'Services',
        'contact': 'Contacts',
        'phonetitle':'InterStudy make your dream come true',
        'request':'leave a request',
        'title-about': 'About',
        'title-about-under': 'us',
        'portfolio-text': "InterStudy Corp is an international education advisor creating bespoke academic and practical training programs for governmental institutions, academic establishments, and private companies from around the world ",
        'service-title-top':'Our services',
        'service-title':'What we',
        'service-title-under':'offer',
        'icon-title-1':'Personality',
        'icon-title-2':'Our approach',
        'icon-title-3':'Confidence',
        'icon-text-1': 'The company embraces the maverick path in development of bespoke academic and professional training programs, geared towards unlocking our clients’ potential for growth and development',
        'icon-text-2':'We adopt a cross – disciplinary approach to learning and knowledge–transfer, exposing our clients to a wide range of academic fields, governmental institutions, and private sector companies',
        'icon-text-3':' We started the partnership between Kazakhstan and the U.S., and working on creating cultural bridges with other countries',
        'service-1':'Organization of international scientific and educational projects (seminars, trainings, conferences, round tables, symposia, etc.);',
        'service-2':'Organization and implementation of programs to improve the qualification of specialists in different areas and specialties;',
        'service-3':'Informing and consulting about upcoming international exhibitions in the field of education, business, arts, science, training programs, etc',
        'service-4':'Consulting and assisting with language schools, undergraduate and graduate university programs',
        'service-5':'Organization of internships in government institutions, non-profit organizations, companies and agencies',
        'leave-title':'We are here to help',
        'leave-title-under':'you realize your dream',
        'visit-title':'Other directions',
        'visit-title-under':'We are not just in',
        'visit-title-under-2':'USA',
        'visit-title-text':'Want to visit Kazakhstan? We will help you with the choice of an individual program, which will include visits to various organizations, improve knowledge and understanding of education systems, law, and culture of Kazakhstan. You will have the opportunity to feel like a part of the Great Steppe, in which the centuries-old history, culture of interethnic harmony, as well as the beauty of nature is concentrated. Contact us and we will organize an exchange of experience, taking into account the wishes of everyone. Moreover, we are planning to expand the area of our expertise and the list of countries to offer for visiting with various educational programs ',
        'h-1':'Kayyndy Lake',
        'h-2':'Charyn Canyon',
        'h-3':'Bozzhyr tract',
        'h-4':'Okzhetpes rock',
        'h-5':'Singing Dune',
        'h-6':'Bayanaul',
        'learn-more':'learn more',
        'p-1':'It is the perfect place to relax, calm down and meditate.',
        'p-2':'A breathtaking location in the Tien Shan Mountain Branches',
        'p-3':'Bozzhyra is the brightest symbol of the region, certainly recommended for visiting and getting a lot of fantastic emotions',
        'p-4':'The majestic Okzhetpes rock. Its height does not exceed three hundred meters above sea level',
        'p-5':'Widely known to fans of curiosities far beyond the borders of the Republic of Kazakhstan',
        'p-6':'An oasis in the middle of a semi-desert steppe – a fabulous and unique Bayanaul, as if it appeared out of nowhere',
        "title":'Navigation',
        "link-1":'About us',
        "link-2":'Services',
        "link-3":'Contacts',
        "form-title":'Time to take it to the next level',
        "form-text":'Leave a request and get a consultation',
        "inp-1" :'Name',
        "inp-2" :'Your phone or mail',
        "inp-3" :'Message',
    },
    'ru':{
        'about':'О нас',
        'services': 'Услуги',
        'contact': 'Контакты',
        'phonetitle':'InterStudy осуществить твою мечту',
        'request':' Оставить заявку',
        'title-about': 'О',
        'title-about-under': 'нас',
        'portfolio-text': "InterStudy – международный консультант по образованию, создающий индивидуальные программы академического и практического обучения для государственных учреждений, академических учреждений и частных компаний со всего мира",
        'service-title-top':'Наши услуги',
        'service-title':' Что мы ',
        'service-title-under':'предлагаем ',
        'icon-title-1':' Индивидуальность',
        'icon-title-2':'Наш подход',
        'icon-title-3':'Доверие',
        'icon-text-1': 'Компания выбирает  уникальный путь в разработке индивидуальных программ академического и профессионального обучения, направленных на раскрытие потенциала наших клиентов для роста и развития',
        'icon-text-2':'Мы применяем междисциплинарный подход к обучению и передаче знаний, открывая для наших клиентов широкий спектр академических областей, государственных учреждений и компаний частного сектора.',
        'icon-text-3':' Мы начали сотрудничество между Казахстаном и США, а также ведем работу по построению культурных мостов с другими странами',
        'service-1':'Организация международных научных и образовательных проектов (семинары, тренинги, конференции, круглые столы, симпозиумы и др.)',
        'service-2':'Консультации и помощь в языковых школах, программах бакалавриата и магистратуры',
        'service-3':'Организация международных научных и образовательных проектов (семинары, тренинги, конференции, круглые столы, симпозиумы и др.)',
        'service-4':' Информирование и консультирование по предстоящим международным выставкам в области образования, бизнеса, искусства, науки, программ обучения и т.д ',
        'service-5':'Организация стажировок в государственных учреждениях, некоммерческих организациях, компаниях и агентствах',
        'leave-title':'Мы здесь, чтобы помочь',
        'leave-title-under':'осуществить Вашу  мечту',
        'visit-title':'Другие направление',
        'visit-title-under':'Мы не только в',
        'visit-title-under-2':'Америке',
        'visit-title-text':'Хотите посетить Казахстан? Мы поможем Вам с выбором индивидуальной программы, которая будет включать в себя посещение различных организаций, улучшить знание и понимание систем образования, права, культуры Казахстана. Вы будете иметь возможность почувствовать себя частью Великой Степи, в которой сосредоточена многовековая история, культура межэтнического согласия, а также красоты природы. Свяжитесь с нами, и мы организуем обмен опытом с учетом пожеланий каждого',
        'h-1':'Озеро Кайынды',
        'h-2':'Чарынский каньон',
        'h-3':'Урочище Бозжыра',
        'h-4':'Cкала Окжетпес',
        'h-5':'Поющий Бархан',
        'h-6':'Баянаул',
        'learn-more':'Узнать больше',
        'p-1':'Это идеальное место для расслабления, успокоения и медитации',
        'p-2':'Захватывающее дух место в Тянь-Шаньских горных ответвлениях',
        'p-3':'Бозжыра является ярчайшим символом области, безусловно рекомендованным для посещения и получения уймы фантастических эмоций',
        'p-4':'Величественная скала Окжетпес. Высота ее не превышает трехсот метров над уровнем моря',
        'p-5':'Широко известный любителям диковинок далеко за пределами республики Казахстан',
        'p-6':'Оазис среди полупустынной степи – сказочный и неповторимый Баянаул, словно явившийся из ниоткуда',
        "title":'Навигация',
        "link-1":'О нас',
        "link-2":'Услуги',
        "link-3":'Контакты',
        "form-title":'Время выйти на новый уровень',
        "form-text":'Оставляйте заявку и получите консультацию',
        "inp-1" :'Имя',
        "inp-2" :'Ваша почта либо номер...',
        "inp-3" :'Сообщение',
    }
}
document.addEventListener('DOMContentLoaded', getLocalLang());
$(function(){
    $('.translate').click(function(){
        let lang = $(this).attr('id');
        saveLocalLang(lang);
        $('.lang').each(function(i,item){
            $(this).text(arrLang[lang][$(this).attr('key')]);
        })
    })
})
function saveLocalLang(language){
    let langs;
    if(localStorage.getItem('langs')===null){
        langs = []
    }else{
        langs = JSON.parse(localStorage.getItem('langs'))
    }
    langs.push(language);
    localStorage.setItem('langs', JSON.stringify(langs))
}
function getLocalLang(){
    let langs;
    if(localStorage.getItem('langs') === null){
        langs = []
    }else{
        langs = JSON.parse(localStorage.getItem('langs'))
    }
    langs.forEach((language)=>{
        let lang = langs[langs.length - 1];
        $('.lang').each(function(i,item){
            $(this).text(arrLang[lang][$(this).attr('key')]);
        })
    })
}
/*
const forms = () => {

    const form = document.querySelectorAll('form'),
        input = document.querySelectorAll('input');
    const message = {
        loading: 'Loading',
        success: 'Thank you, we will phone you later',
        failtire: 'Oh sorry...'
    };
    const postDate = async(url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });
        return await res.json();
    };
    const clearInputs = () => {
        input.forEach(item => {
            item.value = '';
        });
    }
    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log("oh")
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);
            let formDate = new FormData(item);
            
            const obj ={};
            formDate.forEach((item,i)=>{
                obj[i]=item;
            });
            const json = JSON.stringify(obj);
            postDate('assets/server.php', json).then(data => data.text())
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => {
                    statusMessage.textContent = message.failtire;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                })

        });
    })

};
forms();*/

const form = document.querySelectorAll('form');
form.forEach(form=>{
    form.addEventListener('submit',formSend);
    async function formSend(e){
        e.preventDefault();
        let error  = formValidate(form);

        let formData = new FormData(form);
        
        if(error === 0){
            console.log("loading")
            let responce = await fetch('sendmail.php',{
                method:'POST',
                body: formData
            });
            if(responce.ok){
                let result = await responce.json();
                alert(result.message);
                formPreview.innerHTML = '';
                form.reset();
                form.classList.remove('_sending')
            }
            else{
                alert('Error');
                form.classList.remove('_sending')
            }
        }
        else{
            alert('Заполните поля')
        }
    }
    function formValidate(form){
        let error = 0;
        let  formReq = document.querySelectorAll('._req');
        for(let i = 0; i< formReq.length; i++){
            const input = formReq[i];
            formRemoveError(input)
            if(input.value === ''){
                formAddError(input);
                error++   
            }
        }
        return error
    }
    function formAddError(input){
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input){
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
    function emailTest(input){
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
    }
})
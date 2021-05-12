
let lastScroll = 0;
const defaultOffset = 200;
const header = document.querySelector('.header');

const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
const containHide = () => header.classList.contains('header_hide');

window.addEventListener('scroll', () => {
    if(scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
        //scroll down
        header.classList.add('header_hide');
    }
    else if(scrollPosition() < lastScroll && containHide()){
        //scroll up
        header.classList.remove('header_hide');
    }

    lastScroll = scrollPosition();
})

function addHeaderColor(){
    if (window.pageYOffset > 10) {
       header.classList.add('header_color');
    } else {
      header.classList.remove('header_color');
    }
}

window.onscroll=addHeaderColor;
addHeaderColor();

//Бургер миню
const iconBurger = document.querySelector('.burger-icon');
const menuBurger = document.querySelector('.burger-menu');

if(iconBurger) {
    iconBurger.addEventListener("click", function(e) {
        document.body.classList.toggle('lock');
        iconBurger.classList.toggle('active');
        menuBurger.classList.toggle('active');
    })
}


//Плавная прокрутка
const anchors = document.querySelectorAll('a[href*="#"]')
for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const blockID = anchor.getAttribute('href').substr(1)
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    if(iconBurger.classList.contains('active')){
        document.body.classList.remove('lock');
        iconBurger.classList.remove('active');
        menuBurger.classList.remove('active');
    }
  })
}


;
//Анимация при скролле
const animItems = document.querySelectorAll('.__anim-item');
//условие проверки наличия на странице объектов с классом '.__anim-item'
if (animItems.length > 0) {
   window.addEventListener('scroll', animOnScroll);

   function animOnScroll() {
      //цикл 'for' наделяет объекты в массиве объектов переменными и определяет их текущий класс
      for (let index = 0; index < animItems.length; index++) {
         const animItem = animItems[index];
         const animItemHight = animItem.offsetHeight;
         const animItemOffset = offset(animItem).top;
         const animStart = 6;

         //создание точки анимации, при значении animStart = 4, точка анимации - при 1/10 высоты объекта
         let animItemPoint = window.innerHeight - animItemHight / animStart;

         //проверка, если анимированный объект выше высоты окна браузера
         if (animItemHight > window.innerHeight) {
            animItemPoint = window.innerHeight - window.innerHeight / animStart;
         }
         //Добавление или удаление класса '__active' объекту
         if ((pageYOffset > animItemOffset - animItemPoint)
            &&
            pageYOffset < (animItemOffset + animItemHight)) {
            animItem.classList.add('__active');
         } else {
            //доп условие: при отсутсвии класса-заглушки повтора анимации '__active' не будет снят
            if (!animItem.classList.contains('__no-repeat-anim')) {
               animItem.classList.remove('__active');
            }
         }
      }
   }

   //функциия позволяет получить позицию объекта относительно верха или левой стороны объекта window
   function offset(e1) {
      const rect = e1.getBoundingClientRect(),
         scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
         scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
   }

   //вызов функции для объектов, которые находятся изначально при загрузке страницы с задержкой 300ms
   setTimeout(() => {
      animOnScroll()
   }, 300);
}
;
//Слайдеры
const swiper = new Swiper('.team__slider', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    spaceBetween: 30,
    grabCursor: true,
    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
    },
    keyboard:{
       enabld: true,
       onlyInViewport:true,
       pageUpDown: true,
   },
});

const swiper2 = new Swiper('.testimonials__slider', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    spaceBetween: 30,
    grabCursor: true,
    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
    },
    keyboard:{
       enabld: true,
       onlyInViewport:true,
       pageUpDown: true,
   },
});

const swiper3 = new Swiper('.news__slider', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    spaceBetween: 30,
    grabCursor: true,
    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
    },
    keyboard:{
       enabld: true,
       onlyInViewport:true,
       pageUpDown: true,
   },
});
;
function app() {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.filter__item');


    function filter (category, items) {
        items.forEach((item) => {
            const isItemFiltered = !item.classList.contains(category);
            const isShowAll = category.toLowerCase() == 'all'
                if(isItemFiltered && !isShowAll) {
                    item.classList.add('anime');

                } else {
                    item.classList.remove('hide');
                    item.classList.remove('anime');


                }
        })
    };

    buttons.forEach((button) => {
        button.addEventListener('click', function() {

            const currentCategory = button.dataset.filter;
            filter(currentCategory, cards);

        })
    });


    for (let i = 0; i < buttons.length; i++) {
          const item = buttons[i];
        item.addEventListener("click", changeActiveClass);
    }

    function changeActiveClass(e){
          for (let i = 0; i < buttons.length; i++) {
        const item = buttons[i];
            item.classList.remove('active');
        }
          e.target.classList.add('active');
    }

    cards.forEach((card) => {
      card.ontransitionend = function () {
          if (card.classList.contains('anime')){
              card.classList.add('hide')
          }
      }
    })
}
app()


document.querySelectorAll('.like').forEach(label =>
  label.addEventListener('click', function() {
    this.classList.toggle('active');
  }))
;
let tab = function () {
    let tabNav = document.querySelectorAll('.tab-bt'),
        tabContent = document.querySelectorAll('.tabs-content'),
        tabName;

    tabNav.forEach(item => {
        item.addEventListener('click', selectTabNav)
    });

    function selectTabNav() {
        tabNav.forEach(item => {
            item.classList.remove('active');
        });
        this.classList.add('active');
        tabName = this.getAttribute('data-tab');
        selectTabContent(tabName);
    }

    function selectTabContent(tabName) {
        tabContent.forEach(item => {
            item.classList.contains(tabName) ? item.classList.add('active') : item.classList.remove('active');
        })
    }

};

tab();

let tabServ = function () {
    let tabNav = document.querySelectorAll('.services__tab-bt'),
        tabContent = document.querySelectorAll('.services__tabs-content'),
        tabName;

    tabNav.forEach(item => {
        item.addEventListener('click', selectTabNav)
    });

    function selectTabNav() {
        tabNav.forEach(item => {
            item.classList.remove('active');
        });
        this.classList.add('active');
        tabName = this.getAttribute('data-tabSr');
        selectTabContent(tabName);
    }

    function selectTabContent(tabName) {
        tabContent.forEach(item => {
            item.classList.contains(tabName) ? item.classList.add('active') : item.classList.remove('active');
        })
    }

};



tabServ();






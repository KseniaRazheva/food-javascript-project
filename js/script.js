'use strict';

window.addEventListener('DOMContentLoaded', function() {

    // Tabs
    
	let tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
        
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
	}

	function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    
    hideTabContent();
    showTabContent();

	tabsParent.addEventListener('click', function(event) {
		const target = event.target;
		if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
    });
    
    // Timer

    const deadline = '2024-05-02';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor( (t/(1000*60*60*24)) ),
            seconds = Math.floor( (t/1000) % 60 ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            hours = Math.floor( (t/(1000*60*60) % 24) );

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }//чтобы сделать нолик перед числами 0-9

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();//чтобы запустить - и не было моргания верскти (вначале браузер показывает то что в хтмл, потом то что в js)

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    // Modal

    //вначале в хтмле на кнопки которые вызывают модальное окно повесила дата-атрибуты data-modal и data-close на крестик закрывающий окно 

    const modalTrigger = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('.modal');
    const modalCloseBtn = document.querySelector('[data-close]');
    
    
    
//     //const modalTrigger = document.querySelector('[data-modal]');
//     modalTrigger.addEventListener('click', () => {
//         modal.classList.add('show');
//         modal.classList.remove('hide');
//         //modal.classList.toggle('show');//вместо add и remove можно использовать и будет работать точно также
//         document.body.style.overflow = 'hidden';
//     });//обращаюсь к элементу на котором висит дата-атрибут data-modal это кнопка "связаться с нами", при клике: добавляю класс отвечающий за показ модального окна, убираю класс hide отвечающий за то что окно не видно который висит на modal
//     //когда я открываю окно я могу скролить сайт - надо зафиксировать сайт
//     //за прокрутку отвечает свойство оверфлоу и добавляю ему стиль hidden, а потом когда закрываю модальное окно - скролл надо восстановить и я тоже самое ставлю ниже но там пустые ковычки ''
//     modalCloseBtn.addEventListener('click', () => {
//         modal.classList.add('hide');
//         modal.classList.remove('show');
//         document.body.style.overflow = '';
//     });//обращаюсь к элементу на котором висит дата-атрибут data-close это крестик, ему я буду добавлять класс хайд и удалять класс шоу (т.е. наоборот)
//     //оверфлоу-восстанавливаю скрол после закрытия модального окна
// //такой вариант можно использовать только если     
// //const modalTrigger = document.querySelector('[data-modal]');
// //если поставить ALL надо перебирать через форич
// благодаря All - работает на всех кнопках на сайте



    // modalTrigger.forEach(btn => {
    //     btn.addEventListener('click', function() {
    //         modal.classList.add('show');
    //         modal.classList.remove('hide');
    //         document.body.style.overflow = 'hidden';
    //     });
    // });//заменяю на openModal
    // modalCloseBtn.addEventListener('click', () => {
    //     modal.classList.add('hide');
    //     modal.classList.remove('show');
    //     document.body.style.overflow = '';
    // });
    // modal.addEventListener('click', (e) => {
    //     if (e.target === modal) {
    //         modal.classList.add('hide');
    //         modal.classList.remove('show');
    //         document.body,style.overflow = '';
    //     }
    // });//как сделать так чтобы модальное окно закрывалось при нажатии на эскейп или на затемненное окно -используя эвенттаргет я могу проследить куда кликнул пользователь, например кликнул туда где нет класса modal__dialog, если при клике на модал если туда куда кликнул пользователь будет модал  то добавить класс хайд и убрать класс шоу

    //донт репит юселф - надо оптимизировать код который повторяется:
    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    modalCloseBtn.addEventListener('click', closeModal);
    //в этом случае функцию не вызываем
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });//в этом случае функцию вызываем
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });//отследить код клавиши https://www.toptal.com/developers/keycode
    //и содержится ли класс шоу у модального окна





    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    //const modalTimerId = setTimeout(openModal, 3000);
//делаю чтобы модальное окно открывалось через 3 секунды

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);//когда долистываешь скролл до конца
    
    
    //Используем классы для создания карточек меню
    
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        14,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню "Премиум"',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        21,
        ".menu .container"
    ).render();


});
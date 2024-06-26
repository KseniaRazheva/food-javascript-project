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
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
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
//урок 80 rest-оператор и параметр по умолчанию спрет-оператор(оператор разворота) уже знакомились, рест его брат  который использует точно такой же синтаксис, но уже в других условиях спрет брал сущность и раскладывал ее на отдельные элементы, то рест у нас занимается обратным - рест отдельные элементы объединяет в один массив, если углубиться в название оператора, то рест можно перевести как "оставшиеся элементы" 
//посмотрим как это работает на практике: я создам переменную которая называется лог  это будет функция и эта функция (она принимает обязательно элементы: эй, би, и дальше мы не знаем сколько аргументов у нас может быть может ни одного а может быть десять, допустим мы ходим добавить определенные классы для наших элементов на странице мы четко знаем что там будет класс айтем класс меню, а остальные классы у нас будут опциональные они могут быть а может не существовать, но самое главное что они тоже приходят в качестве аргументов функции, пример: у нас может существовать программа которая расчитывает семейный бюджет и есть параметр который честко строго приходит это эй это зарплата мужа, би это зарплата жены, а все остальное может быть или не быть подработки-премии-подарки-итд дополнительные деньги которые могут прийти а могут не прийти и мы не знаем четко сколько этого всего будет и здесь нам нужен механизм который будет это контролировать и рест оператор этим занимается - рест-оператор прописывается как три точечки ... записывается всегда последним то есть вначале мы пишем аргументы которые будут обязательно а потом пишем рест-оператор который говорит что дальше будет бесконечное количество аргументов и назвать его можно как угодно можно рест можно си.) а далее в фигурных скобках {эта функция будет что-то выводить в консоль и там в скобочках прописываются аргументы так же (эй, би, рест) уже без точечек }, рест-опреатор собирает все оставшееся и формирует из этого массив, давайте в этом убедимся. дальше я буду вызывать функцию лог во внутрь () закинем такие строки как basic, rest - это первые обязательные эй и би, а дальше что угодно: "operator", "usage"
// const log = function(a, b, ...rest) {
//     console.log(a, b, rest);
// }
// log('basic', 'rest', 'operator', 'usage');
// //ответ в консоли: basic rest [ 'operator', 'usage' ]
//в консоли: две строчки нормально отображаются, мы их вывели в консоль, а две остальные у нас поместились в массив - это так сработал рест-оператор, он собрал отдельные сущности в массив, спред-оператор имеет обратную функцию, но точно такой же синтаксис он какой-то массив может разложить на отдельные элементы
//разберем параметр по умолчанию. иногда мы хотим чтобы в наших функциях параметры которые мы передаем по умолчанию имели какие-то значения. напишем еще одну функцию которая называется калькОрДабл которая будет либо вычислять значение или просто его умножать. в аргументы в круглых скобках напишу ( намбер-какое-то число и бэзис) открываю фигурные скобки {в консоли прописываем  значение намбер умноженное на бэзис и поставим точку с запятой}. если сейчас я вызову эту функцию калькОрДабл() и передам в скобках значение 3 и 5, то я конечно получу результат
// function calcOrDouble(number, basis) {
//     console.log(number * basis);
// }
// calcOrDouble(3, 5);
// //в консоли: 15
//но что будет если я не укажу второй аргумент?выйдет ошибка. надо чтобы был параметр по умолчанию. до стандарта ес6 использовали прием с использованием логического оператора или
// function calcOrDouble(number, basis) {
//     basis = basis || 2;
//     console.log(number * basis);
// }
// calcOrDouble(3);//6
//оператор ИЛИ вернет нам первую правду, если вдруг бэзис не был передан значит в нем андефайнд который по логическому контексту превращается в фолз ИЛИ 2 а двойка это всегда тру и соответственно из этого выражения нам вернется двойка потому что это первая правда и двойка запишется вместо бэзиса в итоге 3*2=6 но такая проверка иногда приводит к ошибке и это не надежный вариант и в стандарте ес6 стало все проще. теперь параметр по умолчанию можно записывать прямо при объявлении функции параметру бэзис присваивается значение 2 вместо андефайнд
// function calcOrDouble(number, basis = 2) {
//     console.log(number * basis);
// }
// calcOrDouble(3);//6
//можно задавать параметры элементов по умолчанию например высота и ширина модального окна, цвет текста, заднего фона и тому подобное. теорию разобрали, теперь можем применить на практике на нашем проекте фуд в js render() вся структура карточки menu__item оборачивается в один конкретный див в классе MenuCard в конструторе я в самом конце добавляю ...classes в перечень структуры и записываю наше свойство в {} чтоб его дальше можно было использовать, не забывать, что это массив и с ним нужно будет работать как с массивом, а не как с какими-то строками которые бы будем туда передавать в рендере вначале назначим классы так как это массив эта переменная Виз клэсес то нам нужно обработать этот массив, пройтись по каждому элементу внутри, вытащить название этого класса, и его подсоединить к этому диву обращаемся к виз точка клэсис точка форич я назову каждый элемент внутри этого массива как класснэйм стрелочная функция принимает этот аргумент и обращаюсь к элементу его класс-листу  и добавляю адд каждый класс который будет находится в этом массиве класНэйм ставим точку с запятой ну по факту это все что нужно было сделать с классами дальше убираем обертку <div class="menu__item"> дальше переходим в объявление наших классов new MenuCard последним аргументом после '.menu .container' но перед ).render пишем , 'menu__item' причем без точки потому что мы его потом поместим в массив и используем уже в класс-листе. если пользователь создавая new MenuCard забудет прописать дефолтный класс - весь сайт поломается, создалась карточка без класса и ничего не работает. вариант использования параметров по умолчанию можно подняться на самый верх там где задавали класс менюКард в конструкторе классы задавали через рест-оператор ...classes можно попробывать написать равно '.menu__item" сразу же видим ошибку что рест-параметр не поддерживает дефолтные значения, не подошло, убираем
//далее мы понимаем, что с помощью реста мы сформировали массив - мы же можем его дальше проходить при создании свойства (с помощью Виз клэсис) тут мы можем использовать наш старый способ при помощи оператора ИЛИ то есть пишем: this.classes = classes || 'menu__item'; наверное заработает? ведь если у нас в клэсис ничего не назначено - мы там назначим строку, но на самом деле здесь тоже будет проблема. проблема в 165 строке this.classes.forEach(className => element.classList.add(className)); если даже если вместо клэсис мы поместим строку - мы не сможем с ней работать, мы попытаемся строку перебрать через ворИч а этого метода просто не существует у строки и здесь тоже будет выдавать ошибку поэтому такой вариант нам тоже не подходит. что делать? когда мы не можем назначить рест-оператор, когда мы не можем использовать конструкцию с логическим оператором ИЛИ мы вспоминаем, что у нас есть самые обычные условия которые мы можем внутри метода рендер прописать ЕСЛИ вдруг в наш клэсис ничего не передается ни один элемент не передали  - мы просто присвоим этому элементу класс который нам там нужен menu__item есть одна особенность - мы в любом случае должны получить здесь массив  даже если он будет пустой (это еще одна из причин почему предыдущий метод не сработает - потому что у нас будет помещаться пустой массив, пустой массив не превращается в логический фолз)
//что я имею в виду? в методе рендер я введу console.log(this.classes) и из new MenuCard уберу класс menu__item в итоге в консоли - элементс класса нет, сайт развалился в консоли - консоль ошибка. во первых там отобразились карточки которые сформировались. первая пустой массив, 2 и 3 массив внутри которого "menu__item" заметить что в МенюКард не передан класс, но рест-оператор classes все равно вернул пустой массив - чтобы проверить передано сюда что-то или нет мы должны проверять не просто ...classes (тру) а именно количество элементов которые находятся в этом массиве ведь даже если в нем ничего не было он все равно сформирует пустой массив точно также ведут себя методы квериСелекторОЛ, гетЭлементсБай, клэсНейм и так далее когда мы пытаемся получить элементы со страницы по определенному селектору и он их там не находит он все равно будет формировать пустой массив в рендере кансольлог убираем и прописываем условие если Виз дат клэсис (это мой массив) мы обращаемся к его количеству элементов length будет строго равно === 0 то есть ни один элемент класса не был передан в таком случае я буду ставить дефолтный класс {element.classList.add()} делается это просто, элемент дат клэслист дат адд и мы сюда должны передать класс, но сделать это более грамотно вдруг нам этот класс в будущем понадобится запишу в свойства (сейчас тут пустой массив) я его перезаписываю и пишу что сейчас у меня там будет меню__айтем {this.element = 'menu__item'; element.classList.add();} я ставлю дефолтный класс который будет записываться в это свойство и я могу его вот так просто подставить в element.classList.add(this.element); если не были переданы ни одни классы то я сформирую их самостоятельно, если у меня есть хоть один класс, то я буду запускать вот эту вот часть: } else {this.classes.forEach(className => element.classList.add(className));} мы реализовали вручную без использования каких-то дефолтных значений, без использования хаков с логическими утверждениями просто использовали условие if-else  которое будет правильно отрабатывать я запускаю код и вижу что ошибок в консоли нет, карточки правильно сформировались, в верстке присутствует класс menu__item хотя при создании карточки в new MenuCard я ничего не передавала. То есть можно использовать условия, циклы и тд
//
//
//
// function setOptions(height, width, ...additional) {
//     console.log(height, width, ...additional)
// }
// setOptions(400, 500, 'red', 'top');//400 500 red top
// 
// 'use strict';
// function getSum(a, b) {
//     function sum() {
//         console.log(this.a);
//         return a + b;
//     }
//     console.log(sum());
// }
// getSum(4, 5);//ничего, будет ошибка в виз дат а
// 
//Делегирование событий - это прием, который позволяет...
//уменьшить количество обработчиков событий, 
//проще взаимодействовать с DOM-деревом, легко работать с неограниченным количеством элементов в родителе
// 
// class Slider {
//     constructor(width, height) {
//         this.width = width;
//         this.height = height;
//     }
//     showSliderWidth() {
//         console.log(this.width);
//     }
// }
// const slider = new Slider('500px', '150px');
// slider.showSliderWidth();//500px
// 
// // Какого метода не существует у свойства classList?
// //Атрибут class – уникален: ему соответствует аж целых два свойства!
// //Работать с классами как со строкой неудобно. Поэтому, кроме className, в современных браузерах есть свойство classList.
// //Свойство classList – это объект для работы с классами.
// //Методы classList:
// elem.classList.contains("class") // возвращает true/false, в зависимости от того, есть ли у элемента класс class.
// elem.classList.add/remove("class") // добавляет/удаляет класс class
// elem.classList.toggle("class") // если класса class нет, добавляет его, если есть – удаляет.
// // Кроме того, можно перебрать классы через for, так как classList – это псевдо-массив.
// //Например:
//     // var classList = document.body.classList;
//     // classList.remove('page'); // удалить класс
//     // classList.add('post'); // добавить класс
//     // for (var i = 0; i < classList.length; i++) { // перечислить классы
//     //   alert( classList[i] ); // main, затем post
//     // }
//     // alert( classList.contains('post') ); // проверить наличие класса
//     // alert( document.body.className ); // main post, тоже работает
// // в итоге ответ: есть методы contains, add, remove, toggle, нет метода includes
//
//какое свойство отвечает за ширину элемента, включая только сам контент и паддинг? clientWodth это обсуждалось в лекции Параметры документа, окна и работа с ними
//
//как правильно задать наследование одного класса от другого
//class Slider extends Element {}
//
//В чем ключевая разница между методами call и apply
//кол принимает аргументы через запятую (в виде строки)
//аплай принимает аргументы в виде массива
//
// const urlObj = {
//     protocol: 'https',
//     domain: 'mysite.com',
//     showCurrentURL: function() {
//         const extractCurrDomain = () => {
//             return this.domain;
//         }
//         const extractCurrProtocol = () => {
//             return this.protocol;
//         }
//         console.log(`${extractCurrProtocol()}://${extractCurrDomain()}`)
//     }
// }
// urlObj.showCurrentURL();//https://mysite.com
//
// const urlObj = {
//     protocol: 'https',
//     domain: 'mysite.com'
// }
// function showCurrentURL() {
//     const extractCurrDomain = () => {
//         return this.domain;
//     }
//     const extractCurrProtocol = () => {
//         return this.protocol;
//     }
//     console.log(`${extractCurrProtocol()}://${extractCurrDomain()}`)
// }
// const url = showCurrentURL.bind(urlObj);
// console.log(url);//[Function: bound showCurrentURL] или вывод самой функции
// //bind возвращает новую функцию
//
//свойство объекта события event.code позволяет получить
//код физической клавиши, которая была нажата. вне зависимости от зажатых клавиш shift или alt (урок создаем модальное окно)
//
//для чего необходимо сохранять уникальный идентификатор таймера
//const timerId = setInterval(func, 2000);
//для того, чтобы иметь возможность остановить этот конкретный таймер
//(это обсуждалось в уроке про setTimeout и setInterval)




//
});
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calc.cjs":
/*!*********************************!*\
  !*** ./src/js/modules/calc.cjs ***!
  \*********************************/
/***/ ((module) => {

function calc() {
	// Calculator

	const result = document.querySelector(".calculating__result span");

	let sex, height, weight, age, ratio;

	if (localStorage.getItem("sex")) {
		sex = localStorage.getItem("sex");
	} else {
		sex = "female";
		localStorage.setItem("sex", "female");
	}

	if (localStorage.getItem("ratio")) {
		ratio = localStorage.getItem("ratio");
	} else {
		ratio = 1.375;
		localStorage.setItem("ratio", 1.375);
	}

	function calcTotal() {
		if (!sex || !height || !weight || !age || !ratio) {
			result.textContent = "____";
			return;
		}
		if (sex === "female") {
			result.textContent = Math.round(
				(447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
			);
		} else {
			result.textContent = Math.round(
				(88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
			);
		}
	}

	calcTotal();

	function initLocalSettings(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach((elem) => {
			elem.classList.remove(activeClass);
			if (elem.getAttribute("id") === localStorage.getItem("sex")) {
				elem.classList.add(activeClass);
			}
			if (
				elem.getAttribute("data-ratio") ===
				localStorage.getItem("ratio")
			) {
				elem.classList.add(activeClass);
			}
		});
	}

	initLocalSettings("#gender div", "calculating__choose-item_active");
	initLocalSettings(
		".calculating__choose_big div",
		"calculating__choose-item_active"
	);

	function getStaticInformation(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach((elem) => {
			elem.addEventListener("click", (e) => {
				if (e.target.getAttribute("data-ratio")) {
					ratio = +e.target.getAttribute("data-ratio");
					localStorage.setItem(
						"ratio",
						+e.target.getAttribute("data-ratio")
					);
				} else {
					sex = e.target.getAttribute("id");
					localStorage.setItem("sex", e.target.getAttribute("id"));
				}

				elements.forEach((elem) => {
					elem.classList.remove(activeClass);
				});

				e.target.classList.add(activeClass);

				calcTotal();
			});
		});
	}

	getStaticInformation("#gender div", "calculating__choose-item_active");
	getStaticInformation(
		".calculating__choose_big div",
		"calculating__choose-item_active"
	);

	function getDynamicInformation(selector) {
		const input = document.querySelector(selector);

		input.addEventListener("input", () => {
			if (input.value.match(/\D/g)) {
				input.style.border = "1px solid red";
			} else {
				input.style.border = "none";
			}
			switch (input.getAttribute("id")) {
				case "height":
					height = +input.value;
					break;
				case "weight":
					weight = +input.value;
					break;
				case "age":
					age = +input.value;
					break;
			}

			calcTotal();
		});
	}

	getDynamicInformation("#height");
	getDynamicInformation("#weight");
	getDynamicInformation("#age");
}

module.exports = calc;


/***/ }),

/***/ "./src/js/modules/cards.cjs":
/*!**********************************!*\
  !*** ./src/js/modules/cards.cjs ***!
  \**********************************/
/***/ ((module) => {

function cards() {
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
			const element = document.createElement("div");

			if (this.classes.length === 0) {
				this.classes = "menu__item";
				element.classList.add(this.classes);
			} else {
				this.classes.forEach((className) =>
					element.classList.add(className)
				);
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

	// getResource("http://localhost:3000/").then((data) => {
	// 	data.forEach(({ img, altimg, title, descr, price }) => {
	// 		new MenuCard(
	// 			img,
	// 			altimg,
	// 			title,
	// 			descr,
	// 			price,
	// 			".menu .container"
	// 		).render();
	// 	});
	// });

	async function getResource(url) {
		let res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	}

	getResource("http://localhost:3000/get-data").then((data) =>
		createCard(data)
	);

	function createCard(data) {
		data.menu.forEach(({ img, altimg, title, descr, price }) => {
			const element = document.createElement("div");

			element.classList.add("menu__item");

			element.innerHTML = `
	            <img src=${img} alt=${altimg}>
	            <h3 class="menu__item-subtitle">${title}</h3>
	            <div class="menu__item-descr">${descr}</div>
	            <div class="menu__item-divider"></div>
	            <div class="menu__item-price">
	                <div class="menu__item-cost">Цена:</div>
	                <div class="menu__item-total"><span>${price}</span> грн/день</div>
	            </div>
	        `;
			document.querySelector(".menu .container").append(element);
		});
	}
}

module.exports = cards;


/***/ }),

/***/ "./src/js/modules/forms.cjs":
/*!**********************************!*\
  !*** ./src/js/modules/forms.cjs ***!
  \**********************************/
/***/ ((module) => {

function forms() {
	// Forms

	const forms = document.querySelectorAll("form");
	const message = {
		loading: "img/form/spinner.svg",
		success: "Спасибо! Скоро мы с вами свяжемся",
		failure: "Что-то пошло не так...",
	};

	forms.forEach((item) => {
		postData(item);
	});

	function postData(form) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();

			let statusMessage = document.createElement("img");
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;
			form.insertAdjacentElement("afterend", statusMessage);

			const formData = new FormData(form);

			const object = {};
			formData.forEach(function (value, key) {
				object[key] = value;
			});

			fetch("server.php", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(object),
			})
				.then((data) => {
					console.log(data);
					showThanksModal(message.success);
					statusMessage.remove();
				})
				.catch(() => {
					showThanksModal(message.failure);
				})
				.finally(() => {
					form.reset();
				});
		});
	}

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector(".modal__dialog");

		prevModalDialog.classList.add("hide");
		openModal();

		const thanksModal = document.createElement("div");
		thanksModal.classList.add("modal__dialog");
		thanksModal.innerHTML = `
			<div class="modal__content">
				<div class="modal__close" data-close>x</div>
				<div class="modal__title">${message}</div>
			</div>
		`;
		document.querySelector(".modal").append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add("show");
			prevModalDialog.classList.remove("hide");
			closeModal();
		}, 4000);
	}
}

module.exports = forms;


/***/ }),

/***/ "./src/js/modules/modal.cjs":
/*!**********************************!*\
  !*** ./src/js/modules/modal.cjs ***!
  \**********************************/
/***/ ((module) => {

function modal() {
	// Modal

	const modalTrigger = document.querySelectorAll("[data-modal]");
	const modal = document.querySelector(".modal");

	modalTrigger.forEach((btn) => {
		btn.addEventListener("click", openModal);
	});

	function closeModal() {
		modal.classList.add("hide");
		modal.classList.remove("show");
		document.body.style.overflow = "";
	}

	function openModal() {
		modal.classList.add("show");
		modal.classList.remove("hide");
		document.body.style.overflow = "hidden";
		clearInterval(modalTimerId);
	}

	modal.addEventListener("click", (e) => {
		if (e.target === modal || e.target.getAttribute("data-close") == "") {
			closeModal();
		}
	});

	document.addEventListener("keydown", (e) => {
		if (e.code === "Escape" && modal.classList.contains("show")) {
			closeModal();
		}
	});

	const modalTimerId = setTimeout(openModal, 300000);

	function showModalByScroll() {
		if (
			window.scrollY + document.documentElement.clientHeight >=
			document.documentElement.scrollHeight
		) {
			openModal();
			window.removeEventListener("scroll", showModalByScroll);
		}
	}
	window.addEventListener("scroll", showModalByScroll);
}

module.exports = modal;


/***/ }),

/***/ "./src/js/modules/slider.cjs":
/*!***********************************!*\
  !*** ./src/js/modules/slider.cjs ***!
  \***********************************/
/***/ ((module) => {

function slider() {
	// // Slider
	// // slides - количество слайдов
	// // prev - стрелочка назад
	// // next - стрелочка вперед
	// // СлайдИндекс который определяет текущее положение слайдера
	// // лет - эта переменная в будущем будет меняться
	// // showSlides - функция по показу и скрытию слайдов
	// // параметр n это слайдИндекс будет приходить по текущему положению слайдера
	// // проверяем количество слайдов которые вообще есть в верстке
	// // если ушли в правую границу то берем и перемещаемся в самое начало
	// // тогда мы должны взять слайдИндекс и установить его в единицу
	// // если n меньше единицы то перемещаемся в конец
	// // вначале скрыть все слайды на страничке для начала
	// // чтобы показать только тот который нас интересует
	// // оказывая 1 слайд человеческий мы показываем 0 слайд машинный
	// // получается чтобы показать слайд с индексом 1 (машинный 0)
	// // надо из индекса 1 отнять 1.
	// // 1-1=0 машинный, 2-1=1 машинный, 3-1=2 машинныйб 4-1=3 машинный
	// // человеческие 1, 2, 3, 4
	// // машинные 0, 1, 2, 3
	// // функция ПлюсСлайдс будет вызывать мою функцию шоуСлайдс
	// // слайдИндекс будет увеличиваться на значение n
	// // если n = -1 то мы будем от слайд индекса отнимать -1
	// // назначить обработчики событий на прев и некс
	// // обработчик называется клик
	// // плюсСлайдс. когда мы нажимаем на прев мы сюда передаем -1
	// // в аналогичной ситуации с некст мы сюда будем передавать +1
	// // проинициализировать наш слайдер. берем функцию шоуСлайдс
	// // и во внутрь помещаем начальное значение слайдИндекс
	// // дальше - чтобы менялись цифры. текущий слайд и всего слайдов
	// // тотал-всего слайдов 4, карент - текущий слайд
	// // если количество слайдов будет меньше 10
	// // то подставляем это количество слайдов в элемент тотал
	// // а еще добавляем нолик вначале
	// // если количество слайдов будет больше 10 нолик не нужен
	// // просто в тотал.текстКонтент написать количество слайдов
	// // этот элемент не меняется - один раз высчитывается и записывается
	// // при каждом нажатии кнопки прев и нэкст меняется карент номер текущего слайда
	// // поэтому карент помещаем внутрь функции шоуСлайдс
	// // меняется счетчик карент.текстКонтент = слайдИндекс(наш текущий слайд)
	// //
	// let slideIndex = 1;
	// const slides = document.querySelectorAll(".offer__slide"),
	// 	prev = document.querySelector(".offer__slider-prev"),
	// 	next = document.querySelector(".offer__slider-next"),
	// 	total = document.querySelector("#total"),
	// 	current = document.querySelector("#current");

	// showSlides(slideIndex);

	// if (slides.length < 10) {
	// 	total.textContent = `0${slides.length}`;
	// } else {
	// 	total.textContent = slides.length;
	// }

	// function showSlides(n) {
	// 	if (n > slides.length) {
	// 		slideIndex = 1;
	// 	}
	// 	if (n < 1) {
	// 		slideIndex = slides.length;
	// 	}

	// 	slides.forEach((item) => (item.style.display = "none"));

	// 	slides[slideIndex - 1].style.display = "block";

	// 	if (slides.length < 10) {
	// 		current.textContent = `0${slideIndex}`;
	// 	} else {
	// 		current.textContent = slideIndex;
	// 	}
	// }

	// function plusSlides(n) {
	// 	showSlides((slideIndex += n));
	// }

	// prev.addEventListener("click", function () {
	// 	plusSlides(-1);
	// });

	// next.addEventListener("click", function () {
	// 	plusSlides(1);
	// });
	//
	//
	//
	// Slider version 2
	//
	let offset = 0;
	let slideIndex = 1;

	const slides = document.querySelectorAll(".offer__slide"),
		slider = document.querySelector(".offer__slider"),
		prev = document.querySelector(".offer__slider-prev"),
		next = document.querySelector(".offer__slider-next"),
		total = document.querySelector("#total"),
		current = document.querySelector("#current"),
		slidesWrapper = document.querySelector(".offer__slider-wrapper"),
		width = window.getComputedStyle(slidesWrapper).width,
		slidesField = document.querySelector(".offer__slider-inner");

	if (slides.length < 10) {
		total.textContent = `0${slides.length}`;
		current.textContent = `0${slideIndex}`;
	} else {
		total.textContent = slides.length;
		current.textContent = slideIndex;
	}

	slidesField.style.width = 100 * slides.length + "%";
	slidesField.style.display = "flex";
	slidesField.style.transition = "0.5s all";

	slidesWrapper.style.overflow = "hidden";

	slides.forEach((slide) => {
		slide.style.width = width;
	});

	slider.style.position = "relative";

	const indicators = document.createElement("ol"),
		dots = [];
	indicators.classList.add("carousel-indicators");
	indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
	slider.append(indicators);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement("li");
		dot.setAttribute("data-slide-to", i + 1);
		dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
		if (i == 0) {
			dot.style.opacity = 1;
		}
		indicators.append(dot);
		dots.push(dot);
	}

	next.addEventListener("click", () => {
		if (offset == deleteNotDigits(width) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += deleteNotDigits(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}

		dots.forEach((dot) => (dot.style.opacity = ".5"));
		dots[slideIndex - 1].style.opacity = 1;
	});

	prev.addEventListener("click", () => {
		if (offset == 0) {
			offset = deleteNotDigits(width) * (slides.length - 1);
		} else {
			offset -= deleteNotDigits(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}

		dots.forEach((dot) => (dot.style.opacity = ".5"));
		dots[slideIndex - 1].style.opacity = 1;
	});

	dots.forEach((dot) => {
		dot.addEventListener("click", (e) => {
			const slideTo = e.target.getAttribute("data-slide-to");

			slideIndex = slideTo;
			offset = deleteNotDigits(width) * (slideTo - 1);

			slidesField.style.transform = `translateX(-${offset}px)`;

			if (slides.length < 10) {
				current.textContent = `0${slideIndex}`;
			} else {
				current.textContent = slideIndex;
			}

			dots.forEach((dot) => (dot.style.opacity = ".5"));
			dots[slideIndex - 1].style.opacity = 1;
		});
	});

	function deleteNotDigits(str) {
		return +str.replace(/\D/g, "");
	}
}

module.exports = slider;


/***/ }),

/***/ "./src/js/modules/tabs.cjs":
/*!*********************************!*\
  !*** ./src/js/modules/tabs.cjs ***!
  \*********************************/
/***/ ((module) => {

function tabs() {
	// Tabs

	let tabs = document.querySelectorAll(".tabheader__item"),
		tabsContent = document.querySelectorAll(".tabcontent"),
		tabsParent = document.querySelector(".tabheader__items");

	function hideTabContent() {
		tabsContent.forEach((item) => {
			item.classList.add("hide");
			item.classList.remove("show", "fade");
		});

		tabs.forEach((item) => {
			item.classList.remove("tabheader__item_active");
		});
	}

	function showTabContent(i = 0) {
		tabsContent[i].classList.add("show", "fade");
		tabsContent[i].classList.remove("hide");
		tabs[i].classList.add("tabheader__item_active");
	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener("click", function (event) {
		const target = event.target;
		if (target && target.classList.contains("tabheader__item")) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});
}

module.exports = tabs;


/***/ }),

/***/ "./src/js/modules/timer.cjs":
/*!**********************************!*\
  !*** ./src/js/modules/timer.cjs ***!
  \**********************************/
/***/ ((module) => {

function timer() {
	// Timer

	const deadline = "2025-05-02"; //ТУТ СТАВЛЮ ДАТУ МЕРОПРИЯТИЯ

	function getTimeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date()),
			days = Math.floor(t / (1000 * 60 * 60 * 24)),
			seconds = Math.floor((t / 1000) % 60),
			minutes = Math.floor((t / 1000 / 60) % 60),
			hours = Math.floor((t / (1000 * 60 * 60)) % 24);

		return {
			total: t,
			days: days,
			hours: hours,
			minutes: minutes,
			seconds: seconds,
		};
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return "0" + num;
		} else {
			return num;
		}
	} //чтобы сделать нолик перед числами 0-9

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector("#days"),
			hours = timer.querySelector("#hours"),
			minutes = timer.querySelector("#minutes"),
			seconds = timer.querySelector("#seconds"),
			timeInterval = setInterval(updateClock, 1000);

		updateClock(); //чтобы запустить - и не было моргания верскти
		//(вначале браузер показывает то что в хтмл, потом то что в js)

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

	setClock(".timer", deadline);
}

module.exports = timer;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/

const modal = __webpack_require__(/*! ./modules/modal.cjs */ "./src/js/modules/modal.cjs");
const tabs = __webpack_require__(/*! ./modules/tabs.cjs */ "./src/js/modules/tabs.cjs");
const timer = __webpack_require__(/*! ./modules/timer.cjs */ "./src/js/modules/timer.cjs");
const cards = __webpack_require__(/*! ./modules/cards.cjs */ "./src/js/modules/cards.cjs");
const forms = __webpack_require__(/*! ./modules/forms.cjs */ "./src/js/modules/forms.cjs");
const slider = __webpack_require__(/*! ./modules/slider.cjs */ "./src/js/modules/slider.cjs");
const calc = __webpack_require__(/*! ./modules/calc.cjs */ "./src/js/modules/calc.cjs");

window.addEventListener("DOMContentLoaded", function () {
	modal();
	tabs();
	timer();
	cards();
	forms();
	slider();
	calc();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
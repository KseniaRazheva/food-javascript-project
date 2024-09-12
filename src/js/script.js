"use strict";
const modal = require("./modules/modal.cjs");
const tabs = require("./modules/tabs.cjs");
const timer = require("./modules/timer.cjs");
const cards = require("./modules/cards.cjs");
const forms = require("./modules/forms.cjs");

window.addEventListener("DOMContentLoaded", function () {
	modal();
	tabs();
	timer();
	cards();
	forms();

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
});

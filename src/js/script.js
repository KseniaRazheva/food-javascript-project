"use strict";

window.addEventListener("DOMContentLoaded", function () {
	// отправка post запроса в json
	// const modalForm = document.getElementById("modalForm");
	// modalForm.addEventListener("submit", (event) => {
	// 	event.preventDefault();
	// 	const formData = new FormData(modalForm);
	// 	const data = {};
	// 	formData.forEach((key, val) => (data[key] = val));
	// 	fetch("http://localhost:3000/submit", {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify(data),
	// 	})
	// 		.then((response) => response.json())
	// 		.then((data) => console.log(data))
	// 		.catch((error) => console.error("Error:", error));
	// });

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

	// Slider
	// slides - количество слайдов
	// prev - стрелочка назад
	// next - стрелочка вперед
	// СлайдИндекс который определяет текущее положение слайдера
	// лет - эта переменная в будущем будет меняться
	// showSlides - функция по показу и скрытию слайдов
	// параметр n это слайдИндекс будет приходить по текущему положению слайдера
	// проверяем количество слайдов которые вообще есть в верстке
	// если ушли в правую границу то берем и перемещаемся в самое начало
	// тогда мы должны взять слайдИндекс и установить его в единицу
	// если n меньше единицы то перемещаемся в конец
	// вначале скрыть все слайды на страничке для начала
	// чтобы показать только тот который нас интересует
	// оказывая 1 слайд человеческий мы показываем 0 слайд машинный
	// получается чтобы показать слайд с индексом 1 (машинный 0)
	// надо из индекса 1 отнять 1.
	// 1-1=0 машинный, 2-1=1 машинный, 3-1=2 машинныйб 4-1=3 машинный
	// человеческие 1, 2, 3, 4
	// машинные 0, 1, 2, 3
	// функция ПлюсСлайдс будет вызывать мою функцию шоуСлайдс
	// слайдИндекс будет увеличиваться на значение n
	// если n = -1 то мы будем от слайд индекса отнимать -1
	// назначить обработчики событий на прев и некс
	// обработчик называется клик
	// плюсСлайдс. когда мы нажимаем на прев мы сюда передаем -1
	// в аналогичной ситуации с некст мы сюда будем передавать +1
	// проинициализировать наш слайдер. берем функцию шоуСлайдс
	// и во внутрь помещаем начальное значение слайдИндекс
	// дальше - чтобы менялись цифры. текущий слайд и всего слайдов
	// тотал-всего слайдов 4, карент - текущий слайд
	// если количество слайдов будет меньше 10
	// то подставляем это количество слайдов в элемент тотал
	// а еще добавляем нолик вначале
	// если количество слайдов будет больше 10 нолик не нужен
	// просто в тотал.текстКонтент написать количество слайдов
	// этот элемент не меняется - один раз высчитывается и записывается
	// при каждом нажатии кнопки прев и нэкст меняется карент номер текущего слайда
	// поэтому карент помещаем внутрь функции шоуСлайдс
	// меняется счетчик карент.текстКонтент = слайдИндекс(наш текущий слайд)
	//
	let slideIndex = 1;
	const slides = document.querySelectorAll(".offer__slide"),
		prev = document.querySelector(".offer__slider-prev"),
		next = document.querySelector(".offer__slider-next"),
		total = document.querySelector("#total"),
		current = document.querySelector("#current");

	showSlides(slideIndex);

	if (slides.length < 10) {
		total.textContent = `0${slides.length}`;
	} else {
		total.textContent = slides.length;
	}

	function showSlides(n) {
		if (n > slides.length) {
			slideIndex = 1;
		}
		if (n < 1) {
			slideIndex = slides.length;
		}

		slides.forEach((item) => (item.style.display = "none"));

		slides[slideIndex - 1].style.display = "block";

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}
	}

	function plusSlides(n) {
		showSlides((slideIndex += n));
	}

	prev.addEventListener("click", function () {
		plusSlides(-1);
	});

	next.addEventListener("click", function () {
		plusSlides(1);
	});
});

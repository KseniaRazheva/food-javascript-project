"use strict";
const modal = require("./modules/modal.cjs");
const tabs = require("./modules/tabs.cjs");
const timer = require("./modules/timer.cjs");
const cards = require("./modules/cards.cjs");
const forms = require("./modules/forms.cjs");
const slider = require("./modules/slider.cjs");
const calc = require("./modules/calc.cjs");

window.addEventListener("DOMContentLoaded", function () {
	modal();
	tabs();
	timer();
	cards();
	forms();
	slider();
	calc();
});

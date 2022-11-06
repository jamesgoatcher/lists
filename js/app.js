import { appStorage } from './localStorage.js';
import { homeInit } from './home.js';
import { listCreateInit, validateWeightsEqual100 } from './list_create.js';
import { listViewInit } from './list_view.js';

/*==============================
=            GLOBAL            =
==============================*/
const root = './';
const main = document.querySelector('#container');
const help = document.querySelector('#help');
let appStorageArray = [];

/*===========================
=            APP            =
===========================*/
const refreshPage = () => {
	window.location.reload();
};

const validateInputsHaveValues = (inputArray, inputName) => {
	for (let i = 0; i < inputArray.length; i++) {
		if (inputArray[i].value && inputName) continue;
		else return true;
	}
};

const validateUniqueNames = (inputName, dataArray) => {
	let inputCaseInsense = inputName.toUpperCase();

	for (let i = 0; i < dataArray.length; i++) {
		let arrayNameCaseInsense = dataArray[i].name.toUpperCase();

		if (inputCaseInsense === arrayNameCaseInsense) {
			return true;
		}
	}
};

const validateImageURL = (imageURL) => {
	let
	fileTypeReg = /^$|^.*\.(jpg|JPG|gif|GIF|png|PNG|svg|SVG|eps|EPS)$/;

	if (!imageURL.match(fileTypeReg)) {
		return true;
	}
};

const validationHandler = (inputEls, inputName, dataArray, fnsToRun, imageURL) => {
	let
	errorObj = {
		inputsHaveValues: true,
		weightsEqual100: true,
		hasUniqueNames: true,
		imageURLValid: true
	};

	for (let i = 0; i < fnsToRun.length; i++) {
		if (fnsToRun[i] == 'inputsHaveValues' && validateInputsHaveValues(inputEls, inputName)) {
			// Error handling - Values needed
			let 
			errorEl = document.querySelector('#input_validation__error'),
			errorOv = document.querySelector('.error__overlay');
			errorEl.classList.remove('hide');
			errorOv.classList.remove('hide');

			errorObj.inputsHaveValues = false;
			return false;
		} else if (fnsToRun[i] == 'weightsEqual100' && validateWeightsEqual100()) {
			// Error handling - Weights must equal 100
			let 
			errorEl = document.querySelector('#weight_validation__error'),
			errorOv = document.querySelector('.error__overlay');
			errorEl.classList.remove('hide');
			errorOv.classList.remove('hide');

			errorObj.weightsEqual100 = false;
			return false;
		} else if (fnsToRun[i] == 'hasUniqueNames' && validateUniqueNames(inputName, dataArray)) {
			// Error handling - Names must be unique
			let 
			errorEl = document.querySelector('#names_validation__error'),
			errorOv = document.querySelector('.error__overlay');
			errorEl.classList.remove('hide');
			errorOv.classList.remove('hide');

			errorObj.hasUniqueNames = false;
			return false;
		} else if (fnsToRun[i] == 'imageURLValid' && validateImageURL(imageURL)) {
			// Error handling - URL must start with protocol and end with valid file type
			let 
			errorEl = document.querySelector('#imageURL_validation__error'),
			errorOv = document.querySelector('.error__overlay');
			errorEl.classList.remove('hide');
			errorOv.classList.remove('hide');

			errorObj.hasUniqueNames = false;
			return false;
		}
	}

	for (let bool in errorObj) {
		if (!errorObj[bool]) {
			return false;
		}
	}

	return true;
};

const removeValidationError = () => {
	event.target.classList.add('hide');
	document.querySelector('.error__overlay').classList.add('hide');
};

const helpPage = () => {
	let
	helpDiv = document.querySelector('#help_page');

	helpDiv.innerHTML = `
	<div id="help_page__close">Return</div>
	<div class="help_page__container">
		<div class="help_page--header">About</div>
		<div class="help_page--body">
			<ul>
				<li>Have a flavor of things you need to figure out mathematically which are your favorites?  Welcome to JPG.lists</li>
				<li>Inspired by Top Video Game List videos on Youtube</li>
				<li>Currently configured to have item criteria matching my idea of proper video game rating criteria</li>
			</ul>
		</div>
		<div class="help_page--header">Home</div>
		<div class="help_page--body">
			<ul>
				<li>New here? Create a new list.</li>
				<li>Or want to start with lists? Begin by seeding JPG’s Demo Lists</li>
				<li>Click on your lists to revist and update as you see fit</li>
				<li>Deleting lists allows for you to select the lists you want to remove and push changes clicking Save Changes</li>
				<li>Download your list object and send to your friends</li>
			</ul>
		</div>
		<div class="help_page--header">Create a list</div>
		<div class="help_page--body">
			<ul>
				<li>Currently, you have 6 list criteria each with their own percentage weighting</li>
				<li>Criteria is customizable to fit your list</li>
				<li>Weight totals must equal 100</li>
				<li>List names are unique, case insensitive</li>
			</ul>
		</div>
		<div class="help_page--header">View and update list</div>
		<div class="help_page--body">
			<ul>
				<li>Valid item criteria values are 0.0 - 10.0</li>
				<li>Valid image file types are JPG, PNG, GIF, SVG, and EPS</li>
				<li>Item names are unique, case insensitive</li>
				<li>Changes aren’t saved until you click Save &amp; exit. Don’t fret, you can always return and edit later.</li>
			</ul>
		</div>
		<div class="help_page--header">In development</div>
		<div class="help_page--body">
			<ul>
				<li>Finalize design - Desktop</li>
				<li>Finalize design - Mobile</li>
				<li>Ability to determine how many list criteria in each list</li>
				<li>Sort list items by each criteria</li>
				<li>Delete a list item</li>
			</ul>
		</div>
	</div>
	`;

	helpDiv.classList.add('active');

	document.querySelector('#help_page__close').addEventListener('click', function () {
		helpDiv.classList.remove('active');
	}, false);
};

/*================================
=            Utilities           =
================================*/
const util = {
	/* Clear Interval */
	clearInterval: (fns) => {
	  clearInterval(fns);
	},
	/* ASCII Signature */
	asciiSignature: () => {
		console.log(`
 ▄▄▄██▀▀▀██▓███    ▄████ 
   ▒██  ▓██░  ██▒ ██▒ ▀█▒
   ░██  ▓██░ ██▓▒▒██░▄▄▄░
▓██▄██▓ ▒██▄█▓▒ ▒░▓█  ██▓
 ▓███▒  ▒██▒ ░  ░░▒▓███▀▒
 ▒▓▒▒░  ▒▓▒░ ░  ░ ░▒   ▒ 
 ▒ ░▒░  ░▒ ░       ░   ░ 
 ░ ░ ░  ░░       ░ ░   ░ 
 ░   ░                 ░ 
 `);
		console.log('http://jamesgoatcher.com');
	},
	/* Quick sort algorithm */
	quickSort: (input) => {
		// If only 1 piece of data, return that
		if (input.length < 2) {
	  	return input;
		}
		// Declare first value as pivot and the left/right temp arrays
		let 
		pivot = input[0],
	  left  = [],
	  right = [];
		// Lump sort > / < value to pivot
		for (let i = 1; i < input.length; i++) {
			if (input[i] < pivot) {
	    	left.push(input[i]);
			} else {
	    	right.push(input[i]);
			}
		}

	// Recursively sort left of pivot and right of pivot using spread operator
		return [ ...util.quickSort(left), pivot, ...util.quickSort(right) ];
	},
	/* Truncate overflown strings */
	truncateString: (string, stringLength) => {
		if (string.length > stringLength) {
      return string.substring(0, stringLength) + '...';
    } else {
      return string;
    }
	},
	/* AJAX in JSON data */
	loadJSON: (location) => {
		let 
		xhttp = new XMLHttpRequest();

		xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	      data = JSON.parse(xhttp.responseText);
	    }
		};

		xhttp.open('GET', location, true);
		xhttp.send();
	},
	/* AJAX in HTML */
	loadHTML: async (fileURL, page, optionalData) => {
		const response = await fetch(fileURL);

	  response.text().then(function(body) {
	  	main.innerHTML = ''; // reset
	  	main.innerHTML = body; // write html to main
	  	util.loadHTMLPageLogic(page, optionalData); // load specific page logic
	  });
	},
	loadHTMLPageLogic: (page, optionalData) => {
		switch (page) {
	  	case 'home':
	  		homeInit();
	  		break;

	  	case 'list_create':
	  		listCreateInit();
	  		break;

	  	case 'list_view':
	  		listViewInit(optionalData);
	  		break;

	  	default:
	  		console.log('default hit');
	  		break;
	  }
	},
	addEventListeners: (element, eventType, fns) => {
		let el = document.querySelector(element);
		el.addEventListener(eventType, fns, false);
	}
};

/*=================================
=            Initialize           =
=================================*/
const loadHomePage = () => {
	util.loadHTML(`${root}html/home.html`, 'home');
};

const initFns = () => {
	if (appStorage.length > 0)
		appStorageArray = JSON.parse(appStorage.getItem('app')) || [];
	util.addEventListeners('#refresh', 'click', refreshPage);
	loadHomePage();
};

document.onreadystatechange = function () {
	if (document.readyState == 'complete') {
		util.asciiSignature();
		help.addEventListener('click', helpPage, false);
		initFns();
	}
};

export { root, util, appStorageArray, validateInputsHaveValues, removeValidationError, validationHandler };
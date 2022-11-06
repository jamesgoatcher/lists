import { root, util, removeValidationError } from './app.js';
import { setNewList } from './localStorage.js';

const weightNumbersOnlyTo100 = () => {
	const regex = /^([0-9]{1,2}){1}(\.[0-9]{1,2})?$/; // 1 - 99.99 with 2 decimal places
	const inputEls = Array.from(document.querySelectorAll('.input__game_weight'));
	function validateInput (event) {
		event = event || window.event;
		const newValue = event.target.value || '';
		if (newValue.match(regex))
			event.target.value = newValue;
		else
			event.target.value = '';
 	};
 	function updateCurrentWeightTotal () {
 		const el = document.querySelector('#weighting_total');
 		const total = [];
 		for (let input in inputEls)
 			total.push(parseFloat(inputEls[input].value));
 		el.innerHTML = `${total.reduce( (a,b) => a + b, 0)} %`;
 	};
	for (let input in inputEls) {
		inputEls[input].addEventListener('keyup', validateInput, false);
		inputEls[input].addEventListener('keyup', updateCurrentWeightTotal, false);
	}
};

const validateWeightsEqual100 = () => {
	const inputEls = Array.from(document.querySelectorAll('.input__game_weight'));
	let sum = [];
	for (let i = 0; i < inputEls.length; i++)
		sum.push(parseFloat(inputEls[i].value));
	sum = sum.reduce((a,b) => a+b);
	if (sum != 100)
		return true;
};

const listCreateInit = () => {
	weightNumbersOnlyTo100();
	util.addEventListeners('#names_validation__error', 'click', removeValidationError);
	util.addEventListeners('#weight_validation__error', 'click', removeValidationError);
	util.addEventListeners('#input_validation__error', 'click', removeValidationError);
	util.addEventListeners('#new_list_create', 'click', setNewList);
};

const moveToListView = (listObj) => {
	util.loadHTML(`${root}html/list_view.html`, 'list_view', listObj);
};

export { listCreateInit, moveToListView, validateWeightsEqual100 };
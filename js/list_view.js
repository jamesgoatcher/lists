import { util, appStorageArray, removeValidationError } from './app.js';
import { setItemValues, saveAndReturnToHome } from './localStorage.js';

const inputNumbersOnly = () => {
	const regex = /^(\d|(\d\.\d)|10){1}$/;
	const inputEls = Array.from(document.querySelectorAll('.input__game_rating'));
	function validateInput (event) {
		event = event || window.event;
		const newValue = event.target.value || '';
		if (newValue.match(regex))
			event.target.value = newValue;
		else
			event.target.value = '';
 	};
	for (let input in inputEls)
		inputEls[input].addEventListener('keyup', validateInput);
};

const listViewInit = (listObj) => {
	const title = document.querySelector('#list_title');
	const nostWeight = document.querySelector('#nostalgia_weight');
	const storyWeight = document.querySelector('#story_weight');
	const musicWeight = document.querySelector('#music_weight');
	const replayWeight = document.querySelector('#replay_weight');
	const artWeight = document.querySelector('#art_direction_weight');
	const mechWeight = document.querySelector('#mechanics_weight');
	title.innerHTML = listObj.name;
	displayWeight(listObj);
	inputNumbersOnly();
	if (listObj.items.length > 0) {
		addGameHeaders(listObj);
		addGameToItems(listObj);
	}
	util.addEventListeners('#names_validation__error', 'click', removeValidationError);
	util.addEventListeners('#input_validation__error', 'click', removeValidationError);
	util.addEventListeners('#imageURL_validation__error', 'click', removeValidationError);
	util.addEventListeners('#set_game_values', 'click', setItemValues.bind(this, listObj));
	util.addEventListeners('#save_return', 'click', saveAndReturnToHome);
};

const displayWeight = (currentList) => {
	const nostLabel = document.querySelector('label[for="nostalgia"]');
	const storLabel = document.querySelector('label[for="story"]');
	const musiLabel = document.querySelector('label[for="music"]');
  	const replLabel = document.querySelector('label[for="replay"]');
	const artdLabel = document.querySelector('label[for="art_direction"]');
	const mechLabel = document.querySelector('label[for="mechanics"]');
	const criterObj = currentList.items_labels;
	const weightObj = currentList.newWeights;
	nostLabel.innerHTML = `${criterObj.criteria_1} (${Math.floor(weightObj.nostalgia_weight * 100)}%)`;
	storLabel.innerHTML = `${criterObj.criteria_2} (${Math.floor(weightObj.story_weight * 100)}%)`;
	musiLabel.innerHTML = `${criterObj.criteria_3} (${Math.floor(weightObj.music_weight * 100)}%)`;
	replLabel.innerHTML = `${criterObj.criteria_4} (${Math.floor(weightObj.replay_weight * 100)}%)`;
	artdLabel.innerHTML = `${criterObj.criteria_5} (${Math.floor(weightObj.art_direction_weight * 100)}%)`;
	mechLabel.innerHTML = `${criterObj.criteria_6} (${Math.floor(weightObj.mechanics_weight * 100)}%)`;
};

const sortGames = (listObj) => listObj.sort((a, b) => parseFloat(a.overall)-parseFloat(b.overall)).reverse();

const showItemImage = (trigger) => {
	const imgCont = document.querySelector('#image__container');
	const el = event.target.parentNode;
	switch (trigger) {
		case 'mouseover':
			imgCont.style.backgroundImage = `url(${el.dataset.image})`;
			break;
		case 'mouseout':
			if (!imgCont.classList.contains('active'))
				imgCont.style.backgroundImage = '';
			break;

		case 'click':
			imgCont.style.backgroundImage = `url(${el.dataset.image})`;
			if (!el.classList.contains('active')) {
				el.classList.add('active');
				imgCont.classList.add('active');
			}
			else {
				el.classList.remove('active');
				imgCont.classList.remove('active');
			}
			break;
	}
};

const addGameHeaders = (currentList) => {
	const gameList = document.querySelector('#game_list');
	const criterObj = currentList.items_labels;
	const weightObj = currentList.newWeights;
	const tr = document.createElement('tr');
	const rank = document.createElement('td');
	const name = document.createElement('td');
	const nost = document.createElement('td');
	const stor = document.createElement('td');
	const musi = document.createElement('td');
	const repl = document.createElement('td');
	const artd = document.createElement('td');
	const mech = document.createElement('td');
	const over = document.createElement('td');
	rank.innerHTML = `Rank`;
	name.innerHTML = `Name`;
	nost.innerHTML = `${criterObj.criteria_1}`;
	stor.innerHTML = `${criterObj.criteria_2}`;
	musi.innerHTML = `${criterObj.criteria_3}`;
	repl.innerHTML = `${criterObj.criteria_4}`;
	artd.innerHTML = `${criterObj.criteria_5}`;
	mech.innerHTML = `${criterObj.criteria_6}`;
	over.innerHTML = `Overall`;
	over.classList.add('bold');
	tr.appendChild(rank);
	tr.appendChild(name);
	tr.appendChild(nost);
	tr.appendChild(stor);
	tr.appendChild(musi);
	tr.appendChild(repl);
	tr.appendChild(artd);
	tr.appendChild(mech);
	tr.appendChild(over);
	gameList.appendChild(tr);
};

const addGameToItems = (currentList) => {
	const gameList = document.querySelector('#game_list');
	const inputEls = Array.from(document.querySelectorAll('.input__game_rating'));
	const sortedGames = sortGames(currentList.items);
	gameList.innerHTML = '';
	addGameHeaders(currentList);
	for (let i = 0; i < currentList.items.length; i++) {
		const gameArray = currentList.items[i];
		const tr = document.createElement('tr');
		const rank = document.createElement('td');
		const name = document.createElement('td');
		const nost = document.createElement('td');
		const stor = document.createElement('td');
		const musi = document.createElement('td');
		const repl = document.createElement('td');
		const artd = document.createElement('td');
		const mech = document.createElement('td');
		const over = document.createElement('td');
		rank.innerHTML = (i + 1);
		name.innerHTML = gameArray.name;
		nost.innerHTML = gameArray.nostalgia;
		stor.innerHTML = gameArray.story;
		musi.innerHTML = gameArray.music;
		repl.innerHTML = gameArray.replay;
		artd.innerHTML = gameArray.art_direction;
		mech.innerHTML = gameArray.mechanics;
		over.innerHTML = gameArray.overall;
		tr.setAttribute('data-image', currentList.items[i].image_url);
		tr.classList.add('item--row');
		tr.addEventListener('mouseover', showItemImage.bind(this, 'mouseover'), false);
		tr.addEventListener('mouseout', showItemImage.bind(this, 'mouseout'), false);
		tr.addEventListener('click', showItemImage.bind(this, 'click'), false);
		rank.classList.add('game--cell');
		name.classList.add('game--cell');
		nost.classList.add('game--cell');
		stor.classList.add('game--cell');
		musi.classList.add('game--cell');
		repl.classList.add('game--cell');
		artd.classList.add('game--cell');
		mech.classList.add('game--cell');
		over.classList.add('game--cell');
		tr.appendChild(rank);
		tr.appendChild(name);
		tr.appendChild(nost);
		tr.appendChild(stor);
		tr.appendChild(musi);
		tr.appendChild(repl);
		tr.appendChild(artd);
		tr.appendChild(mech);
		tr.appendChild(over);
		gameList.appendChild(tr);
	}
	for (let input in inputEls)
		inputEls[input].value = '';
	document.querySelector('#name').value = '';
	document.querySelector('#image_url').value = '';
};

export { listViewInit, addGameToItems };
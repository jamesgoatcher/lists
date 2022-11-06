import { root, util, appStorageArray, validateInputsHaveValues, validationHandler } from './app.js';
import MathSingleton from './math.js';
import { moveToListView, validateWeightsEqual100 } from './list_create.js';
import { addGameToItems } from './list_view.js';

const appStorage = window.localStorage;

const setNewList = () => {
	const inputEls = Array.from(document.querySelectorAll('.input__game_weight'));
	const inputNam = document.querySelector('#new_list_name').value;
	const validationBool = validationHandler(inputEls, inputNam, appStorageArray, ['inputsHaveValues', 'weightsEqual100', 'hasUniqueNames']);
	if (validationBool) {
		const listName = document.querySelector('#new_list_name').value;
		const nostWeight = document.querySelector('#nostalgia--weight').value;
		const storyWeight = document.querySelector('#story--weight').value;
		const musicWeight = document.querySelector('#music--weight').value;
		const replayWeight = document.querySelector('#replay--weight').value;
		const artWeight = document.querySelector('#art_direction--weight').value;
		const mechWeight = document.querySelector('#mechanics--weight').value;
		const newList = {
			uid: appStorageArray.length,
			name: listName,
			items: [],
			items_labels: {
				criteria_1: document.querySelector('#weight__container--1').value,
				criteria_2: document.querySelector('#weight__container--2').value,
				criteria_3: document.querySelector('#weight__container--3').value,
				criteria_4: document.querySelector('#weight__container--4').value,
				criteria_5: document.querySelector('#weight__container--5').value,
				criteria_6: document.querySelector('#weight__container--6').value
			},
			newWeights: {
				nostalgia_weight: parseFloat(nostWeight) / 100,
				story_weight: parseFloat(storyWeight) / 100,
				music_weight: parseFloat(musicWeight) / 100,
				replay_weight: parseFloat(replayWeight) / 100,
				art_direction_weight: parseFloat(artWeight) / 100,
				mechanics_weight: parseFloat(mechWeight) / 100
			}
		};
		appStorageArray.push(newList);
		moveToListView(newList);
	}
};

const setItemValues = (listObj) => {
	const inputEls = Array.from(document.querySelectorAll('.input__game_rating'));
	const inputNam = document.querySelector('#name').value;
	let imageURL = document.querySelector('#image_url').value;
	const validationBool = validationHandler(inputEls, inputNam, appStorageArray[listObj.uid].items, ['inputsHaveValues', 'hasUniqueNames', 'imageURLValid'], imageURL);
	if (validationBool) {
		if (imageURL == '')
			imageURL = 'https://cdn11.bigcommerce.com/s-gk06t3dnh9/stencil/e6196740-c8f0-0137-e35e-0242ac110024/icons/icon-no-image.svg';
		const gameObj = {
			name: inputNam,
			image_url: imageURL,
			nostalgia: document.querySelector('#nostalgia').value,
			story: document.querySelector('#story').value,
			music: document.querySelector('#music').value,
			replay: document.querySelector('#replay').value,
			art_direction: document.querySelector('#art_direction').value,
			mechanics: document.querySelector('#mechanics').value
		};
		gameObj['overall'] = MathSingleton.calculateOverallRating(listObj, gameObj.nostalgia, gameObj.story, gameObj.music, gameObj.replay, gameObj.art_direction, gameObj.mechanics);
		appStorageArray[listObj.uid].items.push(gameObj);
		addGameToItems(listObj);
	}
};

const saveAndReturnToHome = () => {
	localStorage.clear();
	appStorage.setItem('app', JSON.stringify(appStorageArray));
	util.loadHTML(`${root}html/home.html`, 'home');
};

export { appStorage, setNewList, setItemValues, saveAndReturnToHome };
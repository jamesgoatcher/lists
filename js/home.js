import { root, appStorageArray, util } from './app.js';
import { appStorage, saveAndReturnToHome } from './localStorage.js';

function homeInit () {
	if (appStorageArray?.length < 1)
		homeElements('empty');
	else
		homeElements('data');
	util.addEventListeners('#lists--create_new', 'click', util.loadHTML.bind(this, `${root}html/list_create.html`, 'list_create'));
	util.addEventListeners('#lists--jpg_seed', 'click', seedJPGDemoLists);
	util.addEventListeners('#lists--delete', 'click', deleteListsHandler);
	util.addEventListeners('#lists--download', 'click', downloadLists.bind(this, 'jpg__lists--yourLists.txt', appStorage.app));
	util.addEventListeners('#lists--upload_label', 'click', uploadLists);
	util.addEventListeners('#lists--upload', 'change', enableUpload);
};

function homeElements (option) {
	if (option == 'empty') {
		const listsEl = document.querySelector('#lists__empty');
		const seedEl = document.querySelector('#lists--jpg_seed');
		listsEl.classList.remove('hide');
		seedEl.classList.remove('hide');
	} 
	else {
		const listsEl = document.querySelector('#list__data');
		const downlEl = document.querySelector('#lists--download');
		const deletEl = document.querySelector('#lists--delete');
		listsEl.classList.remove('hide');
		downlEl.classList.remove('hide');
		deletEl.classList.remove('hide');
		writeListsToPage();
	}
};

function writeListsToPage () {
	const listContainer = document.querySelector('#list__data');
	const sortedLists = sortLists(appStorageArray);
	for (let i = 0; i < appStorageArray.length; i++) {
		let list = document.createElement('div');
		list.innerHTML = appStorageArray[i].name;
		list.classList.add('list__div');
		list.setAttribute('data-uid', appStorageArray[i].uid);
		list.addEventListener('click', goToListView.bind(this, appStorageArray[i]));
		listContainer.appendChild(list);
	}
};

function goToListView (listObj) {
	util.loadHTML(`${root}html/list_view.html`, 'list_view', listObj);
};

function deleteListsHandler () {
	const deleteEl = document.querySelector('#lists--delete');
	const listArray = Array.from(document.querySelectorAll('.list__div'));
	switch (event.target.dataset.click) {
		case 'delete': 
			for (let list in listArray) {
				const clkEl = document.createElement('div');
				clkEl.setAttribute('data-delete', listArray[list].dataset.uid);
				clkEl.addEventListener('click', removeListFromData);
				listArray[list].classList.add('delete_mode');
				listArray[list].style.pointerEvents = 'none';
				listArray[list].appendChild(clkEl);
			}
			deleteEl.dataset.click = 'save';
			deleteEl.innerHTML = 'Save changes?';
			break;
		case 'save':
			for (let list in listArray) {
				listArray[list].classList.remove('delete_mode');
				listArray[list].style.pointerEvents = 'all';
			}
			deleteEl.dataset.click = 'delete';
			deleteEl.innerHTML = 'Delete lists';
			saveAndReturnToHome();
			break;
	}
};

function removeListFromData () {
	const listUID = event.target.dataset.delete;
	for (let i = 0; i < appStorageArray.length; i++) {
		if (appStorageArray[i].uid == listUID) {
			appStorageArray.splice(i, 1);
			document.querySelector(`[data-uid="${listUID}"`).classList.remove('delete_mode');
			document.querySelector(`[data-uid="${listUID}"`).classList.add('deleted');
		}
	}
	event.stopPropagation();
};

function downloadLists (fileName, appObj) {
	const appObj64 = window.btoa(encodeURIComponent(appObj));
	const downloadEl = document.createElement('a');
  downloadEl.setAttribute('href', `data:text/plain;charset=utf-8,${appObj64}`);
  downloadEl.setAttribute('download', fileName);
  downloadEl.style.display = 'none';
  document.body.appendChild(downloadEl);
  downloadEl.click();
  document.body.removeChild(downloadEl);
};

function uploadLists () {
  const uploadEl = document.querySelector('#lists--upload').files[0];
  const fileReader = new FileReader();
  fileReader.onload = function(loadedFileEvent) {
    const textFromLoadedFile = decodeURIComponent(window.atob(loadedFileEvent.target.result));
    const storedLists = JSON.parse(textFromLoadedFile);
    const listsString = JSON.stringify(storedLists);
    localStorage.clear();
    appStorage.setItem('app', listsString);
		window.location.reload();
  };
  fileReader.readAsText(uploadEl, 'UTF-8');
};

function enableUpload () {
	document.querySelector('#lists--upload_label').disabled = false;
};

const sortLists = (appObj) => {
	return appObj.sort((a, b) => {
	  const listA = a.name.toUpperCase();
	  const listB = b.name.toUpperCase();
	  if (listA < listB)
	  	return -1;
	  if (listA > listB)
	  	return 1;
	  return 0;
	});
};

const seedJPGDemoLists = async () => {
	const response = await fetch(`${root}assets/seed.txt`);
	let storedLists;
  let listsString;
  response.text().then(function(body) {
  	storedLists = JSON.parse(body);
  	listsString = JSON.stringify(storedLists);
  	if (listsString.substring(0,8) === '[{"uid":') {
	  	localStorage.clear();
	  	appStorage.setItem('app', listsString);
	  } 
	  else
	  	throw 'Invalid file format';
		window.location.reload();
  });
};

export { homeInit };
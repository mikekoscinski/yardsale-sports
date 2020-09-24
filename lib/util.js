import { autographPlayers, cardsPlayers } from "./data.js";

const navbutton = document.querySelector('.navbutton');
const navmenu = document.querySelector('.navmenu');
const staticGallery = document.querySelector('.gallery');
const isAutographGallery = new Boolean(document.querySelector('.gallery.autographs')).valueOf();
const isCardsGallery = new Boolean(document.querySelector('.gallery.cards')).valueOf();

function formatNameForFile(name) {
	const formattedName = name.toLowerCase().replace(/ /g, '-');
	return formattedName;
}



// TODO: Update makePlayerHTML -- or create makePlayerCardHTML and makePlayerAutographHTML. Two separate functions would be much easier, given how different it might be

// Prefer to keep it one function. Could introduce logic like "if player is a card, return x, else ..."

// Will need to update the format name for file for cards. Easier to just create a second one, since it will be very different. Or, actually, should keep it one function? Can I pass a parameter that says "autograph" or "card"?

function makePlayerHTML (player) {
	const playerHTML = `
		<div class="autograph">
			<img 
				src="../img/autographs/${player.file}" 
				alt="${player.name} autographed baseball" 
				tabindex="0" 
				title="${player.name}"
				data-team="${player.teamOrIssuer}"
				data-position="${player.positionOrYear}"
				data-description="${player.positionOrYear}, ${player.teamOrIssuer}"
			>
			<div class="caption">
				<h3>${player.name}</h3>
				<p>${player.teamOrIssuer}</p>
				<p>${player.positionOrYear}</p>
			</div>
		</div>
	`;
	return playerHTML;
}





function insertPlayerHTML (dataSource) {
	dataSource.forEach(el => {
		
		const playerHTML = makePlayerHTML(el); // TODO: this could change if I create a separate function to make HTML for both autographs and cards
		
		if (!staticGallery) return;
		if (staticGallery) return staticGallery.insertAdjacentHTML('beforeend', playerHTML);
	});
}


function insertGalleryHTML () {
	if (!isAutographGallery && !isCardsGallery) return;
	if (isAutographGallery === true) return insertPlayerHTML (autographPlayers);
	if (isCardsGallery === true) return insertPlayerHTML (cardsPlayers);
}

function Gallery(gallery) {
	if (!gallery) return;

	const images = Array.from(gallery.querySelectorAll('img'));
	const modal = document.querySelector('.modal');
	const previousButton = modal.querySelector('.previous');
	const nextButton = modal.querySelector('.next');
	let currentImage;

	function openModal() {
		if (modal.matches('.open')) return;
		modal.classList.add('open');
		window.addEventListener('keyup', handleKeyUp);
		nextButton.addEventListener('click', showNextImage);
		previousButton.addEventListener('click', showPreviousImage);
	}

	function closeModal() {
		modal.classList.remove('open');
		window.removeEventListener('keyup', handleKeyUp);
		nextButton.removeEventListener('click', showNextImage);
		previousButton.removeEventListener('click', showPreviousImage);
	}

	function handleOutsideClick(event) {
		if (event.target === event.currentTarget) return closeModal();
	}

	function handleKeyUp(event) {
		if (event.key === 'Escape') return closeModal();
		if (event.key === 'ArrowRight') return showNextImage();
		if (event.key === 'ArrowLeft') return showPreviousImage();
	}

	function showNextImage() {
		const firstImage = gallery.firstElementChild.firstElementChild;
		const isThereANextImage = Boolean(currentImage.parentElement.nextElementSibling).valueOf();
		const nextImage = (!isThereANextImage) ? 
			null :
			currentImage.parentElement.nextElementSibling.firstElementChild;
		showImage(nextImage || firstImage);
	}

	function showPreviousImage() {
		const lastImage = gallery.lastElementChild.firstElementChild;
		const isThereAPreviousImage = Boolean(currentImage.parentElement.previousElementSibling).valueOf();
		const previousImage = (!isThereAPreviousImage) ? 
			null :
			currentImage.parentElement.previousElementSibling.firstElementChild;
		showImage(previousImage || lastImage);
	}

	function showImage(el) {
		if (!el) return console.info('No image to show.');
		// Update the modal with this info
		modal.querySelector('img').src = el.src;
		modal.querySelector('h2').textContent = el.title;
		modal.querySelector('figure p').textContent = el.dataset.description;
		currentImage = el;
		openModal();
	}

	// Event listeners:
	images.forEach(image => 
		image.addEventListener('click', event => showImage(event.currentTarget))
	);
	images.forEach(image => 
		image.addEventListener('keyup', event => { 
			if (event.key === 'Enter') return showImage(event.currentTarget) 
		}
	));
	modal.addEventListener('click', handleOutsideClick);
}

function makeGalleryLive () {
	Gallery(staticGallery);
}

export function addNavButtonListener () {
	navbutton.addEventListener('click', () => {
		navmenu.classList.toggle('active');
	});
}

export function Player(name, teamOrIssuer, positionOrYear) {
	this.name = name;
	this.teamOrIssuer = teamOrIssuer;
	this.positionOrYear = positionOrYear;
	this.file = `${formatNameForFile(this.name)}-autograph.jpg`;
}

export function animateGallery () {
	const isGallery = new Boolean(document.querySelector('.gallery')).valueOf();
	if (!isGallery) return;
	insertGalleryHTML();
	makeGalleryLive();
}

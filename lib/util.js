import { autographPlayers, cardsPlayers } from "./data.js";

export const isGallery = new Boolean(document.querySelector('.gallery'));

const navbutton = document.querySelector('.navbutton');
const navmenu = document.querySelector('.navmenu');
const staticGallery = document.querySelector('.gallery');
const isAutographGallery = new Boolean(document.querySelector('.gallery.autographs'));
const isCardsGallery = new Boolean(document.querySelector('.gallery.cards'));

// Header:
export function addNavButtonListener () {
	navbutton.addEventListener('click', () => {
		navmenu.classList.toggle('active');
	});
}

// Body:
function formatNameForFile(name) {
	const formattedName = name.toLowerCase().replace(/ /g, '-');
	return formattedName;
}

export function Player(name, teamOrIssuer, positionOrYear) {
	this.name = name;
	this.teamOrIssuer = teamOrIssuer;
	this.positionOrYear = positionOrYear;
	this.file = `${formatNameForFile(this.name)}-autograph.jpg`;
}

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
		const playerHTML = makePlayerHTML(el);
		staticGallery.insertAdjacentHTML('beforeend', playerHTML);
	});
}

export function insertGalleryHTML () {
	if (isAutographGallery) return insertPlayerHTML (autographPlayers);
	if (isAutographGallery) return insertPlayerHTML (cardsPlayers);
}

function Gallery(gallery) {
	if (!gallery) throw new Error('No gallery found.');

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
		const isThereANextImage = Boolean(currentImage.parentElement.nextElementSibling);
		const nextImage = (!isThereANextImage) ? 
			null :
			currentImage.parentElement.nextElementSibling.firstElementChild;
		showImage(nextImage || firstImage);
	}

	function showPreviousImage() {
		const lastImage = gallery.lastElementChild.firstElementChild;
		const isThereAPreviousImage = Boolean(currentImage.parentElement.previousElementSibling);
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

export function makeGalleryLive () {
	Gallery(staticGallery);
}
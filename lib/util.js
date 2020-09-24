import { autographPlayers } from "./data.js";

export const navbutton = document.querySelector('.navbutton');
export const navmenu = document.querySelector('.navmenu');
export const staticAutographGallery = document.querySelector('.gallery');

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

function makeAutographPlayerHTML (player) {
	const autographHTML = `
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
	return autographHTML;
}

// Insert each HTML snippet into the DOM
export function insertAutographHTML () {
	autographPlayers.forEach(el => {
		const autographHTML = makeAutographPlayerHTML(el);
		staticAutographGallery.insertAdjacentHTML('beforeend', autographHTML);
	});
}
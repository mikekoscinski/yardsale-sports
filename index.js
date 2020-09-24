// TODO: Refactor into modules; autographs.js and cards.js (the data) should be their own files; gallery.js should be its own file (generate galleries)

const navbutton = document.querySelector('.navbutton');
const navmenu = document.querySelector('.navmenu');

navbutton.addEventListener('click', () => {
	navmenu.classList.toggle('active');
})

const staticAutographGallery = document.querySelector('.gallery');

function formatNameForFile(name) {
	const formattedName = name.toLowerCase().replace(/ /g, '-');
	return formattedName;
}

function Player(name, team, position) {
	this.name = name;
	this.team = team;
	this.position = position;
	this.file = `${formatNameForFile(this.name)}-autograph.jpg`;
}
const autographPlayers = [
	new Player('Adam Jones', 'Baltimore Orioles', 'Outfielder'),
	new Player('Akinori Iwamura',	'Tampa Bay Rays', 'Infielder'),
	new Player('Alex Gordon',	'Kansas City Royals', 'Outfielder'),
	new Player('Alex Rodriguez', 'Yankees', 'Infielder'),
	new Player('Andy Pettitte', 'New York Yankees', 'Pitcher'),
	new Player('Aubrey Huff',	'Baltimore Orioles', 'Infielder'),
	new Player('Billy Ripken',	'Baltimore Orioles', 'Infielder'),
	new Player('Boof Bonsor',	'Minnesota Twins', 'Pitcher'),
	new Player('Brian Bannister',	'Kansas City Royals', 'Pitcher'),
	new Player('Brian Bruney',	'New York Yankees', 'Pitcher'),
	new Player('Brian Burres',	'Baltimore Orioles', 'Pitcher'),
	new Player('Brian Matusz',	'Baltimore Orioles', 'Pitcher'),
	new Player('Brian Roberts',	'Baltimore Orioles', 'Infielder'),
	new Player('David Ortiz', 'Boston Red Sox', 'Designated Hitter'),
	new Player('Denard Span', 'Minnesota Twins', 'Outfielder'),
	new Player('Dennis Sarfate', 'Fukuoka SoftBank Hawks', 'Pitcher'),
	new Player('Derek Jeter', 'New York Yankees', 'Shortstop'),
	new Player('Dick Hall',	'Baltimore Orioles', 'Pitcher'),
	new Player('Edwar Ramirez',	'New York Yankees', 'Pitcher'),
	new Player('Edwin Jackson',	'Tampa Bay Rays', 'Pitcher'),
	new Player('Erik Bedard',	'Baltimore Orioles', 'Pitcher'),
	new Player('Garrett Olson', 'Baltimore Orioles', 'Pitcher'),
	new Player('George Sherrill',	'Baltimore Orioles', 'Pitcher'),
	new Player('Hank Aaron', 'Atlanta Braves', 'Outfielder'),
	new Player('James Shields',	'Tampa Bay Rays', 'Pitcher'),
	new Player('Jamie Walker',	'Baltimore Orioles', 'Pitcher'),
	new Player('Jered Weaver',	'Los Angeles Angels', 'Pitcher'),
	new Player('Jim Hickey',	'Tampa Bay Rays', 'Pitching Coach'),
	new Player('Jim Palmer', 'Baltimore Orioles', 'Pitcher'),
	new Player('Joe Maddon',	'Tampa Bay Rays', 'Manager'),
	new Player('Jorge Posada', 'New York Yankees', 'Catcher'),
	new Player('Justin Masterson', 'Boston Red Sox', 'Pitcher'), 
	new Player('Kevin Millar', 'Baltimore Orioles', 'Infielder'),
	new Player('Kevin Slowey',	'Minnesota Twins', 'Pitcher'),
	new Player('Larry Sheets',	'Baltimore Orioles', 'Outfield'),
	new Player('Luke Scott',	'Baltimore Orioles', 'Outfielder'),
	new Player('Mark Grudzielanek',	'Kansas City Royals', 'Infielder'),
	new Player('Mark Teahen',	'Kansas City Royals', 'Outfielder'),
	new Player('Matt Garza', 'Tampa Bay Rays', 'Pitcher'),
	new Player('Melvin Mora',	'Baltimore Orioles', 'Infielder'),
	new Player('Nelson Figueroa',	'New York Mets', 'Pitcher'),
	new Player('Nick Swisher', 'New York Yankees', 'Outfielder'),
	new Player('Paul Blair',	'Baltimore Orioles', 'Outfielder'),
	new Player('Rick Dempsey',	'Baltimore Orioles', 'Catcher'),
	new Player('Scott Kazmir',	'Tampa Bay Rays', 'Pitcher'),
	new Player('Sean Casey',	'Boston Red Sox', 'Infielder'),
	new Player('Terry Francona', 'Boston Red Sox', 'Manager'),
	new Player('Tim Kurkjian', 'ESPN Network', 'Reporter'),
	new Player('Tim Teufel', 'New York Mets', 'Infielder'),
	new Player('Torii Hunter', 'Los Angeles Angels', 'Outfielder'),
	new Player('Yogi Berra', 'New York Yankees', 'Catcher'),
];

function makeAutographHTML (player) {
	const autographHTML = `
		<div class="autograph">
			<img 
				src="../img/autographs/${player.file}" 
				alt="${player.name} autographed baseball" 
				tabindex="0" 
				title="${player.name}"
				data-team="${player.team}"
				data-position="${player.position}"
				data-description="${player.position} for the ${player.team}"
			>
			<div class="caption">
				<h3>${player.name}</h3>
				<p>${player.team}</p>
				<p>${player.position}</p>
			</div>
		</div>
	`;
	return autographHTML;
}
// Insert each HTML snippet into the DOM
autographPlayers.forEach(el => {
	const autographHTML = makeAutographHTML(el);
	staticAutographGallery.insertAdjacentHTML('beforeend', autographHTML);
});

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

const liveAutographGallery = Gallery(staticAutographGallery);

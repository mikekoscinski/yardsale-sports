import { autographPlayers, cardsPlayers } from "./data.js";

const navbutton = document.querySelector('.navbutton');
const navmenu = document.querySelector('.navmenu');
const staticGallery = document.querySelector('.gallery');
const isAutographGallery = new Boolean(document.querySelector('.gallery.autographs')).valueOf();
const isCardGallery = new Boolean(document.querySelector('.gallery.cards')).valueOf();





// TODO: Organize the cart functionality below:

const cartItems = [];


// TODO: Create event listeners for every add-to-cart button

function addToCart(button) {
	// Check if there is an element
	if (!button) return;
	
	// select element that was just clicked
	console.log(button.parentElement.parentElement.parentElement);
	
	// create cartItem object: { title, price, img-src }
	
	// push cartItem into cartItems array
	
	
	
	// test
	
	console.log('clicked');
	
}


export function addCartButtonListeners() {
	const addToCartButtons = Array.from(document.querySelectorAll('.add-to-cart'));
	
	addToCartButtons.forEach(button => 
		button.addEventListener('click', event => addToCart(event.currentTarget))
	);
}


// Create Cart (#) text for header
function createCartTextForHeader() {
	const existingCartHeaderText = document.querySelector('.links.cart');
	const newCartHeaderText = `
		<a href="#">Cart (${cartItems.length})</a>
	`;
	existingCartHeaderText.insertAdjacentHTML('beforeend', newCartHeaderText);
}
// TODO: Add this to a larger parent function?
createCartTextForHeader();







function formatNameForFile(name) {
	return name.toLowerCase().replace(/ /g, '-');
}



// TODO: The next image is pulling the title from the <item-info> div

// TODO: That is also why the img can't be found

// TODO: To FIX this, need to correct

function makeAutographHTML (player) {	
	return `
		<div class="autograph">
			<div class="item-info"
				title="${player.name} Autographed Baseball"
				data-price="$${(player.price / 100).toFixed(2)}"
				data-img-src="../img/autographs/${player.file}"
			>
			</div>
			<img 
				src="../img/autographs/${player.file}" 
				alt="${player.name} Autographed Baseball" 
				tabindex="0" 
				title="${player.name} Autographed Baseball"
			>
			<div class="caption">
				<h3><span class="autograph-player">${player.name}</span></h3>
				<p><span class="autograph-description">${player.team} • ${player.position}</span></p>
				<div class="item-details">
					<p><span class="price">$${(player.price / 100).toFixed(2)}</span></p>
					<span class="add-to-cart"><button>Add To Cart</button></span>
				</div>
			</div>
		</div>
	`;
}

function makeCardHTML (player) {
	return `
		<div class="card">
			<div class="item-info"
				title="${player.year} ${player.issuer} ${player.name} Card"
				data-price="$${(player.price / 100).toFixed(2)}"
				data-img-src="../img/cards/${player.file}"
			>
			</div>
			<img 
				src="../img/cards/${player.file}"
				alt="${player.year} ${player.issuer} ${player.name} Card"
				tabindex="0"
				title="${player.year} ${player.issuer} ${player.name} Card"
			>
			<div class="caption">
				<h3><span class="card-player">${player.name}</span></h3>
				<p><span class="card-issue">${player.year} ${player.issuer}</span></p>
				<div class="item-details">
					<p><span class="price">$${(player.price / 100).toFixed(2)}</span></p>
					<button><span class="add-to-cart">Add To Cart</span></button>
				</div>	
			</div>
		</div>
	`;
}

function insertPlayerHTML (dataSource) {
	if (!staticGallery) return;
	if (isAutographGallery) {
		dataSource.forEach(el => {		
			if (staticGallery) return staticGallery.insertAdjacentHTML('beforeend', makeAutographHTML(el));
		});
		return;
	}
	if (isCardGallery) {
		dataSource.forEach(el => {		
			if (staticGallery) return staticGallery.insertAdjacentHTML('beforeend', makeCardHTML(el));			
		});
		return;
	}
	console.log('Error. Gallery type could not be identified.')
}

function insertGalleryHTML () {
	if (!isAutographGallery && !isCardGallery) return;
	if (isAutographGallery) return insertPlayerHTML (autographPlayers);
	if (isCardGallery) return insertPlayerHTML (cardsPlayers);
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

	
	
	
	function showImage(el) {
		if (!el) return console.info('No image to show.');
		// Update the modal with this info
		modal.querySelector('img').src = el.src;
		modal.querySelector('h2').textContent = el.title;
		
		// TODO: Is this causing the undefined?
		// Update: No, doesn't look like it. Remove when positive
		
		currentImage = el;
		openModal();
	}
	
	// TODO: does not loop right now
	
	function showNextImage() {
		const firstImage = gallery.firstElementChild.querySelector('img');
		
		// console.log(firstImage);
		
		
		// TODO: This is where the error occurs.
		// cannot read querySelector on 'null'.
		// So, need to handle exceptions here.
		// Check if nextImage === null before running this
		
		
		// TODO: Check if current image is last el child?
		// if (currentImage === currentImage.parentElement.lastElementChild) isThereANextImage = false;
		
		// if there is no next sibling, dont' run the rest
		
		const isThereANextElementSibling = Boolean(currentImage.parentElement.nextElementSibling).valueOf();
	
		console.log(isThereANextElementSibling);
		
		
		
		// const isThereANextImage = Boolean(currentImage.parentElement.nextElementSibling.querySelector('img')).valueOf();
		
		// console.log(isThereANextImage);
		
		
		
		const nextImage = (!isThereANextElementSibling) ? 
			false :
			currentImage.parentElement.nextElementSibling.querySelector('img');
		
		console.log(nextImage);
			
		showImage(nextImage || firstImage);
	}
	
	

	function showPreviousImage() {
		
		// TODO: Use querySelector('img') here like in nextIMG
		
		const lastImage = gallery.lastElementChild.firstElementChild;
		const isThereAPreviousImage = Boolean(currentImage.parentElement.previousElementSibling).valueOf();
		const previousImage = (!isThereAPreviousImage) ? 
			null :
			currentImage.parentElement.previousElementSibling.firstElementChild;
		showImage(previousImage || lastImage);
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

export function AutographPlayer(name, team, position, price) {
	this.name = name;
	this.team = team;
	this.position = position;
	this.price = price;
	this.file = `${formatNameForFile(this.name)}-autograph.jpg`;
}

export function CardPlayer(name, issuer, year, price) {
	this.name = name;
	this.issuer = issuer;
	this.year = year;
	this.price = price;
	this.file = `${formatNameForFile(this.name)}-${formatNameForFile(this.issuer)}-${year}.jpg`;
}

export function animateGallery () {
	const isGallery = new Boolean(document.querySelector('.gallery')).valueOf();
	if (!isGallery) return;
	insertGalleryHTML();
	makeGalleryLive();
}

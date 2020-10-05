import { autographPlayers, cardsPlayers } from "./data.js";

const navbutton = document.querySelector('.navbutton');
const navmenu = document.querySelector('.navmenu');
const staticGallery = document.querySelector('.gallery');
const isAutographGallery = new Boolean(document.querySelector('.gallery.autographs')).valueOf();
const isCardGallery = new Boolean(document.querySelector('.gallery.cards')).valueOf();

const cartItems = JSON.parse(localStorage.getItem('cartItemsKey')) || [];
const cartQuantityHeaderTextSpan = document.querySelector('.links.cart').querySelector('.cartquantity');

// TODO: Need to do something like this ^ for pre-loading buy-box HTML based on total price in localStorage
// Will need to store the variable here and update it when specific events are fired WHILE ON CART PAGE; e.g. quantity is changed




// Set cart '#' header text on page load. Check if localStorage is empty
(localStorage.getItem('cartItemsKey') !== null) ? 
	cartQuantityHeaderTextSpan.innerHTML = JSON.parse(localStorage.getItem('cartItemsKey')).length :
	cartQuantityHeaderTextSpan.innerHTML = 0;

function addToCart(button) {
	if (!button) return;
	const newCartItemInfo = button.parentElement.parentElement.parentElement.querySelector('.item-info');
	const newCartItem = {
		title: newCartItemInfo.title,
		price: newCartItemInfo.dataset.price,
		inventory: newCartItemInfo.dataset.inventory,
		
		// TODO: Parse cart for item. If not in there, qty=1. Else, increment qty up by 1
		// quantityInCart: [need to fill this out still]
		
		
		
		imgSrc: newCartItemInfo.dataset.imgsrc,
	}
	
	function countExistingNewCartItemsInCart() {
		let count = 0;
		cartItems.forEach(item => {
			if (JSON.stringify(item) === JSON.stringify(newCartItem)) return count++;
		});
		return count;
	}
	
	const existingCount = countExistingNewCartItemsInCart();
	// TODO: Using 'alert' like this causes a Chrome violation. Need to improve this in future.
	if (existingCount >= newCartItem.inventory) return alert('Out of stock.');
	cartItems.push(newCartItem);
	localStorage.removeItem('cartItemsKey');
	localStorage.setItem('cartItemsKey', JSON.stringify(cartItems));
	updateCartQuantityInHeaderHTML();
}

export function createAddToCartButtonListeners() {
	const addToCartButtons = Array.from(document.querySelectorAll('.add-to-cart'));
	addToCartButtons.forEach(button => 
		button.addEventListener('click', event => addToCart(event.currentTarget))
	);
}

function updateCartQuantityInHeaderHTML() {
	const newCartQuantity = JSON.parse(localStorage.getItem('cartItemsKey')).length;
	cartQuantityHeaderTextSpan.innerHTML = newCartQuantity;	
}

function formatNameForFile(name) {
	return name.toLowerCase().replace(/ /g, '-');
}

function makeAutographHTML (player) {	
	return `
		<div class="autograph">
			<div class="item-info"
				title="${player.name} Autographed Baseball"
				data-price="$${(player.price / 100).toFixed(2)}"
				data-inventory="${player.inventory}"
				data-imgsrc="../img/autographs/${player.file}"
			></div>
			<img 
				src="../img/autographs/${player.file}" 
				alt="${player.name} Autographed Baseball" 
				tabindex="0" 
				title="${player.name} Autographed Baseball"
				data-description="${player.position}, ${player.team}"
			>
			<div class="caption">
				<h3><span class="autograph-player">${player.name}</span></h3>
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
				data-inventory="${player.inventory}"
				data-imgsrc="../img/cards/${player.file}"
			></div>
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
					<span class="add-to-cart"><button>Add To Cart</button></span>
				</div>	
			</div>
		</div>
	`;
}

function insertPlayerHTML (dataSource) {
	if (!staticGallery) return;
	if (isAutographGallery) {
		return dataSource.forEach(el => {		
			if (staticGallery) return staticGallery.insertAdjacentHTML('beforeend', makeAutographHTML(el));
		});
	}
	if (isCardGallery) {
		return dataSource.forEach(el => {		
			if (staticGallery) return staticGallery.insertAdjacentHTML('beforeend', makeCardHTML(el));
		});
	}
	console.info('Error. Gallery type could not be identified.')
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
		// Validate before setting; only autographs have a description
		if (el.dataset.description) modal.querySelector('p').textContent = el.dataset.description;
		currentImage = el;
		openModal();
	}
	
	function showNextImage() {
		const firstImage = gallery.firstElementChild.querySelector('img');
		const isThereANextElementSibling = Boolean(currentImage.parentElement.nextElementSibling).valueOf();
		const nextImage = (!isThereANextElementSibling) ? 
			false :
			currentImage.parentElement.nextElementSibling.querySelector('img');
		showImage(nextImage || firstImage);
	}
	
	function showPreviousImage() {
		const lastImage = gallery.lastElementChild.querySelector('img');
		const isThereAPreviousElement = Boolean(currentImage.parentElement.previousElementSibling).valueOf();
		const previousImage = (!isThereAPreviousElement) ? 
			null :
			currentImage.parentElement.previousElementSibling.querySelector('img');
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

export function createNavButtonListeners () {
	navbutton.addEventListener('click', () => {
		navmenu.classList.toggle('active');
	});
}

export function AutographPlayer(name, team, position, price, inventory) {
	this.name = name;
	this.team = team;
	this.position = position;
	this.price = price;
	this.inventory = inventory;
	this.file = `${formatNameForFile(this.name)}-autograph.jpg`;
}

export function CardPlayer(name, issuer, year, price, inventory) {
	this.name = name;
	this.issuer = issuer;
	this.year = year;
	this.price = price;
	this.inventory = inventory;
	this.file = `${formatNameForFile(this.name)}-${formatNameForFile(this.issuer)}-${year}.jpg`;
}

export function animateGallery () {
	const isGallery = new Boolean(document.querySelector('.gallery')).valueOf();
	if (!isGallery) return;
	insertGalleryHTML();
	makeGalleryLive();
}





function makeCartItemHTML (item) {
	
	console.log(document.querySelector('.cart-summary'));
	
	const cartItemInventory = item.inventory;
	
	const currentCartQuantity = 1;
	
	let selectOptionsHTML;
	for (let i = 0; i <= cartItemInventory; i++) {
		const isCurrentCartQuantity = Boolean(i === currentCartQuantity).valueOf();
	
		const selectedAttribute = (isCurrentCartQuantity) ? 
			` selected` :
			``
		;
		
		selectOptionsHTML += `<option value${selectedAttribute}="${i}">${i}</option>`
	}
	
	return `
		<div class="individual-cart-item">
			<div class="row">
				<div class="column small">
					<span class="item-img"><img src="${item.imgSrc}" alt="${item.title}"></span>
				</div>
				<div class="column large">
					<span class="item-title"<p>${item.title}</p></span>
				</div>
				<div class="column small">
					<span class="select-item-quantity">
						<select>
							<span class="item-quantity-options">
								${selectOptionsHTML}
							</span>
						</select>
					</span>
				</div>
				<div class="column small">
					<span class="item-price"<p>${item.price}</p></span>
				</div>
			</div>
		</div>
	`;
}





// TODO: Create event listeners for checkout, updateQuantity buttons (think I will just do one updateQuantity button, vs. that AND a remove item button)

function updateBuyBoxHTML(dataSource) {
	// TODO: This just needs to update the total-price in the buybox; that will be wrapped in a span. The only other element in the box is an actual checkout button. Nothing else needs to be changed. Thus extensive HTML does not need to be generated.

}

function insertCartHTML(dataSource) {	
	
	const cartSummary = document.querySelector('.cart-summary');
	
	// TODO: Insert cartItem HTML into div class="cart-summary"
	// and insert buyBoxHTML into div class="buy-box" (this is not yet completed)
	
	dataSource.forEach(el => {
		cartSummary.insertAdjacentHTML('beforeend', makeCartItemHTML(el));
	});
	
}


function updateQuantity() {
	console.log('updating quantity');
}

function createUpdateCartQuantityButtonListeners() {
	
	const itemQuantityButtons = document.querySelectorAll('.select-item-quantity');
	console.log(itemQuantityButtons);
	
	
	itemQuantityButtons.forEach(button => 
		button.addEventListener('change', event => updateQuantity(event.currentTarget))
	);
	
}






function makeCartLive() {
	insertCartHTML(cartItems);
	updateBuyBoxHTML(cartItems);
	createUpdateCartQuantityButtonListeners();
}

export function animateCart () {
	const isCart = new Boolean(document.querySelector('.active-cart')).valueOf();
	if (!isCart) return;
	makeCartLive();
}
